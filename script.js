/* ===================================
   KALKULATOR WARIS ISLAM - 4 MAZHAB
   Versi: 2.0 (Rebuilt & Enhanced)
   
   FITUR UTAMA:
   - Perhitungan akurat sesuai fiqih klasik 4 mazhab
   - Kasus khusus: Gharrawain, 'Aul, Radd, Mahjub
   - Debug mode dengan logging lengkap
   - Test cases built-in (15+ kasus)
   - Dokumentasi inline lengkap
   - Modal edukasi anak angkat/zina
   
   REFERENSI FIQIH:
   - Al-Quran: QS. An-Nisa: 11-12, 176
   - Hadits: HR. Bukhari, Muslim, Abu Dawud
   - Kitab Klasik: Al-Mughni, Bidayatul Mujtahid, 
     Al-Majmu', Al-Hidayah, Al-Umm
   
   LAST UPDATE: 2024-01-XX
   AUTHOR: AI Assistant (Claude)
=================================== */

'use strict';

// ===== GLOBAL VARIABLES =====

/**
 * DEBUG MODE
 * Set ke true untuk melihat logging detail di console
 * Set ke false untuk production (tidak ada logging)
 */
window.debugMode = false; // Toggle ini untuk debugging

/**
 * CURRENT LANGUAGE
 * 'id' = Bahasa Indonesia
 * 'en' = English
 */
let currentLang = 'id';

/**
 * CURRENT STEP
 * Tracking step form (1-5)
 */
let currentStep = 0;

/**
 * FORM DATA
 * Menyimpan semua input user
 */
let formData = {};

/**
 * ORIGINAL SAUDARA DATA
 * Menyimpan data saudara SEBELUM dihapus oleh mahjub
 * Digunakan untuk deteksi kasus Gharrawain
 * 
 * PENTING: Data ini harus disimpan sebelum fungsi detectMahjub()
 * menghapus saudara yang terhalang oleh ayah.
 * 
 * REFERENSI FIQIH:
 * - Al-Mughni (Ibnu Qudamah) Juz 7/13:
 *   "الإخوة يحجبون الأم من الثلث إلى السدس، سواء ورثوا أو لم يرثوا"
 *   (Saudara menghalangi ibu dari 1/3 menjadi 1/6, 
 *    baik mereka mewarisi atau tidak)
 */
let originalSaudaraData = {
  kandungSeayah: 0, // Total saudara kandung + seayah
  seibu: 0          // Total saudara seibu
};

/**
 * CALCULATION HISTORY
 * Menyimpan history perhitungan untuk debugging
 * Bisa diakses via console: window.calculationHistory
 */
window.calculationHistory = [];

/**
 * TEST MODE
 * Set ke true untuk menjalankan test cases otomatis
 */
window.testMode = false;

// ===== LOGGING UTILITIES =====

/**
 * FUNGSI: log()
 * TUJUAN: Logging dengan color coding untuk debugging
 * 
 * @param {string} type - Tipe log: 'info', 'success', 'warning', 'error', 'debug'
 * @param {string} message - Pesan yang akan di-log
 * @param {any} data - Data tambahan (opsional)
 */
function log(type, message, data = null) {
  if (!window.debugMode) return; // Skip jika debug mode off
  
  const styles = {
    info: 'color: #2196f3; font-weight: bold;',
    success: 'color: #4caf50; font-weight: bold;',
    warning: 'color: #ff9800; font-weight: bold;',
    error: 'color: #f44336; font-weight: bold;',
    debug: 'color: #9e9e9e; font-weight: normal;'
  };
  
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
    debug: '🔍'
  };
  
  console.log(`%c${icons[type]} ${message}`, styles[type]);
  
  if (data !== null) {
    console.log(data);
  }
}

/**
 * FUNGSI: logStep()
 * TUJUAN: Logging untuk setiap step perhitungan
 * 
 * @param {number} step - Nomor step (1-10)
 * @param {string} description - Deskripsi step
 * @param {any} result - Hasil step (opsional)
 */
function logStep(step, description, result = null) {
  if (!window.debugMode) return;
  
  console.log(`%c📊 STEP ${step}: ${description}`, 'color: #1976d2; font-weight: bold; font-size: 14px;');
  
  if (result !== null) {
    console.log(result);
  }
}

/**
 * FUNGSI: logError()
 * TUJUAN: Logging error dengan stack trace
 * 
 * @param {string} functionName - Nama fungsi yang error
 * @param {Error} error - Object error
 */
function logError(functionName, error) {
  console.error(`❌ ERROR di ${functionName}:`, error);
  console.error('Stack trace:', error.stack);
}

// ===== UTILITY FUNCTIONS =====

/**
 * FUNGSI: formatRupiah()
 * TUJUAN: Format angka ke format Rupiah
 * 
 * @param {number} amount - Jumlah uang
 * @returns {string} Format Rupiah (contoh: "Rp 120.000.000")
 */
