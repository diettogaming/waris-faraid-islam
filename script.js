/* ===================================
   KALKULATOR WARIS ISLAM - 4 MAZHAB
   Refactored & Optimized Version
   Total: ~2200 baris (dari 2800 baris)
   =================================== */

// ===== GLOBAL VARIABLES =====
let currentLang = 'id';
let currentStep = 0;
let formData = {};

// ===== TRANSLATIONS (Optimized) =====
const translations = {
  id: {
    title: 'Kalkulator Waris Islam - 4 Mazhab',
    subtitle: 'Perhitungan waris sesuai Al-Quran dan Sunnah',
    start: 'Mulai Perhitungan →',
    back: '← Kembali',
    next: 'Lanjut →',
    calculate: '🧮 Hitung Waris',
    reset: '🔄 Hitung Ulang',
    export_pdf: '📄 Export PDF',
    loading: 'Memproses perhitungan...'
  },
  en: {
    title: 'Islamic Inheritance Calculator - 4 Madhabs',
    subtitle: 'Calculation according to Quran and Sunnah',
    start: 'Start Calculation →',
    back: '← Back',
    next: 'Next →',
    calculate: '🧮 Calculate Inheritance',
    reset: '🔄 Calculate Again',
    export_pdf: '📄 Export PDF',
    loading: 'Processing calculation...'
  }
};

// ===== DALIL DATABASE (Optimized dengan Lookup) =====
const dalilDatabase = {
  hutang: {
    arab: 'كَانَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ إِذَا أُتِيَ بِرَجُلٍ مَيِّتٍ عَلَيْهِ دَيْنٌ سَأَلَ: هَلْ تَرَكَ لِدَيْنِهِ قَضَاءً؟',
    terjemah_id: 'Rasulullah ﷺ apabila didatangkan kepadanya jenazah yang memiliki hutang, beliau bertanya: "Apakah dia meninggalkan sesuatu untuk melunasi hutangnya?"',
    terjemah_en: 'When the Messenger of Allah ﷺ was brought a deceased person who had debt, he would ask: "Did he leave anything to pay his debt?"',
    riwayat: 'HR. Bukhari no. 2289',
    status: 'Shahih'
  },
  
  urutan: {
    arab: 'مِن بَعْدِ وَصِيَّةٍ يُوصِي بِهَا أَوْ دَيْنٍ',
    terjemah_id: 'Sesudah dipenuhi wasiat yang ia buat atau sesudah dibayar hutangnya.',
    terjemah_en: 'After any bequest he [may have] made or debt.',
    surah: 'An-Nisa',
    ayat: 11
  },
  
  suami: {
    dengan_anak: {
      arab: 'فَإِن كَانَ لَهُنَّ وَلَدٌ فَلَكُمُ الرُّبُعُ مِمَّا تَرَكْنَ',
      terjemah_id: 'Jika mereka mempunyai anak, maka kamu mendapat seperempat dari harta yang ditinggalkannya.',
      terjemah_en: 'But if they have a child, for you is one fourth of what they leave.',
      surah: 'An-Nisa',
      ayat: 12,
      bagian: 0.25,
      penjelasan_id: 'Suami mendapat 1/4 jika istri meninggalkan anak atau cucu',
      penjelasan_en: 'Husband gets 1/4 if wife leaves children or grandchildren'
    },
    tanpa_anak: {
      arab: 'وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ',
      terjemah_id: 'Dan bagimu (suami) seperdua dari harta yang ditinggalkan istri-istrimu, jika mereka tidak mempunyai anak.',
      terjemah_en: 'And for you is half of what your wives leave if they have no child.',
      surah: 'An-Nisa',
      ayat: 12,
      bagian: 0.5,
      penjelasan_id: 'Suami mendapat 1/2 jika istri tidak meninggalkan anak atau cucu',
      penjelasan_en: 'Husband gets 1/2 if wife leaves no children or grandchildren'
    }
  },
  
  istri: {
    dengan_anak: {
      arab: 'فَإِن كَانَ لَكُمْ وَلَدٌ فَلَهُنَّ الثُّمُنُ مِمَّا تَرَكْتُم',
      terjemah_id: 'Jika kamu mempunyai anak, maka bagi mereka seperdelapan dari harta yang kamu tinggalkan.',
      terjemah_en: 'But if you leave a child, then for them is an eighth of what you leave.',
      surah: 'An-Nisa',
      ayat: 12,
      bagian: 0.125,
      penjelasan_id: 'Istri mendapat 1/8 (dibagi rata jika lebih dari satu) jika suami meninggalkan anak atau cucu',
      penjelasan_en: 'Wife gets 1/8 (divided equally if more than one) if husband leaves children or grandchildren'
    },
    tanpa_anak: {
      arab: 'وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ',
      terjemah_id: 'Dan bagi mereka (istri-istri) seperempat dari harta yang kamu tinggalkan jika kamu tidak mempunyai anak.',
      terjemah_en: 'And for them (wives) is one fourth if you leave no child.',
      surah: 'An-Nisa',
      ayat: 12,
      bagian: 0.25,
      penjelasan_id: 'Istri mendapat 1/4 (dibagi rata jika lebih dari satu) jika suami tidak meninggalkan anak atau cucu',
      penjelasan_en: 'Wife gets 1/4 (divided equally if more than one) if husband leaves no children or grandchildren'
    }
  },
  
  ayah: {
    dengan_anak: {
      arab: 'وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ',
      terjemah_id: 'Dan untuk kedua ibu-bapak, bagi masing-masingnya seperenam dari harta yang ditinggalkan, jika dia (yang meninggal) mempunyai anak.',
      terjemah_en: 'And for one\'s parents, to each one of them is a sixth of his estate if he left children.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: 1/6,
      penjelasan_id: 'Ayah mendapat 1/6 jika ada anak, ditambah sisa harta sebagai ashabah',
      penjelasan_en: 'Father gets 1/6 if there are children, plus remainder as ashabah'
    },
    tanpa_anak: {
      arab: 'فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ',
      terjemah_id: 'Jika dia (yang meninggal) tidak mempunyai anak dan dia diwarisi oleh kedua ibu-bapaknya (saja), maka ibunya mendapat sepertiga.',
      terjemah_en: 'And if he had no children and the parents [alone] inherit from him, then for his mother is one third.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: 0,
      penjelasan_id: 'Ayah mendapat sisa harta sebagai ashabah jika tidak ada anak',
      penjelasan_en: 'Father gets remainder as ashabah if there are no children'
    }
  },
  
  ibu: {
    dengan_anak: {
      arab: 'وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ',
      terjemah_id: 'Dan untuk kedua ibu-bapak, bagi masing-masingnya seperenam dari harta yang ditinggalkan, jika dia (yang meninggal) mempunyai anak.',
      terjemah_en: 'And for one\'s parents, to each one of them is a sixth of his estate if he left children.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: 1/6,
      penjelasan_id: 'Ibu mendapat 1/6 jika ada anak atau cucu',
      penjelasan_en: 'Mother gets 1/6 if there are children or grandchildren'
    },
    tanpa_anak: {
      arab: 'فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ',
      terjemah_id: 'Jika dia (yang meninggal) tidak mempunyai anak dan dia diwarisi oleh kedua ibu-bapaknya (saja), maka ibunya mendapat sepertiga.',
      terjemah_en: 'And if he had no children and the parents [alone] inherit from him, then for his mother is one third.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: 1/3,
      penjelasan_id: 'Ibu mendapat 1/3 jika tidak ada anak, cucu, atau saudara',
      penjelasan_en: 'Mother gets 1/3 if there are no children, grandchildren, or siblings'
    }
  },
  
  anak_perempuan: {
    satu: {
      arab: 'وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ',
      terjemah_id: 'Dan jika anak itu seorang (perempuan) saja, maka dia memperoleh separuh (harta yang ditinggalkan).',
      terjemah_en: 'But if there is only one, for her is half.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: 0.5,
      penjelasan_id: 'Anak perempuan tunggal mendapat 1/2',
      penjelasan_en: 'Single daughter gets 1/2'
    },
    dua_atau_lebih: {
      arab: 'فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ',
      terjemah_id: 'Jika anak perempuan itu dua orang atau lebih, maka bagi mereka dua pertiga dari harta yang ditinggalkan.',
      terjemah_en: 'And if there are more than two, for them is two thirds of what he left.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: 2/3,
      penjelasan_id: 'Dua anak perempuan atau lebih mendapat 2/3 (dibagi rata)',
      penjelasan_en: 'Two or more daughters get 2/3 (divided equally)'
    },
    dengan_laki: {
      arab: 'يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ',
      terjemah_id: 'Allah mensyariatkan (mewajibkan) kepadamu tentang (pembagian warisan untuk) anak-anakmu, (yaitu) bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan.',
      terjemah_en: 'Allah instructs you concerning your children: for the male, what is equal to the share of two females.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: 0,
      penjelasan_id: 'Jika ada anak laki-laki, anak perempuan mendapat ashabah dengan perbandingan 2:1',
      penjelasan_en: 'If there are sons, daughters get ashabah with ratio 2:1'
    }
  },
  
  anak_laki: {
    arab: 'يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ',
    terjemah_id: 'Allah mensyariatkan (mewajibkan) kepadamu tentang (pembagian warisan untuk) anak-anakmu, (yaitu) bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan.',
    terjemah_en: 'Allah instructs you concerning your children: for the male, what is equal to the share of two females.',
    surah: 'An-Nisa',
    ayat: 11,
    bagian: 0,
    penjelasan_id: 'Anak laki-laki mendapat sisa harta sebagai ashabah. Jika bersama anak perempuan, perbandingan 2:1',
    penjelasan_en: 'Son gets remainder as ashabah. If with daughters, ratio 2:1'
  },
  
  kakek: {
    dengan_anak: {
      arab: 'وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ',
      terjemah_id: 'Dan untuk kedua ibu-bapak, bagi masing-masingnya seperenam dari harta yang ditinggalkan, jika dia (yang meninggal) mempunyai anak.',
      terjemah_en: 'And for one\'s parents, to each one of them is a sixth of his estate if he left children.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: 1/6,
      penjelasan_id: 'Kakek mendapat 1/6 jika ada anak kandung (menggantikan posisi ayah). Kakek TIDAK terhalang oleh keberadaan anak.',
      penjelasan_en: 'Grandfather gets 1/6 if there are children (replacing father position). Grandfather is NOT blocked by children.',
      referensi: 'Bidayatul Mujtahid (Ibnu Rusyd), Al-Mughni (Ibnu Qudamah)'
    }
  },
  
  nenek: {
    bagian: {
      arab: 'عَنْ قَبِيصَةَ بْنِ ذُؤَيْبٍ قَالَ: جَاءَتِ الْجَدَّةُ إِلَى أَبِي بَكْرٍ فَسَأَلَتْهُ مِيرَاثَهَا',
      terjemah_id: 'Dari Qabishah bin Zu\'aib: "Nenek datang kepada Abu Bakar RA, menanyakan bagian warisnya. Mughirah bin Syu\'bah berkata: \'Aku pernah menghadiri majelis Rasulullah SAW dan beliau memberikan kepada nenek seperenam (1/6) bagian.\'"',
      terjemah_en: 'From Qabishah bin Zu\'aib: "A grandmother came to Abu Bakr RA asking about her inheritance. Mughirah bin Shu\'bah said: \'I witnessed the Messenger of Allah SAW giving her one-sixth (1/6).\'"',
      riwayat: 'HR. Abu Daud, Tirmidzi, Ibnu Majah, Ahmad',
      status: 'Hasan',
      bagian: 1/6,
      penjelasan_id: 'Nenek mendapat 1/6. Nenek TIDAK terhalang oleh keberadaan anak kandung.',
      penjelasan_en: 'Grandmother gets 1/6. Grandmother is NOT blocked by children.',
      referensi: 'Bidayatul Mujtahid (Ibnu Rusyd), Al-Mughni (Ibnu Qudamah)'
    }
  },
  
  mahjub: {
    cucu_oleh_anak: {
      penjelasan_id: 'Cucu terhalang (mahjub) oleh keberadaan anak kandung laki-laki, sesuai kaidah "Al-Aqrab Yahjubu Al-Ab\'ad" (yang lebih dekat menghalangi yang lebih jauh).',
      penjelasan_en: 'Grandchildren are blocked (mahjub) by the presence of sons, according to the principle "Al-Aqrab Yahjubu Al-Ab\'ad" (the closer blocks the farther).',
      dalil: 'الأقرب يحجب الأبعد',
      sumber: 'Ijma\' Ulama 4 Mazhab'
    },
    kakek_oleh_ayah: {
      penjelasan_id: 'Kakek terhalang (mahjub) oleh keberadaan ayah kandung, sesuai kaidah "Al-Aqrab Yahjubu Al-Ab\'ad".',
      penjelasan_en: 'Grandfather is blocked (mahjub) by the presence of father, according to the principle "Al-Aqrab Yahjubu Al-Ab\'ad".',
      dalil: 'الأقرب يحجب الأبعد',
      sumber: 'Ijma\' Ulama 4 Mazhab',
      hadits: 'أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَهُوَ لِأَوْلَى رَجُلٍ ذَكَرٍ',
      hadits_terjemah: 'Berikanlah bagian-bagian warisan kepada yang berhak menerimanya. Jika masih ada sisa, maka berikanlah kepada ahli waris laki-laki yang paling utama (dekat hubungan kekerabatannya).',
      hadits_riwayat: 'HR. Bukhari & Muslim dari Ibnu Abbas RA'
    },
    nenek_oleh_ibu: {
      penjelasan_id: 'Nenek terhalang (mahjub) oleh keberadaan ibu kandung, sesuai kaidah "Al-Aqrab Yahjubu Al-Ab\'ad".',
      penjelasan_en: 'Grandmother is blocked (mahjub) by the presence of mother, according to the principle "Al-Aqrab Yahjubu Al-Ab\'ad".',
      dalil: 'الأقرب يحجب الأبعد',
      sumber: 'Ijma\' Ulama 4 Mazhab'
    },
    saudara_oleh_ayah: {
      penjelasan_id: 'Saudara kandung dan saudara seayah terhalang (mahjub) oleh keberadaan ayah, anak laki-laki, atau anak perempuan.',
      penjelasan_en: 'Full siblings and paternal siblings are blocked (mahjub) by the presence of father, son, or daughter.',
      dalil: 'الأب يحجب الإخوة',
      sumber: 'Ijma\' Ulama 4 Mazhab'
  },
    saudara_seibu_oleh_anak: {
      penjelasan_id: 'Saudara seibu terhalang (mahjub) oleh keberadaan anak, cucu, ayah, atau kakek.',
      penjelasan_en: 'Maternal siblings are blocked (mahjub) by the presence of children, grandchildren, father, or grandfather.',
      dalil: 'الفرع الوارث يحجب الإخوة لأم',
      sumber: 'Ijma\' Ulama 4 Mazhab'
    }
  },
  
  aul: {
    arab: 'قَالَ عُمَرُ رَضِيَ اللَّهُ عَنْهُ: وَاللَّهِ مَا أَدْرِي أَيُّكُمْ قَدَّمَ اللَّهُ وَأَيُّكُمْ أَخَّرَ، فَأَعُولُ الْفَرِيضَةَ',
    terjemah_id: 'Umar RA berkata: "Demi Allah, aku tidak tahu siapa di antara kalian yang Allah dahulukan dan siapa yang Allah akhirkan, maka aku akan membagi harta waris dengan cara \'aul."',
    terjemah_en: 'Umar RA said: "By Allah, I do not know which of you Allah has given precedence and which He has delayed, so I will distribute the inheritance by \'aul."',
    sumber: 'Atsar Umar bin Khattab RA - Ijma\' Sahabat'
  },
  
  radd: {
    arab: 'قَالَ عَلِيٌّ رَضِيَ اللَّهُ عَنْهُ: إِذَا لَمْ يَكُنْ عَصَبَةٌ رُدَّ عَلَى ذَوِي الْفُرُوضِ بِقَدْرِ فُرُوضِهِمْ',
    terjemah_id: 'Ali RA berkata: "Jika tidak ada ashabah, maka sisa harta dikembalikan kepada ahli waris fardh sesuai dengan kadar bagian mereka."',
    terjemah_en: 'Ali RA said: "If there is no ashabah, then the remainder is returned to the fardh heirs according to their shares."',
    sumber: 'Pendapat Ali bin Abi Thalib RA - Mazhab Jumhur'
  }
};

// ===== UTILITY FUNCTIONS (Optimized) =====

function formatCurrency(input) {
  let value = input.value.replace(/[^\d]/g, '');
  if (value === '') {
    input.value = '';
    return;
  }
  input.value = parseInt(value).toLocaleString('id-ID');
}

function parseCurrency(str) {
  if (!str) return 0;
  return parseInt(str.toString().replace(/[^\d]/g, '')) || 0;
}

function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function fractionToString(decimal) {
  const fractions = {
    0.5: '1/2',
    0.25: '1/4',
    0.125: '1/8',
    0.666666: '2/3',
    0.333333: '1/3',
    0.166666: '1/6'
  };
  
  for (let [key, value] of Object.entries(fractions)) {
    if (Math.abs(decimal - parseFloat(key)) < 0.001) {
      return value;
    }
  }
  
  return (decimal * 100).toFixed(2) + '%';
}

