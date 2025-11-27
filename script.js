/* ===================================
   KALKULATOR WARIS ISLAM - 4 MAZHAB
   Complete JavaScript Implementation
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
    female: 'Perempuan',
    total_harta: '💰 Total Harta Warisan',
    harta_hint: 'Masukkan total semua harta yang ditinggalkan (uang, properti, kendaraan, dll)',
    biaya_jenazah: '⚰️ Biaya Pengurusan Jenazah',
    biaya_ditanggung: 'Sudah ditanggung keluarga sebagai sedekah',
    biaya_hint: 'Biaya memandikan, mengkafani, dan menguburkan jenazah',
    hutang: '💳 Hutang yang Belum Lunas',
    hutang_hint: 'Semua hutang harus dilunasi sebelum harta dibagi',
    wasiat: '📝 Wasiat (Opsional)',
    wasiat_hint: 'Maksimal 1/3 dari harta setelah biaya jenazah dan hutang',
    wasiat_warning: '⚠️ Wasiat melebihi 1/3 harta! Akan disesuaikan otomatis.',
    asuransi: '🛡️ Klaim Asuransi',
    asuransi_none: '❌ Tidak Ada Asuransi',
    asuransi_syariah: '✅ Asuransi Syariah (Takaful)',
    asuransi_syariah_desc: 'Halal dan masuk sebagai harta waris',
    asuransi_konvensional: '⚠️ Asuransi Konvensional',
    asuransi_konvensional_desc: 'Tidak masuk harta waris',
    suami: 'Suami',
    istri: 'Istri',
    istri_count: 'Jumlah Istri (maksimal 4):',
    ayah: 'Ayah',
    ibu: 'Ibu',
    kakek: 'Kakek (jalur ayah)',
    kakek_desc: 'Aktif jika ayah tidak dipilih',
    nenek: 'Nenek (jalur ayah)',
    nenek_desc: 'Aktif jika ibu tidak dipilih',
    orangtua_note: '💡 Kakek dan nenek hanya dapat mewarisi jika ayah/ibu sudah meninggal atau tidak ada, sesuai kaidah 4 mazhab.',
    anak_laki: '👦 Anak Laki-laki',
    anak_perempuan: '👧 Anak Perempuan',
    cucu_laki: '👦 Cucu Laki-laki',
    cucu_perempuan: '👧 Cucu Perempuan',
    cucu_note: '💡 Cucu dapat dipilih walaupun anak masih ada, sesuai kaidah 4 mazhab klasik untuk kasus tertentu.',
    saudara_kandung: 'Saudara Kandung',
    saudara_seayah: 'Saudara Seayah',
    saudara_seibu: 'Saudara Seibu',
    saudara_laki_kandung: 'Laki-laki',
    saudara_perempuan_kandung: 'Perempuan',
    saudara_laki_seayah: 'Laki-laki',
    saudara_perempuan_seayah: 'Perempuan',
    saudara_laki_seibu: 'Laki-laki',
    saudara_perempuan_seibu: 'Perempuan'
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
    female: 'Female',
    total_harta: '💰 Total Inheritance Assets',
    harta_hint: 'Enter total assets left behind (money, property, vehicles, etc)',
    biaya_jenazah: '⚰️ Funeral Expenses',
    biaya_ditanggung: 'Already covered by family as charity',
    biaya_hint: 'Cost of bathing, shrouding, and burying the deceased',
    hutang: '💳 Outstanding Debts',
    hutang_hint: 'All debts must be paid before assets are distributed',
    wasiat: '📝 Will (Optional)',
    wasiat_hint: 'Maximum 1/3 of assets after funeral expenses and debts',
    wasiat_warning: '⚠️ Will exceeds 1/3 of assets! Will be adjusted automatically.',
    asuransi: '🛡️ Insurance Claim',
    asuransi_none: '❌ No Insurance',
    asuransi_syariah: '✅ Sharia Insurance (Takaful)',
    asuransi_syariah_desc: 'Halal and included as inheritance',
    asuransi_konvensional: '⚠️ Conventional Insurance',
    asuransi_konvensional_desc: 'Not included in inheritance',
    suami: 'Husband',
    istri: 'Wife',
    istri_count: 'Number of Wives (maximum 4):',
    ayah: 'Father',
    ibu: 'Mother',
    kakek: 'Grandfather (paternal)',
    kakek_desc: 'Active if father is not selected',
    nenek: 'Grandmother (paternal)',
    nenek_desc: 'Active if mother is not selected',
    orangtua_note: '💡 Grandfather and grandmother can only inherit if father/mother has passed away or does not exist, according to 4 madhabs.',
    anak_laki: '👦 Son',
    anak_perempuan: '👧 Daughter',
    cucu_laki: '👦 Grandson',
    cucu_perempuan: '👧 Granddaughter',
    cucu_note: '💡 Grandchildren can be selected even if children still exist, according to classical 4 madhabs for certain cases.',
    saudara_kandung: 'Full Siblings',
    saudara_seayah: 'Paternal Siblings',
    saudara_seibu: 'Maternal Siblings',
    saudara_laki_kandung: 'Male',
    saudara_perempuan_kandung: 'Female',
    saudara_laki_seayah: 'Male',
    saudara_perempuan_seayah: 'Female',
    saudara_laki_seibu: 'Male',
    saudara_perempuan_seibu: 'Female'
  }
};

// ===== DALIL DATABASE =====
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
  
  // Dalil mahjub (penghalangan)
  mahjub: {
    cucu_oleh_anak: {
      penjelasan_id: 'Cucu terhalang (mahjub) oleh keberadaan anak kandung laki-laki, sesuai kaidah "Al-Aqrab Yahjubu Al-Ab\'ad" (yang lebih dekat menghalangi yang lebih jauh).',
      penjelasan_en: 'Grandchildren are blocked (mahjub) by the presence of sons, according to the principle "Al-Aqrab Yahjubu Al-Ab\'ad" (the closer blocks the farther).',
      dalil: 'Kaidah Fiqh: الأقرب يحجب الأبعد',
      sumber: 'Ijma\' Ulama 4 Mazhab'
    },
    kakek_oleh_ayah: {
      penjelasan_id: 'Kakek terhalang (mahjub) oleh keberadaan ayah kandung, sesuai kaidah "Al-Aqrab Yahjubu Al-Ab\'ad".',
      penjelasan_en: 'Grandfather is blocked (mahjub) by the presence of father, according to the principle "Al-Aqrab Yahjubu Al-Ab\'ad".',
      dalil: 'Kaidah Fiqh: الأقرب يحجب الأبعد',
      sumber: 'Ijma\' Ulama 4 Mazhab'
    },
    nenek_oleh_ibu: {
      penjelasan_id: 'Nenek terhalang (mahjub) oleh keberadaan ibu kandung, sesuai kaidah "Al-Aqrab Yahjubu Al-Ab\'ad".',
      penjelasan_en: 'Grandmother is blocked (mahjub) by the presence of mother, according to the principle "Al-Aqrab Yahjubu Al-Ab\'ad".',
      dalil: 'Kaidah Fiqh: الأقرب يحجب الأبعد',
      sumber: 'Ijma\' Ulama 4 Mazhab'
    },
    saudara_oleh_ayah: {
      penjelasan_id: 'Saudara kandung dan saudara seayah terhalang (mahjub) oleh keberadaan ayah atau anak laki-laki.',
      penjelasan_en: 'Full siblings and paternal siblings are blocked (mahjub) by the presence of father or son.',
      dalil: 'Kaidah Fiqh: الأب يحجب الإخوة',
      sumber: 'Ijma\' Ulama 4 Mazhab'
    },
    saudara_seibu_oleh_anak: {
      penjelasan_id: 'Saudara seibu terhalang (mahjub) oleh keberadaan anak, cucu, ayah, atau kakek.',
      penjelasan_en: 'Maternal siblings are blocked (mahjub) by the presence of children, grandchildren, father, or grandfather.',
      dalil: 'Kaidah Fiqh: الفرع الوارث يحجب الإخوة لأم',
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

function toggleIstriCount() {
  const checkbox = document.getElementById('istri');
  const countDiv = document.getElementById('istriCountDiv');
  
  if (checkbox.checked) {
    countDiv.classList.remove('hidden');
  } else {
    countDiv.classList.add('hidden');
  }
}

function toggleKakekNenek() {
  const ayah = document.getElementById('ayah').checked;
  const ibu = document.getElementById('ibu').checked;
  const kakek = document.getElementById('kakek');
  const nenek = document.getElementById('nenek');
  
  // Kakek aktif jika ayah tidak dipilih
  if (ayah) {
    kakek.disabled = true;
    kakek.checked = false;
    kakek.parentElement.classList.add('opacity-50', 'cursor-not-allowed');
  } else {
    kakek.disabled = false;
    kakek.parentElement.classList.remove('opacity-50', 'cursor-not-allowed');
  }
  
  // Nenek aktif jika ibu tidak dipilih
  if (ibu) {
    nenek.disabled = true;
    nenek.checked = false;
    nenek.parentElement.classList.add('opacity-50', 'cursor-not-allowed');
  } else {
    nenek.disabled = false;
    nenek.parentElement.classList.remove('opacity-50', 'cursor-not-allowed');
  }
}

// ===== FORM SUBMISSION HANDLERS =====

document.getElementById('btnStart').addEventListener('click', () => {
  showStep(1);
});

document.getElementById('formStep1').addEventListener('submit', (e) => {
  e.preventDefault();
  formData.mazhab = document.querySelector('input[name="mazhab"]:checked').value;
  formData.gender = document.querySelector('input[name="gender"]:checked').value;
  
  // Update spouse options based on gender
  if (formData.gender === 'male') {
    document.getElementById('suamiOption').style.display = 'none';
    document.getElementById('istriOption').style.display = 'block';
  } else {
    document.getElementById('suamiOption').style.display = 'block';
    document.getElementById('istriOption').style.display = 'none';
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

document.getElementById('formStep3').addEventListener('submit', (e) => {
  e.preventDefault();
  
  formData.suami = document.getElementById('suami').checked;
  formData.istri = document.getElementById('istri').checked;
  formData.istriCount = formData.istri ? parseInt(document.getElementById('istriCount').value) : 0;
  
  showStep(4);
});

document.getElementById('backStep3').addEventListener('click', () => {
  showStep(2);
});

document.getElementById('formStep4').addEventListener('submit', (e) => {
  e.preventDefault();
  
  formData.ayah = document.getElementById('ayah').checked;
  formData.ibu = document.getElementById('ibu').checked;
  formData.kakek = document.getElementById('kakek').checked;
  formData.nenek = document.getElementById('nenek').checked;
  
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
      explanation: dalil.penjelasan_id,
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
      explanation: dalil.penjelasan_id,
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
        explanation: dalilDatabase.ayah.dengan_anak.penjelasan_id,
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
        explanation: dalilDatabase.ayah.tanpa_anak.penjelasan_id,
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
      explanation: dalil.penjelasan_id,
      dalil: dalil
    });
    totalFardh += bagian;
  }
  
  // Kakek (jika ayah tidak ada)
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
        explanation: currentLang === 'id' ? 'Kakek menggantikan posisi ayah dan mendapat 1/6' : 'Grandfather replaces father and gets 1/6',
        dalil: dalilDatabase.ayah.dengan_anak
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
  
  // Nenek (jika ibu tidak ada)
  if (data.nenek && !data.ibu) {
    const bagian = 1/6;
    heirs.push({
      name: currentLang === 'id' ? 'Nenek' : 'Grandmother',
      count: 1,
      fraction: '1/6',
      share: bagian,
      total: hartaBersih * bagian,
      perPerson: hartaBersih * bagian,
      explanation: currentLang === 'id' ? 'Nenek menggantikan posisi ibu dan mendapat 1/6' : 'Grandmother replaces mother and gets 1/6',
      dalil: dalilDatabase.ibu.dengan_anak
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
      explanation: dalil.penjelasan_id,
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
      explanation: dalilDatabase.anak_laki.penjelasan_id,
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
        explanation: dalilDatabase.anak_perempuan.dengan_laki.penjelasan_id,
        dalil: dalilDatabase.anak_perempuan.dengan_laki,
        isAshabah: true,
        ashabahRatio: 1,
        ashabahTotal: totalAnak
      });
    }
  }
  
  // Calculate ashabah (remainder)
  const sisaHarta = hartaBersih * (1 - totalFardh);
  const ashabahHeirs = heirs.filter(h => h.isAshabah);
  
  if (ashabahHeirs.length > 0 && sisaHarta > 0) {
    // Distribute remainder among ashabah
    let totalAshabahRatio = 0;
    ashabahHeirs.forEach(h => {
      if (h.ashabahTotal) {
        totalAshabahRatio = h.ashabahTotal;
      } else {
        totalAshabahRatio += h.count;
      }
    });
    
    ashabahHeirs.forEach(h => {
      if (h.ashabahRatio) {
        // Anak dengan ratio 2:1
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

// ===== DISPLAY RESULT =====

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
              ${heir.dalil.surah ? `📖 QS. ${heir.dalil.surah}: ${heir.dalil.ayat}` : `📖 ${heir.dalil.riwayat || heir.dalil.sumber}`}
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
}

// ===== RESET & EXPORT =====

document.getElementById('btnReset').addEventListener('click', () => {
  if (confirm(currentLang === 'id' ? 'Apakah Anda yakin ingin menghitung ulang?' : 'Are you sure you want to calculate again?')) {
    formData = {};
    document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
      input.value = input.id === 'totalHarta' ? '100.000.000' : '0';
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

document.getElementById('btnExportPDF').addEventListener('click', () => {
  alert(currentLang === 'id' 
    ? '📄 Fitur Export PDF sedang dalam pengembangan. Untuk sementara, Anda dapat mencetak halaman ini (Ctrl+P).' 
    : '📄 PDF Export feature is under development. For now, you can print this page (Ctrl+P).');
  
  // Future: Implement jsPDF or similar library
  // window.print();
});

// ===== DARK MODE TOGGLE =====

document.getElementById('btnDarkMode').addEventListener('click', toggleDarkMode);

// ===== LANGUAGE TOGGLE =====

document.getElementById('btn-id').addEventListener('click', () => changeLang('id'));
document.getElementById('btn-en').addEventListener('click', () => changeLang('en'));

// ===== INITIALIZATION =====

// Set default language
changeLang('id');

// Check system dark mode preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
  document.getElementById('darkModeIcon').textContent = '☀️';
}

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

console.log('🕌 Kalkulator Waris Islam - 4 Mazhab');
console.log('✅ Aplikasi siap digunakan');
console.log('📖 Perhitungan sesuai Al-Quran dan Sunnah');

// ===== ADDITIONAL CALCULATION FUNCTIONS =====

// Fungsi untuk menghitung cucu (jika anak sudah meninggal)
function calculateCucu(data, hartaBersih, heirs, totalFardh) {
  if (data.cucuLaki > 0 || data.cucuPerempuan > 0) {
    // Cucu perempuan tanpa cucu laki
    if (data.cucuPerempuan > 0 && data.cucuLaki === 0) {
      let bagian, fraction;
      if (data.cucuPerempuan === 1) {
        bagian = 1/2;
        fraction = '1/2';
      } else {
        bagian = 2/3;
        fraction = '2/3';
      }
      
      const totalCucuPerempuan = hartaBersih * bagian;
      heirs.push({
        name: currentLang === 'id' ? `Cucu Perempuan (${data.cucuPerempuan} orang)` : `Granddaughter (${data.cucuPerempuan})`,
        count: data.cucuPerempuan,
        fraction: fraction,
        share: bagian,
        total: totalCucuPerempuan,
        perPerson: totalCucuPerempuan / data.cucuPerempuan,
        explanation: currentLang === 'id' 
          ? `Cucu perempuan menggantikan posisi anak perempuan dan mendapat ${fraction} dari harta`
          : `Granddaughters replace daughters and get ${fraction} of the estate`,
        dalil: data.cucuPerempuan === 1 ? dalilDatabase.anak_perempuan.satu : dalilDatabase.anak_perempuan.dua_atau_lebih
      });
      totalFardh += bagian;
    }
    
    // Cucu laki dan perempuan (ashabah)
    if (data.cucuLaki > 0) {
      const totalCucu = data.cucuLaki * 2 + data.cucuPerempuan;
      heirs.push({
        name: currentLang === 'id' ? `Cucu Laki-laki (${data.cucuLaki} orang)` : `Grandson (${data.cucuLaki})`,
        count: data.cucuLaki,
        fraction: 'Ashabah (2:1)',
        share: 0,
        total: 0,
        perPerson: 0,
        explanation: currentLang === 'id' 
          ? 'Cucu laki-laki menggantikan posisi anak laki-laki dan mendapat sisa harta sebagai ashabah'
          : 'Grandsons replace sons and get remainder as ashabah',
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
          explanation: currentLang === 'id'
            ? 'Cucu perempuan bersama cucu laki-laki mendapat ashabah dengan perbandingan 2:1'
            : 'Granddaughters with grandsons get ashabah with ratio 2:1',
          dalil: dalilDatabase.anak_perempuan.dengan_laki,
          isAshabah: true,
          ashabahRatio: 1,
          ashabahTotal: totalCucu
        });
      }
    }
  }
  
  return totalFardh;
}

// Fungsi untuk menghitung saudara kandung
function calculateSaudaraKandung(data, hartaBersih, heirs, totalFardh) {
  if (data.saudaraLakiKandung > 0 || data.saudaraPerempuanKandung > 0) {
    // Saudara perempuan kandung tanpa saudara laki
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
        explanation: currentLang === 'id'
          ? `Saudara perempuan kandung mendapat ${fraction} dari harta`
          : `Full sisters get ${fraction} of the estate`,
        dalil: {
          arab: 'يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ ۚ إِنِ امْرُؤٌ هَلَكَ لَيْسَ لَهُ وَلَدٌ وَلَهُ أُخْتٌ فَلَهَا نِصْفُ مَا تَرَكَ',
          terjemah_id: 'Mereka meminta fatwa kepadamu. Katakanlah: "Allah memberi fatwa kepadamu tentang kalalah (orang yang tidak meninggalkan ayah dan anak). Jika seseorang meninggal dunia, dan ia tidak mempunyai anak dan mempunyai saudara perempuan, maka bagi saudaranya yang perempuan itu seperdua dari harta yang ditinggalkannya."',
          terjemah_en: 'They request from you a [legal] ruling. Say, "Allah gives you a ruling concerning one having neither descendants nor ascendants [as heirs]." If a man dies, leaving no child but [only] a sister, she will have half of what he left.',
          surah: 'An-Nisa',
          ayat: 176
        }
      });
      totalFardh += bagian;
    }
    
    // Saudara laki dan perempuan kandung (ashabah)
    if (data.saudaraLakiKandung > 0) {
      const totalSaudara = data.saudaraLakiKandung * 2 + data.saudaraPerempuanKandung;
      heirs.push({
        name: currentLang === 'id' ? `Saudara Laki-laki Kandung (${data.saudaraLakiKandung} orang)` : `Full Brother (${data.saudaraLakiKandung})`,
        count: data.saudaraLakiKandung,
        fraction: 'Ashabah (2:1)',
        share: 0,
        total: 0,
        perPerson: 0,
        explanation: currentLang === 'id'
          ? 'Saudara laki-laki kandung mendapat sisa harta sebagai ashabah'
          : 'Full brothers get remainder as ashabah',
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
          explanation: currentLang === 'id'
            ? 'Saudara perempuan kandung bersama saudara laki-laki mendapat ashabah dengan perbandingan 2:1'
            : 'Full sisters with brothers get ashabah with ratio 2:1',
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
  
  return totalFardh;
}

// Fungsi untuk menghitung saudara seayah
function calculateSaudaraSeayah(data, hartaBersih, heirs, totalFardh) {
  // Saudara seayah hanya dapat waris jika tidak ada saudara kandung
  if ((data.saudaraLakiSeayah > 0 || data.saudaraPerempuanSeayah > 0) && 
      data.saudaraLakiKandung === 0 && data.saudaraPerempuanKandung === 0) {
    
    // Saudara perempuan seayah tanpa saudara laki
    if (data.saudaraPerempuanSeayah > 0 && data.saudaraLakiSeayah === 0) {
      let bagian, fraction;
      if (data.saudaraPerempuanSeayah === 1) {
        bagian = 1/2;
        fraction = '1/2';
      } else {
        bagian = 2/3;
        fraction = '2/3';
      }
      
      const totalSaudara = hartaBersih * bagian;
      heirs.push({
        name: currentLang === 'id' ? `Saudara Perempuan Seayah (${data.saudaraPerempuanSeayah} orang)` : `Paternal Sister (${data.saudaraPerempuanSeayah})`,
        count: data.saudaraPerempuanSeayah,
        fraction: fraction,
        share: bagian,
        total: totalSaudara,
        perPerson: totalSaudara / data.saudaraPerempuanSeayah,
        explanation: currentLang === 'id'
          ? `Saudara perempuan seayah mendapat ${fraction} dari harta (jika tidak ada saudara kandung)`
          : `Paternal sisters get ${fraction} of the estate (if no full siblings)`,
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
    
    // Saudara laki dan perempuan seayah (ashabah)
    if (data.saudaraLakiSeayah > 0) {
      const totalSaudara = data.saudaraLakiSeayah * 2 + data.saudaraPerempuanSeayah;
      heirs.push({
        name: currentLang === 'id' ? `Saudara Laki-laki Seayah (${data.saudaraLakiSeayah} orang)` : `Paternal Brother (${data.saudaraLakiSeayah})`,
        count: data.saudaraLakiSeayah,
        fraction: 'Ashabah (2:1)',
        share: 0,
        total: 0,
        perPerson: 0,
        explanation: currentLang === 'id'
          ? 'Saudara laki-laki seayah mendapat sisa harta sebagai ashabah (jika tidak ada saudara kandung)'
          : 'Paternal brothers get remainder as ashabah (if no full siblings)',
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
      
      if (data.saudaraPerempuanSeayah > 0) {
        heirs.push({
          name: currentLang === 'id' ? `Saudara Perempuan Seayah (${data.saudaraPerempuanSeayah} orang)` : `Paternal Sister (${data.saudaraPerempuanSeayah})`,
          count: data.saudaraPerempuanSeayah,
          fraction: 'Ashabah (2:1)',
          share: 0,
          total: 0,
          perPerson: 0,
          explanation: currentLang === 'id'
            ? 'Saudara perempuan seayah bersama saudara laki-laki mendapat ashabah dengan perbandingan 2:1'
            : 'Paternal sisters with brothers get ashabah with ratio 2:1',
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
  
  return totalFardh;
}

// Fungsi untuk menghitung saudara seibu
function calculateSaudaraSeibu(data, hartaBersih, heirs, totalFardh) {
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
        explanation: currentLang === 'id'
          ? `Saudara seibu mendapat ${fraction} dibagi rata (laki-laki dan perempuan sama)`
          : `Maternal siblings get ${fraction} divided equally (male and female equal)`,
        dalil: {
          arab: 'وَإِن كَانَ رَجُلٌ يُورَثُ كَلَالَةً أَوِ امْرَأَةٌ وَلَهُ أَخٌ أَوْ أُخْتٌ فَلِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ ۚ فَإِن كَانُوا أَكْثَرَ مِن ذَٰلِكَ فَهُمْ شُرَكَاءُ فِي الثُّلُثِ',
          terjemah_id: 'Dan jika seseorang meninggal, baik laki-laki maupun perempuan yang tidak meninggalkan ayah dan tidak meninggalkan anak, tetapi mempunyai seorang saudara laki-laki (seibu) atau seorang saudara perempuan (seibu), maka bagi masing-masing dari kedua jenis saudara itu seperenam. Tetapi jika saudara-saudara seibu itu lebih dari seorang, maka mereka bersekutu dalam yang sepertiga.',
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
        explanation: currentLang === 'id'
          ? `Saudara seibu mendapat ${fraction} dibagi rata (laki-laki dan perempuan sama)`
          : `Maternal siblings get ${fraction} divided equally (male and female equal)`,
        dalil: {
          arab: 'وَإِن كَانَ رَجُلٌ يُورَثُ كَلَالَةً أَوِ امْرَأَةٌ وَلَهُ أَخٌ أَوْ أُخْتٌ فَلِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ ۚ فَإِن كَانُوا أَكْثَرَ مِن ذَٰلِكَ فَهُمْ شُرَكَاءُ فِي الثُّلُثِ',
          terjemah_id: 'Dan jika seseorang meninggal, baik laki-laki maupun perempuan yang tidak meninggalkan ayah dan tidak meninggalkan anak, tetapi mempunyai seorang saudara laki-laki (seibu) atau seorang saudara perempuan (seibu), maka bagi masing-masing dari kedua jenis saudara itu seperenam. Tetapi jika saudara-saudara seibu itu lebih dari seorang, maka mereka bersekutu dalam yang sepertiga.',
          terjemah_en: 'And if a man or woman leaves neither ascendants nor descendants but has a brother or a sister, then for each one of them is a sixth. But if they are more than two, they share a third.',
          surah: 'An-Nisa',
          ayat: 12
        }
      });
    }
    
    totalFardh += bagian;
  }
  
  return totalFardh;
}

// ===== ADVANCED CALCULATION SCENARIOS =====

// Kasus 'Aul (ketika total fardh melebihi 1)
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
    heirs.forEach(h => {
      if (!h.isAshabah) {
        h.total = (h.share / aul) * hartaBersih;
        h.perPerson = h.total / h.count;
        h.fraction += ` ('Aul)`;
        h.explanation += currentLang === 'id' 
          ? ` Terjadi 'Aul (kelebihan bagian), sehingga semua bagian dikurangi proporsional.`
          : ` 'Aul (excess shares) occurred, so all shares are reduced proportionally.`;
      }
    });
    
    return true;
  }
  
  return false;
}

// Kasus Radd (ketika ada sisa harta dan tidak ada ashabah)
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
      const eligibleHeirs = heirs.filter(h => !h.name.includes('Suami') && !h.name.includes('Istri') && !h.name.includes('Husband') && !h.name.includes('Wife'));
      
      if (eligibleHeirs.length > 0) {
        let totalEligibleShares = 0;
        eligibleHeirs.forEach(h => {
          totalEligibleShares += h.share * h.count;
        });
        
        eligibleHeirs.forEach(h => {
          const additionalShare = (h.share * h.count / totalEligibleShares) * sisaHarta;
          h.total += additionalShare;
          h.perPerson = h.total / h.count;
          h.fraction += ` (Radd)`;
          h.explanation += currentLang === 'id'
            ? ` Terjadi Radd (pengembalian sisa harta kepada ahli waris fardh).`
            : ` Radd (return of remainder to fardh heirs) occurred.`;
        });
        
        return true;
      }
    }
  }
  
  return false;
}

// ===== MAZHAB-SPECIFIC CALCULATIONS =====

function applyMazhabRules(data, heirs) {
  switch(data.mazhab) {
    case 'hanafi':
      // Mazhab Hanafi: Kakek dapat menghalangi saudara dalam beberapa kasus
      if (data.kakek && !data.ayah) {
        heirs = heirs.filter(h => 
          !h.name.includes('Saudara') && 
          !h.name.includes('Sibling')
        );
      }
      break;
      
    case 'maliki':
      // Mazhab Maliki: Cucu perempuan dapat menerima ta'shib dari saudara perempuan
      // (implementasi khusus jika diperlukan)
      break;
      
    case 'syafii':
      // Mazhab Syafi'i: Mengikuti jumhur dalam kebanyakan kasus
      break;
      
    case 'hanbali':
      // Mazhab Hanbali: Mirip dengan Syafi'i
      break;
      
    default:
      // Jumhur (default)
      break;
  }
  
  return heirs;
}

// ===== VALIDATION FUNCTIONS =====

function validateFormData(data) {
  const errors = [];
  
  if (!data.totalHarta || data.totalHarta <= 0) {
    errors.push(currentLang === 'id' ? 'Total harta harus lebih dari 0' : 'Total assets must be greater than 0');
  }
  
  if (data.hutang > data.totalHarta) {
    errors.push(currentLang === 'id' ? 'Hutang tidak boleh melebihi total harta' : 'Debts cannot exceed total assets');
  }
  
  if (data.biayaJenazah > data.totalHarta) {
    errors.push(currentLang === 'id' ? 'Biaya jenazah tidak boleh melebihi total harta' : 'Funeral expenses cannot exceed total assets');
  }
  
  const hartaSetelahKewajiban = data.totalHarta - data.biayaJenazah - data.hutang;
  if (hartaSetelahKewajiban <= 0) {
    errors.push(currentLang === 'id' ? 'Harta tidak cukup untuk melunasi kewajiban' : 'Assets insufficient to cover obligations');
  }
  
  if (data.wasiat > hartaSetelahKewajiban / 3) {
    errors.push(currentLang === 'id' ? 'Wasiat melebihi 1/3 harta setelah kewajiban' : 'Will exceeds 1/3 of assets after obligations');
  }
  
  // Check if at least one heir exists
  const hasHeir = data.suami || data.istri || data.ayah || data.ibu || data.kakek || data.nenek ||
                  data.anakLaki > 0 || data.anakPerempuan > 0 || data.cucuLaki > 0 || data.cucuPerempuan > 0 ||
                  data.saudaraLakiKandung > 0 || data.saudaraPerempuanKandung > 0 ||
                  data.saudaraLakiSeayah > 0 || data.saudaraPerempuanSeayah > 0 ||
                  data.saudaraLakiSeibu > 0 || data.saudaraPerempuanSeibu > 0;
  
  if (!hasHeir) {
    errors.push(currentLang === 'id' ? 'Minimal harus ada satu ahli waris' : 'At least one heir must be selected');
  }
  
  return errors;
}

// ===== HELPER FUNCTIONS FOR DISPLAY =====

function generateSummaryReport(result) {
  let report = '';
  
  report += currentLang === 'id' ? '=== RINGKASAN PEMBAGIAN WARIS ===\n\n' : '=== INHERITANCE DISTRIBUTION SUMMARY ===\n\n';
  
  report += currentLang === 'id' ? 'HARTA:\n' : 'ASSETS:\n';
  report += `${currentLang === 'id' ? 'Harta Awal' : 'Initial Assets'}: ${formatRupiah(result.hartaBersih.awal)}\n`;
  
  if (result.hartaBersih.biayaJenazah > 0) {
    report += `${currentLang === 'id' ? 'Biaya Jenazah' : 'Funeral Expenses'}: -${formatRupiah(result.hartaBersih.biayaJenazah)}\n`;
  }
  
  if (result.hartaBersih.hutang > 0) {
    report += `${currentLang === 'id' ? 'Hutang' : 'Debts'}: -${formatRupiah(result.hartaBersih.hutang)}\n`;
  }
  
  if (result.hartaBersih.asuransi > 0) {
    report += `${currentLang === 'id' ? 'Asuransi Syariah' : 'Sharia Insurance'}: +${formatRupiah(result.hartaBersih.asuransi)}\n`;
  }
  
  if (result.hartaBersih.wasiat > 0) {
    report += `${currentLang === 'id' ? 'Wasiat' : 'Will'}: -${formatRupiah(result.hartaBersih.wasiat)}\n`;
  }
  
  report += `${currentLang === 'id' ? 'Harta yang Dibagi' : 'Distributable Assets'}: ${formatRupiah(result.hartaBersih.bersih)}\n\n`;
  
  report += currentLang === 'id' ? 'AHLI WARIS:\n' : 'HEIRS:\n';
  result.heirs.forEach(heir => {
    report += `\n${heir.name}\n`;
    report += `  ${currentLang === 'id' ? 'Bagian' : 'Share'}: ${heir.fraction}\n`;
    report += `  ${currentLang === 'id' ? 'Total' : 'Total'}: ${formatRupiah(Math.round(heir.total))}\n`;
    if (heir.count > 1) {
      report += `  ${currentLang === 'id' ? 'Per Orang' : 'Per Person'}: ${formatRupiah(Math.round(heir.perPerson))}\n`;
    }
  });
  
  if (result.blocked.length > 0) {
    report += `\n\n${currentLang === 'id' ? 'AHLI WARIS TERHALANG (MAHJUB):' : 'BLOCKED HEIRS (MAHJUB):'}\n`;
    result.blocked.forEach(b => {
      report += `- ${b.type} (${b.count} ${currentLang === 'id' ? 'orang' : 'person(s)'})\n`;
    });
  }
  
  return report;
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  
  alert(currentLang === 'id' ? '✅ Hasil telah disalin ke clipboard' : '✅ Result copied to clipboard');
}

// ===== PRINT FUNCTION =====

function printResult() {
  window.print();
}

// ===== SHARE FUNCTION =====

function shareResult() {
  const report = generateSummaryReport({
    hartaBersih: formData.hartaBersih,
    heirs: formData.heirs,
    blocked: formData.blocked
  });
  
  if (navigator.share) {
    navigator.share({
      title: currentLang === 'id' ? 'Hasil Perhitungan Waris Islam' : 'Islamic Inheritance Calculation Result',
      text: report
    }).catch(err => console.log('Error sharing:', err));
  } else {
    copyToClipboard(report);
  }
}

// ===== EXPORT TO PDF (Advanced) =====

async function exportToPDF() {
  // This is a placeholder for future PDF export functionality
  // You would need to integrate a library like jsPDF or html2pdf.js
  
  alert(currentLang === 'id' 
    ? '📄 Fitur Export PDF akan segera hadir. Untuk sementara, gunakan Print (Ctrl+P) dan simpan sebagai PDF.'
    : '📄 PDF Export feature coming soon. For now, use Print (Ctrl+P) and save as PDF.');
  
  // Example implementation with jsPDF (requires library):
  /*
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Hasil Perhitungan Waris Islam', 20, 20);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  
  let y = 40;
  const report = generateSummaryReport({
    hartaBersih: formData.hartaBersih,
    heirs: formData.heirs,
    blocked: formData.blocked
  });
  
  const lines = doc.splitTextToSize(report, 170);
  lines.forEach(line => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, 20, y);
    y += 7;
  });
  
  doc.save('hasil-waris-islam.pdf');
  */
}