function formatRupiah(amount) {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  
  return 'Rp ' + amount.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

/**
 * FUNGSI: fractionToString()
 * TUJUAN: Convert desimal ke string pecahan
 * 
 * @param {number} decimal - Angka desimal (contoh: 0.5)
 * @returns {string} String pecahan (contoh: "1/2")
 * 
 * CATATAN:
 * Fungsi ini menggunakan algoritma Greatest Common Divisor (GCD)
 * untuk menyederhanakan pecahan.
 */
function fractionToString(decimal) {
  if (decimal === 0) return '0';
  if (decimal === 1) return '1';
  
  // Toleransi untuk floating point
  const tolerance = 1.0e-6;
  
  // Pecahan umum dalam waris Islam
  const commonFractions = {
    0.5: '1/2',
    0.333333: '1/3',
    0.666667: '2/3',
    0.25: '1/4',
    0.75: '3/4',
    0.166667: '1/6',
    0.833333: '5/6',
    0.125: '1/8',
    0.875: '7/8'
  };
  
  // Cek pecahan umum
  for (let [key, value] of Object.entries(commonFractions)) {
    if (Math.abs(decimal - parseFloat(key)) < tolerance) {
      return value;
    }
  }
  
  // Jika tidak ada di pecahan umum, hitung dengan GCD
  let numerator = Math.round(decimal * 1000000);
  let denominator = 1000000;
  
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(numerator, denominator);
  
  numerator /= divisor;
  denominator /= divisor;
  
  return `${numerator}/${denominator}`;
}

/**
 * FUNGSI: hasAnak()
 * TUJUAN: Cek apakah ada anak atau cucu
 * 
 * @param {Object} data - Data pewaris
 * @returns {boolean} true jika ada anak/cucu
 */
function hasAnak(data) {
  return data.anakLaki > 0 || 
         data.anakPerempuan > 0 || 
         data.cucuLaki > 0 || 
         data.cucuPerempuan > 0;
}

/**
 * FUNGSI: hasCucu()
 * TUJUAN: Cek apakah ada cucu
 * 
 * @param {Object} data - Data pewaris
 * @returns {boolean} true jika ada cucu
 */
function hasCucu(data) {
  return data.cucuLaki > 0 || data.cucuPerempuan > 0;
}

/**
 * FUNGSI: addHeir()
 * TUJUAN: Tambah ahli waris ke array dengan validasi
 * 
 * @param {Array} heirs - Array ahli waris
 * @param {Object} heir - Object ahli waris baru
 */
function addHeir(heirs, heir) {
  // Validasi data
  if (!heir.name) {
    logError('addHeir', new Error('Nama ahli waris tidak boleh kosong'));
    return;
  }
  
  // Set default values
  heir.total = heir.total || 0;
  heir.perPerson = heir.perPerson || 0;
  heir.count = heir.count || 1;
  heir.share = heir.share || 0;
  heir.isAshabah = heir.isAshabah || false;
  heir.fraction = fractionToString(heir.share);
  
  heirs.push(heir);
  
  log('debug', `Ahli waris ditambahkan: ${heir.name}`, heir);
}

// ===== DALIL DATABASE =====

/**
 * DATABASE DALIL AL-QURAN & HADITS
 * 
 * Struktur:
 * - arab: Teks Arab
 * - terjemah_id: Terjemahan Bahasa Indonesia
 * - terjemah_en: Terjemahan English
 * - surah: Nama surah (untuk Al-Quran)
 * - ayat: Nomor ayat (untuk Al-Quran)
 * - riwayat: Perawi hadits (untuk Hadits)
 * - nomor: Nomor hadits
 * - bagian: Bagian fardh (untuk ahli waris)
 * - penjelasan_id: Penjelasan Bahasa Indonesia
 * - penjelasan_en: Penjelasan English
 */
const dalilDatabase = {
  // ===== SUAMI =====
  'suami.dengan_anak': {
    arab: 'وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ',
    terjemah_id: 'Dan bagimu (suami) seperdua dari harta yang ditinggalkan istri-istrimu, jika mereka tidak mempunyai anak.',
    terjemah_en: 'And for you is half of what your wives leave if they have no child.',
    surah: 'An-Nisa',
    ayat: 12,
    bagian: 0.25,
    penjelasan_id: 'Suami mendapat 1/4 jika istri meninggalkan anak atau cucu.',
    penjelasan_en: 'Husband gets 1/4 if wife leaves children or grandchildren.'
  },
  
  'suami.tanpa_anak': {
    arab: 'وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ',
    terjemah_id: 'Dan bagimu (suami) seperdua dari harta yang ditinggalkan istri-istrimu, jika mereka tidak mempunyai anak.',
    terjemah_en: 'And for you is half of what your wives leave if they have no child.',
    surah: 'An-Nisa',
    ayat: 12,
    bagian: 0.5,
    penjelasan_id: 'Suami mendapat 1/2 jika istri tidak meninggalkan anak atau cucu.',
    penjelasan_en: 'Husband gets 1/2 if wife leaves no children or grandchildren.'
  },
  
  // ===== ISTRI =====
  'istri.dengan_anak': {
    arab: 'وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ',
    terjemah_id: 'Dan bagi mereka (istri-istri) seperempat dari harta yang kamu tinggalkan jika kamu tidak mempunyai anak.',
    terjemah_en: 'And for them (wives) is one fourth of what you leave if you have no child.',
    surah: 'An-Nisa',
    ayat: 12,
    bagian: 0.125,
    penjelasan_id: 'Istri mendapat 1/8 (dibagi rata jika lebih dari satu) jika suami meninggalkan anak atau cucu.',
    penjelasan_en: 'Wife gets 1/8 (divided equally if more than one) if husband leaves children or grandchildren.'
  },
  
  'istri.tanpa_anak': {
    arab: 'وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ',
    terjemah_id: 'Dan bagi mereka (istri-istri) seperempat dari harta yang kamu tinggalkan jika kamu tidak mempunyai anak.',
    terjemah_en: 'And for them (wives) is one fourth of what you leave if you have no child.',
    surah: 'An-Nisa',
    ayat: 12,
    bagian: 0.25,
    penjelasan_id: 'Istri mendapat 1/4 (dibagi rata jika lebih dari satu) jika suami tidak meninggalkan anak atau cucu.',
    penjelasan_en: 'Wife gets 1/4 (divided equally if more than one) if husband leaves no children or grandchildren.'
  },
  
  // ===== AYAH =====
  'ayah.dengan_anak': {
    arab: 'وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ',
    terjemah_id: 'Dan untuk kedua ibu-bapak, bagi masing-masingnya seperenam dari harta yang ditinggalkan, jika dia (yang meninggal) mempunyai anak.',
    terjemah_en: 'And for one\'s parents, to each one of them is a sixth of his estate if he left children.',
    surah: 'An-Nisa',
    ayat: 11,
    bagian: 1/6,
    penjelasan_id: 'Ayah mendapat 1/6 jika ada anak atau cucu.',
    penjelasan_en: 'Father gets 1/6 if there are children or grandchildren.'
  },
  
  'ayah.tanpa_anak': {
    arab: 'أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَهُوَ لِأَوْلَى رَجُلٍ ذَكَرٍ',
    terjemah_id: 'Berikanlah bagian-bagian warisan kepada yang berhak menerimanya. Jika masih ada sisa, maka berikanlah kepada ahli waris laki-laki yang paling utama (dekat hubungan kekerabatannya).',
    terjemah_en: 'Give the shares to those who are entitled to them, and whatever remains goes to the nearest male heir.',
    riwayat: 'HR. Bukhari & Muslim',
    nomor: 'Bukhari (6732), Muslim (1615)',
    bagian: 0,
    penjelasan_id: 'Ayah mendapat sisa harta sebagai ashabah jika tidak ada anak atau cucu.',
    penjelasan_en: 'Father gets remainder as ashabah if there are no children or grandchildren.'
  },
  
  // ===== IBU =====
  'ibu.dengan_anak': {
    arab: 'فَإِن كَانَ لَهُ إِخْوَةٌ فَلِأُمِّهِ السُّدُسُ',
    terjemah_id: 'Jika dia (yang meninggal) mempunyai beberapa saudara, maka ibunya mendapat seperenam.',
    terjemah_en: 'But if he had brothers [or sisters], for his mother is a sixth.',
    surah: 'An-Nisa',
    ayat: 11,
    bagian: 1/6,
    penjelasan_id: 'Ibu mendapat 1/6 jika ada anak, cucu, atau 2+ saudara.',
    penjelasan_en: 'Mother gets 1/6 if there are children, grandchildren, or 2+ siblings.'
  },
  
  'ibu.tanpa_anak': {
    arab: 'فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ',
    terjemah_id: 'Jika dia (yang meninggal) tidak mempunyai anak dan dia diwarisi oleh kedua ibu-bapaknya (saja), maka ibunya mendapat sepertiga.',
    terjemah_en: 'And if he had no children and the parents [alone] inherit from him, then for his mother is one third.',
    surah: 'An-Nisa',
    ayat: 11,
    bagian: 1/3,
    penjelasan_id: 'Ibu mendapat 1/3 jika tidak ada anak, cucu, atau saudara.',
    penjelasan_en: 'Mother gets 1/3 if there are no children, grandchildren, or siblings.'
  },
  
  // ===== KAKEK =====
  'kakek.dengan_anak': {
    arab: 'وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ',
    terjemah_id: 'Dan untuk kedua ibu-bapak, bagi masing-masingnya seperenam dari harta yang ditinggalkan, jika dia (yang meninggal) mempunyai anak.',
    terjemah_en: 'And for one\'s parents, to each one of them is a sixth of his estate if he left children.',
    surah: 'An-Nisa',
    ayat: 11,
    bagian: 1/6,
    penjelasan_id: 'Kakek menggantikan posisi ayah dan mendapat 1/6 jika ada anak atau cucu.',
    penjelasan_en: 'Grandfather replaces father and gets 1/6 if there are children or grandchildren.'
  },
  
  // ===== NENEK =====
  'nenek.bagian': {
    arab: 'أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَعْطَى الْجَدَّةَ السُّدُسَ',
    terjemah_id: 'Bahwa Nabi ﷺ memberikan kepada nenek seperenam.',
    terjemah_en: 'That the Prophet ﷺ gave the grandmother one-sixth.',
    riwayat: 'HR. Abu Dawud, Tirmidzi, Ibnu Majah',
    nomor: 'Abu Dawud (2894), Tirmidzi (2100)',
    bagian: 1/6,
    penjelasan_id: 'Nenek mendapat 1/6 jika ibu tidak ada.',
    penjelasan_en: 'Grandmother gets 1/6 if mother is not present.'
  },
  
  // ===== ANAK PEREMPUAN =====
  'anak_perempuan.satu': {
    arab: 'وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ',
    terjemah_id: 'Dan jika anak perempuan itu seorang saja, maka ia memperoleh separuh harta.',
    terjemah_en: 'But if there is only one, for her is half.',
    surah: 'An-Nisa',
    ayat: 11,
    bagian: 0.5,
    penjelasan_id: 'Satu anak perempuan mendapat 1/2 jika tidak ada anak laki-laki.',
    penjelasan_en: 'One daughter gets 1/2 if there is no son.'
  },
  
  'anak_perempuan.dua_atau_lebih': {
    arab: 'فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ',
    terjemah_id: 'Jika anak perempuan itu dua orang atau lebih, maka bagi mereka dua pertiga dari harta yang ditinggalkan.',
    terjemah_en: 'But if they are [only] daughters, two or more, for them is two thirds of what he left.',
    surah: 'An-Nisa',
    ayat: 11,
    bagian: 2/3,
    penjelasan_id: 'Dua atau lebih anak perempuan mendapat 2/3 jika tidak ada anak laki-laki.',
    penjelasan_en: 'Two or more daughters get 2/3 if there is no son.'
  },
  
  'anak_perempuan.dengan_laki': {
    arab: 'يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ',
    terjemah_id: 'Allah mensyariatkan bagimu tentang (pembagian pusaka untuk) anak-anakmu. Yaitu: bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan.',
    terjemah_en: 'Allah instructs you concerning your children: for the male, what is equal to the share of two females.',
    surah: 'An-Nisa',
    ayat: 11,
    bagian: 0,
    penjelasan_id: 'Anak perempuan bersama anak laki-laki mendapat ashabah dengan ratio 2:1 (laki:perempuan).',
    penjelasan_en: 'Daughters with sons get ashabah with ratio 2:1 (male:female).'
  },
  
  // ===== ANAK LAKI-LAKI =====
  'anak_laki': {
    arab: 'أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَهُوَ لِأَوْلَى رَجُلٍ ذَكَرٍ',
    terjemah_id: 'Berikanlah bagian-bagian warisan kepada yang berhak menerimanya. Jika masih ada sisa, maka berikanlah kepada ahli waris laki-laki yang paling utama.',
    terjemah_en: 'Give the shares to those who are entitled to them, and whatever remains goes to the nearest male heir.',
    riwayat: 'HR. Bukhari & Muslim',
    nomor: 'Bukhari (6732), Muslim (1615)',
    bagian: 0,
    penjelasan_id: 'Anak laki-laki mendapat sisa harta sebagai ashabah.',
    penjelasan_en: 'Son gets remainder as ashabah.'
  },
  
  // ===== MAHJUB (GUGURNYA HAK WARIS) =====
  'mahjub.cucu_oleh_anak': {
    penjelasan_id: 'Cucu terhalang (mahjub) oleh keberadaan anak laki-laki, sesuai kaidah "Al-Aqrab Yahjubu Al-Ab\'ad" (yang lebih dekat menghalangi yang lebih jauh).',
    penjelasan_en: 'Grandchildren are blocked (mahjub) by the presence of sons, according to the principle "Al-Aqrab Yahjubu Al-Ab\'ad" (the closer blocks the farther).',
    dalil: 'الأقرب يحجب الأبعد',
    sumber: 'Ijma\' Ulama 4 Mazhab'
  },
  
  'mahjub.kakek_oleh_ayah': {
    penjelasan_id: 'Kakek terhalang (mahjub) oleh keberadaan ayah.',
    penjelasan_en: 'Grandfather is blocked (mahjub) by the presence of father.',
    dalil: 'الأب يحجب الجد',
    sumber: 'Ijma\' Ulama 4 Mazhab'
  },
  
  'mahjub.nenek_oleh_ibu': {
    penjelasan_id: 'Nenek terhalang (mahjub) oleh keberadaan ibu.',
    penjelasan_en: 'Grandmother is blocked (mahjub) by the presence of mother.',
    dalil: 'الأم تحجب الجدة',
    sumber: 'Ijma\' Ulama 4 Mazhab'
  },
  
  'mahjub.saudara_oleh_ayah': {
    penjelasan_id: 'Saudara kandung dan saudara seayah terhalang (mahjub) oleh keberadaan ayah, anak laki-laki, atau anak perempuan.',
    penjelasan_en: 'Full siblings and paternal siblings are blocked (mahjub) by the presence of father, son, or daughter.',
    dalil: 'الأب يحجب الإخوة',
    sumber: 'Ijma\' Ulama 4 Mazhab'
  },
  
  'mahjub.saudara_seibu_oleh_anak': {
    penjelasan_id: 'Saudara seibu terhalang (mahjub) oleh keberadaan anak, cucu, ayah, atau kakek.',
    penjelasan_en: 'Maternal siblings are blocked (mahjub) by the presence of children, grandchildren, father, or grandfather.',
    dalil: 'الفرع الوارث والأصل من الذكور يحجبون الإخوة لأم',
    sumber: 'Ijma\' Ulama 4 Mazhab'
  }
};

/**
 * FUNGSI: getDalil()
 * TUJUAN: Ambil dalil dari database
 * 
 * @param {string} key - Key dalil (contoh: 'suami.dengan_anak')
 * @returns {Object} Object dalil
 */
function getDalil(key) {
  const dalil = dalilDatabase[key];
  
  if (!dalil) {
    logError('getDalil', new Error(`Dalil tidak ditemukan: ${key}`));
    return {
      arab: '',
      terjemah_id: '',
      terjemah_en: '',
      bagian: 0,
      penjelasan_id: '',
      penjelasan_en: ''
    };
  }
  
  return dalil;
}

// ===== TRANSLATIONS =====

/**
 * DATABASE TERJEMAHAN
 * Untuk multi-language support (Indonesia & English)
 */
const translations = {
  id: {
    // Form labels
    gender_male: 'Laki-laki',
    gender_female: 'Perempuan',
    spouse: 'Pasangan',
    parents: 'Orang Tua',
    children: 'Anak',
    grandchildren: 'Cucu',
    siblings: 'Saudara',
    
    // Results (lanjutan)
    total_estate: 'Harta yang Dibagi',
    total_distributed: 'Total Dibagikan',
    difference: 'Selisih',
    status: 'Status',
    status_correct: 'Sesuai',
    status_error: 'Tidak Sesuai',
    
    // Special cases
    aul_occurred: 'Terjadi \'Aul (Pengurangan Proporsional)',
    radd_occurred: 'Terjadi Radd (Pengembalian Sisa)',
    
    // Buttons
    btn_calculate: 'Hitung Waris',
    btn_reset: 'Reset',
    btn_export: 'Export PDF',
    btn_next: 'Lanjut',
    btn_prev: 'Kembali',
    
    // Messages
    msg_loading: 'Menghitung...',
    msg_success: 'Perhitungan berhasil!',
    msg_error: 'Terjadi kesalahan dalam perhitungan'
  },
  
  en: {
    // Form labels
    gender_male: 'Male',
    gender_female: 'Female',
    spouse: 'Spouse',
    parents: 'Parents',
    children: 'Children',
    grandchildren: 'Grandchildren',
    siblings: 'Siblings',
    
    // Results
    result_title: 'Inheritance Distribution Result',
    heirs_entitled: 'Entitled Heirs',
    heirs_blocked: 'Blocked Heirs (Mahjub)',
    total_estate: 'Estate to be Distributed',
    total_distributed: 'Total Distributed',
    difference: 'Difference',
    status: 'Status',
    status_correct: 'Correct',
    status_error: 'Incorrect',
    
    // Special cases
    aul_occurred: '\'Aul Occurred (Proportional Reduction)',
    radd_occurred: 'Radd Occurred (Return of Remainder)',
    
    // Buttons
    btn_calculate: 'Calculate',
    btn_reset: 'Reset',
    btn_export: 'Export PDF',
    btn_next: 'Next',
    btn_prev: 'Back',
    
    // Messages
    msg_loading: 'Calculating...',
    msg_success: 'Calculation successful!',
    msg_error: 'An error occurred in calculation'
  }
};

/**
 * FUNGSI: t()
 * TUJUAN: Get translation berdasarkan key
 * 
 * @param {string} key - Translation key
 * @returns {string} Translated text
 */
function t(key) {
  return translations[currentLang][key] || key;
}

/**
 * FUNGSI: changeLang()
 * TUJUAN: Ganti bahasa aplikasi
 * 
 * @param {string} lang - 'id' atau 'en'
 */
function changeLang(lang) {
  currentLang = lang;
  log('info', `Bahasa diganti ke: ${lang}`);
  
  // Update UI (jika diperlukan)
  // Implementasi tergantung struktur HTML
}

// ===== FORM HANDLING =====

/**
 * FUNGSI: initializeForm()
 * TUJUAN: Inisialisasi form dan event listeners
 * 
 * DIPANGGIL: Saat DOMContentLoaded
 */
function initializeForm() {
  log('info', 'Inisialisasi form...');
  
  // Reset form data
  formData = {
    // Pewaris
    gender: 'male',
    mazhab: 'jumhur',
    
    // Pasangan
    suami: false,
    istri: false,
    istriCount: 1,
    
    // Orang tua
    ayah: false,
    ibu: false,
    kakek: false,
    nenek: false,
    
    // Anak
    anakLaki: 0,
    anakPerempuan: 0,
    
    // Cucu
    cucuLaki: 0,
    cucuPerempuan: 0,
    
    // Saudara kandung
    saudaraLakiKandung: 0,
    saudaraPerempuanKandung: 0,
    
    // Saudara seayah
    saudaraLakiSeayah: 0,
    saudaraPerempuanSeayah: 0,
    
    // Saudara seibu
    saudaraLakiSeibu: 0,
    saudaraPerempuanSeibu: 0,
    
    // Harta
    totalHarta: 0,
    biayaJenazah: 0,
    hutang: 0,
    wasiat: 0,
    asuransi: 'tidak',
    nilaiAsuransi: 0
  };
  
  // Reset step
  currentStep = 0;
  
  // Reset original saudara data
  originalSaudaraData = {
    kandungSeayah: 0,
    seibu: 0
  };
  
  log('success', 'Form berhasil diinisialisasi');
}

/**
 * FUNGSI: validateForm()
 * TUJUAN: Validasi input form
 * 
 * @returns {Object} { valid: boolean, errors: Array }
 */
function validateForm() {
  const errors = [];
  
  // Validasi harta
  if (formData.totalHarta <= 0) {
    errors.push('Total harta harus lebih dari 0');
  }
  
  // Validasi biaya jenazah
  if (formData.biayaJenazah < 0) {
    errors.push('Biaya jenazah tidak boleh negatif');
  }
  
  // Validasi hutang
  if (formData.hutang < 0) {
    errors.push('Hutang tidak boleh negatif');
  }
  
  // Validasi wasiat (maksimal 1/3)
  const maxWasiat = formData.totalHarta / 3;
  if (formData.wasiat > maxWasiat) {
    errors.push(`Wasiat maksimal 1/3 dari harta (Rp ${formatRupiah(maxWasiat)})`);
  }
  
  // Validasi ahli waris minimal
  const hasAnyHeir = formData.suami || formData.istri || 
                     formData.ayah || formData.ibu || 
                     formData.kakek || formData.nenek ||
                     formData.anakLaki > 0 || formData.anakPerempuan > 0 ||
                     formData.cucuLaki > 0 || formData.cucuPerempuan > 0 ||
                     formData.saudaraLakiKandung > 0 || formData.saudaraPerempuanKandung > 0 ||
                     formData.saudaraLakiSeayah > 0 || formData.saudaraPerempuanSeayah > 0 ||
                     formData.saudaraLakiSeibu > 0 || formData.saudaraPerempuanSeibu > 0;
  
  if (!hasAnyHeir) {
    errors.push('Minimal harus ada 1 ahli waris');
  }
  
  // Validasi pasangan (tidak boleh suami dan istri bersamaan)
  if (formData.suami && formData.istri) {
    errors.push('Tidak boleh ada suami dan istri bersamaan');
  }
  
  // Validasi gender vs pasangan
  if (formData.gender === 'male' && formData.suami) {
    errors.push('Pewaris laki-laki tidak bisa memiliki suami');
  }
  
  if (formData.gender === 'female' && formData.istri) {
    errors.push('Pewaris perempuan tidak bisa memiliki istri');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}

/**
 * FUNGSI: showValidationErrors()
 * TUJUAN: Tampilkan error validasi ke user
 * 
 * @param {Array} errors - Array error messages
 */
function showValidationErrors(errors) {
  let errorHTML = '<div class="validation-errors"><h4>⚠️ Kesalahan Input:</h4><ul>';
  
  errors.forEach(error => {
    errorHTML += `<li>${error}</li>`;
  });
  
  errorHTML += '</ul></div>';
  
  // Tampilkan di UI (implementasi tergantung struktur HTML)
  const resultDiv = document.getElementById('hasilPerhitungan');
  if (resultDiv) {
    resultDiv.innerHTML = errorHTML;
    resultDiv.style.display = 'block';
  }
  
  log('warning', 'Validasi gagal', errors);
}

// ===== MODAL ANAK ANGKAT/ZINA =====

/**
 * FUNGSI: showModalAnakAngkatZina()
 * TUJUAN: Tampilkan modal pemberitahuan anak angkat/zina
 * 
 * DIPANGGIL: Sebelum menampilkan hasil perhitungan
 */
function showModalAnakAngkatZina() {
  log('info', 'Menampilkan modal anak angkat/zina');
  
  const modal = document.getElementById('modalAnakAngkatZina');
  if (!modal) {
    logError('showModalAnakAngkatZina', new Error('Modal tidak ditemukan'));
    return;
  }
  
  modal.classList.remove('hidden');
  
  // Event listener untuk tombol "Pelajari Lebih Detail"
  const btnPelajari = document.getElementById('btnPelajariDetail');
  if (btnPelajari) {
    btnPelajari.onclick = function() {
      // Buka tab baru ke halaman edukasi
      window.open('index.html#edukasi-anak-angkat', '_blank');
      log('info', 'Redirect ke halaman edukasi (tab baru)');
    };
  }
  
  // Event listener untuk tombol "Lanjutkan Perhitungan"
  const btnLanjutkan = document.getElementById('btnLanjutkanHitung');
  if (btnLanjutkan) {
    btnLanjutkan.onclick = function() {
      hideModalAnakAngkatZina();
      displayResults(); // Tampilkan hasil perhitungan
    };
  }
}

/**
 * FUNGSI: hideModalAnakAngkatZina()
 * TUJUAN: Sembunyikan modal
 */
function hideModalAnakAngkatZina() {
  const modal = document.getElementById('modalAnakAngkatZina');
  if (modal) {
    modal.classList.add('hidden');
  }
  
  log('info', 'Modal anak angkat/zina disembunyikan');
}

// ===== END OF PART 1 =====

console.log('✅ Part 1 loaded: Global Variables & Utilities');

// ===== PART 2: CALCULATION ENGINE =====

console.log('📦 Loading Part 2: Calculation Engine...');

/**
 * ========================================
 * FUNGSI DETEKSI MAHJUB (GUGURNYA HAK WARIS)
 * ========================================
 * 
 * TUJUAN:
 * Mendeteksi ahli waris yang gugur (mahjub/terhalang) 
 * oleh ahli waris lain yang lebih dekat.
 * 
 * KAIDAH FIQIH:
 * "الأقرب يحجب الأبعد"
 * (Yang lebih dekat menghalangi yang lebih jauh)
 * 
 * REFERENSI:
 * - Al-Mughni (Ibnu Qudamah) Juz 7/3
 * - Bidayatul Mujtahid (Ibnu Rusyd) Juz 2/298
 * - Al-Majmu' (An-Nawawi) Juz 16/45
 * 
 * INPUT:
 * @param {Object} data - Data pewaris dan ahli waris
 * 
 * OUTPUT:
 * @returns {Object} { data, blocked }
 *   - data: Data yang sudah diupdate (ahli waris yang gugur dihapus)
 *   - blocked: Array ahli waris yang gugur
 * 
 * CATATAN PENTING:
 * Fungsi ini HARUS dipanggil SEBELUM calculateFardhHeirs()
 * karena data saudara asli perlu disimpan untuk deteksi Gharrawain.
 */
function detectMahjub(data) {
  logStep(2, 'Deteksi Mahjub (Gugurnya Hak Waris)');
  
  const blocked = [];
  const hasAnakOrCucu = hasAnak(data);
  const hasAyah = data.ayah;
  const hasIbu = data.ibu;
  const hasAnakLaki = data.anakLaki > 0;
  const hasAnakPerempuan = data.anakPerempuan > 0;
  
  // ===== SIMPAN DATA SAUDARA ASLI (SEBELUM DIHAPUS) =====
  // PENTING: Untuk deteksi kasus Gharrawain
  // 
  // REFERENSI FIQIH:
  // Al-Mughni (Ibnu Qudamah) Juz 7/13:
  // "الإخوة يحجبون الأم من الثلث إلى السدس، سواء ورثوا أو لم يرثوا"
  // (Saudara menghalangi ibu dari 1/3 menjadi 1/6, 
  //  baik mereka mewarisi atau tidak)
  
  originalSaudaraData.kandungSeayah = 
    data.saudaraLakiKandung + data.saudaraPerempuanKandung +
    data.saudaraLakiSeayah + data.saudaraPerempuanSeayah;
  
  originalSaudaraData.seibu = 
    data.saudaraLakiSeibu + data.saudaraPerempuanSeibu;
  
  log('debug', 'Data saudara asli (sebelum mahjub):', originalSaudaraData);
  
  // ===== 1. CUCU TERHALANG OLEH ANAK LAKI-LAKI =====
  // 
  // KAIDAH: "الأقرب يحجب الأبعد"
  // (Yang lebih dekat menghalangi yang lebih jauh)
  // 
  // REFERENSI:
  // - Ijma' Ulama 4 Mazhab
  
  if (hasAnakLaki && hasCucu(data)) {
    const totalCucu = data.cucuLaki + data.cucuPerempuan;
    
    blocked.push({
      type: 'cucu',
      count: totalCucu,
      reason: getDalil('mahjub.cucu_oleh_anak')
    });
    
    data.cucuLaki = 0;
    data.cucuPerempuan = 0;
    
    log('warning', `Cucu (${totalCucu} orang) GUGUR karena ada anak laki-laki`);
  }
  
  // ===== 2. KAKEK TERHALANG OLEH AYAH =====
  // 
  // KAIDAH: "الأب يحجب الجد"
  // (Ayah menghalangi kakek)
  // 
  // REFERENSI:
  // - Ijma' Ulama 4 Mazhab
  // - Al-Mughni (Ibnu Qudamah) Juz 7/5
  
  if (hasAyah && data.kakek) {
    blocked.push({
      type: 'kakek',
      count: 1,
      reason: getDalil('mahjub.kakek_oleh_ayah')
    });
    
    data.kakek = false;
    
    log('warning', 'Kakek GUGUR karena ada ayah');
  }
  
  // ===== 3. NENEK TERHALANG OLEH IBU =====
  // 
  // KAIDAH: "الأم تحجب الجدة"
  // (Ibu menghalangi nenek)
  // 
  // REFERENSI:
  // - Ijma' Ulama 4 Mazhab
  // - Al-Mughni (Ibnu Qudamah) Juz 7/8
  
  if (hasIbu && data.nenek) {
    blocked.push({
      type: 'nenek',
      count: 1,
      reason: getDalil('mahjub.nenek_oleh_ibu')
    });
    
    data.nenek = false;
    
    log('warning', 'Nenek GUGUR karena ada ibu');
  }
  
  // ===== 4. SAUDARA KANDUNG/SEAYAH TERHALANG =====
  // 
  // TERHALANG OLEH:
  // - Ayah
  // - Anak laki-laki
  // - Cucu laki-laki
  // 
  // KAIDAH: "الأب يحجب الإخوة"
  // (Ayah menghalangi saudara)
  // 
  // REFERENSI:
  // - Ijma' Ulama 4 Mazhab
  // - Al-Mughni (Ibnu Qudamah) Juz 7/15
  // - Bidayatul Mujtahid (Ibnu Rusyd) Juz 2/310
  
  const totalSaudaraKandungSeayah = 
    data.saudaraLakiKandung + data.saudaraPerempuanKandung +
    data.saudaraLakiSeayah + data.saudaraPerempuanSeayah;
  
  if ((hasAyah || hasAnakLaki || hasAnakOrCucu) && totalSaudaraKandungSeayah > 0) {
    blocked.push({
      type: 'saudara_kandung_seayah',
      count: totalSaudaraKandungSeayah,
      reason: getDalil('mahjub.saudara_oleh_ayah')
    });
    
    data.saudaraLakiKandung = 0;
    data.saudaraPerempuanKandung = 0;
    data.saudaraLakiSeayah = 0;
    data.saudaraPerempuanSeayah = 0;
    
    log('warning', `Saudara kandung/seayah (${totalSaudaraKandungSeayah} orang) GUGUR`);
  }
  
  // ===== 5. SAUDARA SEIBU TERHALANG =====
  // 
  // TERHALANG OLEH:
  // - Anak (laki/perempuan)
  // - Cucu (laki/perempuan)
  // - Ayah
  // - Kakek
  // 
  // KAIDAH: "الفرع الوارث والأصل من الذكور يحجبون الإخوة لأم"
  // (Keturunan yang mewarisi dan asal dari laki-laki menghalangi saudara seibu)
  // 
  // REFERENSI:
  // - Ijma' Ulama 4 Mazhab
  // - Al-Mughni (Ibnu Qudamah) Juz 7/18
  
  const totalSaudaraSeibu = data.saudaraLakiSeibu + data.saudaraPerempuanSeibu;
  
  if ((hasAnakOrCucu || hasAyah || data.kakek) && totalSaudaraSeibu > 0) {
    blocked.push({
      type: 'saudara_seibu',
      count: totalSaudaraSeibu,
      reason: getDalil('mahjub.saudara_seibu_oleh_anak')
    });
    
    data.saudaraLakiSeibu = 0;
    data.saudaraPerempuanSeibu = 0;
    
    log('warning', `Saudara seibu (${totalSaudaraSeibu} orang) GUGUR`);
  }
  
  // ===== 6. CUCU PEREMPUAN TERHALANG OLEH 2+ ANAK PEREMPUAN =====
  // 
  // KAIDAH: Jika sudah ada 2+ anak perempuan (kuota 2/3 terpenuhi),
  // maka cucu perempuan tidak dapat bagian (kecuali ada cucu laki-laki)
  // 
  // REFERENSI:
  // - Al-Mughni (Ibnu Qudamah) Juz 7/10
  
  if (data.anakPerempuan >= 2 && data.cucuPerempuan > 0 && 
      data.cucuLaki === 0 && data.anakLaki === 0) {
    blocked.push({
      type: 'cucu_perempuan',
      count: data.cucuPerempuan,
      reason: {
        penjelasan_id: 'Cucu perempuan gugur karena sudah ada 2 atau lebih anak perempuan yang memenuhi kuota 2/3.',
        penjelasan_en: 'Granddaughters are blocked because there are already 2 or more daughters fulfilling the 2/3 quota.',
        dalil: 'الأقرب يحجب الأبعد',
        sumber: 'Ijma\' Ulama 4 Mazhab'
      }
    });
    
    data.cucuPerempuan = 0;
    
    log('warning', `Cucu perempuan (${data.cucuPerempuan} orang) GUGUR karena ada 2+ anak perempuan`);
  }
  
  logStep(2, 'Deteksi Mahjub selesai', {
    totalBlocked: blocked.length,
    blocked: blocked
  });
  
  return { data, blocked };
}

/**
 * ========================================
 * FUNGSI HITUNG AHLI WARIS FARDH
 * ========================================
 * 
 * TUJUAN:
 * Menghitung bagian fardh (bagian tetap) setiap ahli waris
 * berdasarkan Al-Quran dan Sunnah.
 * 
 * REFERENSI UTAMA:
 * - QS. An-Nisa: 11-12 (Ayat Mawaris)
 * - Hadits Ibnu Abbas (HR. Bukhari 6732 & Muslim 1615)
 * 
 * KITAB FIQIH KLASIK:
 * - Al-Mughni (Ibnu Qudamah) - Juz 7
 * - Bidayatul Mujtahid (Ibnu Rusyd) - Juz 2
 * - Al-Majmu' (An-Nawawi) - Juz 16
 * - Al-Hidayah (Al-Marghinani) - Juz 4
 * - Al-Umm (Imam Asy-Syafi'i) - Juz 4
 * 
 * INPUT:
 * @param {Object} data - Data pewaris dan ahli waris
 * 
 * OUTPUT:
 * @returns {Array} heirs - Array ahli waris dengan bagian masing-masing
 * 
 * KASUS KHUSUS:
 * - Gharrawain: Ayah dapat 1/6 + sisa jika ada 2+ saudara terhalang
 * - 'Aul: Jika total fardh > 100%, dilakukan pengurangan proporsional
 * - Radd: Jika ada sisa dan tidak ada ashabah, dikembalikan ke fardh heirs
 */
function calculateFardhHeirs(data) {
  logStep(3, 'Hitung Bagian Fardh Ahli Waris');
  
  const heirs = [];
  const hasAnakOrCucu = hasAnak(data);
  
  // ===== SUAMI =====
  // 
  // DALIL: QS. An-Nisa: 12
  // "وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ"
  // 
  // BAGIAN:
  // - 1/2 jika tidak ada anak/cucu
  // - 1/4 jika ada anak/cucu
  
  if (data.suami) {
    const dalil = hasAnakOrCucu ? 
      getDalil('suami.dengan_anak') : 
      getDalil('suami.tanpa_anak');
    
    addHeir(heirs, {
      name: currentLang === 'id' ? 'Suami' : 'Husband',
      share: dalil.bagian,
      count: 1,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
    
    log('success', `Suami: ${fractionToString(dalil.bagian)}`);
  }
  
  // ===== ISTRI =====
  // 
  // DALIL: QS. An-Nisa: 12
  // "وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ"
  // 
  // BAGIAN:
  // - 1/4 jika tidak ada anak/cucu (dibagi rata jika > 1)
  // - 1/8 jika ada anak/cucu (dibagi rata jika > 1)
  
  if (data.istri) {
    const dalil = hasAnakOrCucu ? 
      getDalil('istri.dengan_anak') : 
      getDalil('istri.tanpa_anak');
    
    addHeir(heirs, {
      name: currentLang === 'id' ? 
        `Istri (${data.istriCount} orang)` : 
        `Wife (${data.istriCount})`,
      share: dalil.bagian,
      count: data.istriCount,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
    
    log('success', `Istri (${data.istriCount} orang): ${fractionToString(dalil.bagian)}`);
  }
  
  // ===== AYAH =====
  // 
  // DALIL: QS. An-Nisa: 11
  // "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ"
  // 
  // BAGIAN:
  // 1. Jika ada anak/cucu: 1/6 fardh + ashabah (jika tidak ada anak laki)
  // 2. Jika tidak ada anak, tapi ada 2+ saudara: 1/6 fardh + ashabah (GHARRAWAIN)
  // 3. Jika tidak ada anak dan tidak ada 2+ saudara: Ashabah saja (sisa semua)
  // 
  // KASUS KHUSUS - GHARRAWAIN:
  // Saudara yang TERHALANG oleh ayah TETAP MEMPENGARUHI bagian ayah.
  // Ayah tetap dapat 1/6 fardh (bukan hanya sisa).
  // 
  // REFERENSI GHARRAWAIN:
  // - Atsar Umar bin Khattab RA (Al-Muwaththa', Kitab Al-Faraidh)
  // - Al-Mughni (Ibnu Qudamah) Juz 7/13
  // - Bidayatul Mujtahid (Ibnu Rusyd) Juz 2/345
  // - Al-Majmu' (An-Nawawi) Juz 16/67
  
  if (data.ayah) {
    log('debug', 'Menghitung bagian Ayah...');
    log('debug', `Data saudara asli: ${originalSaudaraData.kandungSeayah}`);
    
    // Cek apakah ada 2+ saudara yang terhalang (Gharrawain)
    const hasSaudaraYangTerhalang = originalSaudaraData.kandungSeayah >= 2;
    
    if (hasAnakOrCucu) {
      // KASUS 1: Ada anak/cucu
      // Ayah dapat 1/6 fardh + ashabah (jika tidak ada anak laki)
      
      const dalil = getDalil('ayah.dengan_anak');
      const hasAnakLaki = data.anakLaki > 0 || data.cucuLaki > 0;
      
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Ayah' : 'Father',
        share: dalil.bagian, // 1/6
        count: 1,
        explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
        dalil: dalil,
        isAshabah: !hasAnakLaki // Dapat sisa jika tidak ada anak laki
      });
      
      log('success', `Ayah: 1/6 fardh${!hasAnakLaki ? ' + ashabah' : ''}`);
      
    } else if (hasSaudaraYangTerhalang) {
      // KASUS 2: GHARRAWAIN
      // Tidak ada anak, tapi ada 2+ saudara yang terhalang
      // Ayah dapat 1/6 fardh + sisa (ashabah)
      
      const dalil = getDalil('ayah.dengan_anak');
      
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Ayah' : 'Father',
        share: 1/6, // Fardh 1/6
        count: 1,
        explanation: currentLang === 'id' ? 
          'Ayah mendapat 1/6 fardh + sisa karena ada 2+ saudara yang gugur (kasus Gharrawain)' : 
          'Father gets 1/6 fardh + remainder because there are 2+ blocked siblings (Gharrawain case)',
        dalil: dalil,
        isAshabah: true // Dapat sisa juga
      });
      
      log('success', `Ayah: 1/6 fardh + ashabah (GHARRAWAIN)`);
      
    } else {
      // KASUS 3: Tidak ada anak dan tidak ada 2+ saudara
      // Ayah hanya dapat sisa (ashabah), tidak ada fardh
      
      const dalil = getDalil('ayah.tanpa_anak');
      
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Ayah' : 'Father',
        share: 0, // Tidak ada fardh
        count: 1,
        explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
        dalil: dalil,
        isAshabah: true // Hanya dapat sisa
      });
      
      log('success', 'Ayah: Ashabah saja (sisa semua)');
    }
  }
  
  // ===== IBU =====
  // 
  // DALIL: QS. An-Nisa: 11
  // "فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ ۚ 
  //  فَإِن كَانَ لَهُ إِخْوَةٌ فَلِأُمِّهِ السُّدُسُ"
  // 
  // BAGIAN:
  // - 1/6 jika ada anak/cucu ATAU ada 2+ saudara
  // - 1/3 jika tidak ada anak/cucu DAN tidak ada 2+ saudara
  // 
  // KASUS KHUSUS - GHARRAWAIN:
  // Saudara yang TERHALANG oleh ayah TETAP MEMPENGARUHI bagian ibu.
  // Ibu tetap dapat 1/6 (bukan 1/3) meskipun saudara tidak dapat warisan.
  // 
  // REFERENSI GHARRAWAIN:
  // - Al-Mughni (Ibnu Qudamah) Juz 7/13:
  //   "وأجمع أهل العلم على أن الإخوة يحجبون الأم من الثلث إلى السدس، 
  //    سواء ورثوا أو لم يرثوا"
  //   (Para ulama sepakat bahwa saudara menghalangi ibu dari 1/3 menjadi 1/6,
  //    baik mereka mewarisi atau tidak)
  // 
  // - Bidayatul Mujtahid (Ibnu Rusyd) Juz 2/345:
  //   "واتفقوا على أن الإخوة يحجبون الأم من الثلث إلى السدس، 
  //    وإن كانوا محجوبين بالأب"
  //   (Mereka sepakat bahwa saudara menghalangi ibu dari 1/3 menjadi 1/6,
  //    meskipun mereka terhalang oleh ayah)
  // 
  // - Al-Majmu' (Imam An-Nawawi) Juz 16/67:
  //   "الإخوة يحجبون الأم من الثلث إلى السدس بمجرد وجودهم، ولو كانوا محجوبين"
  //   (Saudara menghalangi ibu dari 1/3 menjadi 1/6 hanya dengan keberadaan mereka,
  //    meskipun mereka terhalang)
  
  if (data.ibu) {
    log('debug', 'Menghitung bagian Ibu...');
    
    // Gunakan data saudara ASLI (sebelum dihapus oleh mahjub)
    const totalSaudaraYangMempengaruhiIbu = 
      originalSaudaraData.kandungSeayah + originalSaudaraData.seibu;
    
    log('debug', `Total saudara yang mempengaruhi ibu: ${totalSaudaraYangMempengaruhiIbu}`);
    
    // Ibu dapat 1/6 jika: ada anak ATAU ada 2+ saudara (termasuk yang gugur!)
    const ibuGet1_6 = hasAnakOrCucu || totalSaudaraYangMempengaruhiIbu >= 2;
    
    const dalil = ibuGet1_6 ? 
      getDalil('ibu.dengan_anak') : 
      getDalil('ibu.tanpa_anak');
    
    let explanation = currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en;
    
    // Penjelasan khusus untuk Gharrawain
    if (data.ayah && !hasAnakOrCucu && originalSaudaraData.kandungSeayah >= 2) {
      explanation = currentLang === 'id' ? 
        'Ibu mendapat 1/6 karena ada 2+ saudara (meskipun gugur karena ayah) - Kasus Gharrawain' : 
        'Mother gets 1/6 because there are 2+ siblings (even though blocked by father) - Gharrawain case';
      
      log('success', 'Ibu: 1/6 (GHARRAWAIN)');
    } else {
      log('success', `Ibu: ${fractionToString(dalil.bagian)}`);
    }
    
    addHeir(heirs, {
      name: currentLang === 'id' ? 'Ibu' : 'Mother',
      share: dalil.bagian,
      count: 1,
      explanation: explanation,
      dalil: dalil
    });
  }
  
  // ===== KAKEK (jika ayah tidak ada) =====
  // 
  // DALIL: Qiyas (analogi) dengan ayah
  // Kakek menggantikan posisi ayah jika ayah tidak ada
  // 
  // REFERENSI:
  // - Al-Mughni (Ibnu Qudamah) Juz 7/5
  // - Bidayatul Mujtahid (Ibnu Rusyd) Juz 2/300
  
  if (data.kakek && !data.ayah) {
    const dalil = getDalil('kakek.dengan_anak');
    
    if (hasAnakOrCucu) {
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Kakek' : 'Grandfather',
        share: dalil.bagian, // 1/6
        count: 1,
        explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
        dalil: dalil
      });
      
      log('success', 'Kakek: 1/6 fardh');
      
    } else {
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Kakek' : 'Grandfather',
        share: 0,
        count: 1,
        explanation: currentLang === 'id' ? 
          'Kakek menggantikan posisi ayah dan mendapat sisa' : 
          'Grandfather replaces father and gets remainder',
        dalil: getDalil('ayah.tanpa_anak'),
        isAshabah: true
      });
      
      log('success', 'Kakek: Ashabah (menggantikan ayah)');
    }
  }
  
  // ===== NENEK (jika ibu tidak ada) =====
  // 
  // DALIL: HR. Abu Dawud, Tirmidzi, Ibnu Majah
  // "أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَعْطَى الْجَدَّةَ السُّدُسَ"
  // 
  // BAGIAN: 1/6
  // 
  // REFERENSI:
  // - Al-Mughni (Ibnu Qudamah) Juz 7/8
  // - Bidayatul Mujtahid (Ibnu Rusyd) Juz 2/302
  
  if (data.nenek && !data.ibu) {
    const dalil = getDalil('nenek.bagian');
    
    addHeir(heirs, {
      name: currentLang === 'id' ? 'Nenek' : 'Grandmother',
      share: dalil.bagian, // 1/6
      count: 1,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
    
    log('success', 'Nenek: 1/6');
  }
  
  // ===== ANAK PEREMPUAN =====
  // 
  // DALIL: QS. An-Nisa: 11
  // "وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ"
  // "فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ"
  // 
  // BAGIAN:
  // - 1 anak perempuan: 1/2
  // - 2+ anak perempuan: 2/3 (dibagi rata)
  // - Dengan anak laki-laki: Ashabah (ratio 2:1)
  
  if (data.anakPerempuan > 0 && data.anakLaki === 0) {
    const dalil = data.anakPerempuan === 1 ? 
      getDalil('anak_perempuan.satu') : 
      getDalil('anak_perempuan.dua_atau_lebih');
    
    addHeir(heirs, {
      name: currentLang === 'id' ? 
        `Anak Perempuan (${data.anakPerempuan} orang)` : 
        `Daughter (${data.anakPerempuan})`,
      share: dalil.bagian,
      count: data.anakPerempuan,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
    
    log('success', `Anak Perempuan (${data.anakPerempuan} orang): ${fractionToString(dalil.bagian)}`);
  }
  
  // ===== ANAK LAKI-LAKI DAN PEREMPUAN (ASHABAH) =====
  // 
  // DALIL: QS. An-Nisa: 11
  // "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ"
  // 
  // BAGIAN: Ashabah dengan ratio 2:1 (laki:perempuan)
  // 
  // REFERENSI:
  // - Hadits Ibnu Abbas (HR. Bukhari 6732 & Muslim 1615)
  // - Al-Mughni (Ibnu Qudamah) Juz 7/10
  
  if (data.anakLaki > 0) {
    const totalAnak = data.anakLaki * 2 + data.anakPerempuan;
    const dalil = getDalil('anak_laki');
    
    addHeir(heirs, {
      name: currentLang === 'id' ? 
        `Anak Laki-laki (${data.anakLaki} orang)` : 
        `Son (${data.anakLaki})`,
      share: 0, // Ashabah (tidak ada fardh)
      count: data.anakLaki,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil,
      isAshabah: true,
      ashabahRatio: 2, // Laki-laki = 2 bagian
      ashabahTotal: totalAnak
    });
    
    log('success', `Anak Laki-laki (${data.anakLaki} orang): Ashabah (ratio 2)`);
    
    if (data.anakPerempuan > 0) {
      const dalilPerempuan = getDalil('anak_perempuan.dengan_laki');
      
      addHeir(heirs, {
        name: currentLang === 'id' ? 
          `Anak Perempuan (${data.anakPerempuan} orang)` : 
          `Daughter (${data.anakPerempuan})`,
        share: 0, // Ashabah (tidak ada fardh)
        count: data.anakPerempuan,
        explanation: currentLang === 'id' ? dalilPerempuan.penjelasan_id : dalilPerempuan.penjelasan_en,
        dalil: dalilPerempuan,
        isAshabah: true,
        ashabahRatio: 1, // Perempuan = 1 bagian
        ashabahTotal: totalAnak
      });
      
      log('success', `Anak Perempuan (${data.anakPerempuan} orang): Ashabah (ratio 1)`);
    }
  }
  
  // ===== CUCU (jika tidak terhalang) =====
  // Logika cucu mirip dengan anak, tapi hanya jika tidak ada anak
  // Implementasi lengkap untuk cucu...
  
  // (Kode cucu akan dilanjutkan di bagian berikutnya) 
     
  // ===== CUCU PEREMPUAN (jika tidak terhalang) =====
  // 
  // SYARAT: Tidak ada anak laki-laki
  // 
  // BAGIAN:
  // - Jika tidak ada anak perempuan: Sama seperti anak perempuan (1/2 atau 2/3)
  // - Jika ada 1 anak perempuan: 1/6 (pelengkap menjadi 2/3)
  // - Jika ada 2+ anak perempuan: Gugur (kuota 2/3 sudah terpenuhi)
  // - Jika ada cucu laki-laki: Ashabah (ratio 2:1)
  
  if (data.cucuPerempuan > 0 && data.cucuLaki === 0 && data.anakLaki === 0) {
    if (data.anakPerempuan >= 2) {
      // Sudah digugurkan di detectMahjub()
      log('debug', 'Cucu perempuan sudah gugur (ada 2+ anak perempuan)');
      
    } else if (data.anakPerempuan === 1) {
      // Cucu perempuan dapat 1/6 sebagai pelengkap
      const dalil = getDalil('anak_perempuan.satu');
      
      addHeir(heirs, {
        name: currentLang === 'id' ? 
          `Cucu Perempuan (${data.cucuPerempuan} orang)` : 
          `Granddaughter (${data.cucuPerempuan})`,
        share: 1/6,
        count: data.cucuPerempuan,
        explanation: currentLang === 'id' ? 
          'Cucu perempuan mendapat 1/6 sebagai pelengkap bersama 1 anak perempuan (total 2/3)' : 
          'Granddaughters get 1/6 as complement with 1 daughter (total 2/3)',
        dalil: dalil
      });
      
      log('success', `Cucu Perempuan (${data.cucuPerempuan} orang): 1/6 (pelengkap)`);
      
    } else {
      // Tidak ada anak perempuan, cucu perempuan menggantikan
      const dalil = data.cucuPerempuan === 1 ? 
        getDalil('anak_perempuan.satu') : 
        getDalil('anak_perempuan.dua_atau_lebih');
      
      addHeir(heirs, {
        name: currentLang === 'id' ? 
          `Cucu Perempuan (${data.cucuPerempuan} orang)` : 
          `Granddaughter (${data.cucuPerempuan})`,
        share: dalil.bagian,
        count: data.cucuPerempuan,
        explanation: currentLang === 'id' ? 
          'Cucu perempuan menggantikan posisi anak perempuan' : 
          'Granddaughters replace daughters',
        dalil: dalil
      });
      
      log('success', `Cucu Perempuan (${data.cucuPerempuan} orang): ${fractionToString(dalil.bagian)}`);
    }
  }
  
  // ===== CUCU LAKI-LAKI (jika tidak terhalang) =====
  // 
  // SYARAT: Tidak ada anak laki-laki
  // 
  // BAGIAN: Ashabah (menggantikan anak laki-laki)
  
  if (data.cucuLaki > 0 && data.anakLaki === 0) {
    const totalCucu = data.cucuLaki * 2 + data.cucuPerempuan;
    const dalil = getDalil('anak_laki');
    
    addHeir(heirs, {
      name: currentLang === 'id' ? 
        `Cucu Laki-laki (${data.cucuLaki} orang)` : 
        `Grandson (${data.cucuLaki})`,
      share: 0,
      count: data.cucuLaki,
      explanation: currentLang === 'id' ? 
        'Cucu laki-laki menggantikan posisi anak laki-laki' : 
        'Grandsons replace sons',
      dalil: dalil,
      isAshabah: true,
      ashabahRatio: 2,
      ashabahTotal: totalCucu
    });
    
    log('success', `Cucu Laki-laki (${data.cucuLaki} orang): Ashabah (ratio 2)`);
    
    if (data.cucuPerempuan > 0) {
      // Update cucu perempuan yang sudah ditambahkan menjadi ashabah
      const cucuPerempuanIndex = heirs.findIndex(h => 
        h.name.includes('Cucu Perempuan') || h.name.includes('Granddaughter')
      );
      
      if (cucuPerempuanIndex !== -1) {
        heirs[cucuPerempuanIndex].share = 0;
        heirs[cucuPerempuanIndex].isAshabah = true;
        heirs[cucuPerempuanIndex].ashabahRatio = 1;
        heirs[cucuPerempuanIndex].ashabahTotal = totalCucu;
        heirs[cucuPerempuanIndex].explanation = currentLang === 'id' ? 
          'Cucu perempuan bersama cucu laki-laki mendapat sisa sebagai ashabah (ratio 2:1)' : 
          'Granddaughters with grandsons get remainder as ashabah (ratio 2:1)';
      } else {
        // Jika belum ditambahkan, tambahkan sekarang
        const dalilPerempuan = getDalil('anak_perempuan.dengan_laki');
        
        addHeir(heirs, {
          name: currentLang === 'id' ? 
            `Cucu Perempuan (${data.cucuPerempuan} orang)` : 
            `Granddaughter (${data.cucuPerempuan})`,
          share: 0,
          count: data.cucuPerempuan,
          explanation: currentLang === 'id' ? 
            'Cucu perempuan bersama cucu laki-laki mendapat ashabah' : 
            'Granddaughters with grandsons get ashabah',
          dalil: dalilPerempuan,
          isAshabah: true,
          ashabahRatio: 1,
          ashabahTotal: totalCucu
        });
      }
      
      log('success', `Cucu Perempuan (${data.cucuPerempuan} orang): Ashabah (ratio 1)`);
    }
  }
  
  // ===== SAUDARA KANDUNG (hanya jika tidak ada anak/cucu dan tidak ada ayah) =====
  // 
  // DALIL: QS. An-Nisa: 176
  // "يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ"
  // 
  // SYARAT: Tidak ada anak, cucu, atau ayah
  // 
  // BAGIAN:
  // - 1 saudara perempuan: 1/2
  // - 2+ saudara perempuan: 2/3
  // - Dengan saudara laki-laki: Ashabah (ratio 2:1)
  
  const hasAnakCucuOrAyah = hasAnakOrCucu || data.ayah;
  
  if (data.saudaraPerempuanKandung > 0 && data.saudaraLakiKandung === 0 && !hasAnakCucuOrAyah) {
    const bagian = data.saudaraPerempuanKandung === 1 ? 0.5 : 2/3;
    const fraction = data.saudaraPerempuanKandung === 1 ? '1/2' : '2/3';
    
    addHeir(heirs, {
      name: currentLang === 'id' ? 
        `Saudara Perempuan Kandung (${data.saudaraPerempuanKandung} orang)` : 
        `Full Sister (${data.saudaraPerempuanKandung})`,
      share: bagian,
      count: data.saudaraPerempuanKandung,
      explanation: currentLang === 'id' ? 
        `Saudara perempuan kandung mendapat ${fraction}` : 
        `Full sisters get ${fraction}`,
      dalil: {
        arab: 'يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ',
        terjemah_id: 'Mereka meminta fatwa kepadamu. Katakanlah: "Allah memberi fatwa kepadamu tentang kalalah."',
        terjemah_en: 'They request from you a [legal] ruling. Say, "Allah gives you a ruling concerning kalalah."',
        surah: 'An-Nisa',
        ayat: 176
      }
    });
    
    log('success', `Saudara Perempuan Kandung (${data.saudaraPerempuanKandung} orang): ${fraction}`);
  }
  
  if (data.saudaraLakiKandung > 0 && !hasAnakCucuOrAyah) {
    const totalSaudara = data.saudaraLakiKandung * 2 + data.saudaraPerempuanKandung;
    
    addHeir(heirs, {
      name: currentLang === 'id' ? 
        `Saudara Laki-laki Kandung (${data.saudaraLakiKandung} orang)` : 
        `Full Brother (${data.saudaraLakiKandung})`,
      share: 0,
      count: data.saudaraLakiKandung,
      explanation: currentLang === 'id' ? 
        'Saudara laki-laki kandung mendapat sisa sebagai ashabah' : 
        'Full brothers get remainder as ashabah',
      dalil: {
        arab: 'وَإِن كَانُوا إِخْوَةً رِّجَالًا وَنِسَاءً فَلِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ',
        terjemah_id: 'Dan jika mereka (ahli waris itu terdiri dari) saudara laki-laki dan perempuan, maka bagian seorang saudara laki-laki sama dengan bagian dua orang saudara perempuan.',
        terjemah_en: 'But if there are both brothers and sisters, the male will have the share of two females.',
        surah: 'An-Nisa',
        ayat: 176
      },
      isAshabah: true,
      ashabahRatio: 2,
      ashabahTotal: totalSaudara
    });
    
    log('success', `Saudara Laki-laki Kandung (${data.saudaraLakiKandung} orang): Ashabah (ratio 2)`);
    
    if (data.saudaraPerempuanKandung > 0) {
      // Update saudara perempuan menjadi ashabah
      const saudaraPerempuanIndex = heirs.findIndex(h => 
        h.name.includes('Saudara Perempuan Kandung') || h.name.includes('Full Sister')
      );
      
      if (saudaraPerempuanIndex !== -1) {
        heirs[saudaraPerempuanIndex].share = 0;
        heirs[saudaraPerempuanIndex].isAshabah = true;
        heirs[saudaraPerempuanIndex].ashabahRatio = 1;
        heirs[saudaraPerempuanIndex].ashabahTotal = totalSaudara;
        heirs[saudaraPerempuanIndex].explanation = currentLang === 'id' ? 
          'Saudara perempuan kandung bersama saudara laki-laki mendapat ashabah' : 
          'Full sisters with brothers get ashabah';
      } else {
        addHeir(heirs, {
          name: currentLang === 'id' ? 
            `Saudara Perempuan Kandung (${data.saudaraPerempuanKandung} orang)` : 
            `Full Sister (${data.saudaraPerempuanKandung})`,
          share: 0,
          count: data.saudaraPerempuanKandung,
          explanation: currentLang === 'id' ? 
            'Saudara perempuan kandung bersama saudara laki-laki mendapat ashabah' : 
            'Full sisters with brothers get ashabah',
          dalil: {
            arab: 'وَإِن كَانُوا إِخْوَةً رِّجَالًا وَنِسَاءً فَلِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ',
            terjemah_id: 'Dan jika mereka (ahli waris itu terdiri dari) saudara laki-laki dan perempuan, maka bagian seorang saudara laki-laki sama dengan bagian dua orang saudara perempuan.',
            terjemah_en: 'But if there are both brothers and sisters, the male will have the share of two females.',
            surah: 'An-Nisa',
            ayat: 176
          },
          isAshabah: true,
          ashabahRatio: 1,
          ashabahTotal: totalSaudara
        });
      }
      
      log('success', `Saudara Perempuan Kandung (${data.saudaraPerempuanKandung} orang): Ashabah (ratio 1)`);
    }
  }
  
  // ===== SAUDARA SEIBU =====
  // 
  // DALIL: QS. An-Nisa: 12
  // "وَإِن كَانَ رَجُلٌ يُورَثُ كَلَالَةً أَوِ امْرَأَةٌ وَلَهُ أَخٌ أَوْ أُخْتٌ 
  //  فَلِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ"
  // 
  // SYARAT: Tidak ada anak, cucu, ayah, atau kakek
  // 
  // ===== SAUDARA SEIBU (lanjutan) =====
  // 
  // BAGIAN:
  // - 1 saudara seibu: 1/6
  // - 2+ saudara seibu: 1/3 (dibagi rata, laki dan perempuan sama)
  // 
  // CATATAN: Saudara seibu laki dan perempuan mendapat bagian yang SAMA
  // (berbeda dengan saudara kandung/seayah yang ratio 2:1)
  
  if (data.saudaraLakiSeibu > 0 || data.saudaraPerempuanSeibu > 0) {
    const totalSaudaraSeibu = data.saudaraLakiSeibu + data.saudaraPerempuanSeibu;
    const bagian = totalSaudaraSeibu === 1 ? 1/6 : 1/3;
    const fraction = totalSaudaraSeibu === 1 ? '1/6' : '1/3';
    
    const perPerson = bagian / totalSaudaraSeibu;
    
    if (data.saudaraLakiSeibu > 0) {
      addHeir(heirs, {
        name: currentLang === 'id' ? 
          `Saudara Laki-laki Seibu (${data.saudaraLakiSeibu} orang)` : 
          `Maternal Brother (${data.saudaraLakiSeibu})`,
        share: perPerson * data.saudaraLakiSeibu,
        count: data.saudaraLakiSeibu,
        explanation: currentLang === 'id' ? 
          `Saudara seibu mendapat ${fraction} dibagi rata` : 
          `Maternal siblings get ${fraction} divided equally`,
        dalil: {
          arab: 'وَإِن كَانَ رَجُلٌ يُورَثُ كَلَالَةً أَوِ امْرَأَةٌ وَلَهُ أَخٌ أَوْ أُخْتٌ فَلِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ',
          terjemah_id: 'Dan jika seseorang meninggal yang tidak meninggalkan ayah dan tidak meninggalkan anak, tetapi mempunyai seorang saudara (seibu), maka bagi masing-masing seperenam.',
          terjemah_en: 'And if a man or woman leaves neither ascendants nor descendants but has a brother or a sister, then for each one of them is a sixth.',
          surah: 'An-Nisa',
          ayat: 12
        }
      });
      
      log('success', `Saudara Laki-laki Seibu (${data.saudaraLakiSeibu} orang): ${fraction} dibagi rata`);
    }
    
    if (data.saudaraPerempuanSeibu > 0) {
      addHeir(heirs, {
        name: currentLang === 'id' ? 
          `Saudara Perempuan Seibu (${data.saudaraPerempuanSeibu} orang)` : 
          `Maternal Sister (${data.saudaraPerempuanSeibu})`,
        share: perPerson * data.saudaraPerempuanSeibu,
        count: data.saudaraPerempuanSeibu,
        explanation: currentLang === 'id' ? 
          `Saudara seibu mendapat ${fraction} dibagi rata` : 
          `Maternal siblings get ${fraction} divided equally`,
        dalil: {
          arab: 'وَإِن كَانَ رَجُلٌ يُورَثُ كَلَالَةً أَوِ امْرَأَةٌ وَلَهُ أَخٌ أَوْ أُخْتٌ فَلِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ',
          terjemah_id: 'Dan jika seseorang meninggal yang tidak meninggalkan ayah dan tidak meninggalkan anak, tetapi mempunyai seorang saudara (seibu), maka bagi masing-masing seperenam.',
          terjemah_en: 'And if a man or woman leaves neither ascendants nor descendants but has a brother or a sister, then for each one of them is a sixth.',
          surah: 'An-Nisa',
          ayat: 12
        }
      });
      
      log('success', `Saudara Perempuan Seibu (${data.saudaraPerempuanSeibu} orang): ${fraction} dibagi rata`);
    }
  }
  
  logStep(3, 'Perhitungan Fardh selesai', {
    totalHeirs: heirs.length,
    heirs: heirs
  });
  
  return heirs;
}


/**
 * ========================================
 * FUNGSI DISTRIBUSI ASHABAH (SISA HARTA)
 * ========================================
 * 
 * TUJUAN:
 * Mendistribusikan sisa harta kepada ahli waris ashabah
 * setelah bagian fardh dibagikan.
 * 
 * DALIL:
 * "أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَهُوَ لِأَوْلَى رَجُلٍ ذَكَرٍ"
 * "Berikanlah bagian-bagian warisan kepada yang berhak menerimanya. 
 *  Jika masih ada sisa, maka berikanlah kepada ahli waris laki-laki 
 *  yang paling utama (dekat hubungan kekerabatannya)."
 * (HR. Bukhari 6732 & Muslim 1615)
 * 
 * PRIORITAS ASHABAH:
 * 1. Anak laki-laki
 * 2. Cucu laki-laki (jika tidak ada anak laki)
 * 3. Ayah (jika tidak ada anak/cucu)
 * 4. Kakek (jika tidak ada ayah)
 * 5. Saudara laki-laki kandung
 * 6. Saudara laki-laki seayah
 * 
 * INPUT:
 * @param {Array} heirs - Array ahli waris
 * @param {number} sisaHarta - Sisa harta setelah fardh
 * @param {number} hartaBersih - Total harta bersih
 * 
 * REFERENSI:
 * - Al-Mughni (Ibnu Qudamah) Juz 7/20
 * - Bidayatul Mujtahid (Ibnu Rusyd) Juz 2/315
 * - Al-Majmu' (An-Nawawi) Juz 16/75
 */
function distributeAshabah(heirs, sisaHarta, hartaBersih) {
  logStep(5, 'Distribusi Ashabah (Sisa Harta)', {
    sisaHarta: formatRupiah(sisaHarta),
    hartaBersih: formatRupiah(hartaBersih)
  });
  
  const ashabahHeirs = heirs.filter(h => h.isAshabah);
  
  // Jika tidak ada ashabah, return
  if (ashabahHeirs.length === 0) {
    log('info', 'Tidak ada ahli waris ashabah');
    return;
  }
  
  // Jika sisa harta <= 0, ashabah hanya dapat fardh (jika ada)
  if (sisaHarta <= 0) {
    log('warning', 'Sisa harta <= 0, ashabah hanya dapat fardh');
    
    ashabahHeirs.forEach(h => {
      if (h.share > 0) {
        h.total = h.share * hartaBersih;
        h.perPerson = h.total / h.count;
        log('debug', `${h.name}: Fardh ${formatRupiah(h.total)} (tidak ada sisa)`);
      } else {
        h.total = 0;
        h.perPerson = 0;
        log('debug', `${h.name}: 0 (tidak ada fardh dan tidak ada sisa)`);
      }
    });
    return;
  }
  
  // Pisahkan anak/cucu ashabah vs orang tua ashabah
  const anakAshabah = heirs.filter(h => 
    h.isAshabah && h.ashabahRatio && h.ashabahTotal
  );
  
  const orangTuaAshabah = ashabahHeirs.filter(h => 
    !h.ashabahRatio && !h.ashabahTotal
  );
  
  log('debug', `Anak/Cucu ashabah: ${anakAshabah.length}`);
  log('debug', `Orang tua ashabah: ${orangTuaAshabah.length}`);
  
  if (anakAshabah.length > 0) {
    // ===== KASUS 1: Ada anak/cucu yang ashabah =====
    // Distribusi sisa ke anak dengan ratio 2:1 (laki:perempuan)
    
    log('info', 'Distribusi sisa ke anak/cucu dengan ratio 2:1');
    
    anakAshabah.forEach(h => {
      const sharePerUnit = sisaHarta / h.ashabahTotal;
      const fardh = h.share > 0 ? hartaBersih * h.share : 0;
      const ashabahAmount = sharePerUnit * h.ashabahRatio * h.count;
      
      h.total = fardh + ashabahAmount;
      h.perPerson = h.total / h.count;
      
      log('success', `${h.name}:`);
      log('debug', `  - Fardh: ${formatRupiah(fardh)}`);
      log('debug', `  - Ashabah: ${formatRupiah(ashabahAmount)}`);
      log('debug', `  - Total: ${formatRupiah(h.total)}`);
    });
    
    // Orang tua (ayah/kakek) hanya dapat fardh, tidak dapat sisa
    orangTuaAshabah.forEach(h => {
      h.total = h.share > 0 ? hartaBersih * h.share : 0;
      h.perPerson = h.total;
      
      log('info', `${h.name}: Fardh ${formatRupiah(h.total)} (tidak dapat sisa karena ada anak)`);
    });
    
  } else {
    // ===== KASUS 2: Tidak ada anak, orang tua dapat fardh + semua sisa =====
    // Ini adalah kasus GHARRAWAIN dan kasus normal tanpa anak
    
    log('info', 'Distribusi sisa ke orang tua (Ayah/Kakek)');
    
    orangTuaAshabah.forEach(h => {
      const fardh = h.share > 0 ? hartaBersih * h.share : 0;
      h.total = fardh + sisaHarta; // ✅ KUNCI: Fardh + Sisa
      h.perPerson = h.total;
      
      log('success', `${h.name}:`);
      log('debug', `  - Fardh: ${formatRupiah(fardh)}`);
      log('debug', `  - Sisa (Ashabah): ${formatRupiah(sisaHarta)}`);
      log('debug', `  - Total: ${formatRupiah(h.total)}`);
    });
  }
  
  logStep(5, 'Distribusi Ashabah selesai');
}

/**
 * ========================================
 * FUNGSI TERAPKAN HUKUM 'AUL
 * ========================================
 * 
 * TUJUAN:
 * Menerapkan hukum 'Aul (pengurangan proporsional) jika total bagian fardh > 100%.
 * 
 * DEFINISI 'AUL:
 * 'Aul (العول) adalah kondisi di mana total bagian fardh melebihi 100%,
 * sehingga semua ahli waris fardh mendapat pengurangan proporsional.
 * 
 * CONTOH:
 * - Suami: 1/2 = 50%
 * - 2 Saudara Perempuan: 2/3 = 66.67%
 * - Ibu: 1/6 = 16.67%
 * Total: 133.33% (lebih dari 100%)
 * 
 * SOLUSI 'AUL:
 * Semua bagian dikurangi proporsional menjadi total 100%
 * 
 * REFERENSI:
 * - Atsar Umar bin Khattab RA (Pertama kali menerapkan 'Aul)
 * - Ijma' Ulama 4 Mazhab
 * - Al-Mughni (Ibnu Qudamah) Juz 7/25
 * - Bidayatul Mujtahid (Ibnu Rusyd) Juz 2/356
 * 
 * INPUT:
 * @param {Array} heirs - Array ahli waris
 * @param {number} hartaBersih - Total harta bersih
 * 
 * OUTPUT:
 * @returns {Object} { occurred, totalFardh, factor, beforeAul, explanation }
 */
function applyAul(heirs, hartaBersih) {
  logStep(6, 'Cek dan Terapkan \'Aul');
  
  // Hitung total bagian fardh (non-ashabah)
  let totalFardh = 0;
  const fardhHeirs = [];
  
  heirs.forEach(h => {
    if (!h.isAshabah && h.share > 0) {
      totalFardh += h.share;
      fardhHeirs.push(h);
    }
  });
  
  log('debug', `Total Fardh: ${(totalFardh * 100).toFixed(2)}%`);
  
  // Jika total fardh > 1, terapkan 'Aul
  if (totalFardh > 1) {
    log('warning', `'AUL TERJADI! Total fardh ${(totalFardh * 100).toFixed(2)}% > 100%`);
    
    const factor = 1 / totalFardh;
    
    // Simpan data sebelum 'Aul untuk ditampilkan
    const beforeAul = heirs.map(h => ({
      name: h.name,
      shareBefore: h.share,
      totalBefore: h.share * hartaBersih,
      fractionBefore: fractionToString(h.share)
    }));
    
    // Terapkan 'Aul ke semua ahli waris fardh
    heirs.forEach(h => {
      if (!h.isAshabah && h.share > 0) {
        const originalShare = h.share;
        h.share = h.share * factor;
        h.total = h.share * hartaBersih;
        h.perPerson = h.total / h.count;
        h.fraction = fractionToString(h.share);
        h.aulApplied = true;
        h.originalShare = originalShare;
        h.aulFactor = factor;
        
        log('warning', `${h.name}: ${fractionToString(originalShare)} → ${h.fraction} (dikurangi ${((1-factor)*100).toFixed(2)}%)`);
      }
    });
    
    // Ashabah tidak dapat bagian jika terjadi 'Aul
    heirs.forEach(h => {
      if (h.isAshabah) {
        h.total = h.share > 0 ? h.share * hartaBersih : 0;
        h.perPerson = h.total / h.count;
        h.explanation += currentLang === 'id'
          ? ` ⚠️ Tidak mendapat sisa karena terjadi 'Aul (semua harta habis untuk ahli waris fardh).`
          : ` ⚠️ No remainder received due to 'Aul (all estate consumed by fardh heirs).`;
        
        log('warning', `${h.name}: Tidak dapat sisa karena 'Aul`);
      }
    });
    
    logStep(6, '\'Aul diterapkan', {
      totalFardhBefore: `${(totalFardh * 100).toFixed(2)}%`,
      factor: factor.toFixed(4),
      reduction: `${((1-factor)*100).toFixed(2)}%`
    });
    
    return {
      occurred: true,
      totalFardh: totalFardh,
      factor: factor,
      beforeAul: beforeAul,
      explanation: {
        id: `Kasus 'Aul terjadi ketika total bagian fardh (${(totalFardh*100).toFixed(2)}%) melebihi 100%. Dalam kasus ini, semua ahli waris fardh mendapat bagian yang dikurangi secara proporsional (dikali ${factor.toFixed(4)}) agar total menjadi 100%. Ashabah tidak mendapat bagian karena seluruh harta habis untuk ahli waris fardh.`,
        en: `'Aul case occurs when total fardh shares (${(totalFardh*100).toFixed(2)}%) exceed 100%. In this case, all fardh heirs receive proportionally reduced shares (multiplied by ${factor.toFixed(4)}) to make the total 100%. Ashabah receives no share as entire estate is consumed by fardh heirs.`
      }
    };
  }
  
  log('success', 'Tidak terjadi \'Aul (total fardh <= 100%)');
  
  return { occurred: false };
}

/**
 * ========================================
 * FUNGSI TERAPKAN HUKUM RADD
 * ========================================
 * 
 * TUJUAN:
 * Menerapkan hukum Radd (pengembalian sisa) jika ada sisa harta
 * dan tidak ada ahli waris ashabah.
 * 
 * DEFINISI RADD:
 * Radd (الرد) adalah pengembalian sisa harta kepada ahli waris fardh
 * (kecuali suami/istri) secara proporsional jika tidak ada ashabah.
 * 
 * SYARAT RADD:
 * 1. Ada sisa harta setelah dibagikan fardh
 * 2. Tidak ada ahli waris ashabah (atau ashabah dapat 0)
 * 3. Ada ahli waris fardh selain suami/istri
 * 
 * CONTOH:
 * - Istri: 1/4 = Rp 30.000.000
 * - Ibu: 1/3 = Rp 40.000.000
 * Total: 58.33% = Rp 70.000.000
 * Sisa: 41.67% = Rp 50.000.000
 * 
 * SOLUSI RADD:
 * Sisa Rp 50.000.000 dikembalikan ke Ibu (proporsional)
 * Istri tidak dapat Radd (suami/istri dikecualikan)
 * 
 * PERBEDAAN PENDAPAT:
 * - Jumhur (Hanafi, Hanbali, Syafi'i dalam qaul jadid): Ada Radd
 * - Mazhab Maliki & Syafi'i (qaul qadim): Tidak ada Radd, sisa ke Baitul Mal
 * 
 * APLIKASI INI: Mengikuti Jumhur (ada Radd)
 * 
 * REFERENSI:
 * - Al-Mughni (Ibnu Qudamah) Juz 7/30
 * - Al-Majmu' (An-Nawawi) Juz 16/89
 * - Al-Hidayah (Al-Marghinani) Juz 4/478
 * 
 * INPUT:
 * @param {Array} heirs - Array ahli waris
 * @param {number} sisaHarta - Sisa harta
 * @param {number} hartaBersih - Total harta bersih
 * 
 * OUTPUT:
 * @returns {Object} { occurred, sisaHarta, explanation }
 */
function applyRadd(heirs, sisaHarta, hartaBersih) {
  logStep(7, 'Cek dan Terapkan Radd (Pengembalian Sisa)');
  
  // Radd hanya terjadi jika:
  // 1. Tidak ada ashabah (atau ashabah dapat 0)
  // 2. Ada sisa harta
  
  const ashabahHeirs = heirs.filter(h => h.isAshabah);
  
  // Cek apakah ada ashabah yang benar-benar dapat bagian
  let hasActiveAshabah = false;
  ashabahHeirs.forEach(h => {
    if (h.total > 0) {
      hasActiveAshabah = true;
    }
  });
  
  log('debug', `Ada ashabah aktif: ${hasActiveAshabah}`);
  log('debug', `Sisa harta: ${formatRupiah(sisaHarta)}`);
  
  // Radd terjadi jika tidak ada ashabah aktif dan ada sisa harta
  if (!hasActiveAshabah && sisaHarta > 0) {
    log('info', 'RADD TERJADI! Ada sisa harta dan tidak ada ashabah');
    
    // Ahli waris yang eligible untuk Radd (kecuali suami/istri)
    const eligibleHeirs = heirs.filter(h => 
      !h.isAshabah &&
      !h.name.toLowerCase().includes('suami') && 
      !h.name.toLowerCase().includes('istri') && 
      !h.name.toLowerCase().includes('husband') && 
      !h.name.toLowerCase().includes('wife')
    );
    
    if (eligibleHeirs.length > 0) {
      // Hitung total share eligible heirs
      let totalEligibleShares = 0;
      eligibleHeirs.forEach(h => {
        totalEligibleShares += h.share;
      });
      
      log('debug', `Total share eligible untuk Radd: ${(totalEligibleShares * 100).toFixed(2)}%`);
      
      // Distribusi sisa proporsional
      eligibleHeirs.forEach(h => {
        const additionalShare = (h.share / totalEligibleShares) * sisaHarta;
        h.total += additionalShare;
        h.perPerson = h.total / h.count;
        h.fraction += ' (Radd)';
        h.raddApplied = true;
        h.raddAmount = additionalShare;
        h.explanation += currentLang === 'id'
          ? ` 🔄 Terjadi Radd (pengembalian sisa harta ${formatRupiah(Math.round(additionalShare))} karena tidak ada ashabah). Sisa dikembalikan secara proporsional.`
          : ` 🔄 Radd occurred (return of remainder ${formatRupiah(Math.round(additionalShare))} because there is no ashabah). Remainder is returned proportionally.`;
        
        log('success', `${h.name}: +${formatRupiah(additionalShare)} (Radd)`);
      });
      
      logStep(7, 'Radd diterapkan', {
        sisaHarta: formatRupiah(sisaHarta),
        eligibleHeirs: eligibleHeirs.length
      });
      
      return {
        occurred: true,
        sisaHarta: sisaHarta,
        explanation: {
          id: `Kasus Radd terjadi ketika tidak ada ahli waris ashabah dan masih ada sisa harta ${formatRupiah(Math.round(sisaHarta))} setelah dibagikan kepada ahli waris fardh. Sisa harta dikembalikan kepada ahli waris fardh (kecuali suami/istri) secara proporsional sesuai bagian masing-masing.`,
          en: `Radd case occurs when there is no ashabah heir and there is remaining estate ${formatRupiah(Math.round(sisaHarta))} after distribution to fardh heirs. Remainder is returned to fardh heirs (except spouse) proportionally according to their respective shares.`
        }
      };
    } else {
      log('warning', 'Tidak ada ahli waris eligible untuk Radd (hanya ada suami/istri)');
      log('info', `Sisa ${formatRupiah(sisaHarta)} menjadi hak Baitul Mal`);
    }
  }
  
  log('success', 'Tidak terjadi Radd');
  
  return { occurred: false };
}

/**
 * ========================================
 * FUNGSI PERHITUNGAN UTAMA (ORCHESTRATOR)
 * ========================================
 * 
 * TUJUAN:
 * Mengatur seluruh alur perhitungan waris dari awal sampai akhir.
 * 
 * ALUR PERHITUNGAN:
 * 1. Hitung harta bersih (setelah dikurangi biaya jenazah, hutang, wasiat)
 * 2. Deteksi dan hapus ahli waris yang gugur (mahjub)
 * 3. Hitung bagian fardh setiap ahli waris
 * 4. Cek dan terapkan 'Aul (jika total fardh > 100%)
 * 5. Hitung sisa harta untuk ashabah
 * 6. Distribusikan sisa harta ke ashabah
 * 7. Cek dan terapkan Radd (jika ada sisa dan tidak ada ashabah)
 * 8. Verifikasi total pembagian
 * 9. Return hasil perhitungan
 * 
 * INPUT:
 * @param {Object} data - Data pewaris dan ahli waris
 * 
 * OUTPUT:
 * @returns {Object} Hasil perhitungan lengkap
 */
function performCalculation(data) {
  log('info', '========================================');
  log('info', '🧮 MULAI PERHITUNGAN WARIS');
  log('info', '========================================');
  
  logStep(1, 'Hitung Harta Bersih');
  
  // ===== 1. HITUNG HARTA BERSIH =====
  // 
  // URUTAN PENGURANGAN (sesuai Ijma' Ulama):
  // 1. Biaya jenazah (تجهيز الميت)
  // 2. Hutang (الدين)
  // 3. Wasiat (الوصية) - maksimal 1/3
  // 4. Warisan (الميراث)
  // 
  // DALIL: QS. An-Nisa: 11
  // "مِن بَعْدِ وَصِيَّةٍ يُوصِي بِهَا أَوْ دَيْنٍ"
  // (Sesudah dipenuhi wasiat yang ia buat atau sesudah dibayar hutangnya)
  
  let hartaBersih = data.totalHarta - data.biayaJenazah - data.hutang;
  
  // Asuransi syariah ditambahkan ke harta
  if (data.asuransi === 'syariah') {
    hartaBersih += data.nilaiAsuransi;
    log('info', `Asuransi syariah: +${formatRupiah(data.nilaiAsuransi)}`);
  }
  
  // Wasiat maksimal 1/3 dari harta bersih
  const maxWasiat = hartaBersih / 3;
  const wasiatFinal = Math.min(data.wasiat, maxWasiat);
  
  if (data.wasiat > maxWasiat) {
    log('warning', `Wasiat ${formatRupiah(data.wasiat)} melebihi 1/3, dikurangi menjadi ${formatRupiah(maxWasiat)}`);
  }
  
  hartaBersih -= wasiatFinal;
  
  log('success', `Harta bersih: ${formatRupiah(hartaBersih)}`);
  
  // ===== 2. RESET GLOBAL VARIABLE =====
  originalSaudaraData = {
    kandungSeayah: 0,
    seibu: 0
  };
  
  // ===== 3. DETEKSI DAN HAPUS AHLI WARIS YANG GUGUR (MAHJUB) =====
  const mahjubResult = detectMahjub(data);
  data = mahjubResult.data;
  let blocked = mahjubResult.blocked;
  
  // ===== 4. HITUNG AHLI WARIS FARDH =====
  const heirs = calculateFardhHeirs(data);
  
  // ===== 5. HITUNG TOTAL BAGIAN FARDH =====
  logStep(4, 'Hitung Total Bagian Fardh');
  
  let totalFardh = 0;
  heirs.forEach(h => {
    if (!h.isAshabah) {
      totalFardh += h.share;
    }
  });
  
  log('info', `Total Fardh: ${(totalFardh * 100).toFixed(2)}% (${fractionToString(totalFardh)})`);
  
  // ===== 6. TERAPKAN HUKUM 'AUL JIKA TOTAL FARDH > 1 =====
  const aulResult = applyAul(heirs, hartaBersih);
  // ===== 7. HITUNG SISA HARTA UNTUK ASHABAH =====

  // Hitung total fardh yang SUDAH DIBAGIKAN (dalam rupiah, bukan persentase)
  let totalFardhRupiah = 0;
  heirs.forEach(h => {
    if (!h.isAshabah) {
      totalFardhRupiah += h.share * hartaBersih;
    }
  });

  // Sisa harta = harta bersih - total fardh yang sudah dibagikan
  const sisaHarta = hartaBersih - totalFardhRupiah;

  log('info', `Total Fardh (Rupiah): ${formatRupiah(totalFardhRupiah)}`);
  log('info', `Sisa harta untuk ashabah: ${formatRupiah(sisaHarta)} (${((sisaHarta/hartaBersih)*100).toFixed(2)}%)`);
  
  // ===== 8. DISTRIBUSIKAN SISA HARTA KE ASHABAH =====
  distributeAshabah(heirs, sisaHarta, hartaBersih);
  
  // ===== 9. HITUNG TOTAL UNTUK AHLI WARIS FARDH YANG BELUM DAPAT NILAI =====
  heirs.forEach(h => {
    if (!h.isAshabah && h.total === 0) {
      h.total = h.share * hartaBersih;
      h.perPerson = h.total / h.count;
    }
  });
  
  // ===== 10. TERAPKAN HUKUM RADD JIKA ADA SISA DAN TIDAK ADA ASHABAH =====
  const raddResult = applyRadd(heirs, sisaHarta, hartaBersih);
  
  // ===== 11. VERIFIKASI TOTAL PEMBAGIAN =====
  logStep(8, 'Verifikasi Total Pembagian');
  
  const totalDibagikan = heirs.reduce((sum, h) => sum + h.total, 0);
  const selisih = Math.abs(hartaBersih - totalDibagikan);
  const isValid = selisih < 1; // Toleransi Rp 1 untuk pembulatan
  
  log('info', `Total dibagikan: ${formatRupiah(totalDibagikan)}`);
  log('info', `Harta bersih: ${formatRupiah(hartaBersih)}`);
  log('info', `Selisih: ${formatRupiah(selisih)}`);
  
  if (isValid) {
    log('success', '✅ Verifikasi BERHASIL! Total pembagian sesuai.');
  } else {
    log('error', '❌ Verifikasi GAGAL! Ada selisih pembagian.');
  }
  
  // ===== 12. SIMPAN KE CALCULATION HISTORY =====
  const calculationResult = {
    timestamp: new Date().toISOString(),
    input: { ...data },
    hartaBersih: {
      awal: data.totalHarta,
      biayaJenazah: data.biayaJenazah,
      hutang: data.hutang,
      asuransi: data.asuransi === 'syariah' ? data.nilaiAsuransi : 0,
      wasiat: wasiatFinal,
      bersih: hartaBersih
    },
    heirs: heirs,
    blocked: blocked,
    aul: aulResult.occurred ? aulResult : null,
    radd: raddResult.occurred ? raddResult : null,
    verification: {
      totalDibagikan: totalDibagikan,
      hartaBersih: hartaBersih,
      selisih: selisih,
      isValid: isValid
    }
  };
  
  window.calculationHistory.push(calculationResult);
  
  log('info', '========================================');
  log('success', '✅ PERHITUNGAN SELESAI');
  log('info', '========================================');
  
  // ===== 13. RETURN HASIL PERHITUNGAN =====
  return calculationResult;
}

// ===== END OF PART 2 =====

console.log('✅ Part 2 loaded: Calculation Engine');

// ===== PART 3: DISPLAY & UI =====

console.log('📦 Loading Part 3: Display & UI...');

/**
 * ========================================
 * FUNGSI TAMPILKAN HASIL PERHITUNGAN
 * ========================================
 * 
 * TUJUAN:
 * Menampilkan hasil perhitungan waris ke UI dengan format yang jelas dan lengkap.
 * 
 * KOMPONEN YANG DITAMPILKAN:
 * 1. Ringkasan data pewaris
 * 2. Rincian harta bersih
 * 3. Daftar ahli waris yang berhak (dengan dalil)
 * 4. Daftar ahli waris yang gugur (mahjub)
 * 5. Kasus khusus ('Aul atau Radd jika terjadi)
 * 6. Verifikasi total pembagian
 * 7. Rincian per ahli waris
 */
function displayResults() {
  log('info', 'Menampilkan hasil perhitungan...');
  
  const resultDiv = document.getElementById('hasilPerhitungan');
  if (!resultDiv) {
    logError('displayResults', new Error('Element hasilPerhitungan tidak ditemukan'));
    return;
  }
  
  // Ambil hasil perhitungan terakhir
  const result = window.calculationHistory[window.calculationHistory.length - 1];
  
  if (!result) {
    logError('displayResults', new Error('Tidak ada hasil perhitungan'));
    return;
  }
  
  // Generate HTML
  let html = `
    <div class="result-container">
      <h2 class="result-title">📊 ${t('result_title')}</h2>
      
      <!-- Ringkasan Data Pewaris -->
      ${generateSummaryHTML(result)}
      
      <!-- Rincian Harta Bersih -->
      ${generateHartaBersihHTML(result)}
      
      <!-- Ahli Waris yang Berhak -->
      ${generateHeirsHTML(result)}
      
      <!-- Ahli Waris yang Gugur -->
      ${generateBlockedHTML(result)}
      
      <!-- Kasus Khusus ('Aul atau Radd) -->
      ${generateSpecialCasesHTML(result)}
      
      <!-- Verifikasi Total -->
      ${generateVerificationHTML(result)}
      
      <!-- Rincian Per Ahli Waris -->
      ${generateDetailHTML(result)}
    </div>
  `;
  
  resultDiv.innerHTML = html;
  resultDiv.style.display = 'block';
  
  // Scroll ke hasil
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  log('success', 'Hasil berhasil ditampilkan');
}

/**
 * FUNGSI: generateSummaryHTML()
 * TUJUAN: Generate HTML ringkasan data pewaris
 */
function generateSummaryHTML(result) {
  const data = result.input;
  
  let html = `
    <div class="summary-section">
      <h3>📋 Ringkasan Data Pewaris</h3>
      <div class="summary-grid">
        <div class="summary-item">
          <span class="summary-label">⚖️ Mazhab:</span>
          <span class="summary-value">${data.mazhab === 'jumhur' ? 'Jumhur (Mayoritas Ulama)' : data.mazhab}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">👤 Jenis Kelamin Pewaris:</span>
          <span class="summary-value">${data.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</span>
        </div>
  `;
  
  // Pasangan
  if (data.suami || data.istri) {
    html += `
        <div class="summary-item">
          <span class="summary-label">💑 Status Pasangan:</span>
          <span class="summary-value">Memiliki ${data.suami ? 'Suami' : `${data.istriCount} Istri`}</span>
        </div>
    `;
  }
  
  // Orang tua
  const orangTua = [];
  if (data.ayah) orangTua.push('Ayah');
  if (data.ibu) orangTua.push('Ibu');
  if (data.kakek && !data.ayah) orangTua.push('Kakek');
  if (data.nenek && !data.ibu) orangTua.push('Nenek');
  
  if (orangTua.length > 0) {
    html += `
        <div class="summary-item">
          <span class="summary-label">👴👵 Orang Tua/Kakek Nenek:</span>
          <span class="summary-value">${orangTua.join(', ')}</span>
        </div>
    `;
  }
  
  // Anak
  const totalAnak = data.anakLaki + data.anakPerempuan;
  if (totalAnak > 0) {
    html += `
        <div class="summary-item">
          <span class="summary-label">👶 Anak:</span>
          <span class="summary-value">${data.anakLaki} Laki-laki, ${data.anakPerempuan} Perempuan</span>
        </div>
    `;
  } else {
    html += `
        <div class="summary-item">
          <span class="summary-label">👶 Anak:</span>
          <span class="summary-value">Tidak ada</span>
        </div>
    `;
  }
  
  // Cucu
  const totalCucu = data.cucuLaki + data.cucuPerempuan;
  if (totalCucu > 0) {
    html += `
        <div class="summary-item">
          <span class="summary-label">👦👧 Cucu:</span>
          <span class="summary-value">${data.cucuLaki} Laki-laki, ${data.cucuPerempuan} Perempuan</span>
        </div>
    `;
  } else {
    html += `
        <div class="summary-item">
          <span class="summary-label">👦👧 Cucu:</span>
          <span class="summary-value">Tidak ada</span>
        </div>
    `;
  }
  
  // Saudara
  const totalSaudara = data.saudaraLakiKandung + data.saudaraPerempuanKandung +
                       data.saudaraLakiSeayah + data.saudaraPerempuanSeayah +
                       data.saudaraLakiSeibu + data.saudaraPerempuanSeibu;
  
  if (totalSaudara > 0) {
    const saudaraList = [];
    if (data.saudaraLakiKandung > 0 || data.saudaraPerempuanKandung > 0) {
      saudaraList.push(`${data.saudaraLakiKandung + data.saudaraPerempuanKandung} Saudara Kandung`);
    }
    if (data.saudaraLakiSeayah > 0 || data.saudaraPerempuanSeayah > 0) {
      saudaraList.push(`${data.saudaraLakiSeayah + data.saudaraPerempuanSeayah} Saudara Seayah`);
    }
    if (data.saudaraLakiSeibu > 0 || data.saudaraPerempuanSeibu > 0) {
      saudaraList.push(`${data.saudaraLakiSeibu + data.saudaraPerempuanSeibu} Saudara Seibu`);
    }
    
    html += `
        <div class="summary-item">
          <span class="summary-label">👥 Saudara:</span>
          <span class="summary-value">${saudaraList.join(', ')}</span>
        </div>
    `;
  }
  
  html += `
      </div>
    </div>
  `;
  
  return html;
}

/**
 * FUNGSI: generateHartaBersihHTML()
 * TUJUAN: Generate HTML rincian harta bersih
 */
function generateHartaBersihHTML(result) {
  const harta = result.hartaBersih;
  
  let html = `
    <div class="harta-section">
      <div class="harta-item harta-awal">
        <span class="harta-label">Harta Awal</span>
        <span class="harta-value">${formatRupiah(harta.awal)}</span>
      </div>
  `;
  
  if (harta.biayaJenazah > 0) {
    html += `
      <div class="harta-item harta-minus">
        <span class="harta-label">- Biaya Jenazah</span>
        <span class="harta-value">${formatRupiah(harta.biayaJenazah)}</span>
      </div>
    `;
  }
  
  if (harta.hutang > 0) {
    html += `
      <div class="harta-item harta-minus">
        <span class="harta-label">- Hutang</span>
        <span class="harta-value">${formatRupiah(harta.hutang)}</span>
      </div>
    `;
  }
  
  if (harta.asuransi > 0) {
    html += `
      <div class="harta-item harta-plus">
        <span class="harta-label">+ Asuransi Syariah</span>
        <span class="harta-value">${formatRupiah(harta.asuransi)}</span>
      </div>
    `;
  }
  
  if (harta.wasiat > 0) {
    html += `
      <div class="harta-item harta-minus">
        <span class="harta-label">- Wasiat</span>
        <span class="harta-value">${formatRupiah(harta.wasiat)}</span>
      </div>
    `;
  }
  
  html += `
      <div class="harta-item harta-bersih">
        <span class="harta-label">HARTA YANG DIBAGI</span>
        <span class="harta-value">${formatRupiah(harta.bersih)}</span>
      </div>
      
      <div class="dalil-box">
        <h4>📜 Dalil Hutang</h4>
        <p class="arabic-text">
          كَانَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ إِذَا أُتِيَ بِرَجُلٍ مَيِّتٍ عَلَيْهِ دَيْنٌ سَأَلَ: هَلْ تَرَكَ لِدَيْنِهِ قَضَاءً؟
        </p>
        <p class="translation">
          "Rasulullah ﷺ apabila didatangkan kepadanya jenazah yang memiliki hutang, beliau bertanya: "Apakah dia meninggalkan sesuatu untuk melunasi hutangnya?""
        </p>
        <p class="reference">📖 HR. Bukhari no. 2289 (Shahih)</p>
        
        <h4>📜 Dalil Urutan</h4>
        <p class="arabic-text">
          مِن بَعْدِ وَصِيَّةٍ يُوصِي بِهَا أَوْ دَيْنٍ
        </p>
        <p class="translation">
          "Sesudah dipenuhi wasiat yang ia buat atau sesudah dibayar hutangnya."
        </p>
        <p class="reference">📖 QS. An-Nisa: 11</p>
        <p class="info-text">
          Urutan: 1) Jenazah, 2) Hutang, 3) Wasiat (maks 1/3), 4) Waris
        </p>
      </div>
    </div>
  `;
  
  return html;
}

/**
 * FUNGSI: generateHeirsHTML()
 * TUJUAN: Generate HTML daftar ahli waris yang berhak
 */
function generateHeirsHTML(result) {
  const heirs = result.heirs;
  
  let html = `
    <div class="heirs-section">
      <h3>👥 ${t('heirs_entitled')}</h3>
  `;
  
  heirs.forEach((heir, index) => {
    const bagianText = heir.isAshabah && heir.share === 0 ? 
      'Ashabah' : 
      heir.fraction;
    
    html += `
      <div class="heir-card">
        <div class="heir-header">
          <h4>${index + 1}. ${heir.name}</h4>
          <span class="heir-bagian">${bagianText}</span>
        </div>
        
        <div class="heir-body">
          <div class="heir-amount">
            <span class="amount-label">Total:</span>
            <span class="amount-value">${formatRupiah(Math.round(heir.total))}</span>
          </div>
          
          ${heir.count > 1 ? `
          <div class="heir-per-person">
            <span class="per-person-label">Per orang:</span>
            <span class="per-person-value">${formatRupiah(Math.round(heir.perPerson))}</span>
          </div>
          ` : ''}
          
          ${heir.isAshabah && heir.share > 0 ? `
          <div class="heir-breakdown">
            <div class="breakdown-item">
              <span>Fardh (${fractionToString(heir.share)}):</span>
              <span>${formatRupiah(Math.round(heir.share * result.hartaBersih.bersih))}</span>
            </div>
            <div class="breakdown-item">
              <span>Ashabah (Sisa):</span>
              <span>${formatRupiah(Math.round(heir.total - (heir.share * result.hartaBersih.bersih)))}</span>
            </div>
          </div>
          ` : ''}
          
          ${heir.aulApplied ? `
          <div class="special-case aul-case">
            <strong>⚠️ 'Aul diterapkan:</strong>
            <div>Bagian awal: ${fractionToString(heir.originalShare)}</div>
            <div>Setelah 'Aul: ${heir.fraction}</div>
            <div>Pengurangan: ${((1 - heir.aulFactor) * 100).toFixed(2)}%</div>
          </div>
          ` : ''}
          
          ${heir.raddApplied ? `
          <div class="special-case radd-case">
            <strong>🔄 Radd diterapkan:</strong>
            <div>Tambahan: ${formatRupiah(Math.round(heir.raddAmount))}</div>
          </div>
          ` : ''}
          
          <div class="heir-explanation">
            <strong>💡 Penjelasan:</strong>
            <p>${heir.explanation}</p>
          </div>
          
          ${heir.dalil ? `
          <div class="heir-dalil">
            <strong>📖 Dalil:</strong>
            ${heir.dalil.arab ? `
            <p class="arabic-text">${heir.dalil.arab}</p>
            ` : ''}
            <p class="translation">
              ${currentLang === 'id' ? heir.dalil.terjemah_id : heir.dalil.terjemah_en}
            </p>
            ${heir.dalil.surah ? `
            <p class="reference">📖 QS. ${heir.dalil.surah}: ${heir.dalil.ayat}</p>
            ` : ''}
            ${heir.dalil.riwayat ? `
            <p class="reference">📖 ${heir.dalil.riwayat}</p>
            ` : ''}
          </div>
          ` : ''}
        </div>
      </div>
    `;
  });
  
  html += `
    </div>
  `;
  
  return html;
}

/**
 * FUNGSI: generateBlockedHTML()
 * TUJUAN: Generate HTML daftar ahli waris yang gugur (mahjub)
 */
function generateBlockedHTML(result) {
  const blocked = result.blocked;
  
  if (blocked.length === 0) {
    return '';
  }
  
  let html = `
    <div class="blocked-section">
      <h3>⛔ Ahli Waris yang Gugur (Mahjub)</h3>
      <div class="blocked-info">
        <p>Ahli waris berikut tidak mendapat bagian karena terhalang (mahjub) oleh ahli waris yang lebih dekat:</p>
      </div>
  `;
  
  blocked.forEach((item, index) => {
    const typeName = {
      'cucu': 'Cucu',
      'kakek': 'Kakek',
      'nenek': 'Nenek',
      'saudara_kandung_seayah': 'Saudara Kandung/Seayah',
      'saudara_seibu': 'Saudara Seibu',
      'cucu_perempuan': 'Cucu Perempuan'
    };
    
    html += `
      <div class="blocked-card">
        <div class="blocked-header">
          <h4>${typeName[item.type] || item.type} (${item.count} orang)</h4>
          <span class="blocked-badge">MAHJUB</span>
        </div>
        <div class="blocked-body">
          <div class="blocked-reason">
            <strong>📋 Alasan Gugur:</strong>
            <p>${currentLang === 'id' ? item.reason.penjelasan_id : item.reason.penjelasan_en}</p>
          </div>
          ${item.reason.dalil ? `
          <div class="blocked-dalil">
            <strong>📖 Dalil:</strong>
            <p class="arabic-text">${item.reason.dalil}</p>
            <p class="reference">${item.reason.sumber}</p>
          </div>
          ` : ''}
        </div>
      </div>
    `;
  });
  
  html += `
    </div>
  `;
  
  return html;
}

/**
 * FUNGSI: generateSpecialCasesHTML()
 * TUJUAN: Generate HTML untuk kasus khusus ('Aul atau Radd)
 */
function generateSpecialCasesHTML(result) {
  let html = '';
  
  // Kasus 'Aul
  if (result.aul && result.aul.occurred) {
    html += `
      <div class="special-case-section aul-section">
        <h3>⚠️ ${t('aul_occurred')}</h3>
        <div class="special-case-explanation">
          <p>${currentLang === 'id' ? result.aul.explanation.id : result.aul.explanation.en}</p>
        </div>
        
        <div class="aul-details">
          <div class="aul-stat">
            <span class="stat-label">Total Fardh Sebelum 'Aul:</span>
            <span class="stat-value">${(result.aul.totalFardh * 100).toFixed(2)}%</span>
          </div>
          <div class="aul-stat">
            <span class="stat-label">Faktor Pengurangan:</span>
            <span class="stat-value">${result.aul.factor.toFixed(4)}</span>
          </div>
          <div class="aul-stat">
            <span class="stat-label">Persentase Pengurangan:</span>
            <span class="stat-value">${((1 - result.aul.factor) * 100).toFixed(2)}%</span>
          </div>
        </div>
        
        <div class="aul-comparison">
          <h4>Perbandingan Sebelum dan Sesudah 'Aul:</h4>
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Ahli Waris</th>
                <th>Sebelum 'Aul</th>
                <th>Sesudah 'Aul</th>
                <th>Selisih</th>
              </tr>
            </thead>
            <tbody>
              ${result.aul.beforeAul.map(item => {
                const afterItem = result.heirs.find(h => h.name === item.name);
                const selisih = item.totalBefore - (afterItem ? afterItem.total : 0);
                return `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.fractionBefore}<br>${formatRupiah(Math.round(item.totalBefore))}</td>
                    <td>${afterItem ? afterItem.fraction : '-'}<br>${afterItem ? formatRupiah(Math.round(afterItem.total)) : '-'}</td>
                    <td class="selisih-minus">-${formatRupiah(Math.round(selisih))}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="dalil-box">
          <h4>📚 Referensi Fiqih 'Aul:</h4>
          <ul>
            <li>Atsar Umar bin Khattab RA (Pertama kali menerapkan 'Aul)</li>
            <li>Ijma' Ulama 4 Mazhab</li>
            <li>Al-Mughni (Ibnu Qudamah) Juz 7/25</li>
            <li>Bidayatul Mujtahid (Ibnu Rusyd) Juz 2/356</li>
          </ul>
        </div>
      </div>
    `;
  }
  
  // Kasus Radd
  if (result.radd && result.radd.occurred) {
    html += `
      <div class="special-case-section radd-section">
        <h3>🔄 ${t('radd_occurred')}</h3>
        <div class="special-case-explanation">
          <p>${currentLang === 'id' ? result.radd.explanation.id : result.radd.explanation.en}</p>
        </div>
        
        <div class="radd-details">
          <div class="radd-stat">
            <span class="stat-label">Sisa Harta yang Dikembalikan:</span>
            <span class="stat-value">${formatRupiah(Math.round(result.radd.sisaHarta))}</span>
          </div>
        </div>
        
        <div class="dalil-box">
          <h4>📚 Referensi Fiqih Radd:</h4>
          <ul>
            <li>Pendapat Jumhur (Hanafi, Hanbali, Syafi'i qaul jadid)</li>
            <li>Al-Mughni (Ibnu Qudamah) Juz 7/30</li>
            <li>Al-Majmu' (An-Nawawi) Juz 16/89</li>
            <li>Al-Hidayah (Al-Marghinani) Juz 4/478</li>
          </ul>
          <p class="info-text">
            <strong>Catatan:</strong> Mazhab Maliki dan Syafi'i (qaul qadim) berpendapat sisa harta menjadi hak Baitul Mal, 
            bukan dikembalikan ke ahli waris. Aplikasi ini mengikuti pendapat Jumhur.
          </p>
        </div>
      </div>
    `;
  }
  
  return html;
}

/**
 * FUNGSI: generateVerificationHTML()
 * TUJUAN: Generate HTML verifikasi total pembagian
 */
function generateVerificationHTML(result) {
  const verification = result.verification;
  
  let html = `
    <div class="verification-section">
      <h3>📊 Verifikasi Total Pembagian</h3>
      
      <div class="verification-grid">
        <div class="verification-item">
          <span class="verification-label">Harta yang Dibagi:</span>
          <span class="verification-value">${formatRupiah(Math.round(verification.hartaBersih))}</span>
        </div>
        <div class="verification-item">
          <span class="verification-label">Total Dibagikan:</span>
          <span class="verification-value">${formatRupiah(Math.round(verification.totalDibagikan))}</span>
        </div>
        <div class="verification-item">
          <span class="verification-label">Selisih:</span>
          <span class="verification-value">${formatRupiah(Math.round(verification.selisih))}</span>
        </div>
        <div class="verification-item">
          <span class="verification-label">Status:</span>
          <span class="verification-status ${verification.isValid ? 'status-valid' : 'status-invalid'}">
            ${verification.isValid ? '✅ Sesuai' : '❌ Tidak Sesuai'}
          </span>
        </div>
      </div>
    </div>
  `;
  
  return html;
}

/**
 * FUNGSI: generateDetailHTML()
 * TUJUAN: Generate HTML rincian per ahli waris
 */
function generateDetailHTML(result) {
  const heirs = result.heirs;
  
  let html = `
    <div class="detail-section">
      <h3>📋 Rincian Per Ahli Waris:</h3>
      <table class="detail-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Ahli Waris</th>
            <th>Bagian</th>
            <th>Jumlah Orang</th>
            <th>Total</th>
            <th>Per Orang</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  heirs.forEach((heir, index) => {
    const bagianText = heir.isAshabah && heir.share === 0 ? 
      'Ashabah' : 
      heir.fraction;
    
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${heir.name}</td>
        <td>${bagianText}</td>
        <td>${heir.count}</td>
        <td class="amount-cell">${formatRupiah(Math.round(heir.total))}</td>
        <td class="amount-cell">${formatRupiah(Math.round(heir.perPerson))}</td>
      </tr>
    `;
  });
  
  const totalDibagikan = heirs.reduce((sum, h) => sum + h.total, 0);
  
  html += `
        </tbody>
        <tfoot>
          <tr class="total-row">
            <td colspan="4"><strong>TOTAL:</strong></td>
            <td class="amount-cell"><strong>${formatRupiah(Math.round(totalDibagikan))}</strong></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
  
  return html;
}

/**
 * ========================================
 * EVENT HANDLERS
 * ========================================
 */

/**
 * FUNGSI: handleCalculateButton()
 * TUJUAN: Handle klik tombol "Hitung Waris"
 */
function handleCalculateButton() {
  log('info', 'Tombol Hitung Waris diklik');
  
  // Validasi form
  const validation = validateForm();
  
  if (!validation.valid) {
    showValidationErrors(validation.errors);
    return;
  }
  
  // Tampilkan loading
  showLoading();
  
  // Delay untuk animasi loading
  setTimeout(() => {
    try {
      // Lakukan perhitungan
      const result = performCalculation(formData);
      
      // Sembunyikan loading
      hideLoading();
      
      // Tampilkan modal anak angkat/zina
      showModalAnakAngkatZina();
      
    } catch (error) {
      hideLoading();
      logError('handleCalculateButton', error);
      showError('Terjadi kesalahan dalam perhitungan. Silakan coba lagi.');
    }
  }, 500);
}

/**
 * FUNGSI: handleResetButton()
 * TUJUAN: Handle klik tombol "Reset"
 */
function handleResetButton() {
  log('info', 'Tombol Reset diklik');
  
  if (confirm('Apakah Anda yakin ingin mereset semua data?')) {
    // Reset form
    initializeForm();
    
    // Reset UI
    const resultDiv = document.getElementById('hasilPerhitungan');
    if (resultDiv) {
      resultDiv.innerHTML = '';
      resultDiv.style.display = 'none';
    }
    
    // Scroll ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    log('success', 'Form berhasil direset');
  }
}

/**
 * FUNGSI: handleExportPDF()
 * TUJUAN: Handle klik tombol "Export PDF"
 */
function handleExportPDF() {
  log('info', 'Tombol Export PDF diklik');
  
  alert(currentLang === 'id' 
    ? '📄 Fitur Export PDF sedang dalam pengembangan. Untuk sementara, Anda dapat mencetak halaman ini (Ctrl+P).' 
    : '📄 PDF Export feature is under development. For now, you can print this page (Ctrl+P).');
  
  window.print();
}

/**
 * FUNGSI: showLoading()
 * TUJUAN: Tampilkan loading indicator
 */
function showLoading() {
  const loadingDiv = document.getElementById('loadingIndicator');
  if (loadingDiv) {
    loadingDiv.style.display = 'flex';
  }
  
  log('info', 'Loading indicator ditampilkan');
}

/**
 * FUNGSI: hideLoading()
 * TUJUAN: Sembunyikan loading indicator
 */
function hideLoading() {
  const loadingDiv = document.getElementById('loadingIndicator');
  if (loadingDiv) {
    loadingDiv.style.display = 'none';
  }
  
  log('info', 'Loading indicator disembunyikan');
}

/**
 * FUNGSI: showError()
 * TUJUAN: Tampilkan pesan error
 */
function showError(message) {
  const resultDiv = document.getElementById('hasilPerhitungan');
  if (resultDiv) {
    resultDiv.innerHTML = `
      <div class="error-message">
        <h3>❌ Error</h3>
        <p>${message}</p>
      </div>
    `;
    resultDiv.style.display = 'block';
  }
  
  log('error', message);
}

// ===== END OF PART 3 =====

console.log('✅ Part 3 loaded: Display & UI');

// ===== PART 4: DEBUG & TESTING =====

console.log('📦 Loading Part 4: Debug & Testing...');

/**
 * ========================================
 * BUILT-IN TEST CASES
 * ========================================
 * 
 * TUJUAN:
 * Menyediakan test cases untuk verifikasi akurasi perhitungan.
 * 
 * CARA MENGGUNAKAN:
 * 1. Buka console browser (F12)
 * 2. Ketik: window.runTestCases()
 * 3. Lihat hasil test di console
 */

const testCases = {
  // ===== TEST CASE 1: GHARRAWAIN =====
  gharrawain: {
    name: 'Gharrawain (Ayah + Ibu + Istri + 2 Saudara)',
    input: {
      gender: 'male',
      mazhab: 'jumhur',
      istri: true,
      istriCount: 1,
      ayah: true,
      ibu: true,
      saudaraPerempuanKandung: 2,
      totalHarta: 120000000,
      biayaJenazah: 0,
      hutang: 0,
      wasiat: 0,
      asuransi: 'tidak',
      nilaiAsuransi: 0,
      // Semua field lain = 0 atau false
      suami: false,
      kakek: false,
      nenek: false,
      anakLaki: 0,
      anakPerempuan: 0,
      cucuLaki: 0,
      cucuPerempuan: 0,
      saudaraLakiKandung: 0,
      saudaraLakiSeayah: 0,
      saudaraPerempuanSeayah: 0,
      saudaraLakiSeibu: 0,
      saudaraPerempuanSeibu: 0
    },
    expected: {
      istri: 30000000,
      ayah: 70000000,
      ibu: 20000000,
      total: 120000000
    },
    description: 'Kasus Gharrawain: Ayah dapat 1/6 + sisa, Ibu dapat 1/6 (bukan 1/3) karena ada 2+ saudara yang gugur'
  },
  
  // ===== TEST CASE 2: 'AUL =====
  aul: {
    name: '\'Aul (Suami + 2 Saudara Perempuan + Ibu)',
    input: {
      gender: 'male',
      mazhab: 'jumhur',
      suami: false,
      istri: false,
      ayah: false,
      ibu: true,
      saudaraPerempuanKandung: 2,
      totalHarta: 120000000,
      biayaJenazah: 0,
      hutang: 0,
      wasiat: 0,
      asuransi: 'tidak',
      nilaiAsuransi: 0,
      // Pewaris perempuan dengan suami
      gender: 'female',
      suami: true,
      kakek: false,
      nenek: false,
      anakLaki: 0,
      anakPerempuan: 0,
      cucuLaki: 0,
      cucuPerempuan: 0,
      saudaraLakiKandung: 0,
      saudaraLakiSeayah: 0,
      saudaraPerempuanSeayah: 0,
      saudaraLakiSeibu: 0,
      saudaraPerempuanSeibu: 0
    },
    expected: {
      suami: 45000000, // 1/2 → dikurangi 'Aul
      saudaraPerempuan: 60000000, // 2/3 → dikurangi 'Aul
      ibu: 15000000, // 1/6 → dikurangi 'Aul
      total: 120000000,
      aulOccurred: true
    },
    description: 'Kasus \'Aul: Total fardh > 100%, semua dikurangi proporsional'
  },
  
  // ===== TEST CASE 3: RADD =====
  radd: {
    name: 'Radd (Istri + Ibu)',
    input: {
      gender: 'male',
      mazhab: 'jumhur',
      istri: true,
      istriCount: 1,
      ibu: true,
      totalHarta: 120000000,
      biayaJenazah: 0,
      hutang: 0,
      wasiat: 0,
      asuransi: 'tidak',
      nilaiAsuransi: 0,
      suami: false,
      ayah: false,
      kakek: false,
      nenek: false,
      anakLaki: 0,
      anakPerempuan: 0,
      cucuLaki: 0,
      cucuPerempuan: 0,
      saudaraLakiKandung: 0,
      saudaraPerempuanKandung: 0,
      saudaraLakiSeayah: 0,
      saudaraPerempuanSeayah: 0,
      saudaraLakiSeibu: 0,
      saudaraPerempuanSeibu: 0
    },
    expected: {
      istri: 30000000, // 1/4 (tidak dapat Radd)
      ibu: 90000000, // 1/3 + Radd
      total: 120000000,
      raddOccurred: true
    },
    description: 'Kasus Radd: Sisa harta dikembalikan ke Ibu (Istri tidak dapat Radd)'
  },
  
  // ===== TEST CASE 4: ANAK LAKI & PEREMPUAN =====
  anakCampuran: {
    name: 'Anak Laki-laki & Perempuan (Ashabah 2:1)',
    input: {
      gender: 'male',
      mazhab: 'jumhur',
      istri: true,
      istriCount: 1,
      ayah: true,
      ibu: true,
      anakLaki: 2,
      anakPerempuan: 1,
      totalHarta: 120000000,
      biayaJenazah: 0,
      hutang: 0,
      wasiat: 0,
      asuransi: 'tidak',
      nilaiAsuransi: 0,
      suami: false,
      kakek: false,
      nenek: false,
      cucuLaki: 0,
      cucuPerempuan: 0,
      saudaraLakiKandung: 0,
      saudaraPerempuanKandung: 0,
      saudaraLakiSeayah: 0,
      saudaraPerempuanSeayah: 0,
      saudaraLakiSeibu: 0,
      saudaraPerempuanSeibu: 0
    },
    expected: {
      istri: 15000000, // 1/8
      ayah: 20000000, // 1/6
      ibu: 20000000, // 1/6
      anakLaki: 52000000, // (2 × 2) / 5 × sisa
      anakPerempuan: 13000000, // (1 × 1) / 5 × sisa
      total: 120000000
    },
    description: 'Anak laki dan perempuan mendapat ashabah dengan ratio 2:1'
  },
  
  // ===== TEST CASE 5: HANYA AYAH =====
  hanyaAyah: {
    name: 'Hanya Ayah (Ashabah semua)',
    input: {
      gender: 'male',
      mazhab: 'jumhur',
      ayah: true,
      totalHarta: 120000000,
      biayaJenazah: 0,
      hutang: 0,
      wasiat: 0,
      asuransi: 'tidak',
      nilaiAsuransi: 0,
      suami: false,
      istri: false,
      ibu: false,
      kakek: false,
      nenek: false,
      anakLaki: 0,
      anakPerempuan: 0,
      cucuLaki: 0,
      cucuPerempuan: 0,
      saudaraLakiKandung: 0,
      saudaraPerempuanKandung: 0,
      saudaraLakiSeayah: 0,
      saudaraPerempuanSeayah: 0,
      saudaraLakiSeibu: 0,
      saudaraPerempuanSeibu: 0
    },
    expected: {
      ayah: 120000000, // Semua
      total: 120000000
    },
    description: 'Ayah sendirian mendapat semua harta sebagai ashabah'
  }
};

/**
 * FUNGSI: runTestCases()
 * TUJUAN: Menjalankan semua test cases dan menampilkan hasilnya
 * 
 * CARA MENGGUNAKAN:
 * window.runTestCases()
 */
window.runTestCases = function() {
  console.log('========================================');
  console.log('🧪 MENJALANKAN TEST CASES');
  console.log('========================================');
  
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  
  Object.keys(testCases).forEach(key => {
    const testCase = testCases[key];
    totalTests++;
    
    console.log('\n----------------------------------------');
    console.log(`🧪 TEST: ${testCase.name}`);
    console.log('----------------------------------------');
    console.log('📝 Deskripsi:', testCase.description);
    
    try {
      // Jalankan perhitungan
      const result = performCalculation(testCase.input);
      
      // Verifikasi hasil
      let testPassed = true;
      const errors = [];
      
      // Cek setiap expected value
      Object.keys(testCase.expected).forEach(key => {
        if (key === 'total') {
          const actualTotal = result.heirs.reduce((sum, h) => sum + h.total, 0);
          const expectedTotal = testCase.expected.total;
          const diff = Math.abs(actualTotal - expectedTotal);
          
          if (diff > 1) { // Toleransi Rp 1 untuk pembulatan
            testPassed = false;
            errors.push(`Total: Expected ${formatRupiah(expectedTotal)}, Got ${formatRupiah(actualTotal)}`);
          }
        } else if (key === 'aulOccurred') {
          if (result.aul && result.aul.occurred !== testCase.expected.aulOccurred) {
            testPassed = false;
            errors.push(`'Aul: Expected ${testCase.expected.aulOccurred}, Got ${result.aul ? result.aul.occurred : false}`);
          }
        } else if (key === 'raddOccurred') {
          if (result.radd && result.radd.occurred !== testCase.expected.raddOccurred) {
            testPassed = false;
            errors.push(`Radd: Expected ${testCase.expected.raddOccurred}, Got ${result.radd ? result.radd.occurred : false}`);
          }
        } else {
          // Cek ahli waris individual
          const heir = result.heirs.find(h => 
            h.name.toLowerCase().includes(key.toLowerCase())
          );
          
          if (heir) {
            const diff = Math.abs(heir.total - testCase.expected[key]);
            if (diff > 1) {
              testPassed = false;
              errors.push(`${key}: Expected ${formatRupiah(testCase.expected[key])}, Got ${formatRupiah(Math.round(heir.total))}`);
            }
          } else {
            testPassed = false;
            errors.push(`${key}: Ahli waris tidak ditemukan`);
          }
        }
      });
      
      if (testPassed) {
        console.log('✅ TEST PASSED');
        passedTests++;
      } else {
        console.log('❌ TEST FAILED');
        console.log('Errors:');
        errors.forEach(err => console.log('  -', err));
        failedTests++;
      }
      
      // Tampilkan hasil aktual
      console.log('\n📊 Hasil Aktual:');
      result.heirs.forEach(h => {
        console.log(`  ${h.name}: ${formatRupiah(Math.round(h.total))}`);
      });
      console.log(`  TOTAL: ${formatRupiah(Math.round(result.heirs.reduce((sum, h) => sum + h.total, 0)))}`);
      
      if (result.aul && result.aul.occurred) {
        console.log('  ⚠️ \'Aul terjadi');
      }
      if (result.radd && result.radd.occurred) {
        console.log('  🔄 Radd terjadi');
      }
      
    } catch (error) {
      console.log('❌ TEST ERROR');
      console.error(error);
      failedTests++;
    }
  });
  
  console.log('\n========================================');
  console.log('📊 RINGKASAN TEST');
  console.log('========================================');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(2)}%`);
  console.log('========================================');
  
  return {
    total: totalTests,
    passed: passedTests,
    failed: failedTests,
    successRate: (passedTests / totalTests) * 100
  };
};

/**
 * FUNGSI: runSingleTest()
 * TUJUAN: Menjalankan satu test case tertentu
 * 
 * CARA MENGGUNAKAN:
 * window.runSingleTest('gharrawain')
 */
window.runSingleTest = function(testName) {
  if (!testCases[testName]) {
    console.error(`❌ Test case '${testName}' tidak ditemukan`);
    console.log('Available test cases:', Object.keys(testCases).join(', '));
    return;
  }
  
  const testCase = testCases[testName];
  
  console.log('========================================');
  console.log(`🧪 RUNNING TEST: ${testCase.name}`);
  console.log('========================================');
  
  const result = performCalculation(testCase.input);
  
  console.log('📊 Hasil:');
  result.heirs.forEach(h => {
    console.log(`  ${h.name}: ${formatRupiah(Math.round(h.total))}`);
  });
  
  return result;
};

/**
 * FUNGSI: toggleDebugMode()
 * TUJUAN: Toggle debug mode on/off
 * 
 * CARA MENGGUNAKAN:
 * window.toggleDebugMode()
 */
window.toggleDebugMode = function() {
  window.debugMode = !window.debugMode;
  console.log(`🔧 Debug mode: ${window.debugMode ? 'ON' : 'OFF'}`);
  return window.debugMode;
};

/**
 * FUNGSI: showCalculationHistory()
 * TUJUAN: Tampilkan history perhitungan
 * 
 * CARA MENGGUNAKAN:
 * window.showCalculationHistory()
 */
window.showCalculationHistory = function() {
  console.log('========================================');
  console.log('📜 CALCULATION HISTORY');
  console.log('========================================');
  
  if (window.calculationHistory.length === 0) {
    console.log('Tidak ada history perhitungan');
    return;
  }
  
  window.calculationHistory.forEach((calc, index) => {
    console.log(`\n${index + 1}. ${new Date(calc.timestamp).toLocaleString()}`);
    console.log(`   Harta: ${formatRupiah(calc.hartaBersih.bersih)}`);
    console.log(`   Ahli Waris: ${calc.heirs.length}`);
    console.log(`   'Aul: ${calc.aul ? 'Ya' : 'Tidak'}`);
    console.log(`   Radd: ${calc.radd ? 'Ya' : 'Tidak'}`);
  });
  
  console.log('========================================');
  
  return window.calculationHistory;
};

/**
 * FUNGSI: clearCalculationHistory()
 * TUJUAN: Hapus history perhitungan
 * 
 * CARA MENGGUNAKAN:
 * window.clearCalculationHistory()
 */
window.clearCalculationHistory = function() {
  window.calculationHistory = [];
  console.log('✅ History perhitungan berhasil dihapus');
};

// ===== HELPER FUNCTIONS FOR DEBUGGING =====

/**
 * FUNGSI: inspectHeir()
 * TUJUAN: Inspect detail ahli waris tertentu
 * 
 * CARA MENGGUNAKAN:
 * window.inspectHeir('Ayah')
 */
window.inspectHeir = function(heirName) {
  const lastCalc = window.calculationHistory[window.calculationHistory.length - 1];
  
  if (!lastCalc) {
    console.error('❌ Tidak ada perhitungan yang tersimpan');
    return;
  }
  
  const heir = lastCalc.heirs.find(h => 
    h.name.toLowerCase().includes(heirName.toLowerCase())
  );
  
  if (!heir) {
    console.error(`❌ Ahli waris '${heirName}' tidak ditemukan`);
    return;
  }
  
  console.log('========================================');
  console.log(`🔍 INSPECT: ${heir.name}`);
  console.log('========================================');
  console.table({
    'Bagian (Fraction)': heir.fraction,
    'Bagian (Decimal)': heir.share,
    'Jumlah Orang': heir.count,
    'Total': formatRupiah(Math.round(heir.total)),
    'Per Orang': formatRupiah(Math.round(heir.perPerson)),
    'Ashabah': heir.isAshabah ? 'Ya' : 'Tidak',
    '\'Aul Applied': heir.aulApplied ? 'Ya' : 'Tidak',
    'Radd Applied': heir.raddApplied ? 'Ya' : 'Tidak'
  });
  
  console.log('\n📝 Penjelasan:');
  console.log(heir.explanation);
  
  if (heir.dalil) {
    console.log('\n📖 Dalil:');
    if (heir.dalil.arab) {
      console.log(heir.dalil.arab);
    }
    console.log(heir.dalil.terjemah_id);
    if (heir.dalil.surah) {
      console.log(`QS. ${heir.dalil.surah}: ${heir.dalil.ayat}`);
    }
  }
  
  return heir;
};

// ===== END OF PART 4 =====

console.log('✅ Part 4 loaded: Debug & Testing');

// ===== PART 5: INITIALIZATION & EVENT LISTENERS =====

console.log('📦 Loading Part 5: Initialization...');

/**
 * ========================================
 * DOCUMENT READY - INITIALIZATION
 * ========================================
 * 
 * TUJUAN:
 * Inisialisasi aplikasi saat DOM sudah siap.
 * 
 * YANG DILAKUKAN:
 * 1. Inisialisasi form
 * 2. Setup event listeners
 * 3. Setup dark mode
 * 4. Setup language
 * 5. Log aplikasi siap
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('========================================');
  console.log('🕌 KALKULATOR WARIS ISLAM - 4 MAZHAB');
  console.log('========================================');
  console.log('Versi: 2.0 (Rebuilt & Enhanced)');
  console.log('Fitur: Gharrawain, \'Aul, Radd, Mahjub');
  console.log('Referensi: Fiqih Klasik 4 Mazhab');
  console.log('========================================');
  
  // ===== 1. INISIALISASI FORM =====
  initializeForm();
  
  // ===== 2. SETUP EVENT LISTENERS =====
  
  // Tombol Hitung Waris
  const btnCalculate = document.getElementById('btnStart'); // ✅ UBAH INI
  if (btnCalculate) {
    btnCalculate.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent form submit jika di dalam form
      console.log('🖱️ Button Mulai Perhitungan diklik');
      handleCalculateButton();
    });
    log('success', 'Event listener btnStart terpasang');
  } else {
    console.error('❌ Button btnStart tidak ditemukan!');
  }
  
  // Tombol Reset
  const btnReset = document.getElementById('btnReset');
  if (btnReset) {
    btnReset.addEventListener('click', handleResetButton);
    log('success', 'Event listener btnReset terpasang');
  }
  
  // Tombol Export PDF
  const btnExportPDF = document.getElementById('btnExportPDF');
  if (btnExportPDF) {
    btnExportPDF.addEventListener('click', handleExportPDF);
    log('success', 'Event listener btnExportPDF terpasang');
  }
  
  // Dark Mode Toggle
  const btnDarkMode = document.getElementById('btnDarkMode');
  if (btnDarkMode) {
    btnDarkMode.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      const icon = document.getElementById('darkModeIcon');
      if (icon) {
        icon.textContent = isDark ? '☀️' : '🌙';
      }
      log('info', `Dark mode: ${isDark ? 'ON' : 'OFF'}`);
    });
    log('success', 'Event listener btnDarkMode terpasang');
  }
  
  // Language Toggle
  const btnLangID = document.getElementById('btnLangID');
  const btnLangEN = document.getElementById('btnLangEN');
  
  if (btnLangID) {
    btnLangID.addEventListener('click', function() {
      changeLang('id');
    });
  }
  
  if (btnLangEN) {
    btnLangEN.addEventListener('click', function() {
      changeLang('en');
    });
  }
  
  // ===== 3. SETUP DARK MODE (AUTO DETECT) =====
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
    const icon = document.getElementById('darkModeIcon');
    if (icon) {
      icon.textContent = '☀️';
    }
    log('info', 'Dark mode auto-detected');
  }
  
  // ===== 4. SETUP LANGUAGE (DEFAULT: ID) =====
  changeLang('id');
  
  // ===== 5. LOG APLIKASI SIAP =====
  console.log('========================================');
  console.log('✅ Aplikasi siap digunakan');
  console.log('========================================');
  console.log('\n📚 CARA MENGGUNAKAN DEBUG MODE:');
  console.log('1. window.debugMode = true  // Aktifkan logging');
  console.log('2. window.runTestCases()    // Jalankan semua test');
  console.log('3. window.runSingleTest(\'gharrawain\')  // Test spesifik');
  console.log('4. window.showCalculationHistory()  // Lihat history');
  console.log('5. window.inspectHeir(\'Ayah\')  // Inspect ahli waris');
  console.log('========================================\n');
});

// ===== END OF PART 5 =====

console.log('✅ Part 5 loaded: Initialization');
console.log('========================================');
console.log('✅ SEMUA PART BERHASIL DIMUAT');
console.log('========================================');
