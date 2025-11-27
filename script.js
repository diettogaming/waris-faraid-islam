/* ===================================
   KALKULATOR WARIS ISLAM - 4 MAZHAB
   Complete JavaScript Implementation
   VERSI PERBAIKAN (Tanpa Auto-save)
   =================================== */

// ===== GLOBAL VARIABLES =====
let currentLang = 'id';
let currentStep = 0;
let formData = {};

// ===== TRANSLATIONS =====
const translations = {
  id: {
    title: 'Kalkulator Waris Islam - 4 Mazhab',
    subtitle: 'Aplikasi ini membantu Anda menghitung pembagian waris sesuai hukum Islam berdasarkan Al-Quran dan Sunnah dengan pendapat 4 Mazhab.',
    features: '✨ Fitur Aplikasi:',
    feature1: 'Perhitungan akurat sesuai 4 mazhab (Hanafi, Maliki, Syafi\'i, Hanbali)',
    feature2: 'Penjelasan lengkap dengan dalil Al-Quran & Hadits (teks Arab, terjemah, sumber, status)',
    feature3: 'Export PDF dengan detail lengkap',
    feature4: 'Multi-bahasa (Indonesia & English)',
    feature5: 'Deteksi otomatis penghalangan (Mahjub) dengan penjelasan lengkap',
    feature6: 'Mode gelap untuk kenyamanan mata',
    disclaimer_title: '⚠️ Disclaimer:',
    disclaimer_text: 'Aplikasi ini adalah alat bantu perhitungan. Untuk kasus kompleks atau sengketa, konsultasikan dengan ulama atau hakim syariah yang kompeten. Perhitungan menggunakan pendapat Jumhur Ulama sebagai default.',
    start: 'Mulai Perhitungan →',
    back: '← Kembali',
    next: 'Lanjut →',
    calculate: '🧮 Hitung Waris',
    loading: 'Memproses perhitungan...',
    reset: '🔄 Hitung Ulang',
    export_pdf: '📄 Export PDF',
    step1_title: 'Pilih Mazhab & Data Pewaris',
    step1_subtitle: 'Langkah 1 dari 6',
    step2_title: 'Harta & Kewajiban',
    step2_subtitle: 'Langkah 2 dari 6',
    step3_title: 'Ahli Waris - Pasangan',
    step3_subtitle: 'Langkah 3 dari 6',
    step4_title: 'Ahli Waris - Orang Tua',
    step4_subtitle: 'Langkah 4 dari 6',
    step5_title: 'Ahli Waris - Anak & Cucu',
    step5_subtitle: 'Langkah 5 dari 6',
    step6_title: 'Ahli Waris - Saudara',
    step6_subtitle: 'Langkah 6 dari 6',
    result_title: 'Hasil Pembagian Waris',
    mazhab_label: 'Pilih Mazhab',
    gender_label: 'Siapa yang Meninggal Dunia?',
    male: 'Laki-laki',
    female: 'Perempuan'
  },
  en: {
    title: 'Islamic Inheritance Calculator - 4 Madhabs',
    subtitle: 'This application helps you calculate inheritance distribution according to Islamic law based on the Quran and Sunnah with the opinions of 4 Madhabs.',
    features: '✨ Features:',
    feature1: 'Accurate calculation according to 4 madhabs (Hanafi, Maliki, Shafi\'i, Hanbali)',
    feature2: 'Complete explanation with Quran & Hadith evidence (Arabic text, translation, source, status)',
    feature3: 'Export PDF with complete details',
    feature4: 'Multi-language (Indonesian & English)',
    feature5: 'Automatic blocking detection (Mahjub) with complete explanation',
    feature6: 'Dark mode for eye comfort',
    disclaimer_title: '⚠️ Disclaimer:',
    disclaimer_text: 'This application is a calculation tool. For complex cases or disputes, consult competent scholars or sharia judges. Calculations use the opinion of Jumhur Ulama as default.',
    start: 'Start Calculation →',
    back: '← Back',
    next: 'Next →',
    calculate: '🧮 Calculate Inheritance',
    loading: 'Processing calculation...',
    reset: '🔄 Calculate Again',
    export_pdf: '📄 Export PDF',
    step1_title: 'Choose Madhab & Deceased Data',
    step1_subtitle: 'Step 1 of 6',
    step2_title: 'Assets & Obligations',
    step2_subtitle: 'Step 2 of 6',
    step3_title: 'Heirs - Spouse',
    step3_subtitle: 'Step 3 of 6',
    step4_title: 'Heirs - Parents',
    step4_subtitle: 'Step 4 of 6',
    step5_title: 'Heirs - Children & Grandchildren',
    step5_subtitle: 'Step 5 of 6',
    step6_title: 'Heirs - Siblings',
    step6_subtitle: 'Step 6 of 6',
    result_title: 'Inheritance Distribution Result',
    mazhab_label: 'Choose Madhab',
    gender_label: 'Who Passed Away?',
    male: 'Male',
    female: 'Female'
  }
};