// ===== LOCAL STORAGE FUNCTIONS =====

function saveToLocalStorage() {
  try {
    localStorage.setItem('warisFormData', JSON.stringify(formData));
    localStorage.setItem('warisTimestamp', new Date().toISOString());
    alert(currentLang === 'id' ? '✅ Data berhasil disimpan' : '✅ Data saved successfully');
  } catch (e) {
    console.error('Error saving to localStorage:', e);
    alert(currentLang === 'id' ? '❌ Gagal menyimpan data' : '❌ Failed to save data');
  }
}

function loadFromLocalStorage() {
  try {
    const savedData = localStorage.getItem('warisFormData');
    const timestamp = localStorage.getItem('warisTimestamp');
    
    if (savedData && timestamp) {
      const confirm = window.confirm(
        currentLang === 'id' 
          ? `Ditemukan data tersimpan dari ${new Date(timestamp).toLocaleString('id-ID')}. Muat data ini?`
          : `Found saved data from ${new Date(timestamp).toLocaleString('en-US')}. Load this data?`
      );
      
      if (confirm) {
        formData = JSON.parse(savedData);
        populateFormFromData(formData);
        alert(currentLang === 'id' ? '✅ Data berhasil dimuat' : '✅ Data loaded successfully');
      }
    } else {
      alert(currentLang === 'id' ? 'ℹ️ Tidak ada data tersimpan' : 'ℹ️ No saved data found');
    }
  } catch (e) {
    console.error('Error loading from localStorage:', e);
    alert(currentLang === 'id' ? '❌ Gagal memuat data' : '❌ Failed to load data');
  }
}