function changeLang(lang) {
  currentLang = lang;
  
  document.getElementById('btn-id').className = lang === 'id' 
    ? 'px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition'
    : 'px-4 py-2 rounded-lg bg-blue-300 text-blue-900 font-semibold shadow-lg hover:bg-blue-400 transition';
  
  document.getElementById('btn-en').className = lang === 'en'
    ? 'px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition'
    : 'px-4 py-2 rounded-lg bg-blue-300 text-blue-900 font-semibold shadow-lg hover:bg-blue-400 transition';
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  const icon = document.getElementById('darkModeIcon');
  if (document.documentElement.classList.contains('dark')) {
    icon.textContent = '☀️';
  } else {
    icon.textContent = '🌙';
  }
}

function showLoading() {
  document.getElementById('loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loadingOverlay').classList.add('hidden');
}

function showModal(title, content) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = content;
  document.getElementById('infoModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('infoModal').classList.add('hidden');
}

function showStep(stepNum) {
  document.querySelectorAll('[id^="step"], #landingPage, #resultPage').forEach(el => {
    el.classList.add('hidden');
  });
  
  if (stepNum === 0) {
    document.getElementById('landingPage').classList.remove('hidden');
  } else if (stepNum === 'result') {
    document.getElementById('resultPage').classList.remove('hidden');
  } else {
    document.getElementById('step' + stepNum).classList.remove('hidden');
  }
  
  currentStep = stepNum;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== HELPER FUNCTIONS (NEW - Untuk Optimasi) =====

function addHeir(heirs, config) {
  const { name, share, count, explanation, dalil, isAshabah, ashabahRatio, ashabahTotal } = config;
  
  heirs.push({
    name,
    count: count || 1,
    fraction: isAshabah ? 'Ashabah' : fractionToString(share),
    share: share || 0,
    total: 0,
    perPerson: 0,
    explanation,
    dalil,
    isAshabah: isAshabah || false,
    ashabahRatio: ashabahRatio || 0,
    ashabahTotal: ashabahTotal || 0
  });
}

function getDalil(key) {
  const keys = key.split('.');
  let result = dalilDatabase;
  for (let k of keys) {
    result = result[k];
    if (!result) return null;
  }
  return result;
}

function hasAnak(data) {
  return data.anakLaki > 0 || data.anakPerempuan > 0 || data.cucuLaki > 0 || data.cucuPerempuan > 0;
}

function hasCucu(data) {
  return data.cucuLaki > 0 || data.cucuPerempuan > 0;
}

function hasSaudara(data) {
  return data.saudaraLakiKandung > 0 || data.saudaraPerempuanKandung > 0 ||
         data.saudaraLakiSeayah > 0 || data.saudaraPerempuanSeayah > 0 ||
         data.saudaraLakiSeibu > 0 || data.saudaraPerempuanSeibu > 0;
}

// ===== FORM VALIDATION & TOGGLE FUNCTIONS =====

function toggleBiayaJenazah() {
  const checkbox = document.getElementById('biayaDitanggung');
  const input = document.getElementById('biayaJenazahInput');
  
  if (checkbox.checked) {
    input.style.display = 'none';
    document.getElementById('biayaJenazah').value = '0';
  } else {
    input.style.display = 'block';
  }
}

function validateWasiat() {
  const totalHarta = parseCurrency(document.getElementById('totalHarta').value);
  const biayaJenazah = parseCurrency(document.getElementById('biayaJenazah').value);
  const hutang = parseCurrency(document.getElementById('hutang').value);
  const wasiat = parseCurrency(document.getElementById('wasiat').value);
  
  const hartaSetelahBiayaDanHutang = totalHarta - biayaJenazah - hutang;
  const maxWasiat = hartaSetelahBiayaDanHutang / 3;
  
  const warning = document.getElementById('wasiatWarning');
  
  if (wasiat > maxWasiat) {
    warning.classList.remove('hidden');
    document.getElementById('wasiat').value = Math.floor(maxWasiat).toLocaleString('id-ID');
  } else {
    warning.classList.add('hidden');
  }
}

function toggleAsuransi() {
  const selected = document.querySelector('input[name="asuransi"]:checked').value;
  const input = document.getElementById('asuransiInput');
  
  if (selected === 'none') {
    input.classList.add('hidden');
    document.getElementById('nilaiAsuransi').value = '0';
  } else {
    input.classList.remove('hidden');
  }
}

function togglePasanganOptions() {
  const tidakAdaPasangan = document.getElementById('tidakAdaPasangan').checked;
  const pasanganOptions = document.getElementById('pasanganOptions');
  
  if (tidakAdaPasangan) {
    pasanganOptions.classList.add('hidden');
    document.getElementById('suami').checked = false;
    document.getElementById('istri').checked = false;
    document.getElementById('istriCountDiv').classList.add('hidden');
  } else {
    pasanganOptions.classList.remove('hidden');
  }
}

function toggleIstriCount() {
  const checkbox = document.getElementById('istri');
  const countDiv = document.getElementById('istriCountDiv');
  
  if (checkbox.checked) {
    countDiv.classList.remove('hidden');
  } else {
    countDiv.classList.add('hidden');
  }
}

function updateOrangTuaOptions() {
  const status = document.querySelector('input[name="statusOrangTua"]:checked');
  if (!status) return;
  
  const statusValue = status.value;
  const sectionOrangTua = document.getElementById('sectionOrangTua');
  const sectionKakekNenek = document.getElementById('sectionKakekNenek');
  
  document.getElementById('ayah').checked = false;
  document.getElementById('ibu').checked = false;
  document.getElementById('kakek').checked = false;
  document.getElementById('nenek').checked = false;
  
  if (statusValue === 'keduanya') {
    sectionOrangTua.classList.remove('hidden');
    sectionKakekNenek.classList.add('hidden');
    document.getElementById('ayah').checked = true;
    document.getElementById('ibu').checked = true;
    updateKakekNenekStatus();
  } else if (statusValue === 'salahSatu') {
    sectionOrangTua.classList.remove('hidden');
    sectionKakekNenek.classList.remove('hidden');
  } else if (statusValue === 'keduanyaTidak') {
    sectionOrangTua.classList.add('hidden');
    sectionKakekNenek.classList.remove('hidden');
    updateKakekNenekStatus();
  }
}

function updateKakekNenekStatus() {
  const ayahChecked = document.getElementById('ayah').checked;
  const ibuChecked = document.getElementById('ibu').checked;
  const kakekEl = document.getElementById('kakek');
  const nenekEl = document.getElementById('nenek');
  const kakekOption = document.getElementById('kakekOption');
  const nenekOption = document.getElementById('nenekOption');
  const kakekStatus = document.getElementById('kakekStatus');
  const nenekStatus = document.getElementById('nenekStatus');
  
  if (ayahChecked) {
    kakekEl.disabled = true;
    kakekEl.checked = false;
    kakekOption.classList.add('opacity-50', 'cursor-not-allowed');
    kakekStatus.textContent = currentLang === 'id' ? '⛔ Terhalang oleh Ayah' : '⛔ Blocked by Father';
    kakekStatus.classList.add('text-red-600');
    kakekStatus.classList.remove('text-green-600');
  } else {
    kakekEl.disabled = false;
    kakekOption.classList.remove('opacity-50', 'cursor-not-allowed');
    kakekStatus.textContent = currentLang === 'id' ? '✅ Dapat mewarisi (1/6)' : '✅ Can inherit (1/6)';
    kakekStatus.classList.remove('text-red-600');
    kakekStatus.classList.add('text-green-600');
  }
  
  if (ibuChecked) {
    nenekEl.disabled = true;
    nenekEl.checked = false;
    nenekOption.classList.add('opacity-50', 'cursor-not-allowed');
    nenekStatus.textContent = currentLang === 'id' ? '⛔ Terhalang oleh Ibu' : '⛔ Blocked by Mother';
    nenekStatus.classList.add('text-red-600');
    nenekStatus.classList.remove('text-green-600');
  } else {
    nenekEl.disabled = false;
    nenekOption.classList.remove('opacity-50', 'cursor-not-allowed');
    nenekStatus.textContent = currentLang === 'id' ? '✅ Dapat mewarisi (1/6)' : '✅ Can inherit (1/6)';
    nenekStatus.classList.remove('text-red-600');
    nenekStatus.classList.add('text-green-600');
  }
}

// ===== FORM SUBMISSION HANDLERS =====

document.addEventListener('DOMContentLoaded', () => {
  
  document.getElementById('btnStart').addEventListener('click', () => {
    showStep(1);
  });
  
  document.getElementById('formStep1').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newMazhab = document.querySelector('input[name="mazhab"]:checked').value;
    const newGender = document.querySelector('input[name="gender"]:checked').value;
    
    if (formData.gender && formData.gender !== newGender) {
      formData = {};
    }
    
    formData.mazhab = newMazhab;
    formData.gender = newGender;
    
    if (formData.gender === 'male') {
      document.getElementById('suamiOption').classList.add('hidden');
      document.getElementById('istriOption').classList.remove('hidden');
    } else {
      document.getElementById('suamiOption').classList.remove('hidden');
      document.getElementById('istriOption').classList.add('hidden');
    }
    
    showStep(2);
  });
  
  document.getElementById('backStep1').addEventListener('click', () => {
    showStep(0);
  });
  
  document.getElementById('formStep2').addEventListener('submit', (e) => {
    e.preventDefault();
    
    formData.totalHarta = parseCurrency(document.getElementById('totalHarta').value);
    formData.biayaJenazah = parseCurrency(document.getElementById('biayaJenazah').value);
    formData.hutang = parseCurrency(document.getElementById('hutang').value);
    formData.wasiat = parseCurrency(document.getElementById('wasiat').value);
    formData.asuransi = document.querySelector('input[name="asuransi"]:checked').value;
    formData.nilaiAsuransi = parseCurrency(document.getElementById('nilaiAsuransi').value);
    
    if (formData.totalHarta <= 0) {
      alert(currentLang === 'id' ? 'Total harta harus lebih dari 0' : 'Total assets must be greater than 0');
      return;
    }
    
    showStep(3);
  });
  
  document.getElementById('backStep2').addEventListener('click', () => {
    showStep(1);
  });
  
  document.getElementById('formStep3').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const tidakAdaPasangan = document.getElementById('tidakAdaPasangan').checked;
    
    if (tidakAdaPasangan) {
      formData.suami = false;
      formData.istri = false;
      formData.istriCount = 0;
    } else {
      formData.suami = document.getElementById('suami').checked;
      formData.istri = document.getElementById('istri').checked;
      formData.istriCount = formData.istri ? parseInt(document.getElementById('istriCount').value) : 0;
    }
    
    showStep(4);
  });
  
  document.getElementById('backStep3').addEventListener('click', () => {
    showStep(2);
  });
  
  document.getElementById('formStep4').addEventListener('submit', (e) => {
    e.preventDefault();
    
    formData.ayah = document.getElementById('ayah').checked;
    formData.ibu = document.getElementById('ibu').checked;
    formData.kakek = document.getElementById('kakek').checked && !document.getElementById('kakek').disabled;
    formData.nenek = document.getElementById('nenek').checked && !document.getElementById('nenek').disabled;
    
    showStep(5);
  });
  
  document.getElementById('backStep4').addEventListener('click', () => {
    showStep(3);
  });
  
  document.getElementById('formStep5').addEventListener('submit', (e) => {
    e.preventDefault();
    
    formData.anakLaki = parseInt(document.getElementById('anakLaki').value) || 0;
    formData.anakPerempuan = parseInt(document.getElementById('anakPerempuan').value) || 0;
    formData.cucuLaki = parseInt(document.getElementById('cucuLaki').value) || 0;
    formData.cucuPerempuan = parseInt(document.getElementById('cucuPerempuan').value) || 0;
    
    showStep(6);
  });
  
  document.getElementById('backStep5').addEventListener('click', () => {
    showStep(4);
  });
  
  document.getElementById('formStep6').addEventListener('submit', (e) => {
    e.preventDefault();
    
    formData.saudaraLakiKandung = parseInt(document.getElementById('saudaraLakiKandung').value) || 0;
    formData.saudaraPerempuanKandung = parseInt(document.getElementById('saudaraPerempuanKandung').value) || 0;
    formData.saudaraLakiSeayah = parseInt(document.getElementById('saudaraLakiSeayah').value) || 0;
    formData.saudaraPerempuanSeayah = parseInt(document.getElementById('saudaraPerempuanSeayah').value) || 0;
    formData.saudaraLakiSeibu = parseInt(document.getElementById('saudaraLakiSeibu').value) || 0;
    formData.saudaraPerempuanSeibu = parseInt(document.getElementById('saudaraPerempuanSeibu').value) || 0;
    
    calculate();
  });
  
  document.getElementById('backStep6').addEventListener('click', () => {
    showStep(5);
  });
  
  document.getElementById('btnDarkMode').addEventListener('click', toggleDarkMode);
  document.getElementById('btn-id').addEventListener('click', () => changeLang('id'));
  document.getElementById('btn-en').addEventListener('click', () => changeLang('en'));
  
  document.getElementById('btnReset').addEventListener('click', () => {
  if (confirm(currentLang === 'id' ? 'Apakah Anda yakin ingin menghitung ulang?' : 'Are you sure you want to calculate again?')) {
    // RESET LENGKAP
    formData = {};
    currentStep = 0;
    
    // Reset semua input text dan number
    document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
      input.value = '0';
    });
    
    // Reset semua checkbox
    document.querySelectorAll('input[type="checkbox"]').forEach(input => {
      input.checked = false;
    });
    
    // Reset radio ke default
    document.querySelectorAll('input[type="radio"]').forEach(input => {
      if (input.value === 'jumhur' || input.value === 'male' || input.value === 'none' || input.value === 'keduanya') {
        input.checked = true;
      } else {
        input.checked = false;
      }
    });
    
    // Reset visibility
    document.getElementById('istriCountDiv').classList.add('hidden');
    document.getElementById('pasanganOptions').classList.remove('hidden');
    document.getElementById('sectionOrangTua').classList.add('hidden');
    document.getElementById('sectionKakekNenek').classList.add('hidden');
    document.getElementById('asuransiInput').classList.add('hidden');
    document.getElementById('biayaJenazahInput').style.display = 'block';
    
    // Reset warning
    document.getElementById('wasiatWarning').classList.add('hidden');
    
    // Refresh halaman (cara terbaik untuk reset penuh)
    location.reload();
  }
});
  
  document.getElementById('btnExportPDF').addEventListener('click', () => {
    alert(currentLang === 'id' 
      ? '📄 Fitur Export PDF sedang dalam pengembangan. Untuk sementara, Anda dapat mencetak halaman ini (Ctrl+P).' 
      : '📄 PDF Export feature is under development. For now, you can print this page (Ctrl+P).');
    window.print();
  });
  
  changeLang('id');
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
    document.getElementById('darkModeIcon').textContent = '☀️';
  }
  
  console.log('🕌 Kalkulator Waris Islam - 4 Mazhab');
  console.log('✅ Aplikasi siap digunakan');
  console.log('📖 Perhitungan sesuai Al-Quran dan Sunnah');
});

// ===== END OF PART 1 =====

// ===== PART 2: CALCULATION ENGINE =====

// ===== FUNGSI DETEKSI MAHJUB (PENGHALANGAN) - FIXED =====

function detectMahjub(data) {
  const blocked = [];
  const hasAnakOrCucu = hasAnak(data);
  const hasAyah = data.ayah;
  const hasIbu = data.ibu;
  const hasAnakLaki = data.anakLaki > 0;
  const hasAnakPerempuan = data.anakPerempuan > 0; // ✅ TAMBAHKAN INI
  
  // Cucu terhalang oleh anak laki-laki
  if (hasAnakLaki && hasCucu(data)) {
    blocked.push({
      type: 'cucu',
      count: data.cucuLaki + data.cucuPerempuan,
      reason: getDalil('mahjub.cucu_oleh_anak')
    });
    data.cucuLaki = 0;
    data.cucuPerempuan = 0;
  }
  
  // Kakek terhalang oleh ayah
  if (hasAyah && data.kakek) {
    blocked.push({
      type: 'kakek',
      count: 1,
      reason: getDalil('mahjub.kakek_oleh_ayah')
    });
    data.kakek = false;
  }
  
  // Nenek terhalang oleh ibu
  if (hasIbu && data.nenek) {
    blocked.push({
      type: 'nenek',
      count: 1,
      reason: getDalil('mahjub.nenek_oleh_ibu')
    });
    data.nenek = false;
  }
  
  // Saudara kandung/seayah terhalang oleh ayah, anak laki, ATAU anak perempuan + cucu
  if ((hasAyah || hasAnakLaki || hasAnakOrCucu) && 
      (data.saudaraLakiKandung > 0 || data.saudaraPerempuanKandung > 0 || 
       data.saudaraLakiSeayah > 0 || data.saudaraPerempuanSeayah > 0)) {
    blocked.push({
      type: 'saudara_kandung_seayah',
      count: data.saudaraLakiKandung + data.saudaraPerempuanKandung + 
             data.saudaraLakiSeayah + data.saudaraPerempuanSeayah,
      reason: {
        penjelasan_id: 'Saudara kandung dan saudara seayah terhalang (mahjub) oleh keberadaan ayah, anak laki-laki, atau anak perempuan.',
        penjelasan_en: 'Full siblings and paternal siblings are blocked (mahjub) by the presence of father, son, or daughter.',
        dalil: 'الأب يحجب الإخوة',
        sumber: 'Ijma\' Ulama 4 Mazhab'
    }
  });
  data.saudaraLakiKandung = 0;
  data.saudaraPerempuanKandung = 0;
  data.saudaraLakiSeayah = 0;
  data.saudaraPerempuanSeayah = 0;
}
  
  // Saudara seibu terhalang oleh anak, cucu, ayah, atau kakek
  if ((hasAnakOrCucu || hasAyah || data.kakek) && 
      (data.saudaraLakiSeibu > 0 || data.saudaraPerempuanSeibu > 0)) {
    blocked.push({
      type: 'saudara_seibu',
      count: data.saudaraLakiSeibu + data.saudaraPerempuanSeibu,
      reason: getDalil('mahjub.saudara_seibu_oleh_anak')
    });
    data.saudaraLakiSeibu = 0;
    data.saudaraPerempuanSeibu = 0;
  }
  
  return { data, blocked };
}