// ===== DALIL DATABASE (LENGKAP DARI DISKUSI GEMINI) =====
const dalilDatabase = {
  // Dalil Rasul tidak mensolatkan jenazah yang berhutang
  hutang: {
    arab: 'كَانَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ إِذَا أُتِيَ بِرَجُلٍ مَيِّتٍ عَلَيْهِ دَيْنٌ سَأَلَ: هَلْ تَرَكَ لِدَيْنِهِ قَضَاءً؟ فَإِنْ حُدِّثَ أَنَّهُ تَرَكَ وَفَاءً صَلَّى عَلَيْهِ، وَإِلَّا قَالَ: صَلُّوا عَلَى صَاحِبِكُمْ',
    terjemah_id: 'Rasulullah ﷺ apabila didatangkan kepadanya jenazah yang memiliki hutang, beliau bertanya: "Apakah dia meninggalkan sesuatu untuk melunasi hutangnya?" Jika diberitahu bahwa dia meninggalkan harta untuk melunasinya, beliau menshalatkannya. Jika tidak, beliau berkata: "Shalatkanlah teman kalian."',
    terjemah_en: 'When the Messenger of Allah ﷺ was brought a deceased person who had debt, he would ask: "Did he leave anything to pay his debt?" If he was told that he left property to pay it, he would pray for him. Otherwise, he would say: "Pray for your companion."',
    riwayat: 'HR. Bukhari no. 2289',
    kitab: 'Shahih Bukhari',
    status: 'Shahih'
  },
  
  // Dalil urutan pembagian harta
  urutan: {
    arab: 'مِن بَعْدِ وَصِيَّةٍ يُوصِي بِهَا أَوْ دَيْنٍ',
    terjemah_id: 'Sesudah dipenuhi wasiat yang ia buat atau sesudah dibayar hutangnya.',
    terjemah_en: 'After any bequest he [may have] made or debt.',
    surah: 'An-Nisa',
    ayat: 11,
    tafsir_id: 'Ayat ini menunjukkan urutan pembagian harta: 1) Biaya jenazah, 2) Hutang, 3) Wasiat (maksimal 1/3), 4) Waris'
  },
  
  // Dalil suami
  suami: {
    dengan_anak: {
      arab: 'وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ ۚ فَإِن كَانَ لَهُنَّ وَلَدٌ فَلَكُمُ الرُّبُعُ مِمَّا تَرَكْنَ',
      terjemah_id: 'Dan bagimu (suami) seperdua dari harta yang ditinggalkan istri-istrimu, jika mereka tidak mempunyai anak. Jika mereka mempunyai anak, maka kamu mendapat seperempat dari harta yang ditinggalkannya.',
      terjemah_en: 'And for you is half of what your wives leave if they have no child. But if they have a child, for you is one fourth of what they leave.',
      surah: 'An-Nisa',
      ayat: 12,
      bagian: '1/4',
      penjelasan_id: 'Suami mendapat 1/4 jika istri meninggalkan anak atau cucu',
      penjelasan_en: 'Husband gets 1/4 if wife leaves children or grandchildren'
    },
    tanpa_anak: {
      arab: 'وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ',
      terjemah_id: 'Dan bagimu (suami) seperdua dari harta yang ditinggalkan istri-istrimu, jika mereka tidak mempunyai anak.',
      terjemah_en: 'And for you is half of what your wives leave if they have no child.',
      surah: 'An-Nisa',
      ayat: 12,
      bagian: '1/2',
      penjelasan_id: 'Suami mendapat 1/2 jika istri tidak meninggalkan anak atau cucu',
      penjelasan_en: 'Husband gets 1/2 if wife leaves no children or grandchildren'
    }
  },
  
  // Dalil istri
  istri: {
    dengan_anak: {
      arab: 'وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ ۚ فَإِن كَانَ لَكُمْ وَلَدٌ فَلَهُنَّ الثُّمُنُ مِمَّا تَرَكْتُم',
      terjemah_id: 'Dan bagi mereka (istri-istri) seperempat dari harta yang kamu tinggalkan jika kamu tidak mempunyai anak. Jika kamu mempunyai anak, maka bagi mereka seperdelapan dari harta yang kamu tinggalkan.',
      terjemah_en: 'And for them (wives) is one fourth if you leave no child. But if you leave a child, then for them is an eighth of what you leave.',
      surah: 'An-Nisa',
      ayat: 12,
      bagian: '1/8',
      penjelasan_id: 'Istri mendapat 1/8 (dibagi rata jika lebih dari satu) jika suami meninggalkan anak atau cucu',
      penjelasan_en: 'Wife gets 1/8 (divided equally if more than one) if husband leaves children or grandchildren'
    },
    tanpa_anak: {
      arab: 'وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ',
      terjemah_id: 'Dan bagi mereka (istri-istri) seperempat dari harta yang kamu tinggalkan jika kamu tidak mempunyai anak.',
      terjemah_en: 'And for them (wives) is one fourth if you leave no child.',
      surah: 'An-Nisa',
      ayat: 12,
      bagian: '1/4',
      penjelasan_id: 'Istri mendapat 1/4 (dibagi rata jika lebih dari satu) jika suami tidak meninggalkan anak atau cucu',
      penjelasan_en: 'Wife gets 1/4 (divided equally if more than one) if husband leaves no children or grandchildren'
    }
  },
  
  // Dalil ayah
  ayah: {
    dengan_anak: {
      arab: 'وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ',
      terjemah_id: 'Dan untuk kedua ibu-bapak, bagi masing-masingnya seperenam dari harta yang ditinggalkan, jika dia (yang meninggal) mempunyai anak.',
      terjemah_en: 'And for one\'s parents, to each one of them is a sixth of his estate if he left children.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: '1/6 + ashabah',
      penjelasan_id: 'Ayah mendapat 1/6 jika ada anak, ditambah sisa harta sebagai ashabah',
      penjelasan_en: 'Father gets 1/6 if there are children, plus remainder as ashabah'
    },
    tanpa_anak: {
      arab: 'فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ',
      terjemah_id: 'Jika dia (yang meninggal) tidak mempunyai anak dan dia diwarisi oleh kedua ibu-bapaknya (saja), maka ibunya mendapat sepertiga.',
      terjemah_en: 'And if he had no children and the parents [alone] inherit from him, then for his mother is one third.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: 'Sisa (ashabah)',
      penjelasan_id: 'Ayah mendapat sisa harta sebagai ashabah jika tidak ada anak',
      penjelasan_en: 'Father gets remainder as ashabah if there are no children'
    }
  },
  
  // Dalil ibu
  ibu: {
    dengan_anak: {
      arab: 'وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ',
      terjemah_id: 'Dan untuk kedua ibu-bapak, bagi masing-masingnya seperenam dari harta yang ditinggalkan, jika dia (yang meninggal) mempunyai anak.',
      terjemah_en: 'And for one\'s parents, to each one of them is a sixth of his estate if he left children.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: '1/6',
      penjelasan_id: 'Ibu mendapat 1/6 jika ada anak atau cucu',
      penjelasan_en: 'Mother gets 1/6 if there are children or grandchildren'
    },
    tanpa_anak: {
      arab: 'فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ',
      terjemah_id: 'Jika dia (yang meninggal) tidak mempunyai anak dan dia diwarisi oleh kedua ibu-bapaknya (saja), maka ibunya mendapat sepertiga.',
      terjemah_en: 'And if he had no children and the parents [alone] inherit from him, then for his mother is one third.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: '1/3',
      penjelasan_id: 'Ibu mendapat 1/3 jika tidak ada anak, cucu, atau saudara',
      penjelasan_en: 'Mother gets 1/3 if there are no children, grandchildren, or siblings'
    }
  },
  
  // Dalil Kakek & Nenek (DARI DISKUSI GEMINI)
  kakek: {
    dengan_anak: {
      arab: 'وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ',
      terjemah_id: 'Dan untuk kedua ibu-bapak, bagi masing-masingnya seperenam dari harta yang ditinggalkan, jika dia (yang meninggal) mempunyai anak.',
      terjemah_en: 'And for one\'s parents, to each one of them is a sixth of his estate if he left children.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: '1/6',
      penjelasan_id: 'Kakek mendapat 1/6 jika ada anak kandung (menggantikan posisi ayah). Kakek TIDAK terhalang oleh keberadaan anak.',
      penjelasan_en: 'Grandfather gets 1/6 if there are children (replacing father position). Grandfather is NOT blocked by children.',
      referensi: 'Bidayatul Mujtahid (Ibnu Rusyd), Al-Mughni (Ibnu Qudamah)'
    }
  },
  
  nenek: {
    bagian: {
      arab: 'عَنْ قَبِيصَةَ بْنِ ذُؤَيْبٍ قَالَ: جَاءَتِ الْجَدَّةُ إِلَى أَبِي بَكْرٍ فَسَأَلَتْهُ مِيرَاثَهَا، فَقَالَ: مَا لَكِ فِي كِتَابِ اللَّهِ شَيْءٌ، وَمَا عَلِمْتُ لَكِ فِي سُنَّةِ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ شَيْئًا، فَارْجِعِي حَتَّى أَسْأَلَ النَّاسَ. فَسَأَلَ، فَقَالَ الْمُغِيرَةُ بْنُ شُعْبَةَ: حَضَرْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَعْطَاهَا السُّدُسَ',
      terjemah_id: 'Dari Qabishah bin Zu\'aib, ia berkata: "Nenek datang kepada Abu Bakar RA, menanyakan bagian warisnya. Abu Bakar berkata: \'Dalam Kitabullah (Al-Qur\'an) tidak ada bagian untukmu, dan dalam Sunnah Nabi SAW aku tidak mengetahui ada bagian untukmu. Pulanglah sampai aku tanyakan kepada orang-orang.\' Lalu Abu Bakar bertanya kepada para sahabat, maka Mughirah bin Syu\'bah berkata: \'Aku pernah menghadiri majelis Rasulullah SAW dan beliau memberikan kepada nenek seperenam (1/6) bagian.\'"',
      terjemah_en: 'From Qabishah bin Zu\'aib: "A grandmother came to Abu Bakr RA asking about her inheritance. Abu Bakr said: \'There is nothing for you in the Book of Allah, and I do not know anything for you in the Sunnah of the Prophet SAW. Return until I ask the people.\' Then Abu Bakr asked, and Mughirah bin Shu\'bah said: \'I witnessed the Messenger of Allah SAW giving her one-sixth (1/6).\'"',
      riwayat: 'HR. Abu Daud, Tirmidzi, Ibnu Majah, Ahmad',
      status: 'Hasan',
      bagian: '1/6',
      penjelasan_id: 'Nenek mendapat 1/6. Nenek TIDAK terhalang oleh keberadaan anak kandung.',
      penjelasan_en: 'Grandmother gets 1/6. Grandmother is NOT blocked by children.',
      referensi: 'Bidayatul Mujtahid (Ibnu Rusyd), Al-Mughni (Ibnu Qudamah)'
    }
  },
  
  // Dalil anak perempuan
  anak_perempuan: {
    satu: {
      arab: 'وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ',
      terjemah_id: 'Dan jika anak itu seorang (perempuan) saja, maka dia memperoleh separuh (harta yang ditinggalkan).',
      terjemah_en: 'But if there is only one, for her is half.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: '1/2',
      penjelasan_id: 'Anak perempuan tunggal mendapat 1/2',
      penjelasan_en: 'Single daughter gets 1/2'
    },
    dua_atau_lebih: {
      arab: 'فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ',
      terjemah_id: 'Jika anak perempuan itu dua orang atau lebih, maka bagi mereka dua pertiga dari harta yang ditinggalkan.',
      terjemah_en: 'And if there are more than two, for them is two thirds of what he left.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: '2/3',
      penjelasan_id: 'Dua anak perempuan atau lebih mendapat 2/3 (dibagi rata)',
      penjelasan_en: 'Two or more daughters get 2/3 (divided equally)'
    },
    dengan_laki: {
      arab: 'يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ',
      terjemah_id: 'Allah mensyariatkan (mewajibkan) kepadamu tentang (pembagian warisan untuk) anak-anakmu, (yaitu) bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan.',
      terjemah_en: 'Allah instructs you concerning your children: for the male, what is equal to the share of two females.',
      surah: 'An-Nisa',
      ayat: 11,
      bagian: 'Ashabah (2:1)',
      penjelasan_id: 'Jika ada anak laki-laki, anak perempuan mendapat ashabah dengan perbandingan 2:1',
      penjelasan_en: 'If there are sons, daughters get ashabah with ratio 2:1'
    }
  },
  
  // Dalil anak laki-laki
  anak_laki: {
    arab: 'يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ',
    terjemah_id: 'Allah mensyariatkan (mewajibkan) kepadamu tentang (pembagian warisan untuk) anak-anakmu, (yaitu) bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan.',
    terjemah_en: 'Allah instructs you concerning your children: for the male, what is equal to the share of two females.',
    surah: 'An-Nisa',
    ayat: 11,
    bagian: 'Ashabah',
    penjelasan_id: 'Anak laki-laki mendapat sisa harta sebagai ashabah. Jika bersama anak perempuan, perbandingan 2:1',
    penjelasan_en: 'Son gets remainder as ashabah. If with daughters, ratio 2:1'
  },
  
  // Dalil mahjub (penghalangan) - DARI DISKUSI GEMINI
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
      penjelasan_id: 'Saudara kandung dan saudara seayah terhalang (mahjub) oleh keberadaan ayah atau anak laki-laki.',
      penjelasan_en: 'Full siblings and paternal siblings are blocked (mahjub) by the presence of father or son.',
      dalil: 'الأب يحجب الإخوة',
      sumber: 'Ijma\' Ulama 4 Mazhab'
    },
    saudara_seibu_oleh_anak: {
      penjelasan_id: 'Saudara seibu terhalang (mahjub) oleh keberadaan anak, cucu, ayah, atau kakek.',
      penjelasan_en: 'Maternal siblings are blocked (mahjub) by the presence of children, grandchildren, father, or grandfather.',
      dalil: 'الفرع الوارث يحجب الإخوة لأم',
      sumber: 'Ijma\' Ulama 4 Mazhab'
    }
  }
};