function populateFormFromData(data) {
  // Populate form fields with saved data
  if (data.totalHarta) document.getElementById('totalHarta').value = data.totalHarta.toLocaleString('id-ID');
  if (data.biayaJenazah) document.getElementById('biayaJenazah').value = data.biayaJenazah.toLocaleString('id-ID');
  if (data.hutang) document.getElementById('hutang').value = data.hutang.toLocaleString('id-ID');
  if (data.wasiat) document.getElementById('wasiat').value = data.wasiat.toLocaleString('id-ID');
  if (data.nilaiAsuransi) document.getElementById('nilaiAsuransi').value = data.nilaiAsuransi.toLocaleString('id-ID');
  
  // Set radio buttons
  if (data.mazhab) document.querySelector(`input[name="mazhab"][value="${data.mazhab}"]`).checked = true;
  if (data.gender) document.querySelector(`input[name="gender"][value="${data.gender}"]`).checked = true;
  if (data.asuransi) document.querySelector(`input[name="asuransi"][value="${data.asuransi}"]`).checked = true;
  
  // Set checkboxes
  if (data.suami) document.getElementById('suami').checked = true;
  if (data.istri) {
    document.getElementById('istri').checked = true;
    document.getElementById('istriCount').value = data.istriCount || 1;
    toggleIstriCount();
  }
  if (data.ayah) document.getElementById('ayah').checked = true;
  if (data.ibu) document.getElementById('ibu').checked = true;
  if (data.kakek) document.getElementById('kakek').checked = true;
  if (data.nenek) document.getElementById('nenek').checked = true;
  
  // Set number inputs
  if (data.anakLaki) document.getElementById('anakLaki').value = data.anakLaki;
  if (data.anakPerempuan) document.getElementById('anakPerempuan').value = data.anakPerempuan;
  if (data.cucuLaki) document.getElementById('cucuLaki').value = data.cucuLaki;
  if (data.cucuPerempuan) document.getElementById('cucuPerempuan').value = data.cucuPerempuan;
  if (data.saudaraLakiKandung) document.getElementById('saudaraLakiKandung').value = data.saudaraLakiKandung;
  if (data.saudaraPerempuanKandung) document.getElementById('saudaraPerempuanKandung').value = data.saudaraPerempuanKandung;
  if (data.saudaraLakiSeayah) document.getElementById('saudaraLakiSeayah').value = data.saudaraLakiSeayah;
  if (data.saudaraPerempuanSeayah) document.getElementById('saudaraPerempuanSeayah').value = data.saudaraPerempuanSeayah;
  if (data.saudaraLakiSeibu) document.getElementById('saudaraLakiSeibu').value = data.saudaraLakiSeibu;
  if (data.saudaraPerempuanSeibu) document.getElementById('saudaraPerempuanSeibu').value = data.saudaraPerempuanSeibu;
}