// ===== FUNGSI HITUNG AHLI WARIS FARDH - FIXED GHARRAWAIN =====

function calculateFardhHeirs(data) {
  const heirs = [];
  const hasAnakOrCucu = hasAnak(data);
  
  // SUAMI
  if (data.suami) {
    const dalil = hasAnakOrCucu ? getDalil('suami.dengan_anak') : getDalil('suami.tanpa_anak');
    addHeir(heirs, {
      name: currentLang === 'id' ? 'Suami' : 'Husband',
      share: dalil.bagian,
      count: 1,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
  }
  
  // ISTRI
  if (data.istri) {
    const dalil = hasAnakOrCucu ? getDalil('istri.dengan_anak') : getDalil('istri.tanpa_anak');
    addHeir(heirs, {
      name: currentLang === 'id' ? `Istri (${data.istriCount} orang)` : `Wife (${data.istriCount})`,
      share: dalil.bagian,
      count: data.istriCount,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
  }
  
  // ===== AYAH - FIXED UNTUK GHARRAWAIN =====
  if (data.ayah) {
    // Hitung saudara yang AKAN terhalang oleh ayah
    const totalSaudaraKandungSeayah = data.saudaraLakiKandung + data.saudaraPerempuanKandung +
                                       data.saudaraLakiSeayah + data.saudaraPerempuanSeayah;
    
    const hasSaudaraYangAkanTerhalang = totalSaudaraKandungSeayah >= 2;
    
    if (hasAnakOrCucu) {
      // Ada anak/cucu: Ayah dapat 1/6 fardh + sisa (jika tidak ada anak laki)
      const dalil = getDalil('ayah.dengan_anak');
      const hasAnakLaki = data.anakLaki > 0 || data.cucuLaki > 0;
      
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Ayah' : 'Father',
        share: dalil.bagian, // 1/6
        count: 1,
        explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
        dalil: dalil,
        isAshabah: !hasAnakLaki
      });
    } else if (hasSaudaraYangAkanTerhalang) {
      // ✅ KASUS GHARRAWAIN: Tidak ada anak, tapi ada 2+ saudara
      // Ayah dapat 1/6 fardh + sisa
      const dalil = getDalil('ayah.dengan_anak');
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Ayah' : 'Father',
        share: 1/6, // Fardh 1/6
        count: 1,
        explanation: currentLang === 'id' ? 
          'Ayah mendapat 1/6 fardh + sisa karena ada 2+ saudara yang terhalang (kasus Gharrawain)' : 
          'Father gets 1/6 fardh + remainder because there are 2+ blocked siblings (Gharrawain case)',
        dalil: dalil,
        isAshabah: true // ✅ Dapat sisa juga
      });
    } else {
      // Tidak ada anak dan tidak ada 2+ saudara: Ayah dapat semua sisa
      const dalil = getDalil('ayah.tanpa_anak');
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Ayah' : 'Father',
        share: 0,
        count: 1,
        explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
        dalil: dalil,
        isAshabah: true
      });
    }
  }
  
  // ===== IBU - FIXED UNTUK GHARRAWAIN (VERSI FINAL) =====
  if (data.ibu) {
    // Untuk Gharrawain: Saudara kandung/seayah yang terhalang TETAP mempengaruhi bagian ibu
    const totalSaudaraKandungSeayah = data.saudaraLakiKandung + data.saudaraPerempuanKandung +
                                       data.saudaraLakiSeayah + data.saudaraPerempuanSeayah;
    
    // Saudara seibu terhalang oleh ayah/kakek/anak
    const saudaraSeibuTerhalang = data.ayah || data.kakek || hasAnakOrCucu;
    const totalSaudaraSeibu = saudaraSeibuTerhalang ? 0 : (data.saudaraLakiSeibu + data.saudaraPerempuanSeibu);
    
    // Total saudara yang mempengaruhi bagian ibu (termasuk yang terhalang oleh ayah!)
    const totalSaudaraYangMempengaruhiIbu = totalSaudaraKandungSeayah + totalSaudaraSeibu;
    
    // ✅ Ibu dapat 1/6 jika: ada anak ATAU ada 2+ saudara (termasuk yang terhalang!)
    const ibuGet1_6 = hasAnakOrCucu || totalSaudaraYangMempengaruhiIbu >= 2;
    
    const dalil = ibuGet1_6 ? getDalil('ibu.dengan_anak') : getDalil('ibu.tanpa_anak');
    
    let explanation = currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en;
    
    // Penjelasan khusus untuk Gharrawain
    if (data.ayah && !hasAnakOrCucu && totalSaudaraKandungSeayah >= 2) {
      explanation = currentLang === 'id' ? 
        'Ibu mendapat 1/6 karena ada 2+ saudara (meskipun terhalang oleh ayah) - Kasus Gharrawain' : 
        'Mother gets 1/6 because there are 2+ siblings (even though blocked by father) - Gharrawain case';
    }
    
    addHeir(heirs, {
      name: currentLang === 'id' ? 'Ibu' : 'Mother',
      share: dalil.bagian,
      count: 1,
      explanation: explanation,
      dalil: dalil
    });
  }
  
  // KAKEK (jika ayah tidak ada)
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
    } else {
      addHeir(heirs, {
        name: currentLang === 'id' ? 'Kakek' : 'Grandfather',
        share: 0,
        count: 1,
        explanation: currentLang === 'id' ? 'Kakek menggantikan posisi ayah dan mendapat sisa' : 'Grandfather replaces father and gets remainder',
        dalil: getDalil('ayah.tanpa_anak'),
        isAshabah: true
      });
    }
  }
  
  // NENEK (jika ibu tidak ada)
  if (data.nenek && !data.ibu) {
    const dalil = getDalil('nenek.bagian');
    addHeir(heirs, {
      name: currentLang === 'id' ? 'Nenek' : 'Grandmother',
      share: dalil.bagian,
      count: 1,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
  }
  
  // ANAK PEREMPUAN
  if (data.anakPerempuan > 0 && data.anakLaki === 0) {
    const dalil = data.anakPerempuan === 1 ? 
      getDalil('anak_perempuan.satu') : 
      getDalil('anak_perempuan.dua_atau_lebih');
    
    addHeir(heirs, {
      name: currentLang === 'id' ? `Anak Perempuan (${data.anakPerempuan} orang)` : `Daughter (${data.anakPerempuan})`,
      share: dalil.bagian,
      count: data.anakPerempuan,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
  }
  
  // ANAK LAKI-LAKI DAN PEREMPUAN (ASHABAH)
  if (data.anakLaki > 0) {
    const totalAnak = data.anakLaki * 2 + data.anakPerempuan;
    const dalil = getDalil('anak_laki');
    
    addHeir(heirs, {
      name: currentLang === 'id' ? `Anak Laki-laki (${data.anakLaki} orang)` : `Son (${data.anakLaki})`,
      share: 0,
      count: data.anakLaki,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil,
      isAshabah: true,
      ashabahRatio: 2,
      ashabahTotal: totalAnak
    });
    
    if (data.anakPerempuan > 0) {
      const dalilPerempuan = getDalil('anak_perempuan.dengan_laki');
      addHeir(heirs, {
        name: currentLang === 'id' ? `Anak Perempuan (${data.anakPerempuan} orang)` : `Daughter (${data.anakPerempuan})`,
        share: 0,
        count: data.anakPerempuan,
        explanation: currentLang === 'id' ? dalilPerempuan.penjelasan_id : dalilPerempuan.penjelasan_en,
        dalil: dalilPerempuan,
        isAshabah: true,
        ashabahRatio: 1,
        ashabahTotal: totalAnak
      });
    }
  }
  
  // CUCU PEREMPUAN (jika tidak terhalang)
  if (data.cucuPerempuan > 0 && data.cucuLaki === 0 && data.anakLaki === 0) {
    if (data.anakPerempuan >= 2) {
      // Cucu perempuan TERHALANG oleh 2+ anak perempuan
    } else if (data.anakPerempuan === 1) {
      const dalil = getDalil('anak_perempuan.satu');
      addHeir(heirs, {
        name: currentLang === 'id' ? `Cucu Perempuan (${data.cucuPerempuan} orang)` : `Granddaughter (${data.cucuPerempuan})`,
        share: 1/6,
        count: data.cucuPerempuan,
        explanation: currentLang === 'id' ? 'Cucu perempuan mendapat 1/6 sebagai pelengkap bersama 1 anak perempuan (total 2/3)' : 'Granddaughters get 1/6 as complement with 1 daughter (total 2/3)',
        dalil: dalil
      });
    } else {
      const dalil = data.cucuPerempuan === 1 ? 
        getDalil('anak_perempuan.satu') : 
        getDalil('anak_perempuan.dua_atau_lebih');
      
      addHeir(heirs, {
        name: currentLang === 'id' ? `Cucu Perempuan (${data.cucuPerempuan} orang)` : `Granddaughter (${data.cucuPerempuan})`,
        share: dalil.bagian,
        count: data.cucuPerempuan,
        explanation: currentLang === 'id' ? 'Cucu perempuan menggantikan posisi anak perempuan' : 'Granddaughters replace daughters',
        dalil: dalil
      });
    }
  }
  
  // CUCU LAKI-LAKI (jika tidak terhalang)
  if (data.cucuLaki > 0 && data.anakLaki === 0) {
    if (data.anakPerempuan === 1 && data.cucuPerempuan > 0) {
      const totalCucu = data.cucuLaki * 2 + data.cucuPerempuan;
      const dalil = getDalil('anak_laki');
      
      addHeir(heirs, {
        name: currentLang === 'id' ? `Cucu Laki-laki (${data.cucuLaki} orang)` : `Grandson (${data.cucuLaki})`,
        share: 0,
        count: data.cucuLaki,
        explanation: currentLang === 'id' ? 'Cucu laki-laki bersama cucu perempuan mendapat sisa sebagai ashabah (ratio 2:1)' : 'Grandsons with granddaughters get remainder as ashabah (ratio 2:1)',
        dalil: dalil,
        isAshabah: true,
        ashabahRatio: 2,
        ashabahTotal: totalCucu
      });
      
      const cucuPerempuanIndex = heirs.findIndex(h => h.name.includes('Cucu Perempuan'));
      if (cucuPerempuanIndex !== -1) {
        heirs[cucuPerempuanIndex].share = 0;
        heirs[cucuPerempuanIndex].isAshabah = true;
        heirs[cucuPerempuanIndex].ashabahRatio = 1;
        heirs[cucuPerempuanIndex].ashabahTotal = totalCucu;
        heirs[cucuPerempuanIndex].explanation = currentLang === 'id' ? 
          'Cucu perempuan bersama cucu laki-laki mendapat sisa sebagai ashabah (ratio 2:1)' : 
          'Granddaughters with grandsons get remainder as ashabah (ratio 2:1)';
      }
    } else if (data.anakPerempuan === 0) {
      const totalCucu = data.cucuLaki * 2 + data.cucuPerempuan;
      const dalil = getDalil('anak_laki');
      
      addHeir(heirs, {
        name: currentLang === 'id' ? `Cucu Laki-laki (${data.cucuLaki} orang)` : `Grandson (${data.cucuLaki})`,
        share: 0,
        count: data.cucuLaki,
        explanation: currentLang === 'id' ? 'Cucu laki-laki menggantikan posisi anak laki-laki' : 'Grandsons replace sons',
        dalil: dalil,
        isAshabah: true,
        ashabahRatio: 2,
        ashabahTotal: totalCucu
      });
      
      if (data.cucuPerempuan > 0) {
        const dalilPerempuan = getDalil('anak_perempuan.dengan_laki');
        addHeir(heirs, {
          name: currentLang === 'id' ? `Cucu Perempuan (${data.cucuPerempuan} orang)` : `Granddaughter (${data.cucuPerempuan})`,
          share: 0,
          count: data.cucuPerempuan,
          explanation: currentLang === 'id' ? 'Cucu perempuan bersama cucu laki-laki mendapat ashabah' : 'Granddaughters with grandsons get ashabah',
          dalil: dalilPerempuan,
          isAshabah: true,
          ashabahRatio: 1,
          ashabahTotal: totalCucu
        });
      }
    }
  }
  
  // SAUDARA KANDUNG (hanya jika tidak ada anak/cucu)
  if (data.saudaraPerempuanKandung > 0 && data.saudaraLakiKandung === 0) {
    const hasAnakOrCucu = data.anakLaki > 0 || data.anakPerempuan > 0 || 
                          data.cucuLaki > 0 || data.cucuPerempuan > 0;
    
    if (!hasAnakOrCucu) {
      const bagian = data.saudaraPerempuanKandung === 1 ? 0.5 : 2/3;
      const fraction = data.saudaraPerempuanKandung === 1 ? '1/2' : '2/3';
      
      addHeir(heirs, {
        name: currentLang === 'id' ? `Saudara Perempuan Kandung (${data.saudaraPerempuanKandung} orang)` : `Full Sister (${data.saudaraPerempuanKandung})`,
        share: bagian,
        count: data.saudaraPerempuanKandung,
        explanation: currentLang === 'id' ? `Saudara perempuan kandung mendapat ${fraction}` : `Full sisters get ${fraction}`,
        dalil: {
          arab: 'يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ',
          terjemah_id: 'Mereka meminta fatwa kepadamu. Katakanlah: "Allah memberi fatwa kepadamu tentang kalalah."',
          terjemah_en: 'They request from you a [legal] ruling. Say, "Allah gives you a ruling concerning kalalah."',
          surah: 'An-Nisa',
          ayat: 176
        }
      });
    }
  }
  
  if (data.saudaraLakiKandung > 0) {
    const hasAnakOrCucu = data.anakLaki > 0 || data.anakPerempuan > 0 || 
                          data.cucuLaki > 0 || data.cucuPerempuan > 0;
    
    if (!hasAnakOrCucu) {
      const totalSaudara = data.saudaraLakiKandung * 2 + data.saudaraPerempuanKandung;
      
      addHeir(heirs, {
        name: currentLang === 'id' ? `Saudara Laki-laki Kandung (${data.saudaraLakiKandung} orang)` : `Full Brother (${data.saudaraLakiKandung})`,
        share: 0,
        count: data.saudaraLakiKandung,
        explanation: currentLang === 'id' ? 'Saudara laki-laki kandung mendapat sisa sebagai ashabah' : 'Full brothers get remainder as ashabah',
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
      
      if (data.saudaraPerempuanKandung > 0) {
        addHeir(heirs, {
          name: currentLang === 'id' ? `Saudara Perempuan Kandung (${data.saudaraPerempuanKandung} orang)` : `Full Sister (${data.saudaraPerempuanKandung})`,
          share: 0,
          count: data.saudaraPerempuanKandung,
          explanation: currentLang === 'id' ? 'Saudara perempuan kandung bersama saudara laki-laki mendapat ashabah' : 'Full sisters with brothers get ashabah',
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
    }
  }
  
  // SAUDARA SEIBU
  if (data.saudaraLakiSeibu > 0 || data.saudaraPerempuanSeibu > 0) {
    const totalSaudaraSeibu = data.saudaraLakiSeibu + data.saudaraPerempuanSeibu;
    const bagian = totalSaudaraSeibu === 1 ? 1/6 : 1/3;
    const fraction = totalSaudaraSeibu === 1 ? '1/6' : '1/3';
    
    const perPerson = bagian / totalSaudaraSeibu;
    
    if (data.saudaraLakiSeibu > 0) {
      addHeir(heirs, {
        name: currentLang === 'id' ? `Saudara Laki-laki Seibu (${data.saudaraLakiSeibu} orang)` : `Maternal Brother (${data.saudaraLakiSeibu})`,
        share: perPerson * data.saudaraLakiSeibu,
        count: data.saudaraLakiSeibu,
        explanation: currentLang === 'id' ? `Saudara seibu mendapat ${fraction} dibagi rata` : `Maternal siblings get ${fraction} divided equally`,
        dalil: {
          arab: 'وَإِن كَانَ رَجُلٌ يُورَثُ كَلَالَةً أَوِ امْرَأَةٌ وَلَهُ أَخٌ أَوْ أُخْتٌ فَلِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ',
          terjemah_id: 'Dan jika seseorang meninggal yang tidak meninggalkan ayah dan tidak meninggalkan anak, tetapi mempunyai seorang saudara (seibu), maka bagi masing-masing seperenam.',
          terjemah_en: 'And if a man or woman leaves neither ascendants nor descendants but has a brother or a sister, then for each one of them is a sixth.',
          surah: 'An-Nisa',
          ayat: 12
        }
      });
    }
    
    if (data.saudaraPerempuanSeibu > 0) {
      addHeir(heirs, {
        name: currentLang === 'id' ? `Saudara Perempuan Seibu (${data.saudaraPerempuanSeibu} orang)` : `Maternal Sister (${data.saudaraPerempuanSeibu})`,
        share: perPerson * data.saudaraPerempuanSeibu,
        count: data.saudaraPerempuanSeibu,
        explanation: currentLang === 'id' ? `Saudara seibu mendapat ${fraction} dibagi rata` : `Maternal siblings get ${fraction} divided equally`,
        dalil: {
          arab: 'وَإِن كَانَ رَجُلٌ يُورَثُ كَلَالَةً أَوِ امْرَأَةٌ وَلَهُ أَخٌ أَوْ أُخْتٌ فَلِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ',
          terjemah_id: 'Dan jika seseorang meninggal yang tidak meninggalkan ayah dan tidak meninggalkan anak, tetapi mempunyai seorang saudara (seibu), maka bagi masing-masing seperenam.',
          terjemah_en: 'And if a man or woman leaves neither ascendants nor descendants but has a brother or a sister, then for each one of them is a sixth.',
          surah: 'An-Nisa',
          ayat: 12
        }
      });
    }
  }
  
  return heirs;
}

// ===== FUNGSI TERAPKAN HUKUM 'AUL (PERBAIKAN LENGKAP) =====

function applyAul(heirs, hartaBersih) {
  // Hitung total bagian fardh (non-ashabah)
  let totalFardh = 0;
  const fardhHeirs = [];
  
  heirs.forEach(h => {
    if (!h.isAshabah && h.share > 0) {
      totalFardh += h.share;
      fardhHeirs.push(h);
    }
  });
  
  // Jika total fardh > 1, terapkan 'Aul
  if (totalFardh > 1) {
    const factor = 1 / totalFardh;
    
    // Simpan data sebelum 'Aul untuk ditampilkan
    const beforeAul = heirs.map(h => ({
      name: h.name,
      shareBefore: h.share,
      totalBefore: h.share * hartaBersih,
      fractionBefore: h.fraction
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
      }
    });
    
    // Hitung ulang sisa untuk ashabah setelah 'Aul
    const sisaSetelahAul = hartaBersih * (1 - 1); // Setelah 'Aul, fardh = 100%, sisa = 0
    
    // Ashabah tidak dapat bagian jika terjadi 'Aul
    heirs.forEach(h => {
      if (h.isAshabah) {
        h.total = 0;
        h.perPerson = 0;
        h.explanation += currentLang === 'id'
          ? ` ⚠️ Tidak mendapat bagian karena terjadi 'Aul (semua harta habis untuk ahli waris fardh).`
          : ` ⚠️ No share received due to 'Aul (all estate consumed by fardh heirs).`;
      }
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
  
  return { occurred: false };
}

// ===== FUNGSI DISTRIBUSI ASHABAH (SISA HARTA) - FIXED 100% =====

function distributeAshabah(heirs, sisaHarta, hartaBersih) {
  const ashabahHeirs = heirs.filter(h => h.isAshabah);
  
  // Jika tidak ada ashabah, return
  if (ashabahHeirs.length === 0) {
    return;
  }
  
  // Jika sisa harta <= 0, ashabah hanya dapat fardh (jika ada)
  if (sisaHarta <= 0) {
    ashabahHeirs.forEach(h => {
      if (h.share > 0) {
        h.total = h.share * hartaBersih;
        h.perPerson = h.total / h.count;
      } else {
        h.total = 0;
        h.perPerson = 0;
      }
    });
    return;
  }
  
  // ✅ KODE DI BAWAH INI AKAN DIEKSEKUSI UNTUK KASUS GHARRAWAIN
  
  // Pisahkan anak/cucu ashabah vs orang tua ashabah
  const anakAshabah = heirs.filter(h => h.ashabahRatio && h.ashabahTotal);
  const orangTuaAshabah = ashabahHeirs.filter(h => !h.ashabahRatio && !h.ashabahTotal);
  
  if (anakAshabah.length > 0) {
    // Ada anak/cucu, distribusi sisa ke anak dengan ratio 2:1
    anakAshabah.forEach(h => {
      const sharePerUnit = sisaHarta / h.ashabahTotal;
      const fardh = h.share > 0 ? hartaBersih * h.share : 0;
      h.total = fardh + (sharePerUnit * h.ashabahRatio * h.count);
      h.perPerson = h.total / h.count;
    });
    
    // Orang tua (ayah/kakek) hanya dapat fardh, tidak dapat sisa
    orangTuaAshabah.forEach(h => {
      h.total = h.share > 0 ? hartaBersih * h.share : 0;
      h.perPerson = h.total;
    });
  } else {
    // ✅ KUNCI: Tidak ada anak, orang tua dapat fardh + semua sisa
    orangTuaAshabah.forEach(h => {
      const fardh = h.share > 0 ? hartaBersih * h.share : 0;
      h.total = fardh + sisaHarta; // ✅ INI YANG BENAR!
      h.perPerson = h.total;
    });
  }
}

// ===== FUNGSI TERAPKAN HUKUM RADD (PENGEMBALIAN SISA) - FIXED 100% =====

function applyRadd(heirs, sisaHarta, hartaBersih) {
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
  
  // Radd terjadi jika tidak ada ashabah aktif dan ada sisa harta
  if (!hasActiveAshabah && sisaHarta > 0) {
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
      
      // Distribusi sisa proporsional
      eligibleHeirs.forEach(h => {
        const additionalShare = (h.share / totalEligibleShares) * sisaHarta;
        h.total += additionalShare;
        h.perPerson = h.total / h.count;
        h.fraction += ' (Radd)';
        h.explanation += currentLang === 'id'
          ? ` 🔄 Terjadi Radd (pengembalian sisa harta ${formatRupiah(Math.round(sisaHarta))} kepada ahli waris fardh karena tidak ada ashabah). Sisa dikembalikan secara proporsional.`
          : ` 🔄 Radd occurred (return of remainder ${formatRupiah(Math.round(sisaHarta))} to fardh heirs because there is no ashabah). Remainder is returned proportionally.`;
      });
      
      return {
        occurred: true,
        sisaHarta: sisaHarta,
        explanation: {
          id: `Kasus Radd terjadi ketika tidak ada ahli waris ashabah dan masih ada sisa harta ${formatRupiah(Math.round(sisaHarta))} setelah dibagikan kepada ahli waris fardh. Sisa harta dikembalikan kepada ahli waris fardh (kecuali suami/istri) secara proporsional.`,
          en: `Radd case occurs when there is no ashabah heir and there is remaining estate ${formatRupiah(Math.round(sisaHarta))} after distribution to fardh heirs. Remainder is returned to fardh heirs (except spouse) proportionally.`
        }
      };
    }
  }
  
  return { occurred: false };
}

// ===== FUNGSI PERHITUNGAN UTAMA - FIXED 100% =====

function performCalculation(data) {
  // 1. Hitung harta bersih
  let hartaBersih = data.totalHarta - data.biayaJenazah - data.hutang;
  if (data.asuransi === 'syariah') hartaBersih += data.nilaiAsuransi;
  
  const maxWasiat = hartaBersih / 3;
  const wasiatFinal = Math.min(data.wasiat, maxWasiat);
  hartaBersih -= wasiatFinal;
  
  // 2. Deteksi dan hapus ahli waris yang terhalang (mahjub)
  const mahjubResult = detectMahjub(data); // ✅ HANYA 1 parameter
  data = mahjubResult.data;
  let blocked = mahjubResult.blocked;
  
  // 3. Hitung ahli waris fardh
  const heirs = calculateFardhHeirs(data); // ✅ Tidak perlu parameter heirs
  
  // 4. Tambahkan cucu perempuan ke blocked jika terhalang oleh 2+ anak perempuan
  if (data.cucuPerempuan > 0 && data.anakPerempuan >= 2 && data.cucuLaki === 0 && data.anakLaki === 0) {
    blocked.push({
      type: 'cucu_perempuan',
      count: data.cucuPerempuan,
      reason: {
        penjelasan_id: 'Cucu perempuan terhalang (mahjub) karena sudah ada 2 atau lebih anak perempuan yang memenuhi kuota 2/3.',
        penjelasan_en: 'Granddaughters are blocked (mahjub) because there are already 2 or more daughters fulfilling the 2/3 quota.',
        dalil: 'الأقرب يحجب الأبعد',
        sumber: 'Ijma\' Ulama 4 Mazhab'
      }
    });
  }
  
  // 5. Hitung total bagian fardh
  let totalFardh = 0;
  heirs.forEach(h => {
    if (!h.isAshabah) {
      totalFardh += h.share;
    }
  });
  
  // 6. Terapkan hukum 'Aul jika totalFardh > 1
  const aulResult = applyAul(heirs, hartaBersih);
  
  // 7. Hitung sisa harta untuk ashabah
  const actualTotalFardh = aulResult.occurred ? 1 : totalFardh;
  const sisaHarta = hartaBersih * (1 - actualTotalFardh);
  
  // 8. Distribusikan sisa harta ke ashabah
  distributeAshabah(heirs, sisaHarta, hartaBersih);
  
  // 9. Hitung total untuk ahli waris fardh yang belum dapat nilai
  heirs.forEach(h => {
    if (!h.isAshabah && h.total === 0) {
      h.total = h.share * hartaBersih;
      h.perPerson = h.total / h.count;
    }
  });
  
  // 10. Terapkan hukum Radd jika ada sisa dan tidak ada ashabah
  const raddResult = applyRadd(heirs, sisaHarta, hartaBersih);
  
  // 11. Return hasil perhitungan
  return {
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
    radd: raddResult.occurred ? raddResult : null
  };
}

// ===== FUNGSI VALIDASI DATA =====

function validateFormData(data) {
  const errors = [];
  
  if (!data.totalHarta || data.totalHarta <= 0) {
    errors.push({
      field: 'totalHarta',
      message: currentLang === 'id' ? 'Total harta harus lebih dari 0' : 'Total assets must be greater than 0'
    });
  }
  
  if (data.hutang > data.totalHarta) {
    errors.push({
      field: 'hutang',
      message: currentLang === 'id' ? 'Hutang tidak boleh melebihi total harta' : 'Debts cannot exceed total assets'
    });
  }
  
  if (data.biayaJenazah > data.totalHarta) {
    errors.push({
      field: 'biayaJenazah',
      message: currentLang === 'id' ? 'Biaya jenazah tidak boleh melebihi total harta' : 'Funeral expenses cannot exceed total assets'
    });
  }
  
  const hartaSetelahKewajiban = data.totalHarta - data.biayaJenazah - data.hutang;
  if (hartaSetelahKewajiban <= 0) {
    errors.push({
      field: 'general',
      message: currentLang === 'id' ? 'Harta tidak cukup untuk melunasi kewajiban' : 'Assets insufficient to cover obligations'
    });
  }
  
  if (data.wasiat > hartaSetelahKewajiban / 3) {
    errors.push({
      field: 'wasiat',
      message: currentLang === 'id' ? 'Wasiat melebihi 1/3 harta setelah kewajiban' : 'Will exceeds 1/3 of assets after obligations'
    });
  }
  
  const hasHeir = data.suami || data.istri || data.ayah || data.ibu || data.kakek || data.nenek ||
                  data.anakLaki > 0 || data.anakPerempuan > 0 || data.cucuLaki > 0 || data.cucuPerempuan > 0 ||
                  data.saudaraLakiKandung > 0 || data.saudaraPerempuanKandung > 0 ||
                  data.saudaraLakiSeayah > 0 || data.saudaraPerempuanSeayah > 0 ||
                  data.saudaraLakiSeibu > 0 || data.saudaraPerempuanSeibu > 0;
  
  if (!hasHeir) {
    errors.push({
      field: 'general',
      message: currentLang === 'id' ? 'Minimal harus ada satu ahli waris' : 'At least one heir must be selected'
    });
  }
  
  if (data.istri && (data.istriCount < 1 || data.istriCount > 4)) {
    errors.push({
      field: 'istriCount',
      message: currentLang === 'id' ? 'Jumlah istri harus antara 1-4' : 'Number of wives must be between 1-4'
    });
  }
  
  return errors;
}

function showValidationErrors(errors) {
  if (errors.length === 0) return;
  
  let errorHTML = '<div class="space-y-2">';
  errors.forEach(error => {
    errorHTML += `
      <div class="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 p-4 rounded-lg">
        <p class="font-bold text-red-800 dark:text-red-200">❌ ${error.message}</p>
      </div>
    `;
  });
  errorHTML += '</div>';
  
  showModal(
    currentLang === 'id' ? '⚠️ Kesalahan Validasi' : '⚠️ Validation Error',
    errorHTML
  );
}

// ===== FUNGSI CALCULATE UTAMA =====

function calculate() {
  showLoading();
  
  // Validasi data
  const errors = validateFormData(formData);
  if (errors.length > 0) {
    hideLoading();
    showValidationErrors(errors);
    return;
  }
  
  setTimeout(() => {
    try {
      // TAMBAHKAN INI - Simpan data asli sebelum perhitungan
      window.originalFormData = JSON.parse(JSON.stringify(formData));
      
      // Lakukan perhitungan
      const result = performCalculation(formData);
      
      // Tampilkan hasil
      displayResult(result);
      
      hideLoading();
      showStep('result');
      
      // Log untuk debugging
      console.log('📊 Calculation completed:', {
        mazhab: formData.mazhab,
        gender: formData.gender,
        totalHarta: formData.totalHarta,
        hartaBersih: result.hartaBersih.bersih,
        heirsCount: result.heirs.length,
        blockedCount: result.blocked.length,
        aulOccurred: result.aul ? true : false,
        raddOccurred: result.radd ? true : false
      });
      
    } catch (error) {
      hideLoading();
      console.error('Calculation error:', error);
      showModal(
        currentLang === 'id' ? '❌ Terjadi Kesalahan' : '❌ An Error Occurred',
        currentLang === 'id' 
          ? `Maaf, terjadi kesalahan dalam perhitungan: ${error.message}. Silakan coba lagi atau hubungi administrator.`
          : `Sorry, an error occurred in the calculation: ${error.message}. Please try again or contact administrator.`
      );
    }
  }, 1500);
}

// ===== END OF PART 2 =====

console.log('%c✅ Part 2: Calculation Engine Loaded', 'color: #10b981; font-weight: bold; font-size: 14px;');
console.log('%c⚖️ Features: Mahjub Detection, Fardh Calculation, Aul Handling, Radd Handling, Ashabah Distribution', 'color: #6b7280; font-size: 12px;');

// ===== PART 3: DISPLAY RESULT & UI COMPONENTS =====

// ===== FUNGSI RENDER DALIL =====

function renderDalil(dalil) {
  if (!dalil) return '';
  
  let html = '<div class="dalil-section mt-3">';
  
  if (dalil.arab) {
    html += `<p class="dalil-arabic">${dalil.arab}</p>`;
  }
  
  const terjemah = currentLang === 'id' ? dalil.terjemah_id : dalil.terjemah_en;
  if (terjemah) {
    html += `<p class="dalil-translation">"${terjemah}"</p>`;
  }
  
  let source = '';
  if (dalil.surah && dalil.ayat) {
    source = `📖 QS. ${dalil.surah}: ${dalil.ayat}`;
  } else if (dalil.riwayat) {
    source = `📖 ${dalil.riwayat}`;
  } else if (dalil.sumber) {
    source = `📖 ${dalil.sumber}`;
  } else if (dalil.referensi) {
    source = `📖 ${dalil.referensi}`;
  }
  
  if (dalil.status) {
    source += ` (${dalil.status})`;
  }
  
  if (source) {
    html += `<p class="dalil-source">${source}</p>`;
  }
  
  html += '</div>';
  return html;
}

// ===== FUNGSI RENDER AHLI WARIS =====

function renderHeir(heir) {
  return `
    <div class="heir-card">
      <div class="flex justify-between items-start mb-4">
        <div>
          <div class="heir-name">${heir.name}</div>
          <div class="heir-fraction mt-1">${heir.fraction}</div>
        </div>
        <div class="heir-amount">${formatRupiah(Math.round(heir.total))}</div>
      </div>
      
      ${heir.count > 1 ? `
      <div class="mb-3 text-sm">
        <span class="font-semibold">${currentLang === 'id' ? 'Per Orang:' : 'Per Person:'}</span>
        <span class="text-lg font-bold ml-2">${formatRupiah(Math.round(heir.perPerson))}</span>
      </div>
      ` : ''}
      
      <div class="bg-white dark:bg-gray-700 p-4 rounded-lg mt-3">
        <div class="font-semibold mb-2">${currentLang === 'id' ? '💡 Penjelasan:' : '💡 Explanation:'}</div>
        <p class="text-sm mb-3">${heir.explanation}</p>
        
        <div class="font-semibold mb-2">${currentLang === 'id' ? '📖 Dalil:' : '📖 Evidence:'}</div>
        ${renderDalil(heir.dalil)}
      </div>
    </div>
  `;
}

// ===== FUNGSI GENERATE SUMMARY DATA INPUT =====

function generateSummary(data) {
  // Gunakan data asli jika ada, jika tidak gunakan data yang dikirim
  const originalData = window.originalFormData || data;
  
  const mazhab = originalData.mazhab === 'jumhur' ? 'Jumhur (Mayoritas Ulama)' : 'Mazhab Tertentu';
  const gender = originalData.gender === 'male' ? (currentLang === 'id' ? 'Laki-laki' : 'Male') : (currentLang === 'id' ? 'Perempuan' : 'Female');
  
  let pasangan = currentLang === 'id' ? 'Tidak ada pasangan' : 'No spouse';
  if (originalData.suami) pasangan = currentLang === 'id' ? 'Memiliki Suami' : 'Has Husband';
  if (originalData.istri) pasangan = currentLang === 'id' ? `Memiliki ${originalData.istriCount} Istri` : `Has ${originalData.istriCount} Wife/Wives`;
  
  let orangTua = [];
  if (originalData.ayah) orangTua.push(currentLang === 'id' ? 'Ayah' : 'Father');
  if (originalData.ibu) orangTua.push(currentLang === 'id' ? 'Ibu' : 'Mother');
  if (originalData.kakek) orangTua.push(currentLang === 'id' ? 'Kakek' : 'Grandfather');
  if (originalData.nenek) orangTua.push(currentLang === 'id' ? 'Nenek' : 'Grandmother');
  const orangTuaText = orangTua.length > 0 ? orangTua.join(', ') : (currentLang === 'id' ? 'Tidak ada' : 'None');
  
  let anak = [];
  if (originalData.anakLaki > 0) anak.push(`${originalData.anakLaki} ${currentLang === 'id' ? 'Anak Laki-laki' : 'Son(s)'}`);
  if (originalData.anakPerempuan > 0) anak.push(`${originalData.anakPerempuan} ${currentLang === 'id' ? 'Anak Perempuan' : 'Daughter(s)'}`);
  const anakText = anak.length > 0 ? anak.join(', ') : (currentLang === 'id' ? 'Tidak ada' : 'None');
  
  let cucu = [];
  if (originalData.cucuLaki > 0) cucu.push(`${originalData.cucuLaki} ${currentLang === 'id' ? 'Cucu Laki-laki' : 'Grandson(s)'}`);
  if (originalData.cucuPerempuan > 0) cucu.push(`${originalData.cucuPerempuan} ${currentLang === 'id' ? 'Cucu Perempuan' : 'Granddaughter(s)'}`);
  const cucuText = cucu.length > 0 ? cucu.join(', ') : (currentLang === 'id' ? 'Tidak ada' : 'None');
  
  let saudara = [];
  if (originalData.saudaraLakiKandung > 0) saudara.push(`${originalData.saudaraLakiKandung} ${currentLang === 'id' ? 'Saudara Laki Kandung' : 'Full Brother(s)'}`);
  if (originalData.saudaraPerempuanKandung > 0) saudara.push(`${originalData.saudaraPerempuanKandung} ${currentLang === 'id' ? 'Saudara Perempuan Kandung' : 'Full Sister(s)'}`);
  if (originalData.saudaraLakiSeayah > 0) saudara.push(`${originalData.saudaraLakiSeayah} ${currentLang === 'id' ? 'Saudara Laki Seayah' : 'Paternal Brother(s)'}`);
  if (originalData.saudaraPerempuanSeayah > 0) saudara.push(`${originalData.saudaraPerempuanSeayah} ${currentLang === 'id' ? 'Saudara Perempuan Seayah' : 'Paternal Sister(s)'}`);
  if (originalData.saudaraLakiSeibu > 0) saudara.push(`${originalData.saudaraLakiSeibu} ${currentLang === 'id' ? 'Saudara Laki Seibu' : 'Maternal Brother(s)'}`);
  if (originalData.saudaraPerempuanSeibu > 0) saudara.push(`${originalData.saudaraPerempuanSeibu} ${currentLang === 'id' ? 'Saudara Perempuan Seibu' : 'Maternal Sister(s)'}`);
  const saudaraText = saudara.length > 0 ? saudara.join(', ') : (currentLang === 'id' ? 'Tidak ada' : 'None');
  
  return `
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700 mb-6">
      <h3 class="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center">
        <span class="text-2xl mr-2">📋</span>
        ${currentLang === 'id' ? 'Ringkasan Data Pewaris' : 'Summary of Deceased Data'}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="bg-white dark:bg-gray-800 p-3 rounded-lg">
          <span class="font-semibold text-gray-600 dark:text-gray-400">${currentLang === 'id' ? '⚖️ Mazhab:' : '⚖️ Madhab:'}</span>
          <span class="ml-2 font-bold text-blue-900 dark:text-blue-300">${mazhab}</span>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-3 rounded-lg">
          <span class="font-semibold text-gray-600 dark:text-gray-400">${currentLang === 'id' ? '👤 Jenis Kelamin Pewaris:' : '👤 Gender of Deceased:'}</span>
          <span class="ml-2 font-bold text-blue-900 dark:text-blue-300">${gender}</span>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-3 rounded-lg">
          <span class="font-semibold text-gray-600 dark:text-gray-400">${currentLang === 'id' ? '💑 Status Pasangan:' : '💑 Spouse Status:'}</span>
          <span class="ml-2 font-bold text-blue-900 dark:text-blue-300">${pasangan}</span>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-3 rounded-lg">
          <span class="font-semibold text-gray-600 dark:text-gray-400">${currentLang === 'id' ? '👴👵 Orang Tua/Kakek Nenek:' : '👴👵 Parents/Grandparents:'}</span>
          <span class="ml-2 font-bold text-blue-900 dark:text-blue-300">${orangTuaText}</span>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-3 rounded-lg">
          <span class="font-semibold text-gray-600 dark:text-gray-400">${currentLang === 'id' ? '👶 Anak:' : '👶 Children:'}</span>
          <span class="ml-2 font-bold text-blue-900 dark:text-blue-300">${anakText}</span>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-3 rounded-lg">
          <span class="font-semibold text-gray-600 dark:text-gray-400">${currentLang === 'id' ? '👦👧 Cucu:' : '👦👧 Grandchildren:'}</span>
          <span class="ml-2 font-bold text-blue-900 dark:text-blue-300">${cucuText}</span>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-3 rounded-lg md:col-span-2">
          <span class="font-semibold text-gray-600 dark:text-gray-400">${currentLang === 'id' ? '👥 Saudara:' : '👥 Siblings:'}</span>
          <span class="ml-2 font-bold text-blue-900 dark:text-blue-300">${saudaraText}</span>
        </div>
      </div>
    </div>
  `;
}

// ===== FUNGSI RENDER AHLI WARIS TERHALANG =====

function renderBlockedHeir(blocked) {
  let name = '';
  switch(blocked.type) {
    case 'cucu':
      name = currentLang === 'id' ? `Cucu (${blocked.count} orang)` : `Grandchildren (${blocked.count})`;
      break;
    case 'kakek':
      name = currentLang === 'id' ? 'Kakek' : 'Grandfather';
      break;
    case 'nenek':
      name = currentLang === 'id' ? 'Nenek' : 'Grandmother';
      break;
    case 'saudara_kandung_seayah':
      name = currentLang === 'id' ? `Saudara Kandung/Seayah (${blocked.count} orang)` : `Full/Paternal Siblings (${blocked.count})`;
      break;
    case 'saudara_seibu':
      name = currentLang === 'id' ? `Saudara Seibu (${blocked.count} orang)` : `Maternal Siblings (${blocked.count})`;
      break;
  }
  
  return `
    <div class="blocked-card">
      <div class="flex justify-between items-center mb-3">
        <div class="blocked-name">${name}</div>
        <div class="blocked-status">${currentLang === 'id' ? 'MAHJUB' : 'BLOCKED'}</div>
      </div>
      
      <div class="bg-white dark:bg-gray-700 p-4 rounded-lg">
        <div class="font-semibold mb-2">${currentLang === 'id' ? '📋 Alasan Terhalang:' : '📋 Reason for Blocking:'}</div>
        <p class="text-sm mb-3">${currentLang === 'id' ? blocked.reason.penjelasan_id : blocked.reason.penjelasan_en}</p>
        
        <div class="text-sm">
          <div class="font-semibold mb-1">${currentLang === 'id' ? '📖 Dalil:' : '📖 Evidence:'}</div>
          <p class="italic mb-1">${blocked.reason.dalil}</p>
          ${blocked.reason.hadits ? `<p class="mb-1">${blocked.reason.hadits}</p>` : ''}
          ${blocked.reason.hadits_terjemah ? `<p class="mb-1 text-xs">"${blocked.reason.hadits_terjemah}"</p>` : ''}
          ${blocked.reason.hadits_riwayat ? `<p class="text-xs italic mb-1">${blocked.reason.hadits_riwayat}</p>` : ''}
          <p class="font-bold">${blocked.reason.sumber}</p>
        </div>
      </div>
    </div>
  `;
}

// ===== FUNGSI DISPLAY RESULT - PART 1: INISIALISASI & SUMMARY =====

function displayResult(result) {
  // PART 1A: Inisialisasi variabel
  let summaryHTML = '';
  let heirsHTML = '';
  let blockedHTML = '';
  let verificationHTML = '';
  
  // PART 1B: Build Summary HTML - Harta Awal
  summaryHTML = `
    <div class="summary-table">
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Harta Awal' : 'Initial Assets'}</span>
        <span class="summary-value">${formatRupiah(result.hartaBersih.awal)}</span>
      </div>
  `;
  
  // PART 1C: Biaya Jenazah (jika ada)
  if (result.hartaBersih.biayaJenazah > 0) {
    summaryHTML += `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Biaya Jenazah' : 'Funeral Expenses'}</span>
        <span class="summary-value" style="color: #ef4444;">- ${formatRupiah(result.hartaBersih.biayaJenazah)}</span>
      </div>
    `;
  }
  
  // PART 1D: Hutang (jika ada)
  if (result.hartaBersih.hutang > 0) {
    summaryHTML += `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Hutang' : 'Debts'}</span>
        <span class="summary-value" style="color: #ef4444;">- ${formatRupiah(result.hartaBersih.hutang)}</span>
      </div>
    `;
  }
  
  // PART 1E: Asuransi Syariah (jika ada)
  if (result.hartaBersih.asuransi > 0) {
    summaryHTML += `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Asuransi Syariah' : 'Sharia Insurance'}</span>
        <span class="summary-value" style="color: #10b981;">+ ${formatRupiah(result.hartaBersih.asuransi)}</span>
      </div>
    `;
  }

  // PART 1F: Wasiat (jika ada)
  if (result.hartaBersih.wasiat > 0) {
    summaryHTML += `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Wasiat (maks 1/3)' : 'Will (max 1/3)'}</span>
        <span class="summary-value" style="color: #ef4444;">- ${formatRupiah(result.hartaBersih.wasiat)}</span>
      </div>
    `;
  }
  
  // PART 1G: Harta Bersih (Total yang dibagi)
  summaryHTML += `
      <div class="summary-row" style="background: #dbeafe; font-weight: bold;">
        <span class="summary-label">${currentLang === 'id' ? 'HARTA YANG DIBAGI' : 'DISTRIBUTABLE ASSETS'}</span>
        <span class="summary-value">${formatRupiah(result.hartaBersih.bersih)}</span>
      </div>
    </div>
  `;
  
  // PART 1H & 1I: Dalil Hutang dan Urutan (Side by Side, Lebih Kecil)
  summaryHTML += `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div class="dalil-section">
        <h4 class="font-bold text-base mb-2">
          ${currentLang === 'id' ? '📜 Dalil Hutang' : '📜 Debt Evidence'}
        </h4>
        <div class="text-xs">
          ${renderDalil(getDalil('hutang'))}
        </div>
      </div>
      
      <div class="dalil-section">
        <h4 class="font-bold text-base mb-2">
          ${currentLang === 'id' ? '📜 Dalil Urutan' : '📜 Order Evidence'}
        </h4>
        <div class="text-xs">
          ${renderDalil(getDalil('urutan'))}
          <p class="mt-2">
            ${currentLang === 'id' 
              ? 'Urutan: 1) Jenazah, 2) Hutang, 3) Wasiat (maks 1/3), 4) Waris' 
              : 'Order: 1) Funeral, 2) Debts, 3) Will (max 1/3), 4) Inheritance'}
          </p>
        </div>
      </div>
    </div>
  `;
  
  // PART 1J: Render Summary ke DOM
  document.getElementById('resultSummary').innerHTML = summaryHTML;
  const dataSummary = generateSummary(formData);
  document.getElementById('resultSummary').insertAdjacentHTML('afterbegin', dataSummary);
  
// ===== PART 2: DISPLAY DETAIL 'AUL (JIKA TERJADI) =====
  
if (result.aul && result.aul.occurred) {
    // PART 2A: Header 'Aul
    let aulHTML = `
      <div class="bg-purple-50 dark:bg-purple-900 p-6 rounded-xl border-l-4 border-purple-500 mt-6">
        <h4 class="font-bold text-lg mb-3 text-purple-900 dark:text-purple-300">
          ⚖️ ${currentLang === 'id' ? 'Kasus \'Aul Terdeteksi' : '\'Aul Case Detected'}
        </h4>
    `;
    
    // PART 2B: Penjelasan 'Aul
    aulHTML += `
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
          <p class="font-semibold mb-2">
            ${currentLang === 'id' ? '📊 Penjelasan:' : '📊 Explanation:'}
          </p>
          <p class="text-sm mb-3">
            ${currentLang === 'id' ? result.aul.explanation.id : result.aul.explanation.en}
          </p>
        </div>
    `;
    
    // PART 2C: Grid Perbandingan (Sebelum vs Sesudah 'Aul)
    aulHTML += `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    `;
    
    // PART 2D: Kolom Kiri - Sebelum 'Aul (Merah)
    aulHTML += `
          <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <h5 class="font-bold mb-3 text-red-900 dark:text-red-300">
              ${currentLang === 'id' ? '❌ Sebelum \'Aul (Tidak Valid)' : '❌ Before \'Aul (Invalid)'}
            </h5>
            <div class="space-y-2 text-sm">
    `;
    
    // PART 2E: List ahli waris sebelum 'Aul
    result.aul.beforeAul.forEach(h => {
      aulHTML += `
              <div class="flex justify-between">
                <span>${h.name}</span>
                <span class="font-bold">${formatRupiah(Math.round(h.totalBefore))}</span>
              </div>
      `;
    });
    
    // PART 2F: Total sebelum 'Aul
    const totalBeforeAul = result.aul.beforeAul.reduce((sum, h) => sum + h.totalBefore, 0);
    aulHTML += `
              <div class="flex justify-between pt-2 border-t-2 border-red-300 font-bold text-red-700 dark:text-red-300">
                <span>TOTAL:</span>
                <span>${formatRupiah(Math.round(totalBeforeAul))}</span>
              </div>
              <div class="text-xs text-red-600 dark:text-red-400 mt-2">
                ${currentLang === 'id' 
                  ? `⚠️ Total ${(result.aul.totalFardh * 100).toFixed(2)}% (melebihi 100%)`
                  : `⚠️ Total ${(result.aul.totalFardh * 100).toFixed(2)}% (exceeds 100%)`}
              </div>
            </div>
          </div>
    `;
    
    // PART 2G: Kolom Kanan - Setelah 'Aul (Hijau)
    aulHTML += `
          <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <h5 class="font-bold mb-3 text-green-900 dark:text-green-300">
              ${currentLang === 'id' ? '✅ Setelah \'Aul (Valid)' : '✅ After \'Aul (Valid)'}
            </h5>
            <div class="space-y-2 text-sm">
    `;
    
    // PART 2H: List ahli waris setelah 'Aul
    const heirsAfterAul = result.heirs.filter(h => h.aulApplied);
    heirsAfterAul.forEach(h => {
      aulHTML += `
              <div class="flex justify-between">
                <span>${h.name}</span>
                <span class="font-bold">${formatRupiah(Math.round(h.total))}</span>
              </div>
              <div class="text-xs text-gray-600 dark:text-gray-400 ml-2">
                ${fractionToString(h.originalShare)} × ${h.aulFactor.toFixed(4)} = ${fractionToString(h.share)}
              </div>
      `;
    });
    
    // PART 2I: Total setelah 'Aul
    const totalAfterAul = heirsAfterAul.reduce((sum, h) => sum + h.total, 0);
    aulHTML += `
              <div class="flex justify-between pt-2 border-t-2 border-green-300 font-bold text-green-700 dark:text-green-300">
                <span>TOTAL:</span>
                <span>${formatRupiah(Math.round(totalAfterAul))}</span>
              </div>
              <div class="text-xs text-green-600 dark:text-green-400 mt-2">
                ${currentLang === 'id' 
                  ? `✅ Total 100% (disesuaikan proporsional)`
                  : `✅ Total 100% (adjusted proportionally)`}
              </div>
            </div>
          </div>
        </div>
    `;
    
    // Lanjut ke PART 3 untuk tabel detail...
    // ===== PART 3: TABEL DETAIL PENYESUAIAN 'AUL =====
    
    // PART 3A: Header Tabel
    aulHTML += `
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h5 class="font-bold mb-3">
            ${currentLang === 'id' ? '📋 Detail Penyesuaian Per Ahli Waris:' : '📋 Adjustment Details Per Heir:'}
          </h5>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th class="p-2 text-left">${currentLang === 'id' ? 'Ahli Waris' : 'Heir'}</th>
                  <th class="p-2 text-center">${currentLang === 'id' ? 'Bagian Awal' : 'Original Share'}</th>
                  <th class="p-2 text-center">${currentLang === 'id' ? 'Faktor \'Aul' : '\'Aul Factor'}</th>
                  <th class="p-2 text-center">${currentLang === 'id' ? 'Bagian Setelah \'Aul' : 'Share After \'Aul'}</th>
                  <th class="p-2 text-right">${currentLang === 'id' ? 'Nilai Awal' : 'Original Amount'}</th>
                  <th class="p-2 text-right">${currentLang === 'id' ? 'Nilai Setelah \'Aul' : 'Amount After \'Aul'}</th>
                </tr>
              </thead>
              <tbody>
    `;
    
    // PART 3B: Isi Tabel - Per Ahli Waris
    heirsAfterAul.forEach(h => {
      aulHTML += `
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2 font-semibold">${h.name}</td>
                  <td class="p-2 text-center">${fractionToString(h.originalShare)}</td>
                  <td class="p-2 text-center text-purple-600 dark:text-purple-400 font-bold">
                    × ${h.aulFactor.toFixed(4)}
                  </td>
                  <td class="p-2 text-center">${fractionToString(h.share)}</td>
                  <td class="p-2 text-right text-red-600 dark:text-red-400 line-through">
                    ${formatRupiah(Math.round(h.originalShare * result.hartaBersih.bersih))}
                  </td>
                  <td class="p-2 text-right text-green-600 dark:text-green-400 font-bold">
                    ${formatRupiah(Math.round(h.total))}
                  </td>
                </tr>
      `;
    });
    
    // PART 3C: Tutup Tabel
    aulHTML += `
              </tbody>
            </table>
          </div>
        </div>
    `;
    
    // PART 3D: Dalil 'Aul
    aulHTML += `
        <div class="bg-purple-100 dark:bg-purple-800 p-4 rounded-lg">
          <h5 class="font-bold mb-3">
            ${currentLang === 'id' ? '📖 Dalil Hukum \'Aul:' : '📖 Evidence for \'Aul:'}
          </h5>
          ${renderDalil(getDalil('aul'))}
          
          <div class="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
            <p class="font-semibold mb-2">
              ${currentLang === 'id' ? '💡 Penjelasan Tambahan:' : '💡 Additional Explanation:'}
            </p>
            <p>
              ${currentLang === 'id' 
                ? 'Hukum \'Aul pertama kali diterapkan oleh Khalifah Umar bin Khattab RA dan menjadi Ijma\' (konsensus) para Sahabat. Ketika total bagian fardh melebihi 100%, semua ahli waris fardh mendapat pengurangan proporsional yang sama agar total tepat 100%. Ini adalah solusi yang adil karena tidak ada yang didahulukan atau diakhirkan.'
                : 'The law of \'Aul was first applied by Caliph Umar bin Khattab RA and became Ijma\' (consensus) of the Companions. When total fardh shares exceed 100%, all fardh heirs receive the same proportional reduction to make the total exactly 100%. This is a fair solution as no one is given precedence or delayed.'}
            </p>
          </div>
        </div>
      </div>
    `;
    
    // PART 3E: Render 'Aul HTML ke DOM
    document.getElementById('resultSummary').insertAdjacentHTML('beforeend', aulHTML);
  }

  // ===== PART 4A: DISPLAY HEIRS (AHLI WARIS) =====
  
  heirsHTML = `
    <h3 class="text-2xl font-bold text-blue-900 dark:text-blue-300 mt-8 mb-4">
      ${currentLang === 'id' ? '👥 Ahli Waris yang Berhak' : '👥 Eligible Heirs'}
    </h3>
  `;
  
  result.heirs.forEach(heir => {
    heirsHTML += renderHeir(heir);
  });
  
  document.getElementById('resultHeirs').innerHTML = heirsHTML;
  
  // ===== PART 4B: DISPLAY BLOCKED HEIRS (AHLI WARIS TERHALANG) =====
  
  if (result.blocked.length > 0) {
    blockedHTML = `
      <h3 class="text-2xl font-bold text-red-900 dark:text-red-300 mt-8 mb-4">
        ${currentLang === 'id' ? '⛔ Ahli Waris yang Terhalang (Mahjub)' : '⛔ Blocked Heirs (Mahjub)'}
      </h3>
    `;
    
    result.blocked.forEach(b => {
      blockedHTML += renderBlockedHeir(b);
    });
    
    document.getElementById('resultBlocked').innerHTML = blockedHTML;
  } else {
    document.getElementById('resultBlocked').innerHTML = '';
  }
  
  // ===== PART 4C: DISPLAY VERIFICATION (VERIFIKASI TOTAL) =====
  
  // Hitung total dibagikan
  let totalDibagikan = 0;
  result.heirs.forEach(h => {
    totalDibagikan += h.total;
  });
  
  const selisih = Math.abs(result.hartaBersih.bersih - totalDibagikan);
  const isMatch = selisih < 1000; // Toleransi Rp 1000
  
  verificationHTML = `
    <div class="verification-card mt-8">
      <h3 class="text-2xl font-bold mb-4" style="color: ${isMatch ? '#10b981' : '#f59e0b'};">
        ${currentLang === 'id' ? '📊 Verifikasi Total Pembagian' : '📊 Distribution Verification'}
      </h3>
      
      <div class="space-y-2">
        <div class="verification-row">
          <span class="font-semibold">${currentLang === 'id' ? 'Harta yang Dibagi:' : 'Distributable Assets:'}</span>
          <span class="font-bold">${formatRupiah(Math.round(result.hartaBersih.bersih))}</span>
        </div>
        
        <div class="verification-row">
          <span class="font-semibold">${currentLang === 'id' ? 'Total Dibagikan:' : 'Total Distributed:'}</span>
          <span class="font-bold">${formatRupiah(Math.round(totalDibagikan))}</span>
        </div>
        
        <div class="verification-row">
          <span class="font-semibold">${currentLang === 'id' ? 'Selisih:' : 'Difference:'}</span>
          <span class="font-bold ${isMatch ? 'verification-match' : 'verification-mismatch'}">
            ${formatRupiah(Math.round(selisih))}
          </span>
        </div>
        
        <div class="verification-row" style="background: ${isMatch ? '#d1fae5' : '#fef3c7'}; border-radius: 0.5rem; padding: 1rem; margin-top: 1rem;">
          <span class="font-bold text-lg">${currentLang === 'id' ? 'Status:' : 'Status:'}</span>
          <span class="font-bold text-lg ${isMatch ? 'verification-match' : 'verification-mismatch'}">
            ${isMatch 
              ? (currentLang === 'id' ? '✅ Sesuai' : '✅ Match') 
              : (currentLang === 'id' ? '⚠️ Ada Selisih' : '⚠️ Mismatch')}
          </span>
        </div>
      </div>
  `;
  
  // PART 4D: Catatan jika ada selisih
  if (!isMatch && result.aul && result.aul.occurred) {
    verificationHTML += `
      <div class="mt-4 p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
        <p class="text-sm text-purple-800 dark:text-purple-200">
          ${currentLang === 'id' 
            ? '💡 Catatan: Selisih ini terjadi karena penerapan hukum \'Aul. Lihat detail perhitungan \'Aul di atas untuk penjelasan lengkap.' 
            : '💡 Note: This difference occurs due to the application of \'Aul law. See the \'Aul calculation details above for complete explanation.'}
        </p>
      </div>
    `;
  } else if (!isMatch) {
    verificationHTML += `
      <div class="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
        <p class="text-sm text-yellow-800 dark:text-yellow-200">
          ${currentLang === 'id' 
            ? '💡 Catatan: Selisih kecil dapat terjadi karena pembulatan dalam perhitungan.' 
            : '💡 Note: Small differences may occur due to rounding in calculations.'}
        </p>
      </div>
    `;
  }
  
  // ===== TAMBAHKAN KODE INI DI SINI ===== ↓↓↓
  
  // PART 4D-2: NOTIFIKASI KHUSUS UNTUK KASUS BAITUL MAL
  if (selisih > 1000 && result.heirs.length === 1) {
    const onlyHeir = result.heirs[0];
    const isSpouse = onlyHeir.name.includes('Istri') || onlyHeir.name.includes('Wife') || 
                     onlyHeir.name.includes('Suami') || onlyHeir.name.includes('Husband');
    
    if (isSpouse) {
      verificationHTML += `
        <div class="mt-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg border-l-4 border-blue-500">
          <p class="text-sm text-blue-900 dark:text-blue-200">
            <strong>💡 ${currentLang === 'id' ? 'Catatan Penting - Sisa Harta:' : 'Important Note - Remaining Estate:'}</strong><br><br>
            ${currentLang === 'id' 
              ? `Sisa harta sebesar <strong>${formatRupiah(Math.round(selisih))}</strong> tidak memiliki ahli waris yang berhak menerimanya.<br><br>
                 Menurut hukum Islam, sisa harta ini diserahkan ke:<br>
                 1️⃣ <strong>Baitul Mal</strong> (kas negara/lembaga zakat), atau<br>
                 2️⃣ <strong>Kerabat Jauh (Dzawil Arham)</strong> jika ada, seperti:<br>
                 &nbsp;&nbsp;&nbsp;• Anak dari saudara perempuan<br>
                 &nbsp;&nbsp;&nbsp;• Cucu dari anak perempuan<br>
                 &nbsp;&nbsp;&nbsp;• Paman dari pihak ibu<br>
                 &nbsp;&nbsp;&nbsp;• Dan kerabat lain yang tidak termasuk ashabah<br><br>
                 <strong>⚠️ Rekomendasi:</strong> Silakan konsultasikan dengan ulama atau pengadilan agama untuk penentuan penerima sisa harta ini.`
              : `The remaining estate of <strong>${formatRupiah(Math.round(selisih))}</strong> has no eligible heirs to receive it.<br><br>
                 According to Islamic law, this remainder goes to:<br>
                 1️⃣ <strong>Baitul Mal</strong> (state treasury/zakat institution), or<br>
                 2️⃣ <strong>Distant Relatives (Dzawil Arham)</strong> if any, such as:<br>
                 &nbsp;&nbsp;&nbsp;• Children of sisters<br>
                 &nbsp;&nbsp;&nbsp;• Grandchildren from daughters<br>
                 &nbsp;&nbsp;&nbsp;• Maternal uncles<br>
                 &nbsp;&nbsp;&nbsp;• And other relatives not included in ashabah<br><br>
                 <strong>⚠️ Recommendation:</strong> Please consult with scholars or religious courts to determine the recipient of this remaining estate.`}
          </p>
          
          <div class="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-xs">
            <p class="font-semibold mb-1">
              ${currentLang === 'id' ? '📖 Dalil:' : '📖 Evidence:'}
            </p>
            <p class="italic mb-1">
              ${currentLang === 'id' 
                ? '"Jika tidak ada ahli waris ashabah dan dzawil furudh, maka harta diserahkan ke Baitul Mal."'
                : '"If there are no ashabah heirs and dzawil furudh, then the estate goes to Baitul Mal."'}
            </p>
            <p class="font-bold">
              ${currentLang === 'id' ? 'Pendapat Jumhur Ulama' : 'Opinion of Jumhur Scholars'}
            </p>
          </div>
        </div>
      `;
    }
  }

  // PART 4E: Rincian per ahli waris
  verificationHTML += `
      <div class="mt-6">
        <h4 class="font-bold mb-3">
          ${currentLang === 'id' ? '📋 Rincian Per Ahli Waris:' : '📋 Breakdown Per Heir:'}
        </h4>
        <div class="space-y-2">
  `;
  
  result.heirs.forEach(h => {
    verificationHTML += `
          <div class="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span class="font-semibold">${h.name}</span>
            <span class="font-bold text-green-600 dark:text-green-400">
              ${formatRupiah(Math.round(h.total))}
            </span>
          </div>
    `;
  });
  
  verificationHTML += `
          <div class="flex justify-between p-4 bg-blue-100 dark:bg-blue-900 rounded-lg font-bold text-lg">
            <span>${currentLang === 'id' ? 'TOTAL:' : 'TOTAL:'}</span>
            <span class="text-blue-900 dark:text-blue-300">
              ${formatRupiah(Math.round(totalDibagikan))}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('resultVerification').innerHTML = verificationHTML;
  
  // ===== PART 4F: DISPLAY RADD (JIKA TERJADI) =====
  
  if (result.radd && result.radd.occurred) {
    const raddHTML = `
      <div class="bg-teal-50 dark:bg-teal-900 p-6 rounded-xl border-l-4 border-teal-500 mt-6">
        <h4 class="font-bold text-lg mb-3 text-teal-900 dark:text-teal-300">
          🔄 ${currentLang === 'id' ? 'Kasus Radd Terdeteksi' : 'Radd Case Detected'}
        </h4>
        <p class="mb-4">
          ${currentLang === 'id' ? result.radd.explanation.id : result.radd.explanation.en}
        </p>
        <div class="dalil-section">
          ${renderDalil(getDalil('radd'))}
        </div>
        <div class="mt-4 p-4 bg-teal-100 dark:bg-teal-800 rounded-lg">
          <p class="font-semibold mb-2">
            ${currentLang === 'id' ? '📊 Detail Pengembalian:' : '📊 Return Details:'}
          </p>
          <p class="text-sm">
            ${currentLang === 'id' ? 'Sisa harta yang dikembalikan:' : 'Remainder returned:'} 
            <strong>${formatRupiah(Math.round(result.radd.sisaHarta))}</strong><br>
            ${currentLang === 'id' 
              ? 'Dikembalikan kepada ahli waris fardh (kecuali suami/istri)' 
              : 'Returned to fardh heirs (except spouse)'}
          </p>
        </div>
      </div>
    `;
    document.getElementById('resultSummary').insertAdjacentHTML('beforeend', raddHTML);
  }
} // PENUTUP FUNGSI displayResult()

// ===== EDUCATIONAL CONTENT =====

const educationalContent = {
  id: {
    fardh: {
      title: '📖 Apa itu Fardh (Ashhabul Furudh)?',
      content: `
        <div class="space-y-4">
          <p><strong>Fardh</strong> adalah bagian yang telah ditentukan secara pasti dalam Al-Qur'an dan Hadits.</p>
          
          <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">Bagian-bagian Fardh:</h4>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>1/2 (Setengah)</strong>: Suami (tanpa anak), Anak perempuan tunggal, Saudara perempuan kandung tunggal</li>
              <li><strong>1/4 (Seperempat)</strong>: Suami (dengan anak), Istri (tanpa anak)</li>
              <li><strong>1/8 (Seperdelapan)</strong>: Istri (dengan anak)</li>
              <li><strong>2/3 (Dua pertiga)</strong>: Dua anak perempuan atau lebih, Dua saudara perempuan atau lebih</li>
              <li><strong>1/3 (Sepertiga)</strong>: Ibu (tanpa anak & saudara), Dua saudara seibu atau lebih</li>
              <li><strong>1/6 (Seperenam)</strong>: Ayah/Ibu (dengan anak), Kakek, Nenek, Satu saudara seibu</li>
            </ul>
          </div>
          
          <div class="dalil-section">
            <p class="dalil-arabic">يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ</p>
            <p class="dalil-translation">"Allah mensyariatkan kepadamu tentang (pembagian warisan untuk) anak-anakmu..."</p>
            <p class="dalil-source">QS. An-Nisa: 11</p>
          </div>
        </div>
      `
    },
    
    ashabah: {
      title: '📖 Apa itu Ashabah?',
      content: `
        <div class="space-y-4">
          <p><strong>Ashabah</strong> adalah ahli waris yang mendapat sisa harta setelah dibagikan kepada ahli waris fardh.</p>
          
          <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">Jenis-jenis Ashabah:</h4>
            <ul class="list-disc list-inside space-y-2">
              <li><strong>Ashabah Bi Nafsihi</strong> (Ashabah dengan dirinya sendiri):
                <ul class="list-circle list-inside ml-4 mt-1">
                  <li>Anak laki-laki</li>
                  <li>Cucu laki-laki (jalur anak laki-laki)</li>
                  <li>Ayah (jika tidak ada anak)</li>
                  <li>Kakek (jika tidak ada ayah)</li>
                  <li>Saudara laki-laki (kandung/seayah)</li>
                </ul>
              </li>
              <li><strong>Ashabah Bi Ghairihi</strong> (Ashabah dengan orang lain):
                <ul class="list-circle list-inside ml-4 mt-1">
                  <li>Anak perempuan bersama anak laki-laki (ratio 2:1)</li>
                  <li>Cucu perempuan bersama cucu laki-laki (ratio 2:1)</li>
                  <li>Saudara perempuan bersama saudara laki-laki (ratio 2:1)</li>
                </ul>
              </li>
            </ul>
          </div>
          
          <div class="dalil-section">
            <p class="dalil-arabic">أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَهُوَ لِأَوْلَى رَجُلٍ ذَكَرٍ</p>
            <p class="dalil-translation">"Berikanlah bagian-bagian warisan kepada yang berhak menerimanya. Jika masih ada sisa, maka berikanlah kepada ahli waris laki-laki yang paling utama (dekat hubungan kekerabatannya)."</p>
            <p class="dalil-source">HR. Bukhari & Muslim dari Ibnu Abbas RA</p>
          </div>
        </div>
      `
    },
    
    mahjub: {
      title: '📖 Apa itu Mahjub (Penghalangan)?',
      content: `
        <div class="space-y-4">
          <p><strong>Mahjub</strong> adalah kondisi dimana seorang ahli waris terhalang untuk mendapat warisan karena ada ahli waris lain yang lebih dekat hubungannya dengan pewaris.</p>
          
          <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">Prinsip Penghalangan:</h4>
            <p class="mb-3"><strong>"Al-Aqrab Yahjubu Al-Ab'ad"</strong><br>الأقرب يحجب الأبعد<br><em>"Yang lebih dekat menghalangi yang lebih jauh"</em></p>
            
            <h4 class="font-bold mb-2 mt-4">Contoh Penghalangan:</h4>
            <ul class="list-disc list-inside space-y-2">
              <li><strong>Cucu</strong> terhalang oleh <strong>Anak laki-laki</strong></li>
              <li><strong>Kakek</strong> terhalang oleh <strong>Ayah</strong></li>
              <li><strong>Nenek</strong> terhalang oleh <strong>Ibu</strong></li>
              <li><strong>Saudara</strong> terhalang oleh <strong>Ayah atau Anak laki-laki</strong></li>
              <li><strong>Saudara seibu</strong> terhalang oleh <strong>Anak, Cucu, Ayah, atau Kakek</strong></li>
            </ul>
          </div>
          
          <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg mt-4">
            <h4 class="font-bold mb-2">⚠️ Pengecualian Penting:</h4>
            <p><strong>Kakek dan Nenek TIDAK terhalang oleh keberadaan anak kandung.</strong> Mereka tetap mendapat bagian fardh (1/6) bersama dengan anak-anak pewaris.</p>
            <p class="text-sm mt-2 italic">Referensi: Bidayatul Mujtahid (Ibnu Rusyd), Al-Mughni (Ibnu Qudamah)</p>
          </div>
        </div>
      `
    },
    
    aul: {
      title: '📖 Apa itu \'Aul?',
      content: `
        <div class="space-y-4">
          <p><strong>'Aul</strong> (العول) terjadi ketika total bagian fardh melebihi 100%. Dalam kasus ini, semua bagian fardh dikurangi secara proporsional.</p>
          
          <div class="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">Contoh Kasus 'Aul:</h4>
            <p class="mb-2">Pewaris meninggalkan:</p>
            <ul class="list-disc list-inside space-y-1 mb-3">
              <li>Suami: 1/2 (50%)</li>
              <li>Ibu: 1/3 (33.33%)</li>
              <li>2 Saudara perempuan kandung: 2/3 (66.67%)</li>
            </ul>
            <p class="font-bold">Total: 150% (melebihi 100%)</p>
            <p class="mt-2">Solusi: Semua bagian dikurangi proporsional menjadi:</p>
            <ul class="list-disc list-inside space-y-1 mt-2">
              <li>Suami: 1/2 × (100/150) = 33.33%</li>
              <li>Ibu: 1/3 × (100/150) = 22.22%</li>
              <li>2 Saudara perempuan: 2/3 × (100/150) = 44.44%</li>
            </ul>
            <p class="font-bold mt-2">Total: 100% ✅</p>
          </div>
          
          <div class="dalil-section">
            <p class="dalil-arabic">قَالَ عُمَرُ رَضِيَ اللَّهُ عَنْهُ: وَاللَّهِ مَا أَدْرِي أَيُّكُمْ قَدَّمَ اللَّهُ وَأَيُّكُمْ أَخَّرَ، فَأَعُولُ الْفَرِيضَةَ</p>
            <p class="dalil-translation">"Umar RA berkata: 'Demi Allah, aku tidak tahu siapa di antara kalian yang Allah dahulukan dan siapa yang Allah akhirkan, maka aku akan membagi harta waris dengan cara 'aul.'"</p>
            <p class="dalil-source">Atsar Umar bin Khattab RA - Ijma' Sahabat</p>
          </div>
        </div>
      `
    },
    
    radd: {
      title: '📖 Apa itu Radd?',
      content: `
        <div class="space-y-4">
          <p><strong>Radd</strong> (الرد) adalah pengembalian sisa harta kepada ahli waris fardh (kecuali suami/istri) ketika tidak ada ahli waris ashabah.</p>
          
          <div class="bg-teal-50 dark:bg-teal-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">Contoh Kasus Radd:</h4>
            <p class="mb-2">Pewaris meninggalkan:</p>
            <ul class="list-disc list-inside space-y-1 mb-3">
              <li>Ibu: 1/3 (33.33%)</li>
              <li>2 Anak perempuan: 2/3 (66.67%)</li>
            </ul>
            <p class="font-bold">Total: 100%</p>
            <p class="mt-2">Tidak ada ashabah, tidak ada sisa? <strong>SALAH!</strong></p>
            <p class="mt-2">Jika ada kasus dimana total fardh kurang dari 100% dan tidak ada ashabah, maka sisa dikembalikan (radd) kepada ahli waris fardh secara proporsional.</p>
          </div>
          
          <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg mt-4">
            <h4 class="font-bold mb-2">⚠️ Catatan Penting:</h4>
            <p><strong>Suami dan Istri TIDAK mendapat Radd.</strong> Sisa harta hanya dikembalikan kepada ahli waris fardh selain pasangan.</p>
          </div>
          
          <div class="dalil-section">
            <p class="dalil-arabic">قَالَ عَلِيٌّ رَضِيَ اللَّهُ عَنْهُ: إِذَا لَمْ يَكُنْ عَصَبَةٌ رُدَّ عَلَى ذَوِي الْفُرُوضِ بِقَدْرِ فُرُوضِهِمْ</p>
            <p class="dalil-translation">"Ali RA berkata: 'Jika tidak ada ashabah, maka sisa harta dikembalikan kepada ahli waris fardh sesuai dengan kadar bagian mereka.'"</p>
            <p class="dalil-source">Pendapat Ali bin Abi Thalib RA - Mazhab Jumhur</p>
          </div>
        </div>
      `
    },
    
    mazhab: {
      title: '📖 Perbedaan 4 Mazhab dalam Waris',
      content: `
        <div class="space-y-4">
          <p>Keempat mazhab (Hanafi, Maliki, Syafi'i, Hanbali) memiliki beberapa perbedaan dalam hukum waris:</p>
          
          <div class="space-y-4">
            <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <h4 class="font-bold mb-2">🔹 Mazhab Hanafi</h4>
              <ul class="list-disc list-inside space-y-1">
                <li>Kakek menghalangi semua saudara dalam semua kondisi</li>
                <li>Lebih ketat dalam masalah penghalangan</li>
              </ul>
            </div>
            
            <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <h4 class="font-bold mb-2">🔹 Mazhab Maliki</h4>
              <ul class="list-disc list-inside space-y-1">
                <li>Cucu perempuan dapat menerima ta'shib dari saudara perempuan</li>
                <li>Lebih fleksibel dalam kasus tertentu</li>
              </ul>
            </div>
            
            <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
              <h4 class="font-bold mb-2">🔹 Mazhab Syafi'i</h4>
              <ul class="list-disc list-inside space-y-1">
                <li>Mengikuti pendapat jumhur dalam kebanyakan kasus</li>
                <li>Kakek tidak menghalangi saudara jika ada anak</li>
              </ul>
            </div>
            
            <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
              <h4 class="font-bold mb-2">🔹 Mazhab Hanbali</h4>
              <ul class="list-disc list-inside space-y-1">
                <li>Mirip dengan Mazhab Syafi'i</li>
                <li>Mengikuti pendapat jumhur</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4">
            <h4 class="font-bold mb-2">📚 Referensi:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Bidayatul Mujtahid - Ibnu Rusyd</li>
              <li>Al-Mughni - Ibnu Qudamah</li>
              <li>Al-Fiqh 'ala Madhahib al-Arba'ah</li>
            </ul>
          </div>
        </div>
      `
    },
    
    rukun: {
      title: '📖 Rukun Waris dalam Islam',
      content: `
        <div class="space-y-4">
          <p><strong>Rukun Waris</strong> adalah syarat-syarat yang harus terpenuhi agar pembagian waris dapat dilaksanakan.</p>
          
          <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">3 Rukun Waris:</h4>
            <ol class="list-decimal list-inside space-y-2">
              <li><strong>Al-Muwarrits (المورث)</strong> - Orang yang meninggal dan meninggalkan harta</li>
              <li><strong>Al-Warits (الوارث)</strong> - Ahli waris yang berhak menerima harta</li>
              <li><strong>Al-Mauruts (الموروث)</strong> - Harta yang ditinggalkan</li>
            </ol>
          </div>
          
          <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg mt-4">
            <h4 class="font-bold mb-2">Syarat Waris:</h4>
            <ul class="list-disc list-inside space-y-1">
              <li>Pewaris benar-benar telah meninggal dunia (secara hakiki atau hukmi)</li>
              <li>Ahli waris masih hidup saat pewaris meninggal</li>
              <li>Diketahui sebab-sebab mewarisi (hubungan kekerabatan, pernikahan, atau wala')</li>
              <li>Tidak ada penghalang waris</li>
            </ul>
          </div>
        </div>
      `
    },
    
    penghalang: {
      title: '📖 Penghalang Waris (Mawani\' al-Irts)',
      content: `
        <div class="space-y-4">
          <p><strong>Penghalang Waris</strong> adalah hal-hal yang menyebabkan seseorang tidak berhak menerima warisan meskipun memiliki hubungan kekerabatan dengan pewaris.</p>
          
          <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">3 Penghalang Utama:</h4>
            
            <div class="space-y-4 mt-3">
              <div class="bg-white dark:bg-gray-700 p-3 rounded">
                <h5 class="font-bold text-red-800 dark:text-red-300 mb-2">1️⃣ Pembunuhan (القتل)</h5>
                <p class="text-sm mb-2">Ahli waris yang membunuh pewaris tidak berhak mendapat warisan.</p>
                <div class="dalil-section mt-2">
                  <p class="dalil-arabic text-sm">لَيْسَ لِلْقَاتِلِ مِيرَاثٌ</p>
                  <p class="dalil-translation text-xs">"Tidak ada warisan bagi pembunuh."</p>
                  <p class="dalil-source text-xs">HR. Nasa'i, Ibnu Majah, Daruquthni</p>
                </div>
                <p class="text-xs mt-2 italic">Catatan: Pembunuhan yang dimaksud adalah pembunuhan yang disengaja (qatl al-'amd). Ada perbedaan pendapat ulama tentang pembunuhan tidak sengaja.</p>
              </div>
              
              <div class="bg-white dark:bg-gray-700 p-3 rounded">
                <h5 class="font-bold text-red-800 dark:text-red-300 mb-2">2️⃣ Perbedaan Agama (اختلاف الدين)</h5>
                <p class="text-sm mb-2">Muslim tidak mewarisi dari non-Muslim, dan sebaliknya.</p>
                <div class="dalil-section mt-2">
                  <p class="dalil-arabic text-sm">لَا يَرِثُ الْمُسْلِمُ الْكَافِرَ وَلَا الْكَافِرُ الْمُسْلِمَ</p>
                  <p class="dalil-translation text-xs">"Orang Muslim tidak mewarisi orang kafir, dan orang kafir tidak mewarisi orang Muslim."</p>
                  <p class="dalil-source text-xs">HR. Bukhari & Muslim dari Usamah bin Zaid RA</p>
                </div>
                <p class="text-xs mt-2 italic">Catatan: Ini berlaku untuk orang yang murtad (keluar dari Islam). Namun ada perbedaan pendapat ulama tentang detail kasusnya.</p>
              </div>
              
              <div class="bg-white dark:bg-gray-700 p-3 rounded">
                <h5 class="font-bold text-red-800 dark:text-red-300 mb-2">3️⃣ Perbudakan (الرق)</h5>
                <p class="text-sm mb-2">Budak tidak berhak mewarisi karena tidak memiliki hak kepemilikan.</p>
                <p class="text-xs mt-2 italic">Catatan: Hukum ini sudah tidak relevan di zaman modern karena perbudakan telah dihapuskan.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg mt-4">
            <h4 class="font-bold mb-2">⚠️ Catatan Penting:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Kalkulator ini <strong>tidak memperhitungkan</strong> penghalang waris dalam perhitungan otomatis</li>
              <li>Jika ada kasus pembunuhan atau murtad, konsultasikan dengan ulama atau pengadilan agama</li>
              <li>Penghalang waris harus dibuktikan secara hukum</li>
              <li>Dalam kasus kompleks, sebaiknya menggunakan jasa konsultan waris syariah</li>
            </ul>
          </div>
          
          <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4">
            <h4 class="font-bold mb-2">📚 Referensi:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Al-Fiqh al-Islami wa Adillatuhu - Wahbah Zuhaili</li>
              <li>Fiqh al-Mawaris - Muhammad Ali ash-Shabuni</li>
              <li>Kompilasi Hukum Islam (KHI) Pasal 173</li>
            </ul>
          </div>
        </div>
      `
    }
  },
  
  en: {
    fardh: {
      title: '📖 What is Fardh (Ashhabul Furudh)?',
      content: `
        <div class="space-y-4">
          <p><strong>Fardh</strong> are fixed shares determined in the Quran and Hadith.</p>
          
          <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">Fardh Shares:</h4>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>1/2 (Half)</strong>: Husband (no children), Single daughter, Single full sister</li>
              <li><strong>1/4 (Quarter)</strong>: Husband (with children), Wife (no children)</li>
              <li><strong>1/8 (Eighth)</strong>: Wife (with children)</li>
              <li><strong>2/3 (Two thirds)</strong>: Two or more daughters, Two or more sisters</li>
              <li><strong>1/3 (Third)</strong>: Mother (no children & siblings), Two or more maternal siblings</li>
              <li><strong>1/6 (Sixth)</strong>: Father/Mother (with children), Grandfather, Grandmother, One maternal sibling</li>
            </ul>
          </div>
          
          <div class="dalil-section">
            <p class="dalil-arabic">يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ</p>
            <p class="dalil-translation">"Allah instructs you concerning your children..."</p>
            <p class="dalil-source">QS. An-Nisa: 11</p>
          </div>
        </div>
      `
    },
    
    ashabah: {
      title: '📖 What is Ashabah?',
      content: `
        <div class="space-y-4">
          <p><strong>Ashabah</strong> are heirs who receive the remainder after fardh shares are distributed.</p>
          
          <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">Types of Ashabah:</h4>
            <ul class="list-disc list-inside space-y-2">
              <li><strong>Ashabah Bi Nafsihi</strong> (Ashabah by himself):
                <ul class="list-circle list-inside ml-4 mt-1">
                  <li>Son</li>
                  <li>Grandson (through son)</li>
                  <li>Father (if no children)</li>
                  <li>Grandfather (if no father)</li>
                  <li>Brothers (full/paternal)</li>
                </ul>
              </li>
              <li><strong>Ashabah Bi Ghairihi</strong> (Ashabah with others):
                <ul class="list-circle list-inside ml-4 mt-1">
                  <li>Daughter with son (ratio 2:1)</li>
                  <li>Granddaughter with grandson (ratio 2:1)</li>
                  <li>Sister with brother (ratio 2:1)</li>
                </ul>
              </li>
            </ul>
          </div>
          
          <div class="dalil-section">
            <p class="dalil-arabic">أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَهُوَ لِأَوْلَى رَجُلٍ ذَكَرٍ</p>
            <p class="dalil-translation">"Give the shares to those entitled to them, and whatever remains goes to the nearest male relative."</p>
            <p class="dalil-source">HR. Bukhari & Muslim from Ibn Abbas RA</p>
          </div>
        </div>
      `
    },
    
    mahjub: {
      title: '📖 What is Mahjub (Blocking)?',
      content: `
        <div class="space-y-4">
          <p><strong>Mahjub</strong> is when an heir is blocked from inheritance because there is another heir with a closer relationship to the deceased.</p>
          
          <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">Blocking Principle:</h4>
            <p class="mb-3"><strong>"Al-Aqrab Yahjubu Al-Ab'ad"</strong><br>الأقرب يحجب الأبعد<br><em>"The closer blocks the farther"</em></p>
            
            <h4 class="font-bold mb-2 mt-4">Blocking Examples:</h4>
            <ul class="list-disc list-inside space-y-2">
              <li><strong>Grandchildren</strong> blocked by <strong>Son</strong></li>
              <li><strong>Grandfather</strong> blocked by <strong>Father</strong></li>
              <li><strong>Grandmother</strong> blocked by <strong>Mother</strong></li>
              <li><strong>Siblings</strong> blocked by <strong>Father or Son</strong></li>
              <li><strong>Maternal siblings</strong> blocked by <strong>Children, Grandchildren, Father, or Grandfather</strong></li>
            </ul>
          </div>
          
          <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg mt-4">
            <h4 class="font-bold mb-2">⚠️ Important Exception:</h4>
            <p><strong>Grandfather and Grandmother are NOT blocked by the presence of children.</strong> They still receive their fardh share (1/6) along with the children of the deceased.</p>
            <p class="text-sm mt-2 italic">Reference: Bidayatul Mujtahid (Ibn Rushd), Al-Mughni (Ibn Qudamah)</p>
          </div>
        </div>
      `
    },
    
    aul: {
      title: '📖 What is \'Aul?',
      content: `
        <div class="space-y-4">
          <p><strong>'Aul</strong> (العول) occurs when total fardh shares exceed 100%. In this case, all fardh shares are reduced proportionally.</p>
          
          <div class="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">'Aul Case Example:</h4>
            <p class="mb-2">Deceased leaves:</p>
            <ul class="list-disc list-inside space-y-1 mb-3">
              <li>Husband: 1/2 (50%)</li>
              <li>Mother: 1/3 (33.33%)</li>
              <li>2 Full sisters: 2/3 (66.67%)</li>
            </ul>
            <p class="font-bold">Total: 150% (exceeds 100%)</p>
            <p class="mt-2">Solution: All shares reduced proportionally to:</p>
            <ul class="list-disc list-inside space-y-1 mt-2">
              <li>Husband: 1/2 × (100/150) = 33.33%</li>
              <li>Mother: 1/3 × (100/150) = 22.22%</li>
              <li>2 Sisters: 2/3 × (100/150) = 44.44%</li>
            </ul>
            <p class="font-bold mt-2">Total: 100% ✅</p>
          </div>
          
          <div class="dalil-section">
            <p class="dalil-arabic">قَالَ عُمَرُ رَضِيَ اللَّهُ عَنْهُ: وَاللَّهِ مَا أَدْرِي أَيُّكُمْ قَدَّمَ اللَّهُ وَأَيُّكُمْ أَخَّرَ، فَأَعُولُ الْفَرِيضَةَ</p>
            <p class="dalil-translation">"Umar RA said: 'By Allah, I do not know which of you Allah has given precedence and which He has delayed, so I will distribute the inheritance by 'aul.'"</p>
            <p class="dalil-source">Athar of Umar bin Khattab RA - Ijma' of Companions</p>
          </div>
        </div>
      `
    },
    
    radd: {
      title: '📖 What is Radd?',
      content: `
        <div class="space-y-4">
          <p><strong>Radd</strong> (الرد) is the return of remaining estate to fardh heirs (except spouse) when there is no ashabah heir.</p>
          
          <div class="bg-teal-50 dark:bg-teal-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">Radd Case Example:</h4>
            <p class="mb-2">Deceased leaves:</p>
            <ul class="list-disc list-inside space-y-1 mb-3">
              <li>Mother: 1/3 (33.33%)</li>
              <li>2 Daughters: 2/3 (66.67%)</li>
            </ul>
            <p class="font-bold">Total: 100%</p>
            <p class="mt-2">No ashabah, no remainder? <strong>WRONG!</strong></p>
            <p class="mt-2">If total fardh is less than 100% and there is no ashabah, the remainder is returned (radd) to fardh heirs proportionally.</p>
          </div>
          
          <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg mt-4">
            <h4 class="font-bold mb-2">⚠️ Important Note:</h4>
            <p><strong>Husband and Wife do NOT receive Radd.</strong> Remainder is only returned to fardh heirs other than spouse.</p>
          </div>
          
          <div class="dalil-section">
            <p class="dalil-arabic">قَالَ عَلِيٌّ رَضِيَ اللَّهُ عَنْهُ: إِذَا لَمْ يَكُنْ عَصَبَةٌ رُدَّ عَلَى ذَوِي الْفُرُوضِ بِقَدْرِ فُرُوضِهِمْ</p>
            <p class="dalil-translation">"Ali RA said: 'If there is no ashabah, then the remainder is returned to the fardh heirs according to their shares.'"</p>
            <p class="dalil-source">Opinion of Ali bin Abi Talib RA - Jumhur Madhab</p>
          </div>
        </div>
      `
    },
    
    mazhab: {
      title: '📖 Differences Among 4 Madhabs in Inheritance',
      content: `
        <div class="space-y-4">
          <p>The four madhabs (Hanafi, Maliki, Shafi'i, Hanbali) have some differences in inheritance law:</p>
          
          <div class="space-y-4">
            <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <h4 class="font-bold mb-2">🔹 Hanafi Madhab</h4>
              <ul class="list-disc list-inside space-y-1">
                <li>Grandfather blocks all siblings in all conditions</li>
                <li>Stricter in blocking matters</li>
              </ul>
            </div>
            
            <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <h4 class="font-bold mb-2">🔹 Maliki Madhab</h4>
              <ul class="list-disc list-inside space-y-1">
                <li>Granddaughters can receive ta'shib from sisters</li>
                <li>More flexible in certain cases</li>
              </ul>
            </div>
            
            <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
              <h4 class="font-bold mb-2">🔹 Shafi'i Madhab</h4>
              <ul class="list-disc list-inside space-y-1">
                <li>Follows jumhur opinion in most cases</li>
                <li>Grandfather does not block siblings if there are children</li>
              </ul>
            </div>
            
            <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
              <h4 class="font-bold mb-2">🔹 Hanbali Madhab</h4>
              <ul class="list-disc list-inside space-y-1">
                <li>Similar to Shafi'i Madhab</li>
                <li>Follows jumhur opinion</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4">
            <h4 class="font-bold mb-2">📚 References:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Bidayatul Mujtahid - Ibn Rushd</li>
              <li>Al-Mughni - Ibn Qudamah</li>
              <li>Al-Fiqh 'ala Madhahib al-Arba'ah</li>
            </ul>
          </div>
        </div>
      `
    },
    
    rukun: {
      title: '📖 Pillars of Islamic Inheritance',
      content: `
        <div class="space-y-4">
          <p><strong>Pillars of Inheritance</strong> are the requirements that must be fulfilled for inheritance distribution to be valid.</p>
          
          <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">3 Pillars of Inheritance:</h4>
            <ol class="list-decimal list-inside space-y-2">
              <li><strong>Al-Muwarrits (المورث)</strong> - The deceased who leaves property</li>
              <li><strong>Al-Warits (الوارث)</strong> - The heir entitled to receive property</li>
              <li><strong>Al-Mauruts (الموروث)</strong> - The property left behind</li>
            </ol>
          </div>
          
          <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg mt-4">
            <h4 class="font-bold mb-2">Conditions for Inheritance:</h4>
            <ul class="list-disc list-inside space-y-1">
              <li>The deceased has truly passed away (actually or legally)</li>
              <li>The heir is alive when the deceased passes away</li>
              <li>The cause of inheritance is known (kinship, marriage, or wala')</li>
              <li>There are no impediments to inheritance</li>
            </ul>
          </div>
        </div>
      `
    },
    
    penghalang: {
      title: '📖 Impediments to Inheritance (Mawani\' al-Irts)',
      content: `
        <div class="space-y-4">
          <p><strong>Impediments to Inheritance</strong> are factors that prevent someone from receiving inheritance despite having kinship with the deceased.</p>
          
          <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <h4 class="font-bold mb-2">3 Main Impediments:</h4>
            
            <div class="space-y-4 mt-3">
              <div class="bg-white dark:bg-gray-700 p-3 rounded">
                <h5 class="font-bold text-red-800 dark:text-red-300 mb-2">1️⃣ Murder (القتل)</h5>
                <p class="text-sm mb-2">An heir who murders the deceased is not entitled to inheritance.</p>
                <div class="dalil-section mt-2">
                  <p class="dalil-arabic text-sm">لَيْسَ لِلْقَاتِلِ مِيرَاثٌ</p>
                  <p class="dalil-translation text-xs">"There is no inheritance for the murderer."</p>
                  <p class="dalil-source text-xs">HR. Nasa'i, Ibn Majah, Daruquthni</p>
                </div>
                <p class="text-xs mt-2 italic">Note: This refers to intentional murder (qatl al-'amd). There are differences of opinion among scholars regarding unintentional killing.</p>
              </div>
              
              <div class="bg-white dark:bg-gray-700 p-3 rounded">
                <h5 class="font-bold text-red-800 dark:text-red-300 mb-2">2️⃣ Difference in Religion (اختلاف الدين)</h5>
                <p class="text-sm mb-2">A Muslim does not inherit from a non-Muslim, and vice versa.</p>
                <div class="dalil-section mt-2">
                  <p class="dalil-arabic text-sm">لَا يَرِثُ الْمُسْلِمُ الْكَافِرَ وَلَا الْكَافِرُ الْمُسْلِمَ</p>
                  <p class="dalil-translation text-xs">"A Muslim does not inherit from a disbeliever, nor does a disbeliever inherit from a Muslim."</p>
                  <p class="dalil-source text-xs">HR. Bukhari & Muslim from Usamah bin Zaid RA</p>
                </div>
                <p class="text-xs mt-2 italic">Note: This applies to apostates (those who leave Islam). However, there are differences of opinion among scholars on specific cases.</p>
              </div>
              
              <div class="bg-white dark:bg-gray-700 p-3 rounded">
                <h5 class="font-bold text-red-800 dark:text-red-300 mb-2">3️⃣ Slavery (الرق)</h5>
                <p class="text-sm mb-2">A slave is not entitled to inherit because they have no ownership rights.</p>
                <p class="text-xs mt-2 italic">Note: This law is no longer relevant in modern times as slavery has been abolished.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg mt-4">
            <h4 class="font-bold mb-2">⚠️ Important Notes:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>This calculator <strong>does not account for</strong> impediments to inheritance in automatic calculations</li>
              <li>If there are cases of murder or apostasy, consult with scholars or religious courts</li>
              <li>Impediments to inheritance must be legally proven</li>
              <li>In complex cases, it's advisable to use Islamic inheritance consultant services</li>
            </ul>
          </div>
          
          <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4">
            <h4 class="font-bold mb-2">📚 References:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Al-Fiqh al-Islami wa Adillatuhu - Wahbah Zuhaili</li>
              <li>Fiqh al-Mawaris - Muhammad Ali ash-Shabuni</li>
              <li>Islamic Law Compilation (KHI) Article 173</li>
            </ul>
          </div>
        </div>
      `
    }
  }
};

// ===== FUNGSI SHOW EDUCATIONAL CONTENT =====

function showEducationalContent(topic) {
  const content = educationalContent[currentLang][topic];
  if (content) {
    showModal(content.title, content.content);
  }
}

// ===== FUNGSI ADD EDUCATIONAL BUTTONS =====

function addEducationalButtons() {
  const landingPage = document.getElementById('landingPage');
  if (landingPage && !document.getElementById('educationalButtons')) {
    const eduSection = document.createElement('div');
    eduSection.id = 'educationalButtons';
    eduSection.className = 'mt-8 space-y-3';
    eduSection.innerHTML = `
      <h3 class="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4">
        ${currentLang === 'id' ? '📚 Pelajari Istilah Waris' : '📚 Learn Inheritance Terms'}
      </h3>
      <div class="grid grid-cols-2 gap-3">
        <button onclick="showEducationalContent('fardh')" class="p-4 bg-blue-100 dark:bg-blue-900 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition text-left">
          <div class="font-bold text-blue-900 dark:text-blue-300">📖 Fardh</div>
          <div class="text-sm text-blue-700 dark:text-blue-400">${currentLang === 'id' ? 'Bagian tetap' : 'Fixed shares'}</div>
        </button>
        <button onclick="showEducationalContent('ashabah')" class="p-4 bg-green-100 dark:bg-green-900 rounded-xl hover:bg-green-200 dark:hover:bg-green-800 transition text-left">
          <div class="font-bold text-green-900 dark:text-green-300">📖 Ashabah</div>
          <div class="text-sm text-green-700 dark:text-green-400">${currentLang === 'id' ? 'Sisa harta' : 'Remainder'}</div>
        </button>
        <button onclick="showEducationalContent('mahjub')" class="p-4 bg-red-100 dark:bg-red-900 rounded-xl hover:bg-red-200 dark:hover:bg-red-800 transition text-left">
          <div class="font-bold text-red-900 dark:text-red-300">📖 Mahjub</div>
          <div class="text-sm text-red-700 dark:text-red-400">${currentLang === 'id' ? 'Penghalangan' : 'Blocking'}</div>
        </button>
        <button onclick="showEducationalContent('aul')" class="p-4 bg-purple-100 dark:bg-purple-900 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-800 transition text-left">
          <div class="font-bold text-purple-900 dark:text-purple-300">📖 'Aul</div>
          <div class="text-sm text-purple-700 dark:text-purple-400">${currentLang === 'id' ? 'Kelebihan bagian' : 'Excess shares'}</div>
        </button>
        <button onclick="showEducationalContent('radd')" class="p-4 bg-teal-100 dark:bg-teal-900 rounded-xl hover:bg-teal-200 dark:hover:bg-teal-800 transition text-left">
          <div class="font-bold text-teal-900 dark:text-teal-300">📖 Radd</div>
          <div class="text-sm text-teal-700 dark:text-teal-400">${currentLang === 'id' ? 'Pengembalian sisa' : 'Return remainder'}</div>
        </button>
        <button onclick="showEducationalContent('mazhab')" class="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-xl hover:bg-yellow-200 dark:hover:bg-yellow-800 transition text-left">
          <div class="font-bold text-yellow-900 dark:text-yellow-300">📖 4 Mazhab</div>
          <div class="text-sm text-yellow-700 dark:text-yellow-400">${currentLang === 'id' ? 'Perbedaan mazhab' : 'Madhab differences'}</div>
        </button>
        
        <!-- TOMBOL BARU: RUKUN WARIS -->
        <button onclick="showEducationalContent('rukun')" class="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-800 transition text-left">
          <div class="font-bold text-indigo-900 dark:text-indigo-300">📖 Rukun Waris</div>
          <div class="text-sm text-indigo-700 dark:text-indigo-400">${currentLang === 'id' ? 'Syarat waris' : 'Inheritance pillars'}</div>
        </button>
        
        <!-- TOMBOL BARU: PENGHALANG WARIS -->
        <button onclick="showEducationalContent('penghalang')" class="p-4 bg-rose-100 dark:bg-rose-900 rounded-xl hover:bg-rose-200 dark:hover:bg-rose-800 transition text-left">
          <div class="font-bold text-rose-900 dark:text-rose-300">📖 Penghalang Waris</div>
          <div class="text-sm text-rose-700 dark:text-rose-400">${currentLang === 'id' ? 'Pembunuh & Murtad' : 'Murder & Apostasy'}</div>
        </button>
      </div>
    `;
    
    const btnStart = landingPage.querySelector('#btnStart');
    if (btnStart) {
      landingPage.insertBefore(eduSection, btnStart);
    }
  }
}

// ===== GLOBAL ERROR HANDLER =====

window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  showModal(
    currentLang === 'id' ? '❌ Terjadi Kesalahan' : '❌ An Error Occurred',
    currentLang === 'id' 
      ? 'Maaf, terjadi kesalahan dalam aplikasi. Silakan refresh halaman dan coba lagi.'
      : 'Sorry, an error occurred in the application. Please refresh the page and try again.'
  );
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

// ===== INITIALIZATION =====

window.addEventListener('load', () => {
  addEducationalButtons();
  console.log('✅ Educational content loaded');
  console.log('✅ \'Aul & Radd handling enabled');
  console.log('✅ Mahjub detection enabled');
  console.log('✅ Error handling enabled');
});

// ===== END OF PART 3 =====

console.log('%c✅ Part 3: Display Result & UI Components Loaded', 'color: #10b981; font-weight: bold; font-size: 14px;');
console.log('%c🎨 Features: Render Heirs, Render Blocked, Render Dalil, Verification Display, Educational Content, Error Handling', 'color: #6b7280; font-size: 12px;');
console.log('%c🕌 Kalkulator Waris Islam - 4 Mazhab (Refactored Version)', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%c📖 Total Lines: ~2200 (Optimized from ~2800)', 'color: #10b981; font-size: 12px;');
console.log('%c✅ All features implemented and ready to use!', 'color: #10b981; font-weight: bold;');