// ===== UTILITY FUNCTIONS =====

// Format currency to Rupiah
function formatCurrency(input) {
  let value = input.value.replace(/[^\d]/g, '');
  if (value === '') {
    input.value = '';
    return;
  }
  input.value = parseInt(value).toLocaleString('id-ID');
}

// Parse currency string to number
function parseCurrency(str) {
  if (!str) return 0;
  return parseInt(str.toString().replace(/[^\d]/g, '')) || 0;
}

// Format number to Rupiah display
function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

// Change language
function changeLang(lang) {
  currentLang = lang;
  
  // Update button states
  document.getElementById('btn-id').className = lang === 'id' 
    ? 'px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition'
    : 'px-4 py-2 rounded-lg bg-blue-300 text-blue-900 font-semibold shadow-lg hover:bg-blue-400 transition';
  
  document.getElementById('btn-en').className = lang === 'en'
    ? 'px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition'
    : 'px-4 py-2 rounded-lg bg-blue-300 text-blue-900 font-semibold shadow-lg hover:bg-blue-400 transition';
  
  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

// Toggle dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  const icon = document.getElementById('darkModeIcon');
  if (document.documentElement.classList.contains('dark')) {
    icon.textContent = '☀️';
  } else {
    icon.textContent = '🌙';
  }
}

// Show loading overlay
function showLoading() {
  document.getElementById('loadingOverlay').classList.remove('hidden');
}

// Hide loading overlay
function hideLoading() {
  document.getElementById('loadingOverlay').classList.add('hidden');
}

// Show modal
function showModal(title, content) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = content;
  document.getElementById('infoModal').classList.remove('hidden');
}

// Close modal
function closeModal() {
  document.getElementById('infoModal').classList.add('hidden');
}

// ===== NAVIGATION FUNCTIONS =====

function showStep(stepNum) {
  // Hide all steps
  document.querySelectorAll('[id^="step"], #landingPage, #resultPage').forEach(el => {
    el.classList.add('hidden');
  });
  
  // Show target step
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
    // Auto adjust
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

// Toggle pasangan options (PERBAIKAN: Opsional)
function togglePasanganOptions() {
  const tidakAdaPasangan = document.getElementById('tidakAdaPasangan').checked;
  const pasanganOptions = document.getElementById('pasanganOptions');
  
  if (tidakAdaPasangan) {
    pasanganOptions.classList.add('hidden');
    // Uncheck semua pasangan
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

// Update Orang Tua Options (PERBAIKAN: Dengan Pertanyaan)
function updateOrangTuaOptions() {
  const status = document.querySelector('input[name="statusOrangTua"]:checked');
  if (!status) return;
  
  const statusValue = status.value;
  const sectionOrangTua = document.getElementById('sectionOrangTua');
  const sectionKakekNenek = document.getElementById('sectionKakekNenek');
  
  // Reset checkboxes
  document.getElementById('ayah').checked = false;
  document.getElementById('ibu').checked = false;
  document.getElementById('kakek').checked = false;
  document.getElementById('nenek').checked = false;
  
  if (statusValue === 'keduanya') {
    // Keduanya hidup
    sectionOrangTua.classList.remove('hidden');
    sectionKakekNenek.classList.add('hidden');
    document.getElementById('ayah').checked = true;
    document.getElementById('ibu').checked = true;
    
    // Kakek & Nenek terhalang
    updateKakekNenekStatus();
    
  } else if (statusValue === 'salahSatu') {
    // Salah satu hidup
    sectionOrangTua.classList.remove('hidden');
    sectionKakekNenek.classList.remove('hidden');
    
  } else if (statusValue === 'keduanyaTidak') {
    // Keduanya meninggal
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
  
  // Kakek logic
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
  
  // Nenek logic
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

document.getElementById('btnStart').addEventListener('click', () => {
  showStep(1);
});

// Step 1: PERBAIKAN - Reset data saat gender berubah
document.getElementById('formStep1').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const newMazhab = document.querySelector('input[name="mazhab"]:checked').value;
  const newGender = document.querySelector('input[name="gender"]:checked').value;
  
  // PERBAIKAN: Reset formData jika gender berubah
  if (formData.gender && formData.gender !== newGender) {
    formData = {}; // Reset semua data
  }
  
  formData.mazhab = newMazhab;
  formData.gender = newGender;
  
  // Update spouse options based on gender
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
  
  // Validation
  if (formData.totalHarta <= 0) {
    alert(currentLang === 'id' ? 'Total harta harus lebih dari 0' : 'Total assets must be greater than 0');
    return;
  }
  
  showStep(3);
});

document.getElementById('backStep2').addEventListener('click', () => {
  showStep(1);
});

// Step 3: PERBAIKAN - Pasangan opsional
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

// Step 4: PERBAIKAN - Dengan pertanyaan
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
  
  // Start calculation
  calculate();
});

document.getElementById('backStep6').addEventListener('click', () => {
  showStep(5);
});

// ===== EVENT LISTENERS =====

// Dark mode toggle
document.getElementById('btnDarkMode').addEventListener('click', toggleDarkMode);

// Language toggle
document.getElementById('btn-id').addEventListener('click', () => changeLang('id'));
document.getElementById('btn-en').addEventListener('click', () => changeLang('en'));

// Reset button
document.getElementById('btnReset').addEventListener('click', () => {
  if (confirm(currentLang === 'id' ? 'Apakah Anda yakin ingin menghitung ulang?' : 'Are you sure you want to calculate again?')) {
    formData = {};
    document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
      input.value = '0';
    });
    document.querySelectorAll('input[type="checkbox"]').forEach(input => {
      input.checked = false;
    });
    document.querySelectorAll('input[type="radio"]').forEach(input => {
      if (input.value === 'jumhur' || input.value === 'male' || input.value === 'none') {
        input.checked = true;
      } else {
        input.checked = false;
      }
    });
    showStep(0);
  }
});

// Export PDF button
document.getElementById('btnExportPDF').addEventListener('click', () => {
  alert(currentLang === 'id' 
    ? '📄 Fitur Export PDF sedang dalam pengembangan. Untuk sementara, Anda dapat mencetak halaman ini (Ctrl+P).' 
    : '📄 PDF Export feature is under development. For now, you can print this page (Ctrl+P).');
  window.print();
});

// ===== INITIALIZATION =====

// Set default language
changeLang('id');

// Check system dark mode preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
  document.getElementById('darkModeIcon').textContent = '☀️';
}

console.log('🕌 Kalkulator Waris Islam - 4 Mazhab');
console.log('✅ Aplikasi siap digunakan');
console.log('📖 Perhitungan sesuai Al-Quran dan Sunnah');

// ===== CALCULATION ENGINE =====

function calculate() {
  showLoading();
  
  // Simulate processing time
  setTimeout(() => {
    const result = performCalculation(formData);
    displayResult(result);
    hideLoading();
    showStep('result');
  }, 1500);
}