function clearLocalStorage() {
  if (confirm(currentLang === 'id' ? 'Hapus semua data tersimpan?' : 'Clear all saved data?')) {
    localStorage.removeItem('warisFormData');
    localStorage.removeItem('warisTimestamp');
    alert(currentLang === 'id' ? '✅ Data berhasil dihapus' : '✅ Data cleared successfully');
  }
}

// ===== KEYBOARD SHORTCUTS =====

document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + S: Save to localStorage
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveToLocalStorage();
  }
  
  // Ctrl/Cmd + P: Print
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    e.preventDefault();
    printResult();
  }
  
  // Ctrl/Cmd + L: Load from localStorage
  if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
    e.preventDefault();
    loadFromLocalStorage();
  }
  
  // Escape: Close modal
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ===== ANALYTICS & TRACKING (Optional) =====

function trackCalculation(data) {
  // This is a placeholder for analytics tracking
  // You can integrate Google Analytics, Mixpanel, etc.
  
  console.log('Calculation tracked:', {
    mazhab: data.mazhab,
    gender: data.gender,
    totalHarta: data.totalHarta,
    heirsCount: data.heirs ? data.heirs.length : 0,
    timestamp: new Date().toISOString()
  });
  
  // Example with Google Analytics:
  /*
  if (typeof gtag !== 'undefined') {
    gtag('event', 'calculate_inheritance', {
      'event_category': 'calculation',
      'event_label': data.mazhab,
      'value': data.totalHarta
    });
  }
  */
}

