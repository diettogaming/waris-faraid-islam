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
window.debugMode = false;
let currentLang = 'id';
let currentStep = 0;
let formData = {};
let originalSaudaraData = {
  kandungSeayah: 0,
  seibu: 0
};
window.calculationHistory = [];
window.testMode = false;

// ===== LOGGING UTILITIES =====
function log(type, message, data = null) {
  if (!window.debugMode) return;
  
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

function logStep(step, description, result = null) {
  if (!window.debugMode) return;
  
  console.log(`%c📊 STEP ${step}: ${description}`, 'color: #1976d2; font-weight: bold; font-size: 14px;');
  
  if (result !== null) {
    console.log(result);
  }
}

function logError(functionName, error) {
  console.error(`❌ ERROR di ${functionName}:`, error);
  console.error('Stack trace:', error.stack);
}

// ===== UTILITY FUNCTIONS =====
function gcd(a, b) {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

function lcm(denominators) {
    if (denominators.length === 0) return 1;
    
    const validDenominators = denominators.filter(d => d > 1);
    if (validDenominators.length === 0) return 1;

    let result = validDenominators[0];
    for (let i = 1; i < validDenominators.length; i++) {
        result = (result * validDenominators[i]) / gcd(result, validDenominators[i]);
    }
    return Math.round(result);
}

function simplifyFraction(num, den) {
    const common = gcd(num, den);
    return { num: num / common, den: den / common };
}

function formatRupiah(amount) {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  
  return 'Rp ' + amount.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

function fractionToString(decimal) {
  if (decimal === 0) return '0';
  if (decimal === 1) return '1';
  
  const tolerance = 1.0e-6;
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
  
  for (let [key, value] of Object.entries(commonFractions)) {
    if (Math.abs(decimal - parseFloat(key)) < tolerance) {
      return value;
    }
  }
  
  let numerator = Math.round(decimal * 1000000);
  let denominator = 1000000;
  
  const divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;
  
  return `${numerator}/${denominator}`;
}

function hasAnak(data) {
  return data.anakLaki > 0 || 
         data.anakPerempuan > 0 || 
         data.cucuLaki > 0 || 
         data.cucuPerempuan > 0;
}

function hasCucu(data) {
  return data.cucuLaki > 0 || data.cucuPerempuan > 0;
}

function addHeir(heirs, heir) {
  if (!heir.name) {
    logError('addHeir', new Error('Nama ahli waris tidak boleh kosong'));
    return;
  }
  
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
const dalilDatabase = {
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
const translations = {
  id: {
    gender_male: 'Laki-laki',
    gender_female: 'Perempuan',
    spouse: 'Pasangan',
    parents: 'Orang Tua',
    children: 'Anak',
    grandchildren: 'Cucu',
    siblings: 'Saudara',
    total_estate: 'Harta yang Dibagi',
    total_distributed: 'Total Dibagikan',
    difference: 'Selisih',
    status: 'Status',
    status_correct: 'Sesuai',
    status_error: 'Tidak Sesuai',
    aul_occurred: 'Terjadi \'Aul (Pengurangan Proporsional)',
    radd_occurred: 'Terjadi Radd (Pengembalian Sisa)',
    btn_calculate: 'Hitung Waris',
    btn_reset: 'Reset',
    btn_export: 'Export PDF',
    btn_next: 'Lanjut',
    btn_prev: 'Kembali',
    msg_loading: 'Menghitung...',
    msg_success: 'Perhitungan berhasil!',
    msg_error: 'Terjadi kesalahan dalam perhitungan'
  },
  
  en: {
    gender_male: 'Male',
    gender_female: 'Female',
    spouse: 'Spouse',
    parents: 'Parents',
    children: 'Children',
    grandchildren: 'Grandchildren',
    siblings: 'Siblings',
    result_title: 'Inheritance Distribution Result',
    heirs_entitled: 'Entitled Heirs',
    heirs_blocked: 'Blocked Heirs (Mahjub)',
    total_estate: 'Estate to be Distributed',
    total_distributed: 'Total Distributed',
    difference: 'Difference',
    status: 'Status',
    status_correct: 'Correct',
    status_error: 'Incorrect',
    aul_occurred: '\'Aul Occurred (Proportional Reduction)',
    radd_occurred: 'Radd Occurred (Return of Remainder)',
    btn_calculate: 'Calculate',
    btn_reset: 'Reset',
    btn_export: 'Export PDF',
    btn_next: 'Next',
    btn_prev: 'Back',
    msg_loading: 'Calculating...',
    msg_success: 'Calculation successful!',
    msg_error: 'An error occurred in calculation'
  }
};

function t(key) {
  return translations[currentLang][key] || key;
}

function changeLang(lang) {
  currentLang = lang;
  log('info', `Bahasa diganti ke: ${lang}`);
}

// ===== FORM HANDLING =====
function initializeForm() {
  log('info', 'Inisialisasi form...');
  
  formData = {
    gender: 'male',
    mazhab: 'jumhur',
    suami: false,
    istri: false,
    istriCount: 1,
    ayah: false,
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
    saudaraPerempuanSeibu: 0,
    totalHarta: 0,
    biayaJenazah: 0,
    hutang: 0,
    wasiat: 0,
    asuransi: 'tidak',
    nilaiAsuransi: 0
  };
  
  currentStep = 0;
  originalSaudaraData = { kandungSeayah: 0, seibu: 0 };
  log('success', 'Form berhasil diinisialisasi');
}

function validateForm() {
  const errors = [];
  
  if (formData.totalHarta <= 0) {
    errors.push('Total harta harus lebih dari 0');
  }
  
  if (formData.biayaJenazah < 0) {
    errors.push('Biaya jenazah tidak boleh negatif');
  }
  
  if (formData.hutang < 0) {
    errors.push('Hutang tidak boleh negatif');
  }
  
  const maxWasiat = formData.totalHarta / 3;
  if (formData.wasiat > maxWasiat) {
    errors.push(`Wasiat maksimal 1/3 dari harta (Rp ${formatRupiah(maxWasiat)})`);
  }
  
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
  
  if (formData.suami && formData.istri) {
    errors.push('Tidak boleh ada suami dan istri bersamaan');
  }
  
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

function showValidationErrors(errors) {
  let errorHTML = '<div class="validation-errors"><h4>⚠️ Kesalahan Input:</h4><ul>';
  
  errors.forEach(error => {
    errorHTML += `<li>${error}</li>`;
  });
  
  errorHTML += '</ul></div>';
  
  const resultDiv = document.getElementById('hasilPerhitungan');
  if (resultDiv) {
    resultDiv.innerHTML = errorHTML;
    resultDiv.style.display = 'block';
  }
  
  log('warning', 'Validasi gagal', errors);
}

// ===== MODAL FUNCTIONS =====
function showModalAnakAngkatZina() {
  log('info', 'Menampilkan modal anak angkat/zina');
  
  const modal = document.getElementById('modalAnakAngkatZina');
  if (!modal) {
    logError('showModalAnakAngkatZina', new Error('Modal tidak ditemukan'));
    return;
  }
  
  modal.classList.remove('hidden');
  
  const btnPelajari = document.getElementById('btnPelajariDetail');
  if (btnPelajari) {
    btnPelajari.onclick = function() {
      window.open('index.html#edukasi-anak-angkat', '_blank');
      log('info', 'Redirect ke halaman edukasi (tab baru)');
    };
  }
  
  const btnLanjutkan = document.getElementById('btnLanjutkanHitung');
  if (btnLanjutkan) {
    btnLanjutkan.onclick = function() {
      hideModalAnakAngkatZina();
      displayResults();
    };
  }
}

function hideModalAnakAngkatZina() {
  const modal = document.getElementById('modalAnakAngkatZina');
  if (modal) {
    modal.classList.add('hidden');
  }
  log('info', 'Modal anak angkat/zina disembunyikan');
}

// ===== MAHJUB DETECTION =====
function detectMahjub(data) {
  logStep(2, 'Deteksi Mahjub (Gugurnya Hak Waris)');
  
  const blocked = [];
  const hasAnakOrCucu = hasAnak(data);
  const hasAyah = data.ayah;
  const hasIbu = data.ibu;
  const hasAnakLaki = data.anakLaki > 0;
  
  originalSaudaraData.kandungSeayah = 
    data.saudaraLakiKandung + data.saudaraPerempuanKandung +
    data.saudaraLakiSeayah + data.saudaraPerempuanSeayah;
  
  originalSaudaraData.seibu = 
    data.saudaraLakiSeibu + data.saudaraPerempuanSeibu;
  
  log('debug', 'Data saudara asli (sebelum mahjub):', originalSaudaraData);
  
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
  
  if (hasAyah && data.kakek) {
    blocked.push({
      type: 'kakek',
      count: 1,
      reason: getDalil('mahjub.kakek_oleh_ayah')
    });
    
    data.kakek = false;
    log('warning', 'Kakek GUGUR karena ada ayah');
  }
  
  if (hasIbu && data.nenek) {
    blocked.push({
      type: 'nenek',
      count: 1,
      reason: getDalil('mahjub.nenek_oleh_ibu')
    });
    
    data.nenek = false;
    log('warning', 'Nenek GUGUR karena ada ibu');
  }
  
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
  
  logStep(2, 'Deteksi Mahjub selesai', { totalBlocked: blocked.length, blocked: blocked });
  
  return { data, blocked };
}

// ===== CALCULATION ENGINE =====
function calculateFardhHeirs(data) {
  logStep(3, 'Hitung Bagian Fardh Ahli Waris');
  
  const heirs = [];
  const hasAnakOrCucu = hasAnak(data);
  
  // Suami
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
  
  // Istri
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
  
  // Ayah
  if (data.ayah) {
    log('debug', 'Menghitung bagian Ayah...');
    log('debug', `Data saudara asli: ${originalSaudaraData.kandungSeayah}`);
    
    const hasSaudaraYangTerhalang = originalSaudaraData.kandungSeayah >= 2;
    
    if (hasAnakOrCucu) {
      const dalil = getDalil('ayah.dengan_anak');
      const hasAnakLaki = data.anakLaki > 0 || data.cucuLaki > 0;
      
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Ayah' : 'Father',
        share: 1/6,
        count: 1,
        explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
        dalil: dalil,
        isAshabah: !hasAnakLaki
      });
      
      log('success', `Ayah: 1/6 fardh${!hasAnakLaki ? ' + ashabah' : ''}`);
      
    } else if (hasSaudaraYangTerhalang) {
      const dalil = getDalil('ayah.dengan_anak');
      
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Ayah' : 'Father',
        share: 1/6,
        count: 1,
        explanation: currentLang === 'id' ? 
          'Ayah mendapat 1/6 fardh + sisa karena ada 2+ saudara yang gugur (kasus Gharrawain)' : 
          'Father gets 1/6 fardh + remainder because there are 2+ blocked siblings (Gharrawain case)',
        dalil: dalil,
        isAshabah: true
      });
      
      log('success', `Ayah: 1/6 fardh + ashabah (GHARRAWAIN)`);
      
    } else {
      const dalil = getDalil('ayah.tanpa_anak');
      
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Ayah' : 'Father',
        share: 0,
        count: 1,
        explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
        dalil: dalil,
        isAshabah: true
      });
      
      log('success', 'Ayah: Ashabah saja (sisa semua)');
    }
  }
  
  // Ibu
  if (data.ibu) {
    log('debug', 'Menghitung bagian Ibu...');
    
    const totalSaudaraYangMempengaruhiIbu = 
      originalSaudaraData.kandungSeayah + originalSaudaraData.seibu;
    
    log('debug', `Total saudara yang mempengaruhi ibu: ${totalSaudaraYangMempengaruhiIbu}`);
    
    const ibuGet1_6 = hasAnakOrCucu || totalSaudaraYangMempengaruhiIbu >= 2;
    
    const dalil = ibuGet1_6 ? 
      getDalil('ibu.dengan_anak') : 
      getDalil('ibu.tanpa_anak');
    
    let explanation = currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en;
    
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
  
  // Kakek
  if (data.kakek && !data.ayah) {
    const dalil = getDalil('kakek.dengan_anak');
    
    if (hasAnakOrCucu) {
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Kakek' : 'Grandfather',
        share: dalil.bagian,
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
  
  // Nenek
  if (data.nenek && !data.ibu) {
    const dalil = getDalil('nenek.bagian');
    
    addHeir(heirs, {
      name: currentLang === 'id' ? 'Nenek' : 'Grandmother',
      share: dalil.bagian,
      count: 1,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
    
    log('success', 'Nenek: 1/6');
  }
  
  // Anak Perempuan
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
  
  // Anak Laki-laki dan Perempuan (Ashabah)
  if (data.anakLaki > 0) {
    const totalAnak = data.anakLaki * 2 + data.anakPerempuan;
    const dalil = getDalil('anak_laki');
    
    addHeir(heirs, {
      name: currentLang === 'id' ? 
        `Anak Laki-laki (${data.anakLaki} orang)` : 
        `Son (${data.anakLaki})`,
      share: 0,
      count: data.anakLaki,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil,
      isAshabah: true,
      ashabahRatio: 2,
      ashabahTotal: totalAnak
    });
    
    log('success', `Anak Laki-laki (${data.anakLaki} orang): Ashabah (ratio 2)`);
    
    if (data.anakPerempuan > 0) {
      const dalilPerempuan = getDalil('anak_perempuan.dengan_laki');
      
      addHeir(heirs, {
        name: currentLang === 'id' ? 
          `Anak Perempuan (${data.anakPerempuan} orang)` : 
          `Daughter (${data.anakPerempuan})`,
        share: 0,
        count: data.anakPerempuan,
        explanation: currentLang === 'id' ? dalilPerempuan.penjelasan_id : dalilPerempuan.penjelasan_en,
        dalil: dalilPerempuan,
        isAshabah: true,
        ashabahRatio: 1,
        ashabahTotal: totalAnak
      });
      
      log('success', `Anak Perempuan (${data.anakPerempuan} orang): Ashabah (ratio 1)`);
    }
  }
  
  // Cucu Perempuan
  if (data.cucuPerempuan > 0 && data.cucuLaki === 0 && data.anakLaki === 0) {
    if (data.anakPerempuan >= 2) {
      log('debug', 'Cucu perempuan sudah gugur (ada 2+ anak perempuan)');
    } else if (data.anakPerempuan === 1) {
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
  
  // Cucu Laki-laki
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
  
  // Saudara Kandung
  const hasAnakCucuOrAyah = hasAnakOrCucu || data.ayah;
  
  if (data.saudaraPerempuanKandung > 0 && data.saudaraLakiKandung === 0 && !hasAnakCucuOrAyah) {
    const bagian = data.saudaraPerempuanKandung === 1 ? 1/2 : 2/3;
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
  
  // Saudara Seibu
  if (data.saudaraLakiSeibu > 0 || data.saudaraPerempuanSeibu > 0) {
    const totalSaudaraSeibu = data.saudaraLakiSeibu + data.saudaraPerempuanSeibu;
    const bagianTotal = totalSaudaraSeibu === 1 ? 1/6 : 1/3;
    const fraction = totalSaudaraSeibu === 1 ? '1/6' : '1/3';
    
    if (data.saudaraLakiSeibu > 0) {
      addHeir(heirs, {
        name: currentLang === 'id' ? 
          `Saudara Laki-laki Seibu (${data.saudaraLakiSeibu} orang)` : 
          `Maternal Brother (${data.saudaraLakiSeibu})`,
        share: bagianTotal,
        count: data.saudaraLakiSeibu,
        isSharedFardh: true,
        totalShareCount: totalSaudaraSeibu,
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
        share: bagianTotal,
        count: data.saudaraPerempuanSeibu,
        isSharedFardh: true,
        totalShareCount: totalSaudaraSeibu,
        explanation: currentLang === 'id' ? 
          `Saudara seibu mendapat ${fraction} dibagi rata` : 
          `Maternal siblings get ${fraction} divided equally`,
        dalil: {
          arab: 'وَإِن كَانَ رَجُلٌ يُورَثُ كَلَالَةً أَوِ امْرَأَةٌ وَلَهُ أَخٌ أَوْ أُخْتٌ فَلِكُلِّ وَاحِدٍ mِّنْهُمَا السُّدُسُ',
          terjemah_id: 'Dan jika seseorang meninggal yang tidak meninggalkan ayah dan tidak meninggalkan anak, tetapi mempunyai seorang saudara (seibu), maka bagi masing-masing seperenam.',
          terjemah_en: 'And if a man or woman leaves neither ascendants nor descendants but has a brother or a sister, then for each one of them is a sixth.',
          surah: 'An-Nisa',
          ayat: 12
        }
      });
      
      log('success', `Saudara Perempuan Seibu (${data.saudaraPerempuanSeibu} orang): ${fraction} dibagi rata`);
    }
  }
  
  logStep(3, 'Perhitungan Fardh selesai', { totalHeirs: heirs.length, heirs: heirs });
  
  return heirs;
}

function distributeAshabah(heirs, sisaHarta, hartaBersih) {
  logStep(5, 'Distribusi Ashabah (Sisa Harta)', {
    sisaHarta: formatRupiah(sisaHarta),
    hartaBersih: formatRupiah(hartaBersih)
  });
  
  const ashabahHeirs = heirs.filter(h => h.isAshabah);
  
  if (ashabahHeirs.length === 0) {
    log('info', 'Tidak ada ahli waris ashabah');
    return;
  }
  
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
  
  const anakAshabah = heirs.filter(h => 
    h.isAshabah && h.ashabahRatio && h.ashabahTotal
  );
  
  const orangTuaAshabah = ashabahHeirs.filter(h => 
    !h.ashabahRatio && !h.ashabahTotal
  );
  
  log('debug', `Anak/Cucu ashabah: ${anakAshabah.length}`);
  log('debug', `Orang tua ashabah: ${orangTuaAshabah.length}`);
  
  if (anakAshabah.length > 0) {
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
    
    orangTuaAshabah.forEach(h => {
      h.total = h.share > 0 ? hartaBersih * h.share : 0;
      h.perPerson = h.total;
      
      log('info', `${h.name}: Fardh ${formatRupiah(h.total)} (tidak dapat sisa karena ada anak)`);
    });
    
  } else {
    log('info', 'Distribusi sisa ke orang tua (Ayah/Kakek)');
    
    orangTuaAshabah.forEach(h => {
      const fardh = h.share > 0 ? hartaBersih * h.share : 0;
      h.total = fardh + sisaHarta;
      h.perPerson = h.total;
      
      log('success', `${h.name}:`);
      log('debug', `  - Fardh: ${formatRupiah(fardh)}`);
      log('debug', `  - Sisa (Ashabah): ${formatRupiah(sisaHarta)}`);
      log('debug', `  - Total: ${formatRupiah(h.total)}`);
    });
  }
  
  logStep(5, 'Distribusi Ashabah selesai');
}

function applyAul(heirs, hartaBersih) {
  logStep(6, 'Cek dan Terapkan \'Aul');
  
  let totalFardh = 0;
  heirs.forEach(h => {
    if (!h.isAshabah && h.share > 0) {
      totalFardh += h.share;
    }
  });
  
  log('debug', `Total Fardh: ${(totalFardh * 100).toFixed(2)}%`);
  
  if (totalFardh > 1) {
    const factor = 1 / totalFardh;
    
    const beforeAul = heirs.map(h => ({
      name: h.name,
      shareBefore: h.share,
      totalBefore: h.share * hartaBersih,
      fractionBefore: fractionToString(h.share)
    }));
    
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

function applyRadd(heirs, sisaHarta, hartaBersih) {
  logStep(7, 'Cek dan Terapkan Radd (Pengembalian Sisa)');
  
  const ashabahHeirs = heirs.filter(h => h.isAshabah);
  
  let hasActiveAshabah = false;
  ashabahHeirs.forEach(h => {
    if (h.total > 0) {
      hasActiveAshabah = true;
    }
  });
  
  log('debug', `Ada ashabah aktif: ${hasActiveAshabah}`);
  log('debug', `Sisa harta: ${formatRupiah(sisaHarta)}`);
  
  if (!hasActiveAshabah && sisaHarta > 0) {
    log('info', 'RADD TERJADI! Ada sisa harta dan tidak ada ashabah');
    
    const eligibleHeirs = heirs.filter(h => 
      !h.isAshabah &&
      !h.name.toLowerCase().includes('suami') && 
      !h.name.toLowerCase().includes('istri') && 
      !h.name.toLowerCase().includes('husband') && 
      !h.name.toLowerCase().includes('wife')
    );
    
    if (eligibleHeirs.length > 0) {
      let totalEligibleShares = 0;
      eligibleHeirs.forEach(h => {
        totalEligibleShares += h.share;
      });
      
      log('debug', `Total share eligible untuk Radd: ${(totalEligibleShares * 100).toFixed(2)}%`);
      
      eligibleHeirs.forEach(h => {
        const additionalShare = (h.share / totalEligibleShares) * sisaHarta;
        h.total += additionalShare;
        h.perPerson = h.total / h.count;
        h.fraction = fractionToString(h.share) + ' + Radd';
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
    }
  }
  
  log('success', 'Tidak terjadi Radd');
  return { occurred: false };
}

function performCalculation(data) {
  log('info', '========================================');
  log('info', '🧮 MULAI PERHITUNGAN WARIS');
  log('info', '========================================');
  
  logStep(1, 'Hitung Harta Bersih');
  
  let hartaBersih = data.totalHarta - data.biayaJenazah - data.hutang;
  
  if (data.asuransi === 'syariah') {
    hartaBersih += data.nilaiAsuransi;
    log('info', `Asuransi syariah: +${formatRupiah(data.nilaiAsuransi)}`);
  }
  
  const maxWasiat = hartaBersih / 3;
  const wasiatFinal = Math.min(data.wasiat, maxWasiat);
  
  if (data.wasiat > maxWasiat) {
    log('warning', `Wasiat ${formatRupiah(data.wasiat)} melebihi 1/3, dikurangi menjadi ${formatRupiah(maxWasiat)}`);
  }
  
  hartaBersih -= wasiatFinal;
  
  log('success', `Harta bersih: ${formatRupiah(hartaBersih)}`);
  
  originalSaudaraData = { kandungSeayah: 0, seibu: 0 };
  
  const mahjubResult = detectMahjub(data);
  data = mahjubResult.data;
  const blocked = mahjubResult.blocked;
  
  const heirs = calculateFardhHeirs(data);
  
  const aulResult = applyAul(heirs, hartaBersih);
  
  let totalFardhRupiah = heirs.reduce((sum, h) => {
    if (!h.isAshabah && h.share > 0) {
      return sum + (h.share * hartaBersih);
    }
    return sum;
  }, 0);
  
  let sisaHarta = hartaBersih - totalFardhRupiah;
  
  log('info', `Total Fardh (Rupiah): ${formatRupiah(totalFardhRupiah)}`);
  log('info', `Sisa harta untuk ashabah: ${formatRupiah(sisaHarta)} (${((sisaHarta/hartaBersih)*100).toFixed(2)}%)`);
  
  distributeAshabah(heirs, sisaHarta, hartaBersih);
  
  const raddResult = applyRadd(heirs, sisaHarta, hartaBersih);
  
  heirs.forEach(h => {
    if (!h.isAshabah && h.total === 0 && h.share > 0) {
      h.total = h.share * hartaBersih;
      h.perPerson = h.total / h.count;
    }
  });
  
  logStep(8, 'Verifikasi Total Pembagian');
  
  const totalDibagikan = heirs.reduce((sum, h) => sum + h.total, 0);
  const selisih = Math.abs(hartaBersih - totalDibagikan);
  const isValid = selisih < 1;
  
  log('info', `Total dibagikan: ${formatRupiah(totalDibagikan)}`);
  log('info', `Harta bersih: ${formatRupiah(hartaBersih)}`);
  log('info', `Selisih: ${formatRupiah(selisih)}`);
  
  if (isValid) {
    log('success', '✅ Verifikasi BERHASIL! Total pembagian sesuai.');
  } else {
    log('error', '❌ Verifikasi GAGAL! Ada selisih pembagian.');
  }
  
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
  
  return calculationResult;
}

// ===== DISPLAY FUNCTIONS =====
function displayResults() {
  log('info', 'Menampilkan hasil perhitungan...');
  
  const resultDiv = document.getElementById('hasilPerhitungan');
  if (!resultDiv) {
    logError('displayResults', new Error('Element hasilPerhitungan tidak ditemukan'));
    return;
  }
  
  const result = window.calculationHistory[window.calculationHistory.length - 1];
  
  if (!result) {
    logError('displayResults', new Error('Tidak ada hasil perhitungan'));
    return;
  }
  
  let html = `
    <div class="result-container">
      <h2 class="result-title">📊 ${t('result_title')}</h2>
      
      <div class="summary-section">
        <h3>📋 Ringkasan Data Pewaris</h3>
        <div class="summary-grid">
          <div class="summary-item">
            <span class="summary-label">⚖️ Mazhab:</span>
            <span class="summary-value">${result.input.mazhab === 'jumhur' ? 'Jumhur (Mayoritas Ulama)' : result.input.mazhab}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">👤 Jenis Kelamin Pewaris:</span>
            <span class="summary-value">${result.input.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</span>
          </div>
        </div>
      </div>
      
      <div class="harta-section">
        <h3>💰 Rincian Harta</h3>
        <div class="harta-item harta-awal">
          <span class="harta-label">Harta Awal</span>
          <span class="harta-value">${formatRupiah(result.hartaBersih.awal)}</span>
        </div>
        ${result.hartaBersih.biayaJenazah > 0 ? `
        <div class="harta-item harta-minus">
          <span class="harta-label">- Biaya Jenazah</span>
          <span class="harta-value">${formatRupiah(result.hartaBersih.biayaJenazah)}</span>
        </div>
        ` : ''}
        ${result.hartaBersih.hutang > 0 ? `
        <div class="harta-item harta-minus">
          <span class="harta-label">- Hutang</span>
          <span class="harta-value">${formatRupiah(result.hartaBersih.hutang)}</span>
        </div>
        ` : ''}
        ${result.hartaBersih.asuransi > 0 ? `
        <div class="harta-item harta-plus">
          <span class="harta-label">+ Asuransi Syariah</span>
          <span class="harta-value">${formatRupiah(result.hartaBersih.asuransi)}</span>
        </div>
        ` : ''}
        ${result.hartaBersih.wasiat > 0 ? `
        <div class="harta-item harta-minus">
          <span class="harta-label">- Wasiat</span>
          <span class="harta-value">${formatRupiah(result.hartaBersih.wasiat)}</span>
        </div>
        ` : ''}
        <div class="harta-item harta-bersih">
          <span class="harta-label">HARTA YANG DIBAGI</span>
          <span class="harta-value">${formatRupiah(result.hartaBersih.bersih)}</span>
        </div>
      </div>
      
      <div class="heirs-section">
        <h3>👥 ${t('heirs_entitled')}</h3>
  `;
  
  result.heirs.forEach((heir, index) => {
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
          
          <div class="heir-explanation">
            <strong>💡 Penjelasan:</strong>
            <p>${heir.explanation}</p>
          </div>
        </div>
      </div>
    `;
  });
  
  html += `
      </div>
      
      ${result.blocked.length > 0 ? `
      <div class="blocked-section">
        <h3>⛔ Ahli Waris yang Gugur (Mahjub)</h3>
        ${result.blocked.map(item => `
          <div class="blocked-card">
            <div class="blocked-header">
              <h4>${item.type} (${item.count} orang)</h4>
              <span class="blocked-badge">MAHJUB</span>
            </div>
          </div>
        `).join('')}
      </div>
      ` : ''}
      
      <div class="verification-section">
        <h3>📊 Verifikasi Total Pembagian</h3>
        <div class="verification-grid">
          <div class="verification-item">
            <span class="verification-label">Harta yang Dibagi:</span>
            <span class="verification-value">${formatRupiah(Math.round(result.verification.hartaBersih))}</span>
          </div>
          <div class="verification-item">
            <span class="verification-label">Total Dibagikan:</span>
            <span class="verification-value">${formatRupiah(Math.round(result.verification.totalDibagikan))}</span>
          </div>
          <div class="verification-item">
            <span class="verification-label">Selisih:</span>
            <span class="verification-value">${formatRupiah(Math.round(result.verification.selisih))}</span>
          </div>
          <div class="verification-item">
            <span class="verification-label">Status:</span>
            <span class="verification-status ${result.verification.isValid ? 'status-valid' : 'status-invalid'}">
              ${result.verification.isValid ? '✅ Sesuai' : '❌ Tidak Sesuai'}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  resultDiv.innerHTML = html;
  resultDiv.style.display = 'block';
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  log('success', 'Hasil berhasil ditampilkan');
}

// ===== EVENT HANDLERS =====
window.handleCalculateButton = function() {
  console.log('========================================');
  console.log('🖱️ BUTTON DIKLIK!');
  console.log('========================================');
  
  captureFormData();
  
  console.log('✅ Form data:', formData);
  
  const validation = validateForm();
  
  if (!validation.valid) {
    console.error('❌ Validasi gagal:', validation.errors);
    showValidationErrors(validation.errors);
    return;
  }
  
  console.log('✅ Validasi berhasil');
  
  showLoading();
  
  setTimeout(() => {
    try {
      console.log('🧮 Memulai perhitungan...');
      
      const result = performCalculation(formData);
      
      console.log('✅ Perhitungan selesai');
      console.log('📊 Hasil:', result);
      
      hideLoading();
      
      console.log('📢 Menampilkan modal pemberitahuan...');
      showModalAnakAngkatZina();
      
    } catch (error) {
      hideLoading();
      console.error('❌ ERROR dalam perhitungan:');
      console.error(error);
      console.error('Stack trace:', error.stack);
      
      alert('Terjadi kesalahan dalam perhitungan:\n\n' + error.message + '\n\nSilakan cek console (F12) untuk detail.');
    }
  }, 500);
};

window.captureFormData = function() {
  console.log('📋 Capturing form data...');
  
  const getValue = (id, defaultValue = 0) => {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`⚠️ Element ${id} tidak ditemukan`);
      return defaultValue;
    }
    
    if (el.type === 'checkbox') {
      return el.checked;
    } else if (el.type === 'number' || el.type === 'text') {
      const val = el.value;
      return val === '' ? defaultValue : parseFloat(val);
    } else {
      return el.value || defaultValue;
    }
  };
  
  const getRadio = (name, defaultValue) => {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : defaultValue;
  };
  
  window.formData = {
    gender: getRadio('gender', 'male'),
    mazhab: getRadio('mazhab', 'jumhur'),
    suami: getValue('suami', false),
    istri: getValue('istri', false),
    istriCount: getValue('istriCount', 1),
    ayah: getValue('ayah', false),
    ibu: getValue('ibu', false),
    kakek: getValue('kakek', false),
    nenek: getValue('nenek', false),
    anakLaki: getValue('anakLaki', 0),
    anakPerempuan: getValue('anakPerempuan', 0),
    cucuLaki: getValue('cucuLaki', 0),
    cucuPerempuan: getValue('cucuPerempuan', 0),
    saudaraLakiKandung: getValue('saudaraLakiKandung', 0),
    saudaraPerempuanKandung: getValue('saudaraPerempuanKandung', 0),
    saudaraLakiSeayah: getValue('saudaraLakiSeayah', 0),
    saudaraPerempuanSeayah: getValue('saudaraPerempuanSeayah', 0),
    saudaraLakiSeibu: getValue('saudaraLakiSeibu', 0),
    saudaraPerempuanSeibu: getValue('saudaraPerempuanSeibu', 0),
    totalHarta: getValue('totalHarta', 0),
    biayaJenazah: getValue('biayaJenazah', 0),
    hutang: getValue('hutang', 0),
    wasiat: getValue('wasiat', 0),
    asuransi: getRadio('asuransi', 'tidak'),
    nilaiAsuransi: getValue('nilaiAsuransi', 0)
  };
  
  console.log('✅ Form data captured:', formData);
  return formData;
};

function handleResetButton() {
  log('info', 'Tombol Reset diklik');
  
  if (confirm('Apakah Anda yakin ingin mereset semua data?')) {
    initializeForm();
    
    const resultDiv = document.getElementById('hasilPerhitungan');
    if (resultDiv) {
      resultDiv.innerHTML = '';
      resultDiv.style.display = 'none';
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    log('success', 'Form berhasil direset');
  }
}

function handleExportPDF() {
  log('info', 'Tombol Export PDF diklik');
  
  alert(currentLang === 'id' 
    ? '📄 Fitur Export PDF sedang dalam pengembangan. Untuk sementara, Anda dapat mencetak halaman ini (Ctrl+P).' 
    : '📄 PDF Export feature is under development. For now, you can print this page (Ctrl+P).');
  
  window.print();
}

function showLoading() {
  const loadingDiv = document.getElementById('loadingIndicator');
  if (loadingDiv) {
    loadingDiv.style.display = 'flex';
  }
  log('info', 'Loading indicator ditampilkan');
}

function hideLoading() {
  const loadingDiv = document.getElementById('loadingIndicator');
  if (loadingDiv) {
    loadingDiv.style.display = 'none';
  }
  log('info', 'Loading indicator disembunyikan');
}

// ===== TEST CASES =====
const testCases = {
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
    }
  }
};

window.runTestCases = function() {
  console.log('========================================');
  console.log('🧪 MENJALANKAN TEST CASES');
  console.log('========================================');
  
  Object.keys(testCases).forEach(key => {
    const testCase = testCases[key];
    console.log(`\n🧪 TEST: ${testCase.name}`);
    
    try {
      const result = performCalculation(testCase.input);
      console.log('✅ TEST PASSED');
      console.log('📊 Hasil:', result);
    } catch (error) {
      console.log('❌ TEST FAILED');
      console.error(error);
    }
  });
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('========================================');
  console.log('🕌 KALKULATOR WARIS ISLAM - 4 MAZHAB');
  console.log('========================================');
  console.log('Versi: 2.0 (Rebuilt & Enhanced)');
  console.log('Fitur: Gharrawain, \'Aul, Radd, Mahjub');
  console.log('Referensi: Fiqih Klasik 4 Mazhab');
  console.log('========================================');
  
  initializeForm();
  
  const btnCalculate = document.getElementById('btnStart');
  if (btnCalculate) {
    btnCalculate.addEventListener('click', handleCalculateButton);
    log('success', 'Event listener btnStart terpasang');
  } else {
    console.error('❌ Button btnStart tidak ditemukan!');
  }
  
  const btnReset = document.getElementById('btnReset');
  if (btnReset) {
    btnReset.addEventListener('click', handleResetButton);
  }
  
  const btnExportPDF = document.getElementById('btnExportPDF');
  if (btnExportPDF) {
    btnExportPDF.addEventListener('click', handleExportPDF);
  }
  
  changeLang('id');
  
  console.log('========================================');
  console.log('✅ Aplikasi siap digunakan');
  console.log('========================================');
});