function performCalculation(data) {
  // Calculate net estate
  let hartaBersih = data.totalHarta - data.biayaJenazah - data.hutang;
  
  // Add syariah insurance
  if (data.asuransi === 'syariah') {
    hartaBersih += data.nilaiAsuransi;
  }
  
  // Deduct wasiat (max 1/3)
  const maxWasiat = hartaBersih / 3;
  const wasiatFinal = Math.min(data.wasiat, maxWasiat);
  hartaBersih -= wasiatFinal;
  
  // Initialize heirs array
  const heirs = [];
  const blocked = [];
  
  // Check for blocking (mahjub)
  const hasAnak = data.anakLaki > 0 || data.anakPerempuan > 0;
  const hasAyah = data.ayah;
  const hasIbu = data.ibu;
  
  // Cucu blocked by anak laki
  if (data.anakLaki > 0 && (data.cucuLaki > 0 || data.cucuPerempuan > 0)) {
    blocked.push({
      type: 'cucu',
      count: data.cucuLaki + data.cucuPerempuan,
      reason: dalilDatabase.mahjub.cucu_oleh_anak
    });
    data.cucuLaki = 0;
    data.cucuPerempuan = 0;
  }
  
  // Kakek blocked by ayah
  if (hasAyah && data.kakek) {
    blocked.push({
      type: 'kakek',
      count: 1,
      reason: dalilDatabase.mahjub.kakek_oleh_ayah
    });
    data.kakek = false;
  }
  
  // Nenek blocked by ibu
  if (hasIbu && data.nenek) {
    blocked.push({
      type: 'nenek',
      count: 1,
      reason: dalilDatabase.mahjub.nenek_oleh_ibu
    });
    data.nenek = false;
  }
  
  // Saudara blocked by ayah or anak laki
  if ((hasAyah || data.anakLaki > 0) && (data.saudaraLakiKandung > 0 || data.saudaraPerempuanKandung > 0 || data.saudaraLakiSeayah > 0 || data.saudaraPerempuanSeayah > 0)) {
    blocked.push({
      type: 'saudara_kandung_seayah',
      count: data.saudaraLakiKandung + data.saudaraPerempuanKandung + data.saudaraLakiSeayah + data.saudaraPerempuanSeayah,
      reason: dalilDatabase.mahjub.saudara_oleh_ayah
    });
    data.saudaraLakiKandung = 0;
    data.saudaraPerempuanKandung = 0;
    data.saudaraLakiSeayah = 0;
    data.saudaraPerempuanSeayah = 0;
  }
  
  // Saudara seibu blocked by anak, cucu, ayah, kakek
  if ((hasAnak || data.cucuLaki > 0 || data.cucuPerempuan > 0 || hasAyah || data.kakek) && (data.saudaraLakiSeibu > 0 || data.saudaraPerempuanSeibu > 0)) {
    blocked.push({
      type: 'saudara_seibu',
      count: data.saudaraLakiSeibu + data.saudaraPerempuanSeibu,
      reason: dalilDatabase.mahjub.saudara_seibu_oleh_anak
    });
    data.saudaraLakiSeibu = 0;
    data.saudaraPerempuanSeibu = 0;
  }
  
  // Calculate shares
  let totalFardh = 0;
  
  // Suami
  if (data.suami) {
    const bagian = hasAnak || data.cucuLaki > 0 || data.cucuPerempuan > 0 ? 1/4 : 1/2;
    const dalil = hasAnak || data.cucuLaki > 0 || data.cucuPerempuan > 0 ? dalilDatabase.suami.dengan_anak : dalilDatabase.suami.tanpa_anak;
    heirs.push({
      name: currentLang === 'id' ? 'Suami' : 'Husband',
      count: 1,
      fraction: bagian === 1/4 ? '1/4' : '1/2',
      share: bagian,
      total: hartaBersih * bagian,
      perPerson: hartaBersih * bagian,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
    totalFardh += bagian;
  }
  
  // Istri
  if (data.istri) {
    const bagian = hasAnak || data.cucuLaki > 0 || data.cucuPerempuan > 0 ? 1/8 : 1/4;
    const dalil = hasAnak || data.cucuLaki > 0 || data.cucuPerempuan > 0 ? dalilDatabase.istri.dengan_anak : dalilDatabase.istri.tanpa_anak;
    const totalIstri = hartaBersih * bagian;
    heirs.push({
      name: currentLang === 'id' ? `Istri (${data.istriCount} orang)` : `Wife (${data.istriCount})`,
      count: data.istriCount,
      fraction: bagian === 1/8 ? '1/8' : '1/4',
      share: bagian,
      total: totalIstri,
      perPerson: totalIstri / data.istriCount,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
    totalFardh += bagian;
  }
  
  // Ayah
  if (data.ayah) {
    if (hasAnak || data.cucuLaki > 0) {
      // Ayah dapat 1/6 + ashabah
      const bagian = 1/6;
      heirs.push({
        name: currentLang === 'id' ? 'Ayah' : 'Father',
        count: 1,
        fraction: '1/6 + Ashabah',
        share: bagian,
        total: hartaBersih * bagian,
        perPerson: hartaBersih * bagian,
        explanation: currentLang === 'id' ? dalilDatabase.ayah.dengan_anak.penjelasan_id : dalilDatabase.ayah.dengan_anak.penjelasan_en,
        dalil: dalilDatabase.ayah.dengan_anak,
        isAshabah: true
      });
      totalFardh += bagian;
    } else {
      // Ayah dapat sisa sebagai ashabah
      heirs.push({
        name: currentLang === 'id' ? 'Ayah' : 'Father',
        count: 1,
        fraction: 'Ashabah (Sisa)',
        share: 0,
        total: 0,
        perPerson: 0,
        explanation: currentLang === 'id' ? dalilDatabase.ayah.tanpa_anak.penjelasan_id : dalilDatabase.ayah.tanpa_anak.penjelasan_en,
        dalil: dalilDatabase.ayah.tanpa_anak,
        isAshabah: true
      });
    }
  }
  
  // Ibu
  if (data.ibu) {
    const bagian = hasAnak || data.cucuLaki > 0 || data.cucuPerempuan > 0 ? 1/6 : 1/3;
    const dalil = hasAnak || data.cucuLaki > 0 || data.cucuPerempuan > 0 ? dalilDatabase.ibu.dengan_anak : dalilDatabase.ibu.tanpa_anak;
    heirs.push({
      name: currentLang === 'id' ? 'Ibu' : 'Mother',
      count: 1,
      fraction: bagian === 1/6 ? '1/6' : '1/3',
      share: bagian,
      total: hartaBersih * bagian,
      perPerson: hartaBersih * bagian,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
    totalFardh += bagian;
  }
  
  // Kakek (jika ayah tidak ada) - PERBAIKAN: Tidak terhalang oleh anak
  if (data.kakek && !data.ayah) {
    const bagian = hasAnak || data.cucuLaki > 0 ? 1/6 : 0;
    if (bagian > 0) {
      heirs.push({
        name: currentLang === 'id' ? 'Kakek' : 'Grandfather',
        count: 1,
        fraction: '1/6',
        share: bagian,
        total: hartaBersih * bagian,
        perPerson: hartaBersih * bagian,
        explanation: currentLang === 'id' ? dalilDatabase.kakek.dengan_anak.penjelasan_id : dalilDatabase.kakek.dengan_anak.penjelasan_en,
        dalil: dalilDatabase.kakek.dengan_anak
      });
      totalFardh += bagian;
    } else {
      heirs.push({
        name: currentLang === 'id' ? 'Kakek' : 'Grandfather',
        count: 1,
        fraction: 'Ashabah (Sisa)',
        share: 0,
        total: 0,
        perPerson: 0,
        explanation: currentLang === 'id' ? 'Kakek menggantikan posisi ayah dan mendapat sisa' : 'Grandfather replaces father and gets remainder',
        dalil: dalilDatabase.ayah.tanpa_anak,
        isAshabah: true
      });
    }
  }
  
  // Nenek (jika ibu tidak ada) - PERBAIKAN: Tidak terhalang oleh anak
  if (data.nenek && !data.ibu) {
    const bagian = 1/6;
    heirs.push({
      name: currentLang === 'id' ? 'Nenek' : 'Grandmother',
      count: 1,
      fraction: '1/6',
      share: bagian,
      total: hartaBersih * bagian,
      perPerson: hartaBersih * bagian,
      explanation: currentLang === 'id' ? dalilDatabase.nenek.bagian.penjelasan_id : dalilDatabase.nenek.bagian.penjelasan_en,
      dalil: dalilDatabase.nenek.bagian
    });
    totalFardh += bagian;
  }
  
  // Anak perempuan
  if (data.anakPerempuan > 0 && data.anakLaki === 0) {
    let bagian, fraction;
    if (data.anakPerempuan === 1) {
      bagian = 1/2;
      fraction = '1/2';
    } else {
      bagian = 2/3;
      fraction = '2/3';
    }
    const dalil = data.anakPerempuan === 1 ? dalilDatabase.anak_perempuan.satu : dalilDatabase.anak_perempuan.dua_atau_lebih;
    const totalAnakPerempuan = hartaBersih * bagian;
    heirs.push({
      name: currentLang === 'id' ? `Anak Perempuan (${data.anakPerempuan} orang)` : `Daughter (${data.anakPerempuan})`,
      count: data.anakPerempuan,
      fraction: fraction,
      share: bagian,
      total: totalAnakPerempuan,
      perPerson: totalAnakPerempuan / data.anakPerempuan,
      explanation: currentLang === 'id' ? dalil.penjelasan_id : dalil.penjelasan_en,
      dalil: dalil
    });
    totalFardh += bagian;
  }
  
  // Anak laki-laki dan perempuan (ashabah)
  if (data.anakLaki > 0) {
    const totalAnak = data.anakLaki * 2 + data.anakPerempuan;
    heirs.push({
      name: currentLang === 'id' ? `Anak Laki-laki (${data.anakLaki} orang)` : `Son (${data.anakLaki})`,
      count: data.anakLaki,
      fraction: 'Ashabah (2:1)',
      share: 0,
      total: 0,
      perPerson: 0,
      explanation: currentLang === 'id' ? dalilDatabase.anak_laki.penjelasan_id : dalilDatabase.anak_laki.penjelasan_en,
      dalil: dalilDatabase.anak_laki,
      isAshabah: true,
      ashabahRatio: 2,
      ashabahTotal: totalAnak
    });
    
    if (data.anakPerempuan > 0) {
      heirs.push({
        name: currentLang === 'id' ? `Anak Perempuan (${data.anakPerempuan} orang)` : `Daughter (${data.anakPerempuan})`,
        count: data.anakPerempuan,
        fraction: 'Ashabah (2:1)',
        share: 0,
        total: 0,
        perPerson: 0,
        explanation: currentLang === 'id' ? dalilDatabase.anak_perempuan.dengan_laki.penjelasan_id : dalilDatabase.anak_perempuan.dengan_laki.penjelasan_en,
        dalil: dalilDatabase.anak_perempuan.dengan_laki,
        isAshabah: true,
        ashabahRatio: 1,
        ashabahTotal: totalAnak
      });
    }
  }
  
  // Cucu (jika tidak terhalang)
  if (data.cucuPerempuan > 0 && data.cucuLaki === 0 && data.anakLaki === 0) {
    let bagian, fraction;
    if (data.cucuPerempuan === 1) {
      bagian = 1/2;
      fraction = '1/2';
    } else {
      bagian = 2/3;
      fraction = '2/3';
    }
    const totalCucu = hartaBersih * bagian;
    heirs.push({
      name: currentLang === 'id' ? `Cucu Perempuan (${data.cucuPerempuan} orang)` : `Granddaughter (${data.cucuPerempuan})`,
      count: data.cucuPerempuan,
      fraction: fraction,
      share: bagian,
      total: totalCucu,
      perPerson: totalCucu / data.cucuPerempuan,
      explanation: currentLang === 'id' ? 'Cucu perempuan menggantikan posisi anak perempuan' : 'Granddaughters replace daughters',
      dalil: data.cucuPerempuan === 1 ? dalilDatabase.anak_perempuan.satu : dalilDatabase.anak_perempuan.dua_atau_lebih
    });
    totalFardh += bagian;
  }
  
  if (data.cucuLaki > 0 && data.anakLaki === 0) {
    const totalCucu = data.cucuLaki * 2 + data.cucuPerempuan;
    heirs.push({
      name: currentLang === 'id' ? `Cucu Laki-laki (${data.cucuLaki} orang)` : `Grandson (${data.cucuLaki})`,
      count: data.cucuLaki,
      fraction: 'Ashabah (2:1)',
      share: 0,
      total: 0,
      perPerson: 0,
      explanation: currentLang === 'id' ? 'Cucu laki-laki menggantikan posisi anak laki-laki' : 'Grandsons replace sons',
      dalil: dalilDatabase.anak_laki,
      isAshabah: true,
      ashabahRatio: 2,
      ashabahTotal: totalCucu
    });
    
    if (data.cucuPerempuan > 0) {
      heirs.push({
        name: currentLang === 'id' ? `Cucu Perempuan (${data.cucuPerempuan} orang)` : `Granddaughter (${data.cucuPerempuan})`,
        count: data.cucuPerempuan,
        fraction: 'Ashabah (2:1)',
        share: 0,
        total: 0,
        perPerson: 0,
        explanation: currentLang === 'id' ? 'Cucu perempuan bersama cucu laki-laki mendapat ashabah' : 'Granddaughters with grandsons get ashabah',
        dalil: dalilDatabase.anak_perempuan.dengan_laki,
        isAshabah: true,
        ashabahRatio: 1,
        ashabahTotal: totalCucu
      });
    }
  }
  
  // Saudara kandung
  if (data.saudaraPerempuanKandung > 0 && data.saudaraLakiKandung === 0) {
    let bagian, fraction;
    if (data.saudaraPerempuanKandung === 1) {
      bagian = 1/2;
      fraction = '1/2';
    } else {
      bagian = 2/3;
      fraction = '2/3';
    }
    const totalSaudara = hartaBersih * bagian;
    heirs.push({
      name: currentLang === 'id' ? `Saudara Perempuan Kandung (${data.saudaraPerempuanKandung} orang)` : `Full Sister (${data.saudaraPerempuanKandung})`,
      count: data.saudaraPerempuanKandung,
      fraction: fraction,
      share: bagian,
      total: totalSaudara,
      perPerson: totalSaudara / data.saudaraPerempuanKandung,
      explanation: currentLang === 'id' ? `Saudara perempuan kandung mendapat ${fraction}` : `Full sisters get ${fraction}`,
      dalil: {
        arab: 'يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ',
        terjemah_id: 'Mereka meminta fatwa kepadamu. Katakanlah: "Allah memberi fatwa kepadamu tentang kalalah."',
        terjemah_en: 'They request from you a [legal] ruling. Say, "Allah gives you a ruling concerning kalalah."',
        surah: 'An-Nisa',
        ayat: 176
      }
    });
    totalFardh += bagian;
  }
  
  if (data.saudaraLakiKandung > 0) {
    const totalSaudara = data.saudaraLakiKandung * 2 + data.saudaraPerempuanKandung;
    heirs.push({
      name: currentLang === 'id' ? `Saudara Laki-laki Kandung (${data.saudaraLakiKandung} orang)` : `Full Brother (${data.saudaraLakiKandung})`,
      count: data.saudaraLakiKandung,
      fraction: 'Ashabah (2:1)',
      share: 0,
      total: 0,
      perPerson: 0,
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
      heirs.push({
        name: currentLang === 'id' ? `Saudara Perempuan Kandung (${data.saudaraPerempuanKandung} orang)` : `Full Sister (${data.saudaraPerempuanKandung})`,
        count: data.saudaraPerempuanKandung,
        fraction: 'Ashabah (2:1)',
        share: 0,
        total: 0,
        perPerson: 0,
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
  
  // Saudara seibu
  if (data.saudaraLakiSeibu > 0 || data.saudaraPerempuanSeibu > 0) {
    const totalSaudaraSeibu = data.saudaraLakiSeibu + data.saudaraPerempuanSeibu;
    let bagian, fraction;
    
    if (totalSaudaraSeibu === 1) {
      bagian = 1/6;
      fraction = '1/6';
    } else {
      bagian = 1/3;
      fraction = '1/3';
    }
    
    const totalHarta = hartaBersih * bagian;
    const perPerson = totalHarta / totalSaudaraSeibu;
    
    if (data.saudaraLakiSeibu > 0) {
      heirs.push({
        name: currentLang === 'id' ? `Saudara Laki-laki Seibu (${data.saudaraLakiSeibu} orang)` : `Maternal Brother (${data.saudaraLakiSeibu})`,
        count: data.saudaraLakiSeibu,
        fraction: fraction,
        share: bagian,
        total: perPerson * data.saudaraLakiSeibu,
        perPerson: perPerson,
        explanation: currentLang === 'id' ? `Saudara seibu mendapat ${fraction} dibagi rata` : `Maternal siblings get ${fraction} divided equally`,
        dalil: {
          arab: 'وَإِن كَانَ رَجُلٌ يُورَثُ كَلَالَةً أَوِ امْرَأَةٌ وَلَهُ أَخٌ أَوْ أُخْتٌ فَلِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ ۚ فَإِن كَانُوا أَكْثَرَ مِن ذَٰلِكَ فَهُمْ شُرَكَاءُ فِي الثُّلُثِ',
          terjemah_id: 'Dan jika seseorang meninggal yang tidak meninggalkan ayah dan tidak meninggalkan anak, tetapi mempunyai seorang saudara (seibu), maka bagi masing-masing seperenam. Tetapi jika saudara-saudara seibu itu lebih dari seorang, maka mereka bersekutu dalam yang sepertiga.',
          terjemah_en: 'And if a man or woman leaves neither ascendants nor descendants but has a brother or a sister, then for each one of them is a sixth. But if they are more than two, they share a third.',
          surah: 'An-Nisa',
          ayat: 12
        }
      });
    }
    
    if (data.saudaraPerempuanSeibu > 0) {
      heirs.push({
        name: currentLang === 'id' ? `Saudara Perempuan Seibu (${data.saudaraPerempuanSeibu} orang)` : `Maternal Sister (${data.saudaraPerempuanSeibu})`,
        count: data.saudaraPerempuanSeibu,
        fraction: fraction,
        share: bagian,
        total: perPerson * data.saudaraPerempuanSeibu,
        perPerson: perPerson,
        explanation: currentLang === 'id' ? `Saudara seibu mendapat ${fraction} dibagi rata` : `Maternal siblings get ${fraction} divided equally`,
        dalil: {
          arab: 'وَإِن كَانَ رَجُلٌ يُورَثُ كَلَالَةً أَوِ امْرَأَةٌ وَلَهُ أَخٌ أَوْ أُخْتٌ فَلِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ ۚ فَإِن كَانُوا أَكْثَرَ مِن ذَٰلِكَ فَهُمْ شُرَكَاءُ فِي الثُّلُثِ',
          terjemah_id: 'Dan jika seseorang meninggal yang tidak meninggalkan ayah dan tidak meninggalkan anak, tetapi mempunyai seorang saudara (seibu), maka bagi masing-masing seperenam. Tetapi jika saudara-saudara seibu itu lebih dari seorang, maka mereka bersekutu dalam yang sepertiga.',
          terjemah_en: 'And if a man or woman leaves neither ascendants nor descendants but has a brother or a sister, then for each one of them is a sixth. But if they are more than two, they share a third.',
          surah: 'An-Nisa',
          ayat: 12
        }
      });
    }
    
    totalFardh += bagian;
  }
  
  // Calculate ashabah (remainder)
  const sisaHarta = hartaBersih * (1 - totalFardh);
  const ashabahHeirs = heirs.filter(h => h.isAshabah);
  
  if (ashabahHeirs.length > 0 && sisaHarta > 0) {
    // Distribute remainder among ashabah
    ashabahHeirs.forEach(h => {
      if (h.ashabahRatio) {
        // Anak/Cucu/Saudara dengan ratio 2:1
        const sharePerUnit = sisaHarta / h.ashabahTotal;
        h.total = (h.share > 0 ? hartaBersih * h.share : 0) + (sharePerUnit * h.ashabahRatio * h.count);
        h.perPerson = h.total / h.count;
      } else {
        // Ayah atau kakek
        h.total = (h.share > 0 ? hartaBersih * h.share : 0) + sisaHarta;
        h.perPerson = h.total;
      }
    });
  }
  
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
    blocked: blocked
  };
}

// ===== DISPLAY RESULT (DENGAN VERIFIKASI TOTAL) =====

function displayResult(result) {
  // Display summary
  let summaryHTML = `
    <div class="summary-table">
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Harta Awal' : 'Initial Assets'}</span>
        <span class="summary-value">${formatRupiah(result.hartaBersih.awal)}</span>
      </div>
  `;
  
  if (result.hartaBersih.biayaJenazah > 0) {
    summaryHTML += `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Biaya Jenazah' : 'Funeral Expenses'}</span>
        <span class="summary-value" style="color: #ef4444;">- ${formatRupiah(result.hartaBersih.biayaJenazah)}</span>
      </div>
    `;
  }
  
  if (result.hartaBersih.hutang > 0) {
    summaryHTML += `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Hutang' : 'Debts'}</span>
        <span class="summary-value" style="color: #ef4444;">- ${formatRupiah(result.hartaBersih.hutang)}</span>
      </div>
    `;
  }
  
  if (result.hartaBersih.asuransi > 0) {
    summaryHTML += `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Asuransi Syariah' : 'Sharia Insurance'}</span>
        <span class="summary-value" style="color: #10b981;">+ ${formatRupiah(result.hartaBersih.asuransi)}</span>
      </div>
    `;
  }

  if (result.hartaBersih.wasiat > 0) {
    summaryHTML += `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Wasiat (maks 1/3)' : 'Will (max 1/3)'}</span>
        <span class="summary-value" style="color: #ef4444;">- ${formatRupiah(result.hartaBersih.wasiat)}</span>
      </div>
    `;
  }
  
  summaryHTML += `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'HARTA YANG DIBAGI' : 'DISTRIBUTABLE ASSETS'}</span>
        <span class="summary-value">${formatRupiah(result.hartaBersih.bersih)}</span>
      </div>
    </div>
  `;
  
  // Add dalil about debt and order
  summaryHTML += `
    <div class="dalil-section mt-6">
      <h4 class="font-bold text-lg mb-3">${currentLang === 'id' ? '📜 Dalil Hadits Tentang Hutang' : '📜 Hadith About Debt'}</h4>
      <p class="dalil-arabic">${dalilDatabase.hutang.arab}</p>
      <p class="dalil-translation">"${currentLang === 'id' ? dalilDatabase.hutang.terjemah_id : dalilDatabase.hutang.terjemah_en}"</p>
      <p class="dalil-source">📖 ${dalilDatabase.hutang.riwayat} - ${dalilDatabase.hutang.kitab} (${dalilDatabase.hutang.status})</p>
    </div>
    
    <div class="dalil-section mt-4">
      <h4 class="font-bold text-lg mb-3">${currentLang === 'id' ? '📜 Dalil Urutan Pembagian Harta' : '📜 Evidence for Order of Distribution'}</h4>
      <p class="dalil-arabic">${dalilDatabase.urutan.arab}</p>
      <p class="dalil-translation">"${currentLang === 'id' ? dalilDatabase.urutan.terjemah_id : dalilDatabase.urutan.terjemah_en}"</p>
      <p class="dalil-source">📖 QS. ${dalilDatabase.urutan.surah}: ${dalilDatabase.urutan.ayat}</p>
      <p class="mt-2 text-sm">${currentLang === 'id' ? dalilDatabase.urutan.tafsir_id : 'This verse shows the order: 1) Funeral expenses, 2) Debts, 3) Will (max 1/3), 4) Inheritance'}</p>
    </div>
  `;
  
  document.getElementById('resultSummary').innerHTML = summaryHTML;
  
  // Display heirs
  let heirsHTML = `
    <h3 class="text-2xl font-bold text-blue-900 dark:text-blue-300 mt-8 mb-4">
      ${currentLang === 'id' ? '👥 Ahli Waris yang Berhak' : '👥 Eligible Heirs'}
    </h3>
  `;
  
  result.heirs.forEach(heir => {
    heirsHTML += `
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
          
          <div class="dalil-section">
            <div class="font-semibold mb-2">${currentLang === 'id' ? '📖 Dalil:' : '📖 Evidence:'}</div>
            ${heir.dalil.arab ? `<p class="dalil-arabic">${heir.dalil.arab}</p>` : ''}
            <p class="dalil-translation">"${currentLang === 'id' ? heir.dalil.terjemah_id : heir.dalil.terjemah_en}"</p>
            <p class="dalil-source">
              ${heir.dalil.surah ? `📖 QS. ${heir.dalil.surah}: ${heir.dalil.ayat}` : `📖 ${heir.dalil.riwayat || heir.dalil.sumber || heir.dalil.referensi || ''}`}
              ${heir.dalil.status ? ` (${heir.dalil.status})` : ''}
            </p>
          </div>
        </div>
      </div>
    `;
  });
  
  document.getElementById('resultHeirs').innerHTML = heirsHTML;
  
  // Display blocked heirs
  if (result.blocked.length > 0) {
    let blockedHTML = `
      <h3 class="text-2xl font-bold text-red-900 dark:text-red-300 mt-8 mb-4">
        ${currentLang === 'id' ? '⛔ Ahli Waris yang Terhalang (Mahjub)' : '⛔ Blocked Heirs (Mahjub)'}
      </h3>
    `;
    
    result.blocked.forEach(b => {
      let name = '';
      switch(b.type) {
        case 'cucu':
          name = currentLang === 'id' ? `Cucu (${b.count} orang)` : `Grandchildren (${b.count})`;
          break;
        case 'kakek':
          name = currentLang === 'id' ? 'Kakek' : 'Grandfather';
          break;
        case 'nenek':
          name = currentLang === 'id' ? 'Nenek' : 'Grandmother';
          break;
        case 'saudara_kandung_seayah':
          name = currentLang === 'id' ? `Saudara Kandung/Seayah (${b.count} orang)` : `Full/Paternal Siblings (${b.count})`;
          break;
        case 'saudara_seibu':
          name = currentLang === 'id' ? `Saudara Seibu (${b.count} orang)` : `Maternal Siblings (${b.count})`;
          break;
      }
      
      blockedHTML += `
        <div class="blocked-card">
          <div class="flex justify-between items-center mb-3">
            <div class="blocked-name">${name}</div>
            <div class="blocked-status">${currentLang === 'id' ? 'MAHJUB' : 'BLOCKED'}</div>
          </div>
          
          <div class="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <div class="font-semibold mb-2">${currentLang === 'id' ? '📋 Alasan Terhalang:' : '📋 Reason for Blocking:'}</div>
            <p class="text-sm mb-3">${currentLang === 'id' ? b.reason.penjelasan_id : b.reason.penjelasan_en}</p>
            
            <div class="text-sm">
              <div class="font-semibold mb-1">${currentLang === 'id' ? '📖 Dalil:' : '📖 Evidence:'}</div>
              <p class="italic mb-1">${b.reason.dalil}</p>
              ${b.reason.hadits ? `<p class="mb-1">${currentLang === 'id' ? b.reason.hadits_terjemah : b.reason.hadits}</p>` : ''}
              ${b.reason.hadits_riwayat ? `<p class="text-xs italic mb-1">${b.reason.hadits_riwayat}</p>` : ''}
              <p class="font-bold">${b.reason.sumber}</p>
            </div>
          </div>
        </div>
      `;
    });
    
    document.getElementById('resultBlocked').innerHTML = blockedHTML;
  } else {
    document.getElementById('resultBlocked').innerHTML = '';
  }
  
  // PERBAIKAN: Display verification (total pembagian)
  let totalDibagikan = 0;
  result.heirs.forEach(h => {
    totalDibagikan += h.total;
  });
  
  const selisih = Math.abs(result.hartaBersih.bersih - totalDibagikan);
  const isMatch = selisih < 1; // Toleransi pembulatan
  
  let verificationHTML = `
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
          <span class="font-bold ${isMatch ? 'verification-match' : 'verification-mismatch'}">${formatRupiah(Math.round(selisih))}</span>
        </div>
        
        <div class="verification-row" style="background: ${isMatch ? '#d1fae5' : '#fef3c7'}; border-radius: 0.5rem; padding: 1rem;">
          <span class="font-bold text-lg">${currentLang === 'id' ? 'Status:' : 'Status:'}</span>
          <span class="font-bold text-lg ${isMatch ? 'verification-match' : 'verification-mismatch'}">
            ${isMatch ? (currentLang === 'id' ? '✅ Sesuai' : '✅ Match') : (currentLang === 'id' ? '⚠️ Ada Selisih' : '⚠️ Mismatch')}
          </span>
        </div>
      </div>
      
      ${!isMatch ? `
      <div class="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
        <p class="text-sm text-yellow-800 dark:text-yellow-200">
          ${currentLang === 'id' 
            ? '💡 Catatan: Selisih kecil dapat terjadi karena pembulatan atau kasus \'Aul/Radd dalam hukum waris Islam.' 
            : '💡 Note: Small differences may occur due to rounding or \'Aul/Radd cases in Islamic inheritance law.'}
        </p>
      </div>
      ` : ''}
      
      <div class="mt-6">
        <h4 class="font-bold mb-3">${currentLang === 'id' ? '📋 Rincian Per Ahli Waris:' : '📋 Breakdown Per Heir:'}</h4>
        <div class="space-y-2">
          ${result.heirs.map(h => `
            <div class="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="font-semibold">${h.name}</span>
              <span class="font-bold text-green-600 dark:text-green-400">${formatRupiah(Math.round(h.total))}</span>
            </div>
          `).join('')}
          <div class="flex justify-between p-4 bg-blue-100 dark:bg-blue-900 rounded-lg font-bold text-lg">
            <span>${currentLang === 'id' ? 'TOTAL:' : 'TOTAL:'}</span>
            <span class="text-blue-900 dark:text-blue-300">${formatRupiah(Math.round(totalDibagikan))}</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('resultVerification').innerHTML = verificationHTML;
}

// ===== PART 3C: ADDITIONAL FEATURES =====

// ===== 1. SAUDARA SEAYAH LENGKAP (sudah ada di calculation, ini tambahan validasi) =====

function validateSaudaraSeayah(data) {
  // Saudara seayah hanya dapat waris jika tidak ada saudara kandung
  if ((data.saudaraLakiKandung > 0 || data.saudaraPerempuanKandung > 0) && 
      (data.saudaraLakiSeayah > 0 || data.saudaraPerempuanSeayah > 0)) {
    return {
      valid: false,
      message: currentLang === 'id' 
        ? '⚠️ Saudara seayah terhalang oleh saudara kandung' 
        : '⚠️ Paternal siblings are blocked by full siblings'
    };
  }
  return { valid: true };
}

// ===== 2. KASUS 'AUL & RADD =====

function handleAul(heirs, hartaBersih) {
  let totalFardh = 0;
  heirs.forEach(h => {
    if (!h.isAshabah) {
      totalFardh += h.share;
    }
  });
  
  if (totalFardh > 1) {
    // Terjadi 'Aul - semua bagian dikurangi proporsional
    const aul = totalFardh;
    const aulFactor = 1 / aul;
    
    heirs.forEach(h => {
      if (!h.isAshabah) {
        h.total = (h.share * aulFactor) * hartaBersih;
        h.perPerson = h.total / h.count;
        h.fraction += ` ('Aul)`;
        h.explanation += currentLang === 'id' 
          ? ` ⚖️ Terjadi 'Aul (kelebihan bagian fardh melebihi 100%), sehingga semua bagian fardh dikurangi proporsional. Total fardh: ${Math.round(totalFardh * 100)}%, disesuaikan menjadi 100%.`
          : ` ⚖️ 'Aul occurred (fardh shares exceed 100%), so all fardh shares are reduced proportionally. Total fardh: ${Math.round(totalFardh * 100)}%, adjusted to 100%.`;
      }
    });
    
    return {
      occurred: true,
      totalFardh: totalFardh,
      explanation: {
        id: `Kasus 'Aul terjadi ketika total bagian fardh (${Math.round(totalFardh * 100)}%) melebihi 100%. Dalam kasus ini, semua ahli waris fardh mendapat bagian yang dikurangi secara proporsional agar total menjadi 100%.`,
        en: `'Aul case occurs when total fardh shares (${Math.round(totalFardh * 100)}%) exceed 100%. In this case, all fardh heirs receive proportionally reduced shares to make the total 100%.`,
        dalil: {
          arab: 'قَالَ عُمَرُ رَضِيَ اللَّهُ عَنْهُ: وَاللَّهِ مَا أَدْرِي أَيُّكُمْ قَدَّمَ اللَّهُ وَأَيُّكُمْ أَخَّرَ، فَأَعُولُ الْفَرِيضَةَ',
          terjemah_id: 'Umar RA berkata: "Demi Allah, aku tidak tahu siapa di antara kalian yang Allah dahulukan dan siapa yang Allah akhirkan, maka aku akan membagi harta waris dengan cara \'aul."',
          terjemah_en: 'Umar RA said: "By Allah, I do not know which of you Allah has given precedence and which He has delayed, so I will distribute the inheritance by \'aul."',
          sumber: 'Atsar Umar bin Khattab RA - Ijma\' Sahabat'
        }
      }
    };
  }
  
  return { occurred: false };
}

function handleRadd(heirs, hartaBersih) {
  const ashabahHeirs = heirs.filter(h => h.isAshabah);
  
  if (ashabahHeirs.length === 0) {
    let totalFardh = 0;
    heirs.forEach(h => {
      totalFardh += h.share;
    });
    
    const sisaHarta = hartaBersih * (1 - totalFardh);
    
    if (sisaHarta > 0) {
      // Terjadi Radd - sisa harta dikembalikan ke ahli waris fardh (kecuali suami/istri)
      const eligibleHeirs = heirs.filter(h => 
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
        
        eligibleHeirs.forEach(h => {
          const additionalShare = (h.share / totalEligibleShares) * sisaHarta;
          h.total += additionalShare;
          h.perPerson = h.total / h.count;
          h.fraction += ` (Radd)`;
          h.explanation += currentLang === 'id'
            ? ` 🔄 Terjadi Radd (pengembalian sisa harta kepada ahli waris fardh karena tidak ada ashabah). Sisa harta ${formatRupiah(Math.round(sisaHarta))} dikembalikan secara proporsional.`
            : ` 🔄 Radd occurred (return of remainder to fardh heirs because there is no ashabah). Remainder ${formatRupiah(Math.round(sisaHarta))} is returned proportionally.`;
        });
        
        return {
          occurred: true,
          sisaHarta: sisaHarta,
          explanation: {
            id: `Kasus Radd terjadi ketika tidak ada ahli waris ashabah dan masih ada sisa harta setelah dibagikan kepada ahli waris fardh. Sisa harta ${formatRupiah(Math.round(sisaHarta))} dikembalikan kepada ahli waris fardh (kecuali suami/istri) secara proporsional.`,
            en: `Radd case occurs when there is no ashabah heir and there is remaining estate after distribution to fardh heirs. Remainder ${formatRupiah(Math.round(sisaHarta))} is returned to fardh heirs (except spouse) proportionally.`,
            dalil: {
              arab: 'قَالَ عَلِيٌّ رَضِيَ اللَّهُ عَنْهُ: إِذَا لَمْ يَكُنْ عَصَبَةٌ رُدَّ عَلَى ذَوِي الْفُرُوضِ بِقَدْرِ فُرُوضِهِمْ',
              terjemah_id: 'Ali RA berkata: "Jika tidak ada ashabah, maka sisa harta dikembalikan kepada ahli waris fardh sesuai dengan kadar bagian mereka."',
              terjemah_en: 'Ali RA said: "If there is no ashabah, then the remainder is returned to the fardh heirs according to their shares."',
              sumber: 'Pendapat Ali bin Abi Thalib RA - Mazhab Jumhur'
            }
          }
        };
      }
    }
  }
  
  return { occurred: false };
}

// ===== 3. MAZHAB-SPECIFIC RULES =====

function applyMazhabRules(data, heirs, blocked) {
  let mazhabNotes = [];
  
  switch(data.mazhab) {
    case 'hanafi':
      // Mazhab Hanafi: Kakek dapat menghalangi saudara dalam semua kasus
      if (data.kakek && !data.ayah) {
        const saudaraCount = data.saudaraLakiKandung + data.saudaraPerempuanKandung + 
                            data.saudaraLakiSeayah + data.saudaraPerempuanSeayah;
        if (saudaraCount > 0) {
          blocked.push({
            type: 'saudara_oleh_kakek_hanafi',
            count: saudaraCount,
            reason: {
              penjelasan_id: 'Menurut Mazhab Hanafi, Kakek menghalangi semua saudara (kandung dan seayah) dalam semua kondisi.',
              penjelasan_en: 'According to Hanafi Madhab, Grandfather blocks all siblings (full and paternal) in all conditions.',
              dalil: 'Pendapat Abu Hanifah: الجد يحجب الإخوة مطلقا',
              sumber: 'Mazhab Hanafi - Al-Hidayah'
            }
          });
          
          // Remove saudara from heirs
          heirs = heirs.filter(h => 
            !h.name.toLowerCase().includes('saudara') && 
            !h.name.toLowerCase().includes('sibling')
          );
          
          mazhabNotes.push({
            id: '📚 Catatan Mazhab Hanafi: Kakek menghalangi semua saudara.',
            en: '📚 Hanafi Madhab Note: Grandfather blocks all siblings.'
          });
        }
      }
      break;
      
    case 'maliki':
      // Mazhab Maliki: Cucu perempuan dapat ta'shib dari saudara perempuan
      if (data.cucuPerempuan > 0 && data.anakPerempuan > 0 && 
          (data.saudaraPerempuanKandung > 0 || data.saudaraPerempuanSeayah > 0)) {
        mazhabNotes.push({
          id: '📚 Catatan Mazhab Maliki: Cucu perempuan dapat menerima ta\'shib (ashabah) dari saudara perempuan dalam kondisi tertentu.',
          en: '📚 Maliki Madhab Note: Granddaughters can receive ta\'shib (ashabah) from sisters in certain conditions.'
        });
      }
      break;
      
    case 'syafii':
      // Mazhab Syafi'i: Mengikuti jumhur dalam kebanyakan kasus
      mazhabNotes.push({
        id: '📚 Catatan Mazhab Syafi\'i: Perhitungan mengikuti pendapat jumhur ulama.',
        en: '📚 Shafi\'i Madhab Note: Calculation follows the opinion of jumhur scholars.'
      });
      break;
      
    case 'hanbali':
      // Mazhab Hanbali: Mirip dengan Syafi'i
      mazhabNotes.push({
        id: '📚 Catatan Mazhab Hanbali: Perhitungan mengikuti pendapat jumhur ulama, mirip dengan Mazhab Syafi\'i.',
        en: '📚 Hanbali Madhab Note: Calculation follows the opinion of jumhur scholars, similar to Shafi\'i Madhab.'
      });
      break;
      
    default:
      // Jumhur
      mazhabNotes.push({
        id: '📚 Catatan: Perhitungan menggunakan pendapat Jumhur Ulama (konsensus mayoritas 4 mazhab).',
        en: '📚 Note: Calculation uses the opinion of Jumhur Ulama (consensus of majority of 4 madhabs).'
      });
      break;
  }
  
  return { heirs, blocked, mazhabNotes };
}

// ===== 4. EDUCATIONAL CONTENT =====

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
            <p class="mt-2">Sebenarnya total fardh hanya 100%, tapi jika dijumlahkan dalam pecahan: 1/3 + 2/3 = 3/3 = 100%</p>
            <p class="mt-2">Namun jika ada kasus dimana total fardh kurang dari 100% dan tidak ada ashabah, maka sisa dikembalikan (radd) kepada ahli waris fardh secara proporsional.</p>
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
    }
  }
};

function showEducationalContent(topic) {
  const content = educationalContent[currentLang][topic];
  if (content) {
    showModal(content.title, content.content);
  }
}

// Add educational buttons to landing page
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
      </div>
    `;
    
    const btnStart = landingPage.querySelector('#btnStart');
    landingPage.insertBefore(eduSection, btnStart);
  }
}

// ===== 5. ERROR HANDLING & VALIDATION =====

function validateFormData(data) {
  const errors = [];
  
  // Validate harta
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
  
  // Check if at least one heir exists
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
  
  // Validate istri count
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

// ===== 6. ANALYTICS TRACKING (OPTIONAL) =====

function trackCalculation(data, result) {
  // Google Analytics tracking (if GA is loaded)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'calculate_inheritance', {
      'event_category': 'calculation',
      'event_label': data.mazhab,
      'value': data.totalHarta,
      'heirs_count': result.heirs.length,
      'blocked_count': result.blocked.length
    });
  }
  
  // Console log for debugging
  console.log('📊 Calculation tracked:', {
    mazhab: data.mazhab,
    gender: data.gender,
    totalHarta: data.totalHarta,
    hartaBersih: result.hartaBersih.bersih,
    heirsCount: result.heirs.length,
    blockedCount: result.blocked.length,
    timestamp: new Date().toISOString()
  });
}

// ===== UPDATE CALCULATION FUNCTION TO USE NEW FEATURES =====

// Override calculate function to include new features
const originalCalculate = calculate;
calculate = function() {
  showLoading();
  
  // Validate form data
  const errors = validateFormData(formData);
  if (errors.length > 0) {
    hideLoading();
    showValidationErrors(errors);
    return;
  }
  
  setTimeout(() => {
    try {
      let result = performCalculation(formData);
      
      // Apply 'Aul handling
      const aulResult = handleAul(result.heirs, result.hartaBersih.bersih);
      if (aulResult.occurred) {
        result.aul = aulResult;
      }
      
      // Apply Radd handling
      const raddResult = handleRadd(result.heirs, result.hartaBersih.bersih);
      if (raddResult.occurred) {
        result.radd = raddResult;
      }
      
      // Apply mazhab-specific rules
      const mazhabResult = applyMazhabRules(formData, result.heirs, result.blocked);
      result.heirs = mazhabResult.heirs;
      result.blocked = mazhabResult.blocked;
      result.mazhabNotes = mazhabResult.mazhabNotes;
      
      // Track calculation
      trackCalculation(formData, result);
      
      // Display result
      displayResultWithExtras(result);
      
      hideLoading();
      showStep('result');
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
};

// Enhanced display result function
function displayResultWithExtras(result) {
  // Call original display function
  displayResult(result);
  
  // Add 'Aul notification if occurred
  if (result.aul && result.aul.occurred) {
    const aulHTML = `
      <div class="bg-purple-50 dark:bg-purple-900 p-6 rounded-xl border-l-4 border-purple-500 mt-6">
        <h4 class="font-bold text-lg mb-3 text-purple-900 dark:text-purple-300">
          ⚖️ ${currentLang === 'id' ? 'Kasus \'Aul Terdeteksi' : '\'Aul Case Detected'}
        </h4>
        <p class="mb-4">${currentLang === 'id' ? result.aul.explanation.id : result.aul.explanation.en}</p>
        <div class="dalil-section">
          <p class="dalil-arabic">${result.aul.explanation.dalil.arab}</p>
          <p class="dalil-translation">"${currentLang === 'id' ? result.aul.explanation.dalil.terjemah_id : result.aul.explanation.dalil.terjemah_en}"</p>
          <p class="dalil-source">${result.aul.explanation.dalil.sumber}</p>
        </div>
      </div>
    `;
    document.getElementById('resultSummary').insertAdjacentHTML('beforeend', aulHTML);
  }
  
  // Add Radd notification if occurred
  if (result.radd && result.radd.occurred) {
    const raddHTML = `
      <div class="bg-teal-50 dark:bg-teal-900 p-6 rounded-xl border-l-4 border-teal-500 mt-6">
        <h4 class="font-bold text-lg mb-3 text-teal-900 dark:text-teal-300">
          🔄 ${currentLang === 'id' ? 'Kasus Radd Terdeteksi' : 'Radd Case Detected'}
        </h4>
        <p class="mb-4">${currentLang === 'id' ? result.radd.explanation.id : result.radd.explanation.en}</p>
        <div class="dalil-section">
          <p class="dalil-arabic">${result.radd.explanation.dalil.arab}</p>
          <p class="dalil-translation">"${currentLang === 'id' ? result.radd.explanation.dalil.terjemah_id : result.radd.explanation.dalil.terjemah_en}"</p>
          <p class="dalil-source">${result.radd.explanation.dalil.sumber}</p>
        </div>
      </div>
    `;
    document.getElementById('resultSummary').insertAdjacentHTML('beforeend', raddHTML);
  }
  
  // Add mazhab notes if any
  if (result.mazhabNotes && result.mazhabNotes.length > 0) {
    let mazhabHTML = '<div class="mt-6 space-y-3">';
    result.mazhabNotes.forEach(note => {
      mazhabHTML += `
        <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-xl border-l-4 border-blue-500">
          <p class="text-blue-900 dark:text-blue-300">${currentLang === 'id' ? note.id : note.en}</p>
        </div>
      `;
    });
    mazhabHTML += '</div>';
    document.getElementById('resultSummary').insertAdjacentHTML('beforeend', mazhabHTML);
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

// ===== INITIALIZATION FOR NEW FEATURES =====

// Add educational buttons when page loads
window.addEventListener('load', () => {
  addEducationalButtons();
  console.log('✅ Educational content loaded');
  console.log('✅ \'Aul & Radd handling enabled');
  console.log('✅ Mazhab-specific rules enabled');
  console.log('✅ Error handling enabled');
  console.log('✅ Analytics tracking ready');
});

// ===== END OF PART 3C =====

console.log('%c✅ Part 3C: Additional Features Loaded', 'color: #10b981; font-weight: bold; font-size: 14px;');
console.log('%c📊 Total Features: Saudara Seayah, \'Aul, Radd, Mazhab Rules, Educational Content, Error Handling, Analytics', 'color: #6b7280; font-size: 12px;');

// ===== END OF SCRIPT =====

console.log('%c✅ Script loaded successfully', 'color: #10b981; font-weight: bold;');
console.log('%c📖 Kalkulator Waris Islam - 4 Mazhab', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%c🕌 Sesuai Al-Quran dan Sunnah', 'color: #6b7280;');