// ===== ERROR HANDLING =====

window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  
  // Show user-friendly error message
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

// ===== PERFORMANCE MONITORING =====

if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
  });
}

// ===== SERVICE WORKER (PWA Support - Optional) =====

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered:', registration);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed:', err);
      });
  });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Add ARIA labels dynamically
document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
  if (!input.getAttribute('aria-label')) {
    const label = input.closest('label');
    if (label) {
      input.setAttribute('aria-label', label.textContent.trim());
    }
  }
});

// Focus management for modals
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}

// ===== RESPONSIVE BEHAVIOR =====

let isMobile = window.innerWidth < 768;

window.addEventListener('resize', () => {
  const wasMobile = isMobile;
  isMobile = window.innerWidth < 768;
  
  if (wasMobile !== isMobile) {
    // Adjust layout for mobile/desktop
    console.log('Layout changed to:', isMobile ? 'mobile' : 'desktop');
  }
});

// ===== TOOLTIP SYSTEM =====

function createTooltip(element, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  tooltip.style.cssText = `
    position: absolute;
    background: #1f2937;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
  `;
  
  element.addEventListener('mouseenter', (e) => {
    document.body.appendChild(tooltip);
    const rect = element.getBoundingClientRect();
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
    setTimeout(() => tooltip.style.opacity = '1', 10);
  });
  
  element.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
    setTimeout(() => {
      if (tooltip.parentNode) {
        document.body.removeChild(tooltip);
      }
    }, 300);
  });
}

// ===== NOTIFICATION SYSTEM =====

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
    max-width: 400px;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// ===== FORM AUTO-SAVE =====

let autoSaveTimeout;

function autoSave() {
  clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(() => {
    saveToLocalStorage();
    showNotification(
      currentLang === 'id' ? '💾 Data otomatis tersimpan' : '💾 Data auto-saved',
      'success'
    );
  }, 2000);
}

// Add auto-save listeners to all inputs
document.querySelectorAll('input, select, textarea').forEach(input => {
  input.addEventListener('change', autoSave);
});

// ===== CALCULATION HISTORY =====

function saveCalculationHistory(result) {
  try {
    let history = JSON.parse(localStorage.getItem('warisHistory') || '[]');
    
    history.unshift({
      timestamp: new Date().toISOString(),
      mazhab: formData.mazhab,
      gender: formData.gender,
      totalHarta: result.hartaBersih.awal,
      hartaBersih: result.hartaBersih.bersih,
      heirsCount: result.heirs.length,
      summary: generateSummaryReport(result)
    });
    
    // Keep only last 10 calculations
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    
    localStorage.setItem('warisHistory', JSON.stringify(history));
  } catch (e) {
    console.error('Error saving history:', e);
  }
}

function showCalculationHistory() {
  try {
    const history = JSON.parse(localStorage.getItem('warisHistory') || '[]');
    
    if (history.length === 0) {
      showModal(
        currentLang === 'id' ? '📜 Riwayat Perhitungan' : '📜 Calculation History',
        currentLang === 'id' ? 'Belum ada riwayat perhitungan.' : 'No calculation history yet.'
      );
      return;
    }
    
    let html = '<div class="space-y-4">';
    history.forEach((item, index) => {
      const date = new Date(item.timestamp);
      html += `
        <div class="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 cursor-pointer transition" onclick="viewHistoryItem(${index})">
          <div class="flex justify-between items-start mb-2">
            <div class="font-bold text-lg">${date.toLocaleDateString(currentLang === 'id' ? 'id-ID' : 'en-US')}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">${date.toLocaleTimeString(currentLang === 'id' ? 'id-ID' : 'en-US')}</div>
          </div>
          <div class="text-sm space-y-1">
            <div><span class="font-semibold">${currentLang === 'id' ? 'Mazhab:' : 'Madhab:'}</span> ${item.mazhab}</div>
            <div><span class="font-semibold">${currentLang === 'id' ? 'Harta:' : 'Assets:'}</span> ${formatRupiah(item.totalHarta)}</div>
            <div><span class="font-semibold">${currentLang === 'id' ? 'Ahli Waris:' : 'Heirs:'}</span> ${item.heirsCount} ${currentLang === 'id' ? 'orang' : 'person(s)'}</div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    
    showModal(
      currentLang === 'id' ? '📜 Riwayat Perhitungan' : '📜 Calculation History',
      html
    );
  } catch (e) {
    console.error('Error showing history:', e);
  }
}

function viewHistoryItem(index) {
  try {
    const history = JSON.parse(localStorage.getItem('warisHistory') || '[]');
    const item = history[index];
    
    if (item) {
      showModal(
        currentLang === 'id' ? '📋 Detail Perhitungan' : '📋 Calculation Details',
        `<pre class="whitespace-pre-wrap text-sm">${item.summary}</pre>`
      );
    }
  } catch (e) {
    console.error('Error viewing history item:', e);
  }
}

// ===== COMPARISON FEATURE =====

function compareWithPreviousCalculation() {
  try {
    const history = JSON.parse(localStorage.getItem('warisHistory') || '[]');
    
    if (history.length < 2) {
      alert(currentLang === 'id' 
        ? 'Minimal 2 perhitungan diperlukan untuk perbandingan'
        : 'At least 2 calculations required for comparison');
      return;
    }
    
    const current = history[0];
    const previous = history[1];
    
    let html = `
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h4 class="font-bold mb-2">${currentLang === 'id' ? 'Perhitungan Terbaru' : 'Latest Calculation'}</h4>
          <div class="text-sm space-y-1">
            <div>${formatRupiah(current.totalHarta)}</div>
            <div>${current.heirsCount} ${currentLang === 'id' ? 'ahli waris' : 'heirs'}</div>
          </div>
        </div>
        <div>
          <h4 class="font-bold mb-2">${currentLang === 'id' ? 'Perhitungan Sebelumnya' : 'Previous Calculation'}</h4>
          <div class="text-sm space-y-1">
            <div>${formatRupiah(previous.totalHarta)}</div>
            <div>${previous.heirsCount} ${currentLang === 'id' ? 'ahli waris' : 'heirs'}</div>
          </div>
        </div>
      </div>
    `;
    
    showModal(
      currentLang === 'id' ? '⚖️ Perbandingan Perhitungan' : '⚖️ Calculation Comparison',
      html
    );
  } catch (e) {
    console.error('Error comparing calculations:', e);
  }
}

// ===== EDUCATIONAL CONTENT =====

const educationalContent = {
  id: {
    fardh: {
      title: 'Apa itu Fardh?',
      content: 'Fardh adalah bagian yang telah ditentukan secara pasti dalam Al-Quran, seperti 1/2, 1/3, 1/4, 1/6, 1/8, dan 2/3.'
    },
    ashabah: {
      title: 'Apa itu Ashabah?',
      content: 'Ashabah adalah ahli waris yang mendapat sisa harta setelah dibagikan kepada ahli waris fardh. Biasanya anak laki-laki, ayah (dalam kondisi tertentu), dan saudara laki-laki.'
    },
    mahjub: {
      title: 'Apa itu Mahjub?',
      content: 'Mahjub adalah kondisi dimana seorang ahli waris terhalang untuk mendapat warisan karena ada ahli waris lain yang lebih dekat hubungannya dengan pewaris.'
    },
    aul: {
      title: 'Apa itu \'Aul?',
      content: '\'Aul terjadi ketika total bagian fardh melebihi 100%. Dalam kasus ini, semua bagian dikurangi secara proporsional.'
    },
    radd: {
      title: 'Apa itu Radd?',
      content: 'Radd adalah pengembalian sisa harta kepada ahli waris fardh (kecuali suami/istri) ketika tidak ada ahli waris ashabah.'
    }
  },
  en: {
    fardh: {
      title: 'What is Fardh?',
      content: 'Fardh are fixed shares determined in the Quran, such as 1/2, 1/3, 1/4, 1/6, 1/8, and 2/3.'
    },
    ashabah: {
      title: 'What is Ashabah?',
      content: 'Ashabah are heirs who receive the remainder after fardh shares are distributed. Usually sons, father (in certain conditions), and brothers.'
    },
    mahjub: {
      title: 'What is Mahjub?',
      content: 'Mahjub is when an heir is blocked from inheritance because there is another heir with a closer relationship to the deceased.'
    },
    aul: {
      title: 'What is \'Aul?',
      content: '\'Aul occurs when total fardh shares exceed 100%. In this case, all shares are reduced proportionally.'
    },
    radd: {
      title: 'What is Radd?',
      content: 'Radd is the return of remaining estate to fardh heirs (except spouse) when there are no ashabah heirs.'
    }
  }
};

function showEducationalContent(topic) {
  const content = educationalContent[currentLang][topic];
  if (content) {
    showModal(content.title, content.content);
  }
}

// ===== FINAL INITIALIZATION =====

console.log('%c🕌 Kalkulator Waris Islam - 4 Mazhab', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%c✅ Aplikasi siap digunakan', 'font-size: 14px; color: #10b981;');
console.log('%c📖 Perhitungan sesuai Al-Quran dan Sunnah', 'font-size: 14px; color: #3b82f6;');
console.log('%cDeveloped with ❤️ for the Muslim Ummah', 'font-size: 12px; font-style: italic; color: #6b7280;');

// Check for saved data on load
window.addEventListener('load', () => {
  const savedData = localStorage.getItem('warisFormData');
  if (savedData) {
    const timestamp = localStorage.getItem('warisTimestamp');
    const date = new Date(timestamp);
    const daysSince = (new Date() - date) / (1000 * 60 * 60 * 24);
    
    if (daysSince < 7) {
      showNotification(
        currentLang === 'id' 
          ? '💾 Data tersimpan ditemukan. Tekan Ctrl+L untuk memuat.'
          : '💾 Saved data found. Press Ctrl+L to load.',
        'info'
      );
    }
  }
});

// ===== END OF SCRIPT =====
