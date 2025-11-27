// ===== GLOBAL VARIABLES =====
let currentLang = 'id';
let currentStepNum = 0;

// ===== TRANSLATIONS =====
const translations = {
  id: {
    title: "Kalkulator Waris Islam - 4 Mazhab",
    subtitle: "Perhitungan Faraid Sesuai Syariat",
    welcome_title: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    welcome_desc: "Aplikasi ini membantu Anda menghitung pembagian waris sesuai hukum Islam berdasarkan Al-Quran dan Sunnah dengan pendapat 4 Mazhab.",
    features: "Fitur Aplikasi",
    feature1: "📊 Perhitungan akurat sesuai 4 mazhab (Hanafi, Maliki, Syafi'i, Hanbali)",
    feature2: "📖 Penjelasan lengkap dengan dalil Al-Quran & Hadits",
    feature3: "📄 Export PDF dengan detail lengkap",
    feature4: "🌐 Multi-bahasa (Indonesia & English)",
    feature5: "⚖️ Deteksi otomatis penghalangan (Mahjub)",
    disclaimer_title: "Disclaimer",
    disclaimer_text: "Aplikasi ini adalah alat bantu perhitungan. Untuk kasus kompleks atau sengketa, konsultasikan dengan ulama atau hakim syariah yang kompeten.",
    start: "Mulai Perhitungan",
    step: "Langkah",
    of: "dari",
    back: "Kembali",
    next: "Lanjut",
    calculate: "Hitung Waris",
    reset: "Hitung Ulang",
    export_pdf: "Download PDF",
    share: "Bagikan",
    loading: "Memproses...",
    
    // Step 1
    step1_title: "Pilih Mazhab & Data Pewaris",
    mazhab_label: "Pilih Mazhab",
    mazhab_jumhur: "✅ Jumhur Ulama (Default)",
    mazhab_jumhur_desc: "Konsensus mayoritas 4 mazhab - Direkomendasikan untuk kasus umum",
    mazhab_hanafi_desc: "Imam Abu Hanifah - Berbeda dalam kasus Dzawil Arham",
    mazhab_maliki_desc: "Imam Malik bin Anas",
    mazhab_syafii_desc: "Imam Muhammad bin Idris asy-Syafi'i",
    mazhab_hanbali_desc: "Imam Ahmad bin Hanbal",
    mazhab_note: "Jika tidak yakin, gunakan Jumhur (default). Perbedaan mazhab hanya pada kasus-kasus khusus tertentu.",
    gender_label: "Siapa yang Meninggal Dunia?",
    male: "Laki-laki",
    female: "Perempuan",
    
    // Step 2
    step2_title: "Harta & Kewajiban",
    total_harta: "Total Harta Warisan",
    harta_hint: "Masukkan total semua harta yang ditinggalkan (uang, properti, kendaraan, dll)",
    biaya_jenazah: "Biaya Pengurusan Jenazah",
    biaya_ditanggung: "Sudah ditanggung keluarga sebagai sedekah (tidak dipotong dari harta waris)",
    biaya_hint: "Biaya memandikan, mengkafani, dan menguburkan jenazah",
    hutang: "Hutang yang Belum Lunas",
    hutang_hint: "Semua hutang harus dilunasi sebelum harta dibagi",
    asuransi: "Klaim Asuransi",
    asuransi_none: "❌ Tidak Ada Asuransi",
    asuransi_syariah: "✅ Asuransi Syariah (Takaful)",
    asuransi_syariah_desc: "Halal dan masuk sebagai harta waris",
    asuransi_konvensional: "⚠️ Asuransi Konvensional",
    asuransi_konvensional_desc: "Tidak masuk harta waris (disarankan disedekahkan)",
    wasiat: "Wasiat (Opsional)",
    wasiat_hint: "Maksimal 1/3 dari harta setelah biaya jenazah dan hutang",
    wasiat_warning: "Wasiat melebihi 1/3 harta! Akan disesuaikan otomatis sesuai syariat.",
    
    // Step 3
    step3_title: "Ahli Waris - Pasangan",
    pasangan: "Pasangan (Suami/Istri)",
    suami: "👨 Suami",
    istri: "👩 Istri",
    istri_count: "Jumlah istri:",
    istri_note: "(Maks. 4)",
    
    // Step 4
    step4_title: "Ahli Waris - Orang Tua",
    orangtua: "Orang Tua",
    ayah: "👴 Ayah",
    ibu: "👵 Ibu",
    kakek_nenek: "Kakek & Nenek (jika orang tua sudah meninggal)",
    kakek: "👴 Kakek (dari ayah)",
    nenek: "👵 Nenek",
    kakek_hint: "Kakek/Nenek hanya dapat waris jika ayah/ibu sudah meninggal",
    
    // Step 5
    step5_title: "Ahli Waris - Keturunan",
    anak: "Anak Kandung",
    anak_laki: "👦 Anak Laki-laki:",
    anak_perempuan: "👧 Anak Perempuan:",
    cucu: "Cucu (dari anak laki-laki yang sudah meninggal)",
    cucu_laki: "👦 Cucu Laki-laki:",
    cucu_perempuan: "👧 Cucu Perempuan:",
    cucu_hint: "Cucu hanya dapat waris jika tidak ada anak kandung atau sebagai pengganti anak yang meninggal",
    
    // Step 6
    step6_title: "Ahli Waris - Saudara",
    saudara_kandung: "Saudara Kandung (Seibu Seayah)",
    saudara_laki_kandung: "👨 Saudara Laki-laki:",
    saudara_perempuan_kandung: "👩 Saudara Perempuan:",
    saudara_seayah: "Saudara Seayah (Beda Ibu)",
    saudara_laki_seayah: "👨 Saudara Laki-laki:",
    saudara_perempuan_seayah: "👩 Saudara Perempuan:",
    saudara_seibu: "Saudara Seibu (Beda Ayah)",
    saudara_laki_seibu: "👨 Saudara Laki-laki:",
    saudara_perempuan_seibu: "👩 Saudara Perempuan:",
    
    // Result
    result_title: "Hasil Pembagian Waris",
  },
  
  en: {
    title: "Islamic Inheritance Calculator - 4 Madhabs",
    subtitle: "Faraid Calculation According to Sharia",
    welcome_title: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    welcome_desc: "This application helps you calculate inheritance distribution according to Islamic law based on the Quran and Sunnah with the opinions of 4 Madhabs.",
    features: "Features",
    feature1: "📊 Accurate calculation according to 4 madhabs (Hanafi, Maliki, Shafi'i, Hanbali)",
    feature2: "📖 Complete explanation with Quran & Hadith evidence",
    feature3: "📄 Export PDF with complete details",
    feature4: "🌐 Multi-language (Indonesian & English)",
    feature5: "⚖️ Automatic blocking detection (Mahjub)",
    disclaimer_title: "Disclaimer",
    disclaimer_text: "This application is a calculation tool. For complex cases or disputes, consult with competent scholars or sharia judges.",
    start: "Start Calculation",
    step: "Step",
    of: "of",
    back: "Back",
    next: "Next",
    calculate: "Calculate Inheritance",
    reset: "Recalculate",
    export_pdf: "Download PDF",
    share: "Share",
    loading: "Processing...",
    
    // Step 1
    step1_title: "Choose Madhab & Deceased Data",
    mazhab_label: "Choose Madhab",
    mazhab_jumhur: "✅ Jumhur Ulama (Default)",
    mazhab_jumhur_desc: "Consensus of 4 madhabs - Recommended for common cases",
    mazhab_hanafi_desc: "Imam Abu Hanifah - Different in Dzawil Arham cases",
    mazhab_maliki_desc: "Imam Malik bin Anas",
    mazhab_syafii_desc: "Imam Muhammad bin Idris ash-Shafi'i",
    mazhab_hanbali_desc: "Imam Ahmad bin Hanbal",
    mazhab_note: "If unsure, use Jumhur (default). Madhab differences only apply to specific cases.",
    gender_label: "Who Passed Away?",
    male: "Male",
    female: "Female",
    
    // Step 2
    step2_title: "Assets & Obligations",
    total_harta: "Total Inheritance",
    harta_hint: "Enter total assets left behind (money, property, vehicles, etc.)",
    biaya_jenazah: "Funeral Expenses",
    biaya_ditanggung: "Already covered by family as charity (not deducted from inheritance)",
    biaya_hint: "Costs for washing, shrouding, and burying the deceased",
    hutang: "Outstanding Debts",
    hutang_hint: "All debts must be paid before distribution",
    asuransi: "Insurance Claim",
    asuransi_none: "❌ No Insurance",
    asuransi_syariah: "✅ Sharia Insurance (Takaful)",
    asuransi_syariah_desc: "Halal and included in inheritance",
    asuransi_konvensional: "⚠️ Conventional Insurance",
    asuransi_konvensional_desc: "Not included in inheritance (recommended to donate)",
    wasiat: "Will (Optional)",
    wasiat_hint: "Maximum 1/3 of assets after funeral expenses and debts",
    wasiat_warning: "Will exceeds 1/3 of assets! Will be adjusted automatically according to sharia.",
    
    // Step 3
    step3_title: "Heirs - Spouse",
    pasangan: "Spouse (Husband/Wife)",
    suami: "👨 Husband",
    istri: "👩 Wife",
    istri_count: "Number of wives:",
    istri_note: "(Max. 4)",
    
    // Step 4
    step4_title: "Heirs - Parents",
    orangtua: "Parents",
    ayah: "👴 Father",
    ibu: "👵 Mother",
    kakek_nenek: "Grandparents (if parents deceased)",
    kakek: "👴 Grandfather (paternal)",
    nenek: "👵 Grandmother",
    kakek_hint: "Grandparents only inherit if parents are deceased",
    
    // Step 5
    step5_title: "Heirs - Descendants",
    anak: "Children",
    anak_laki: "👦 Sons:",
    anak_perempuan: "👧 Daughters:",
    cucu: "Grandchildren (from deceased son)",
    cucu_laki: "👦 Grandsons:",
    cucu_perempuan: "👧 Granddaughters:",
    cucu_hint: "Grandchildren only inherit if there are no children or as replacement",
    
    // Step 6
    step6_title: "Heirs - Siblings",
    saudara_kandung: "Full Siblings (Same Parents)",
    saudara_laki_kandung: "👨 Brothers:",
    saudara_perempuan_kandung: "👩 Sisters:",
    saudara_seayah: "Paternal Siblings (Same Father)",
    saudara_laki_seayah: "👨 Brothers:",
    saudara_perempuan_seayah: "👩 Sisters:",
    saudara_seibu: "Maternal Siblings (Same Mother)",
    saudara_laki_seibu: "👨 Brothers:",
    saudara_perempuan_seibu: "👩 Sisters:",
    
    // Result
    result_title: "Inheritance Distribution Result",
  }
};

// ===== LANGUAGE FUNCTIONS =====
function changeLang(lang) {
  currentLang = lang;
  
  // Update button states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`lang-${lang}`).classList.add('active');
  
  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

// ===== NAVIGATION FUNCTIONS =====
function nextStep(stepNum) {
  // Validate current step before proceeding
  if (!validateStep(currentStepNum)) {
    return;
  }
  
  // Hide current step
  document.querySelectorAll('.step').forEach(step => {
    step.classList.remove('active');
  });
  
  // Show next step
  document.getElementById(`step${stepNum}`).classList.add('active');
  currentStepNum = stepNum;
  
  // Update progress bar
  if (stepNum > 0 && stepNum < 7) {
    document.getElementById('progressBar').style.display = 'block';
    const progress = (stepNum / 6) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentStep').textContent = stepNum;
  } else {
    document.getElementById('progressBar').style.display = 'none';
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep(stepNum) {
  nextStep(stepNum);
}

function validateStep(stepNum) {
  if (stepNum === 2) {
    const totalHarta = parseCurrency(document.getElementById('totalHarta').value);
    if (totalHarta <= 0) {
      alert(currentLang === 'id' ? 'Masukkan total harta yang valid!' : 'Enter valid total assets!');
      return false;
    }
  }
  return true;}

// ===== CURRENCY FORMATTING =====
function formatCurrency(input) {
  let value = input.value.replace(/[^\d]/g, '');
  
  if (value === '') {
    input.value = '';
    return;
  }
  
  // Format with thousand separators
  let formatted = parseInt(value).toLocaleString('id-ID');
  input.value = formatted;
}

function parseCurrency(value) {
  if (!value) return 0;
  return parseInt(value.replace(/[^\d]/g, '')) || 0;
}

// ===== TOGGLE FUNCTIONS =====
function updateSpouseOptions() {
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const suamiOption = document.getElementById('suamiOption');
  const istriOption = document.getElementById('istriOption');
  
  if (gender === 'male') {
    // Pewaris laki-laki -> tampilkan istri
    suamiOption.style.display = 'none';
    istriOption.style.display = 'block';
    document.getElementById('suami').checked = false;
  } else {
    // Pewaris perempuan -> tampilkan suami
    suamiOption.style.display = 'block';
    istriOption.style.display = 'none';
    document.getElementById('istri').checked = false;
    document.getElementById('istriCountInput').style.display = 'none';
  }
}

function toggleIstriCount() {
  const istri = document.getElementById('istri').checked;
  const istriCountInput = document.getElementById('istriCountInput');
  
  if (istri) {
    istriCountInput.style.display = 'flex';
  } else {
    istriCountInput.style.display = 'none';
  }
}

function toggleBiayaJenazah() {
  const ditanggung = document.getElementById('biayaDitanggung').checked;
  const biayaInput = document.getElementById('biayaJenazahInput');
  
  if (ditanggung) {
    biayaInput.style.display = 'none';
    document.getElementById('biayaJenazah').value = '0';
  } else {
    biayaInput.style.display = 'flex';
  }
}

function toggleAsuransi() {
  const asuransi = document.querySelector('input[name="asuransi"]:checked').value;
  const asuransiInput = document.getElementById('asuransiInput');
  
  if (asuransi === 'none') {
    asuransiInput.style.display = 'none';
    document.getElementById('nilaiAsuransi').value = '0';
  } else {
    asuransiInput.style.display = 'flex';
  }
}

function validateWasiat() {
  const totalHarta = parseCurrency(document.getElementById('totalHarta').value);
  const biayaDitanggung = document.getElementById('biayaDitanggung').checked;
  const biayaJenazah = biayaDitanggung ? 0 : parseCurrency(document.getElementById('biayaJenazah').value);
  const hutang = parseCurrency(document.getElementById('hutang').value);
  const wasiat = parseCurrency(document.getElementById('wasiat').value);
  
  const sisaHarta = totalHarta - biayaJenazah - hutang;
  const maxWasiat = sisaHarta / 3;
  
  const warning = document.getElementById('wasiatWarning');
  
  if (wasiat > maxWasiat) {
    warning.style.display = 'block';
  } else {
    warning.style.display = 'none';
  }
}

function toggleKakek() {
  const ayah = document.getElementById('ayah').checked;
  const kakek = document.getElementById('kakek');
  
  if (ayah) {
    kakek.disabled = true;
    kakek.checked = false;
  } else {
    kakek.disabled = false;
  }
}

function toggleNenek() {
  const ibu = document.getElementById('ibu').checked;
  const nenek = document.getElementById('nenek');
  
  if (ibu) {
    nenek.disabled = true;
    nenek.checked = false;
  } else {
    nenek.disabled = false;
  }
}

function toggleCucu() {
  const anakLaki = parseInt(document.getElementById('anakLaki').value) || 0;
  const anakPerempuan = parseInt(document.getElementById('anakPerempuan').value) || 0;
  const cucuLaki = document.getElementById('cucuLaki');
  const cucuPerempuan = document.getElementById('cucuPerempuan');
  
  if (anakLaki > 0 || anakPerempuan > 0) {
    cucuLaki.disabled = true;
    cucuPerempuan.disabled = true;
    cucuLaki.value = 0;
    cucuPerempuan.value = 0;
  } else {
    cucuLaki.disabled = false;
    cucuPerempuan.disabled = false;
  }
}

// ===== INFO MODAL =====
function showInfoModal(type) {
  const modal = document.getElementById('infoModal');
  const modalBody = document.getElementById('modalBody');
  
  let content = '';
  
  if (type === 'harta') {
    content = `
      <h3>💰 ${currentLang === 'id' ? 'Harta yang Dapat Diwariskan' : 'Inheritable Assets'}</h3>
      <p><strong>${currentLang === 'id' ? 'Yang BISA diwariskan:' : 'CAN be inherited:'}</strong></p>
      <ul>
        <li>✅ ${currentLang === 'id' ? 'Uang tunai dan tabungan' : 'Cash and savings'}</li>
        <li>✅ ${currentLang === 'id' ? 'Rumah, tanah, properti' : 'House, land, property'}</li>
        <li>✅ ${currentLang === 'id' ? 'Kendaraan (mobil, motor)' : 'Vehicles (car, motorcycle)'}</li>
        <li>✅ ${currentLang === 'id' ? 'Emas, perhiasan' : 'Gold, jewelry'}</li>
        <li>✅ ${currentLang === 'id' ? 'Saham dan investasi halal' : 'Stocks and halal investments'}</li>
        <li>✅ ${currentLang === 'id' ? 'Hasil usaha/bisnis' : 'Business proceeds'}</li>
        <li>✅ ${currentLang === 'id' ? 'Piutang yang dapat ditagih' : 'Collectible debts'}</li>
      </ul>
      <p><strong>${currentLang === 'id' ? 'Yang TIDAK bisa diwariskan:' : 'CANNOT be inherited:'}</strong></p>
      <ul>
        <li>❌ ${currentLang === 'id' ? 'Harta wakaf' : 'Waqf assets'}</li>
        <li>❌ ${currentLang === 'id' ? 'Harta hasil haram (riba, judi)' : 'Haram assets (riba, gambling)'}</li>
        <li>❌ ${currentLang === 'id' ? 'Harta yang masih dalam sengketa' : 'Disputed assets'}</li>
        <li>❌ ${currentLang === 'id' ? 'Harta jaminan hutang' : 'Collateral assets'}</li>
      </ul>
    `;
  } else if (type === 'asuransi') {
    content = `
      <h3>🛡️ ${currentLang === 'id' ? 'Hukum Asuransi dalam Islam' : 'Insurance in Islamic Law'}</h3>
      
      <h4 style="color: var(--success); margin-top: 20px;">✅ ${currentLang === 'id' ? 'Asuransi Syariah (Takaful)' : 'Sharia Insurance (Takaful)'}</h4>
      <p>${currentLang === 'id' ? 
        'Asuransi syariah menggunakan prinsip <strong>takaful</strong> (tolong-menolong) dan <strong>tabarru</strong> (hibah). Uang klaim dari asuransi syariah adalah <strong>HALAL</strong> dan masuk sebagai harta waris.' : 
        'Sharia insurance uses the principles of <strong>takaful</strong> (mutual assistance) and <strong>tabarru</strong> (donation). Claims from sharia insurance are <strong>HALAL</strong> and included in inheritance.'
      }</p>
      <p><strong>${currentLang === 'id' ? 'Dalil:' : 'Evidence:'}</strong></p>
      <p style="font-style: italic;">"${currentLang === 'id' ? 
        'Dan tolong-menolonglah kamu dalam (mengerjakan) kebajikan dan takwa' : 
        'And cooperate in righteousness and piety'
      }" (QS. Al-Maidah: 2)</p>
      
      <h4 style="color: var(--danger); margin-top: 20px;">⚠️ ${currentLang === 'id' ? 'Asuransi Konvensional' : 'Conventional Insurance'}</h4>
      <p>${currentLang === 'id' ? 
        'Mayoritas ulama berpendapat asuransi konvensional <strong>HARAM</strong> karena mengandung:' : 
        'Majority of scholars consider conventional insurance <strong>HARAM</strong> because it contains:'
      }</p>
      <ul>
        <li><strong>Gharar</strong> (${currentLang === 'id' ? 'ketidakpastian' : 'uncertainty'})</li>
        <li><strong>Maysir</strong> (${currentLang === 'id' ? 'unsur judi' : 'gambling element'})</li>
        <li><strong>Riba</strong> (${currentLang === 'id' ? 'bunga' : 'interest'})</li>
      </ul>
      <p>${currentLang === 'id' ? 
        'Uang klaim asuransi konvensional <strong>TIDAK masuk harta waris</strong>. Disarankan untuk disedekahkan atau dikembalikan.' : 
        'Conventional insurance claims <strong>NOT included in inheritance</strong>. Recommended to donate or return.'
      }</p>
      
      <p style="margin-top: 20px;"><strong>${currentLang === 'id' ? 'Referensi:' : 'References:'}</strong></p>
      <ul style="font-size: 13px;">
        <li>${currentLang === 'id' ? 'Fatwa MUI No. 21/DSN-MUI/X/2001' : 'MUI Fatwa No. 21/DSN-MUI/X/2001'}</li>
        <li>${currentLang === 'id' ? 'Keputusan Majma\' Fiqh Islami OKI' : 'Islamic Fiqh Council OIC Decision'}</li>
      </ul>
    `;
  }
  
  modalBody.innerHTML = content;
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('infoModal').classList.remove('active');
}

// ===== DALIL DATABASE =====
const dalilDatabase = {
  suami_dengan_anak: {
    arab: "فَلَهُنَّ ٱلرُّبُعُ مِمَّا تَرَكْتُمْ إِن كَانَ لَكُمْ وَلَدٌ",
    terjemah_id: "Maka para istri memperoleh seperempat dari harta yang kamu tinggalkan jika kamu mempunyai anak",
    terjemah_en: "Then the wives get one-fourth of what you leave if you have a child",
    surah: "An-Nisa",
    ayat: 12
  },
  suami_tanpa_anak: {
    arab: "وَلَهُنَّ ٱلرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ",
    terjemah_id: "Para istri memperoleh seperempat harta yang kamu tinggalkan jika kamu tidak mempunyai anak",
    terjemah_en: "The wives get one-fourth of what you leave if you have no child",
    surah: "An-Nisa",
    ayat: 12
  },
  istri_dengan_anak: {
    arab: "فَإِن كَانَ لَكُمْ وَلَدٌ فَلَهُنَّ ٱلثُّمُنُ مِمَّا تَرَكْتُم",
    terjemah_id: "Jika kamu mempunyai anak, maka para istri memperoleh seperdelapan dari harta yang kamu tinggalkan",
    terjemah_en: "If you have a child, then the wives get one-eighth of what you leave",
    surah: "An-Nisa",
    ayat: 12
  },
  istri_tanpa_anak: {
    arab: "وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَٰجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ",
    terjemah_id: "Dan bagimu (suami) seperdua dari harta yang ditinggalkan istri-istrimu, jika mereka tidak mempunyai anak",
    terjemah_en: "And for you (husbands) is half of what your wives leave if they have no child",
    surah: "An-Nisa",
    ayat: 12
  },
  anak_laki_perempuan: {
    arab: "يُوصِيكُمُ ٱللَّهُ فِىٓ أَوْلَٰدِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ ٱلْأُنثَيَيْنِ",
    terjemah_id: "Allah mensyariatkan bagimu tentang (pembagian pusaka untuk) anak-anakmu. Yaitu: bagian seorang anak lelaki sama dengan bagian dua orang anak perempuan",
    terjemah_en: "Allah instructs you concerning your children: for the male, what is equal to the share of two females",
    surah: "An-Nisa",
    ayat: 11
  },
  orangtua_dengan_anak: {
    arab: "وَلِأَبَوَيْهِ لِكُلِّ وَٰحِدٍ مِّنْهُمَا ٱلسُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُۥ وَلَدٌ",
    terjemah_id: "Dan untuk dua orang ibu-bapak, bagi masing-masingnya seperenam dari harta yang ditinggalkan, jika yang meninggal itu mempunyai anak",
    terjemah_en: "And for one's parents, to each one of them is a sixth of his estate if he left children",
    surah: "An-Nisa",
    ayat: 11
  },
  ibu_tanpa_anak: {
    arab: "فَإِن لَّمْ يَكُن لَّهُۥ وَلَدٌ وَوَرِثَهُۥٓ أَبَوَاهُ فَلِأُمِّهِ ٱلثُّلُثُ",
    terjemah_id: "Jika yang meninggal tidak mempunyai anak dan ia diwarisi oleh ibu-bapaknya (saja), maka ibunya mendapat sepertiga",
    terjemah_en: "And if he had no children and the parents [alone] inherit from him, then for his mother is one third",
    surah: "An-Nisa",
    ayat: 11
  },
  ashabah: {
    arab: "أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَلِأَوْلَى رَجُلٍ ذَكَرٍ",
    terjemah_id: "Berikanlah bagian waris kepada yang berhak. Sisanya untuk laki-laki yang paling dekat",
    terjemah_en: "Give the shares to those entitled to them, and whatever remains is for the nearest male",
    riwayat: "HR. Bukhari (6732) dan Muslim (1615)",
    kitab: "Shahih Bukhari & Muslim"
  },
  mahjub: {
    arab: "لَا يَرِثُ مَعَ الْوَلَدِ إِلَّا الْأَبَوَانِ وَالزَّوْجَانِ",
    terjemah_id: "Tidak ada yang mewarisi bersama anak kecuali kedua orang tua dan pasangan",
    terjemah_en: "None inherits with the child except the parents and spouse",
    riwayat: "Kaidah Fiqh Mawaris",
    kitab: "Al-Fiqh al-Islami wa Adillatuhu"
  },
  hutang_prioritas: {
    arab: "مِن بَعْدِ وَصِيَّةٍ يُوصِى بِهَآ أَوْ دَيْنٍ",
    terjemah_id: "Sesudah dipenuhi wasiat yang ia buat atau (dan) sesudah dibayar hutangnya",
    terjemah_en: "After any bequest he [may have] made or debt",
    surah: "An-Nisa",
    ayat: 11
  }
};

// ===== RESET FUNCTION =====
function resetCalculation() {
  if (confirm(currentLang === 'id' ? 'Yakin ingin menghitung ulang?' : 'Are you sure you want to recalculate?')) {
    location.reload();
  }
}

// ===== SHARE FUNCTION =====
function shareResult() {
  const url = window.location.href;
  const text = currentLang === 'id' ? 
    'Hasil Perhitungan Waris Islam - Kalkulator Waris 4 Mazhab' : 
    'Islamic Inheritance Calculation Result - 4 Madhabs Calculator';
  
  if (navigator.share) {
    navigator.share({
      title: text,
      url: url
    }).catch(err => console.log('Error sharing:', err));
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      alert(currentLang === 'id' ? 
        'Link berhasil disalin ke clipboard!' : 
        'Link copied to clipboard!');
    });
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
  // Set initial language
  changeLang('id');
  
  // Initialize spouse options
  updateSpouseOptions();
  
  // Format initial currency values
  formatCurrency(document.getElementById('totalHarta'));
  formatCurrency(document.getElementById('biayaJenazah'));
  formatCurrency(document.getElementById('hutang'));
  formatCurrency(document.getElementById('nilaiAsuransi'));
});// ===== CALCULATION ENGINE =====

function calculate() {
  // Show loading
  document.getElementById('loadingOverlay').style.display = 'flex';
  
  // Delay untuk animasi
  setTimeout(() => {
    performCalculation();
    document.getElementById('loadingOverlay').style.display = 'none';
  }, 1000);
}

function performCalculation() {
  // ===== COLLECT DATA =====
  const data = collectInputData();
  
  // ===== CALCULATE HARTA BERSIH =====
  const hartaBersih = calculateHartaBersih(data);
  
  // ===== IDENTIFY HEIRS =====
  const heirs = identifyHeirs(data);
  
  // ===== CALCULATE SHARES =====
  const result = calculateShares(heirs, hartaBersih, data);
  
  // ===== DISPLAY RESULT =====
  displayResult(result, hartaBersih, data);
  
  // ===== GO TO RESULT STEP =====
  nextStep(7);
}

function collectInputData() {
  return {
    mazhab: document.querySelector('input[name="mazhab"]:checked').value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    
    // Harta
    totalHarta: parseCurrency(document.getElementById('totalHarta').value),
    biayaDitanggung: document.getElementById('biayaDitanggung').checked,
    biayaJenazah: document.getElementById('biayaDitanggung').checked ? 0 : parseCurrency(document.getElementById('biayaJenazah').value),
    hutang: parseCurrency(document.getElementById('hutang').value),
    asuransi: document.querySelector('input[name="asuransi"]:checked').value,
    nilaiAsuransi: parseCurrency(document.getElementById('nilaiAsuransi').value),
    wasiat: parseCurrency(document.getElementById('wasiat').value),
    
    // Pasangan
    suami: document.getElementById('suami').checked,
    istri: document.getElementById('istri').checked,
    istriCount: document.getElementById('istri').checked ? parseInt(document.getElementById('istriCount').value) : 0,
    
    // Orang Tua
    ayah: document.getElementById('ayah').checked,
    ibu: document.getElementById('ibu').checked,
    kakek: document.getElementById('kakek').checked,
    nenek: document.getElementById('nenek').checked,
    
    // Anak
    anakLaki: parseInt(document.getElementById('anakLaki').value) || 0,
    anakPerempuan: parseInt(document.getElementById('anakPerempuan').value) || 0,
    cucuLaki: parseInt(document.getElementById('cucuLaki').value) || 0,
    cucuPerempuan: parseInt(document.getElementById('cucuPerempuan').value) || 0,
    
    // Saudara
    saudaraLakiKandung: parseInt(document.getElementById('saudaraLakiKandung').value) || 0,
    saudaraPerempuanKandung: parseInt(document.getElementById('saudaraPerempuanKandung').value) || 0,
    saudaraLakiSeayah: parseInt(document.getElementById('saudaraLakiSeayah').value) || 0,
    saudaraPerempuanSeayah: parseInt(document.getElementById('saudaraPerempuanSeayah').value) || 0,
    saudaraLakiSeibu: parseInt(document.getElementById('saudaraLakiSeibu').value) || 0,
    saudaraPerempuanSeibu: parseInt(document.getElementById('saudaraPerempuanSeibu').value) || 0
  };
}

function calculateHartaBersih(data) {
  let harta = data.totalHarta;
  
  // Kurangi biaya jenazah
  harta -= data.biayaJenazah;
  
  // Kurangi hutang
  harta -= data.hutang;
  
  // Tambah asuransi syariah
  if (data.asuransi === 'syariah') {
    harta += data.nilaiAsuransi;
  }
  
  // Kurangi wasiat (max 1/3)
  const maxWasiat = harta / 3;
  const wasiatFinal = Math.min(data.wasiat, maxWasiat);
  harta -= wasiatFinal;
  
  return {
    awal: data.totalHarta,
    biayaJenazah: data.biayaJenazah,
    hutang: data.hutang,
    asuransi: data.asuransi === 'syariah' ? data.nilaiAsuransi : 0,
    wasiat: wasiatFinal,
    bersih: harta
  };
}

function identifyHeirs(data) {
  const heirs = [];
  const blocked = [];
  
  const adaAnak = data.anakLaki > 0 || data.anakPerempuan > 0;
  const adaCucu = data.cucuLaki > 0 || data.cucuPerempuan > 0;
  const adaFuru = adaAnak || adaCucu;
  
  // ===== PASANGAN =====
  if (data.gender === 'male' && data.istri) {
    heirs.push({
      type: 'istri',
      count: data.istriCount,
      category: 'ashhabul_furudh'
    });
  }
  
  if (data.gender === 'female' && data.suami) {
    heirs.push({
      type: 'suami',
      count: 1,
      category: 'ashhabul_furudh'
    });
  }
  
  // ===== ORANG TUA =====
  if (data.ayah) {
    heirs.push({
      type: 'ayah',
      count: 1,
      category: adaFuru ? 'ashhabul_furudh' : 'ashabah'
    });
  } else if (data.kakek) {
    heirs.push({
      type: 'kakek',
      count: 1,
      category: adaFuru ? 'ashhabul_furudh' : 'ashabah'
    });
  }
  
  if (data.ibu) {
    heirs.push({
      type: 'ibu',
      count: 1,
      category: 'ashhabul_furudh'
    });
  } else if (data.nenek) {
    heirs.push({
      type: 'nenek',
      count: 1,
      category: 'ashhabul_furudh'
    });
  }
  
  // ===== ANAK =====
  if (data.anakLaki > 0) {
    heirs.push({
      type: 'anak_laki',
      count: data.anakLaki,
      category: 'ashabah'
    });
  }
  
  if (data.anakPerempuan > 0) {
    heirs.push({
      type: 'anak_perempuan',
      count: data.anakPerempuan,
      category: data.anakLaki > 0 ? 'ashabah' : 'ashhabul_furudh'
    });
  }
  
  // ===== CUCU (jika tidak ada anak) =====
  if (!adaAnak) {
    if (data.cucuLaki > 0) {
      heirs.push({
        type: 'cucu_laki',
        count: data.cucuLaki,
        category: 'ashabah'
      });
    }
    
    if (data.cucuPerempuan > 0) {
      heirs.push({
        type: 'cucu_perempuan',
        count: data.cucuPerempuan,
        category: data.cucuLaki > 0 ? 'ashabah' : 'ashhabul_furudh'
      });
    }
  } else {
    // Cucu terhalang oleh anak
    if (data.cucuLaki > 0) {
      blocked.push({
        type: 'cucu_laki',
        count: data.cucuLaki,
        reason: 'mahjub_anak'
      });
    }
    if (data.cucuPerempuan > 0) {
      blocked.push({
        type: 'cucu_perempuan',
        count: data.cucuPerempuan,
        reason: 'mahjub_anak'
      });
    }
  }
  
  // ===== SAUDARA =====
  // Saudara terhalang jika ada anak laki-laki atau ayah
  const saudaraTerhalang = data.anakLaki > 0 || data.ayah;
  
  if (!saudaraTerhalang) {
    // Saudara Kandung
    if (data.saudaraLakiKandung > 0) {
      heirs.push({
        type: 'saudara_laki_kandung',
        count: data.saudaraLakiKandung,
        category: 'ashabah'
      });
    }
    
    if (data.saudaraPerempuanKandung > 0) {
      heirs.push({
        type: 'saudara_perempuan_kandung',
        count: data.saudaraPerempuanKandung,
        category: data.saudaraLakiKandung > 0 ? 'ashabah' : 'ashhabul_furudh'
      });
    }
    
    // Saudara Seayah (terhalang jika ada saudara laki kandung)
    if (data.saudaraLakiKandung === 0) {
      if (data.saudaraLakiSeayah > 0) {
        heirs.push({
          type: 'saudara_laki_seayah',
          count: data.saudaraLakiSeayah,
          category: 'ashabah'
        });
      }
      
      if (data.saudaraPerempuanSeayah > 0) {
        heirs.push({
          type: 'saudara_perempuan_seayah',
          count: data.saudaraPerempuanSeayah,
          category: data.saudaraLakiSeayah > 0 ? 'ashabah' : 'ashhabul_furudh'
        });
      }
    } else {
      // Terhalang oleh saudara kandung
      if (data.saudaraLakiSeayah > 0) {
        blocked.push({
          type: 'saudara_laki_seayah',
          count: data.saudaraLakiSeayah,
          reason: 'mahjub_saudara_kandung'
        });
      }
      if (data.saudaraPerempuanSeayah > 0) {
        blocked.push({
          type: 'saudara_perempuan_seayah',
          count: data.saudaraPerempuanSeayah,
          reason: 'mahjub_saudara_kandung'
        });
      }
    }
    
    // Saudara Seibu (tidak terhalang oleh saudara lain, tapi terhalang oleh furu dan usul)
    if (!adaFuru && !data.ayah && !data.kakek) {
      if (data.saudaraLakiSeibu > 0) {
        heirs.push({
          type: 'saudara_laki_seibu',
          count: data.saudaraLakiSeibu,
          category: 'ashhabul_furudh'
        });
      }
      
      if (data.saudaraPerempuanSeibu > 0) {
        heirs.push({
          type: 'saudara_perempuan_seibu',
          count: data.saudaraPerempuanSeibu,
          category: 'ashhabul_furudh'
        });
      }
    } else {
      if (data.saudaraLakiSeibu > 0) {
        blocked.push({
          type: 'saudara_laki_seibu',
          count: data.saudaraLakiSeibu,
          reason: 'mahjub_furu_usul'
        });
      }
      if (data.saudaraPerempuanSeibu > 0) {
        blocked.push({
          type: 'saudara_perempuan_seibu',
          count: data.saudaraPerempuanSeibu,
          reason: 'mahjub_furu_usul'
        });
      }
    }
  } else {
    // Semua saudara terhalang
    if (data.saudaraLakiKandung > 0) {
      blocked.push({
        type: 'saudara_laki_kandung',
        count: data.saudaraLakiKandung,
        reason: data.anakLaki > 0 ? 'mahjub_anak_laki' : 'mahjub_ayah'
      });
    }
    if (data.saudaraPerempuanKandung > 0) {
      blocked.push({
        type: 'saudara_perempuan_kandung',
        count: data.saudaraPerempuanKandung,
        reason: data.anakLaki > 0 ? 'mahjub_anak_laki' : 'mahjub_ayah'
      });
    }
    if (data.saudaraLakiSeayah > 0) {
      blocked.push({
        type: 'saudara_laki_seayah',
        count: data.saudaraLakiSeayah,
        reason: data.anakLaki > 0 ? 'mahjub_anak_laki' : 'mahjub_ayah'
      });
    }
    if (data.saudaraPerempuanSeayah > 0) {
      blocked.push({
        type: 'saudara_perempuan_seayah',
        count: data.saudaraPerempuanSeayah,
        reason: data.anakLaki > 0 ? 'mahjub_anak_laki' : 'mahjub_ayah'
      });
    }
    if (data.saudaraLakiSeibu > 0) {
      blocked.push({
        type: 'saudara_laki_seibu',
        count: data.saudaraLakiSeibu,
        reason: data.anakLaki > 0 ? 'mahjub_anak_laki' : 'mahjub_ayah'
      });
    }
    if (data.saudaraPerempuanSeibu > 0) {
      blocked.push({
        type: 'saudara_perempuan_seibu',
        count: data.saudaraPerempuanSeibu,
        reason: data.anakLaki > 0 ? 'mahjub_anak_laki' : 'mahjub_ayah'
      });
    }
  }
    
  return { heirs, blocked };
}

function calculateShares(heirsData, hartaBersih, data) {
  const heirs = heirsData.heirs;
  const blocked = heirsData.blocked;
  const result = [];
  
  let sisaHarta = hartaBersih.bersih;
  
  const adaAnak = data.anakLaki > 0 || data.anakPerempuan > 0;
  const adaCucu = data.cucuLaki > 0 || data.cucuPerempuan > 0;
  const adaFuru = adaAnak || adaCucu;
  
  // ===== ASHHABUL FURUDH (Bagian Tetap) =====
  
  heirs.forEach(heir => {
    let share = 0;
    let fraction = '';
    let dalil = {};
    let explanation = '';
    
    switch(heir.type) {
      case 'istri':
        if (adaFuru) {
          share = hartaBersih.bersih * 0.125; // 1/8
          fraction = '1/8';
          dalil = dalilDatabase.istri_dengan_anak;
          explanation = currentLang === 'id' ? 
            `Istri mendapat 1/8 karena pewaris memiliki anak (furu' waris). Jika pewaris tidak memiliki anak, istri akan mendapat 1/4. Bagian ini dibagi rata untuk ${heir.count} istri.` :
            `Wife gets 1/8 because the deceased has children (furu' waris). If no children, wife would get 1/4. This share is divided equally among ${heir.count} wives.`;
        } else {
          share = hartaBersih.bersih * 0.25; // 1/4
          fraction = '1/4';
          dalil = dalilDatabase.istri_tanpa_anak;
          explanation = currentLang === 'id' ? 
            `Istri mendapat 1/4 karena pewaris tidak memiliki anak. Bagian ini dibagi rata untuk ${heir.count} istri.` :
            `Wife gets 1/4 because the deceased has no children. This share is divided equally among ${heir.count} wives.`;
        }
        sisaHarta -= share;
        result.push({
          name: currentLang === 'id' ? `Istri (${heir.count} orang)` : `Wife (${heir.count} person${heir.count > 1 ? 's' : ''})`,
          type: heir.type,
          count: heir.count,
          fraction: fraction,
          total: share,
          perPerson: share / heir.count,
          dalil: dalil,
          explanation: explanation,
          category: 'ashhabul_furudh'
        });
        break;
        
      case 'suami':
        if (adaFuru) {
          share = hartaBersih.bersih * 0.25; // 1/4
          fraction = '1/4';
          dalil = dalilDatabase.suami_dengan_anak;
          explanation = currentLang === 'id' ? 
            'Suami mendapat 1/4 karena pewaris (istri) memiliki anak. Jika tidak ada anak, suami akan mendapat 1/2.' :
            'Husband gets 1/4 because the deceased (wife) has children. If no children, husband would get 1/2.';
        } else {
          share = hartaBersih.bersih * 0.5; // 1/2
          fraction = '1/2';
          dalil = dalilDatabase.suami_tanpa_anak;
          explanation = currentLang === 'id' ? 
            'Suami mendapat 1/2 karena pewaris (istri) tidak memiliki anak.' :
            'Husband gets 1/2 because the deceased (wife) has no children.';
        }
        sisaHarta -= share;
        result.push({
          name: currentLang === 'id' ? 'Suami' : 'Husband',
          type: heir.type,
          count: 1,
          fraction: fraction,
          total: share,
          perPerson: share,
          dalil: dalil,
          explanation: explanation,
          category: 'ashhabul_furudh'
        });
        break;
        
      case 'ayah':
        if (adaFuru) {
          share = hartaBersih.bersih / 6; // 1/6
          fraction = '1/6';
          dalil = dalilDatabase.orangtua_dengan_anak;
          explanation = currentLang === 'id' ? 
            'Ayah mendapat 1/6 karena pewaris memiliki anak (furu\' waris). Jika tidak ada anak, ayah akan mendapat sisa harta sebagai ashabah.' :
            'Father gets 1/6 because the deceased has children (furu\' waris). If no children, father would get the remainder as ashabah.';
          sisaHarta -= share;
          result.push({
            name: currentLang === 'id' ? 'Ayah' : 'Father',
            type: heir.type,
            count: 1,
            fraction: fraction,
            total: share,
            perPerson: share,
            dalil: dalil,
            explanation: explanation,
            category: 'ashhabul_furudh'
          });
        }
        // Jika tidak ada anak, ayah dapat sisa sebagai ashabah (dihitung nanti)
        break;
        
      case 'ibu':
        if (adaFuru) {
          share = hartaBersih.bersih / 6; // 1/6
          fraction = '1/6';
          dalil = dalilDatabase.orangtua_dengan_anak;
          explanation = currentLang === 'id' ? 
            'Ibu mendapat 1/6 karena pewaris memiliki anak (furu\' waris).' :
            'Mother gets 1/6 because the deceased has children (furu\' waris).';
        } else {
          share = hartaBersih.bersih / 3; // 1/3
          fraction = '1/3';
          dalil = dalilDatabase.ibu_tanpa_anak;
          explanation = currentLang === 'id' ? 
            'Ibu mendapat 1/3 karena pewaris tidak memiliki anak.' :
            'Mother gets 1/3 because the deceased has no children.';
        }
        sisaHarta -= share;
        result.push({
          name: currentLang === 'id' ? 'Ibu' : 'Mother',
          type: heir.type,
          count: 1,
          fraction: fraction,
          total: share,
          perPerson: share,
          dalil: dalil,
          explanation: explanation,
          category: 'ashhabul_furudh'
        });
        break;
        
      case 'kakek':
        if (adaFuru) {
          share = hartaBersih.bersih / 6; // 1/6
          fraction = '1/6';
          dalil = dalilDatabase.orangtua_dengan_anak;
          explanation = currentLang === 'id' ? 
            'Kakek (pengganti ayah) mendapat 1/6 karena pewaris memiliki anak.' :
            'Grandfather (replacing father) gets 1/6 because the deceased has children.';
          sisaHarta -= share;
          result.push({
            name: currentLang === 'id' ? 'Kakek' : 'Grandfather',
            type: heir.type,
            count: 1,
            fraction: fraction,
            total: share,
            perPerson: share,
            dalil: dalil,
            explanation: explanation,
            category: 'ashhabul_furudh'
          });
        }
        break;
        
      case 'nenek':
        share = hartaBersih.bersih / 6; // 1/6
        fraction = '1/6';
        dalil = dalilDatabase.orangtua_dengan_anak;
        explanation = currentLang === 'id' ? 
          'Nenek (pengganti ibu) mendapat 1/6.' :
          'Grandmother (replacing mother) gets 1/6.';
        sisaHarta -= share;
        result.push({
          name: currentLang === 'id' ? 'Nenek' : 'Grandmother',
          type: heir.type,
          count: 1,
          fraction: fraction,
          total: share,
          perPerson: share,
          dalil: dalil,
          explanation: explanation,
          category: 'ashhabul_furudh'
        });
        break;
        
      case 'anak_perempuan':
        if (data.anakLaki === 0) {
          // Anak perempuan tanpa anak laki-laki
          if (heir.count === 1) {
            share = hartaBersih.bersih * 0.5; // 1/2
            fraction = '1/2';
            explanation = currentLang === 'id' ? 
              'Anak perempuan tunggal mendapat 1/2 dari harta.' :
              'Single daughter gets 1/2 of the estate.';
          } else {
            share = hartaBersih.bersih * (2/3); // 2/3
            fraction = '2/3';
            explanation = currentLang === 'id' ? 
              `${heir.count} anak perempuan mendapat 2/3 dari harta, dibagi rata.` :
              `${heir.count} daughters get 2/3 of the estate, divided equally.`;
          }
          dalil = dalilDatabase.anak_laki_perempuan;
          sisaHarta -= share;
          result.push({
            name: currentLang === 'id' ? `Anak Perempuan (${heir.count} orang)` : `Daughter (${heir.count} person${heir.count > 1 ? 's' : ''})`,
            type: heir.type,
            count: heir.count,
            fraction: fraction,
            total: share,
            perPerson: share / heir.count,
            dalil: dalil,
            explanation: explanation,
            category: 'ashhabul_furudh'
          });
        }
        // Jika ada anak laki-laki, dihitung sebagai ashabah (nanti)
        break;
        
      case 'saudara_perempuan_kandung':
        if (data.saudaraLakiKandung === 0 && !adaFuru) {
          if (heir.count === 1) {
            share = hartaBersih.bersih * 0.5; // 1/2
            fraction = '1/2';
            explanation = currentLang === 'id' ? 
              'Saudara perempuan kandung tunggal mendapat 1/2.' :
              'Single full sister gets 1/2.';
          } else {
            share = hartaBersih.bersih * (2/3); // 2/3
            fraction = '2/3';
            explanation = currentLang === 'id' ? 
              `${heir.count} saudara perempuan kandung mendapat 2/3, dibagi rata.` :
              `${heir.count} full sisters get 2/3, divided equally.`;
          }
          dalil = dalilDatabase.anak_laki_perempuan;
          sisaHarta -= share;
          result.push({
            name: currentLang === 'id' ? `Saudara Perempuan Kandung (${heir.count} orang)` : `Full Sister (${heir.count} person${heir.count > 1 ? 's' : ''})`,
            type: heir.type,
            count: heir.count,
            fraction: fraction,
            total: share,
            perPerson: share / heir.count,
            dalil: dalil,
            explanation: explanation,
            category: 'ashhabul_furudh'
          });
        }
        break;
        
      case 'saudara_laki_seibu':
      case 'saudara_perempuan_seibu':
        const totalSaudaraSeibu = data.saudaraLakiSeibu + data.saudaraPerempuanSeibu;
        if (totalSaudaraSeibu === 1) {
          share = hartaBersih.bersih / 6; // 1/6
          fraction = '1/6';
        } else {
          share = hartaBersih.bersih / 3; // 1/3 dibagi rata
          fraction = '1/3';
        }
        // Akan dihitung per individu nanti
        break;
    }
  });
  
  // ===== ASHABAH (Sisa Harta) =====
  if (sisaHarta > 0) {
    const ashabahHeirs = heirs.filter(h => 
      h.category === 'ashabah' || 
      (h.type === 'ayah' && !adaFuru) ||
      (h.type === 'kakek' && !adaFuru) ||
      (h.type === 'anak_laki' || (h.type === 'anak_perempuan' && data.anakLaki > 0)) ||
      (h.type === 'cucu_laki' || (h.type === 'cucu_perempuan' && data.cucuLaki > 0)) ||
      (h.type === 'saudara_laki_kandung' || (h.type === 'saudara_perempuan_kandung' && data.saudaraLakiKandung > 0))
    );
    
    if (ashabahHeirs.length > 0) {
      // Hitung total bagian ashabah
      let totalBagian = 0;
      
      ashabahHeirs.forEach(heir => {
        if (heir.type === 'ayah' || heir.type === 'kakek') {
          totalBagian += 1;
        } else if (heir.type === 'anak_laki' || heir.type === 'cucu_laki' || heir.type === 'saudara_laki_kandung') {
          totalBagian += heir.count * 2;
        } else if (heir.type === 'anak_perempuan' || heir.type === 'cucu_perempuan' || heir.type === 'saudara_perempuan_kandung') {
          totalBagian += heir.count * 1;
        }
      });
      
      const nilaiPerBagian = sisaHarta / totalBagian;
      
      ashabahHeirs.forEach(heir => {
        let share = 0;
        let bagianMultiplier = 0;
        
        if (heir.type === 'ayah' || heir.type === 'kakek') {
          share = sisaHarta;
          bagianMultiplier = 1;
        } else if (heir.type === 'anak_laki' || heir.type === 'cucu_laki' || heir.type === 'saudara_laki_kandung') {
          bagianMultiplier = 2;
          share = nilaiPerBagian * bagianMultiplier * heir.count;
        } else if (heir.type === 'anak_perempuan' || heir.type === 'cucu_perempuan' || heir.type === 'saudara_perempuan_kandung') {
          bagianMultiplier = 1;
          share = nilaiPerBagian * bagianMultiplier * heir.count;
        }
        
        let heirName = '';
        let explanation = '';
        
        switch(heir.type) {
          case 'ayah':
            heirName = currentLang === 'id' ? 'Ayah' : 'Father';
            explanation = currentLang === 'id' ? 
              'Ayah mendapat sisa harta sebagai ashabah karena tidak ada anak (furu\' waris).' :
              'Father gets the remainder as ashabah because there are no children (furu\' waris).';
            break;
          case 'kakek':
            heirName = currentLang === 'id' ? 'Kakek' : 'Grandfather';
            explanation = currentLang === 'id' ? 
              'Kakek mendapat sisa harta sebagai ashabah karena tidak ada anak dan ayah.' :
              'Grandfather gets the remainder as ashabah because there are no children and father.';
            break;
          case 'anak_laki':
            heirName = currentLang === 'id' ? `Anak Laki-laki (${heir.count} orang)` : `Son (${heir.count} person${heir.count > 1 ? 's' : ''})`;
            explanation = currentLang === 'id' ? 
              `Anak laki-laki mendapat sisa harta sebagai ashabah. Jika ada anak perempuan, pembagiannya 2:1 (laki-laki : perempuan).` :
              `Sons get the remainder as ashabah. If there are daughters, the ratio is 2:1 (male : female).`;
            break;
          case 'anak_perempuan':
            heirName = currentLang === 'id' ? `Anak Perempuan (${heir.count} orang)` : `Daughter (${heir.count} person${heir.count > 1 ? 's' : ''})`;
            explanation = currentLang === 'id' ? 
              `Anak perempuan mendapat sisa harta bersama anak laki-laki dengan perbandingan 2:1 (laki-laki : perempuan).` :
              `Daughters get the remainder with sons in ratio 2:1 (male : female).`;
            break;
          case 'cucu_laki':
            heirName = currentLang === 'id' ? `Cucu Laki-laki (${heir.count} orang)` : `Grandson (${heir.count} person${heir.count > 1 ? 's' : ''})`;
            explanation = currentLang === 'id' ? 
              `Cucu laki-laki mendapat sisa harta sebagai ashabah (pengganti anak).` :
              `Grandsons get the remainder as ashabah (replacing children).`;
            break;
          case 'cucu_perempuan':
            heirName = currentLang === 'id' ? `Cucu Perempuan (${heir.count} orang)` : `Granddaughter (${heir.count} person${heir.count > 1 ? 's' : ''})`;
            explanation = currentLang === 'id' ? 
              `Cucu perempuan mendapat sisa harta bersama cucu laki-laki dengan perbandingan 2:1.` :
              `Granddaughters get the remainder with grandsons in ratio 2:1.`;
            break;
          case 'saudara_laki_kandung':
            heirName = currentLang === 'id' ? `Saudara Laki-laki Kandung (${heir.count} orang)` : `Full Brother (${heir.count} person${heir.count > 1 ? 's' : ''})`;
            explanation = currentLang === 'id' ? 
              `Saudara laki-laki kandung mendapat sisa harta sebagai ashabah.` :
              `Full brothers get the remainder as ashabah.`;
            break;
          case 'saudara_perempuan_kandung':
            heirName = currentLang === 'id' ? `Saudara Perempuan Kandung (${heir.count} orang)` : `Full Sister (${heir.count} person${heir.count > 1 ? 's' : ''})`;
            explanation = currentLang === 'id' ? 
              `Saudara perempuan kandung mendapat sisa harta bersama saudara laki-laki dengan perbandingan 2:1.` :
              `Full sisters get the remainder with brothers in ratio 2:1.`;
            break;
        }
        
        result.push({
          name: heirName,
          type: heir.type,
          count: heir.count,
          fraction: currentLang === 'id' ? 'Ashabah (Sisa)' : 'Ashabah (Remainder)',
          total: share,
          perPerson: share / heir.count,
          dalil: dalilDatabase.ashabah,
          explanation: explanation,
          category: 'ashabah'
        });
      });
    }
  }
  
  return { result, blocked };
}

function displayResult(calculationResult, hartaBersih, data) {
  const result = calculationResult.result;
  const blocked = calculationResult.blocked;
  
  // ===== SUMMARY =====
  let summaryHTML = `
    <h3>${currentLang === 'id' ? '💰 Ringkasan Harta' : '💰 Asset Summary'}</h3>
    <div class="summary-table">
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Harta Awal' : 'Initial Assets'}</span>
        <span class="summary-value">${formatRupiah(hartaBersih.awal)}</span>
      </div>
      ${hartaBersih.biayaJenazah > 0 ? `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Biaya Jenazah' : 'Funeral Expenses'}</span>
        <span class="summary-value" style="color: var(--danger);">- ${formatRupiah(hartaBersih.biayaJenazah)}</span>
      </div>
      ` : ''}
      ${hartaBersih.hutang > 0 ? `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Hutang' : 'Debts'}</span>
        <span class="summary-value" style="color: var(--danger);">- ${formatRupiah(hartaBersih.hutang)}</span>
      </div>
      ` : ''}
      ${hartaBersih.asuransi > 0 ? `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Asuransi Syariah' : 'Sharia Insurance'}</span>
        <span class="summary-value" style="color: var(--success);">+ ${formatRupiah(hartaBersih.asuransi)}</span>
      </div>
      ` : ''}
      ${hartaBersih.wasiat > 0 ? `
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'Wasiat' : 'Will'}</span>
        <span class="summary-value" style="color: var(--danger);">- ${formatRupiah(hartaBersih.wasiat)}</span>
      </div>
      ` : ''}
      <div class="summary-row">
        <span class="summary-label">${currentLang === 'id' ? 'HARTA YANG DIBAGI' : 'DISTRIBUTABLE ASSETS'}</span>
        <span class="summary-value">${formatRupiah(hartaBersih.bersih)}</span>
      </div>
    </div>
  `;
  
  document.getElementById('resultSummary').innerHTML = summaryHTML;
  
  // ===== HEIRS =====
  let heirsHTML = `
    <h3>${currentLang === 'id' ? '👥 Ahli Waris yang Berhak' : '👥 Eligible Heirs'}</h3>
  `;
  
  result.forEach((heir, index) => {
    heirsHTML += `
      <div class="heir-card">
        <div class="heir-header">
          <div class="heir-name">${heir.name}</div>
          <div class="heir-amount">${formatRupiah(heir.total)}</div>
        </div>
        
        <div class="heir-details">
          <div class="heir-detail-item">
            <div class="heir-detail-label">${currentLang === 'id' ? 'Bagian' : 'Share'}</div>
            <div class="heir-detail-value">${heir.fraction}</div>
          </div>
          ${heir.count > 1 ? `
          <div class="heir-detail-item">
            <div class="heir-detail-label">${currentLang === 'id' ? 'Per Orang' : 'Per Person'}</div>
            <div class="heir-detail-value">${formatRupiah(heir.perPerson)}</div>
          </div>
          ` : ''}
        </div>
        
        <div class="heir-explanation">
          <div class="heir-explanation-title">💡 ${currentLang === 'id' ? 'Penjelasan' : 'Explanation'}:</div>
          <div class="heir-explanation-text">${heir.explanation}</div>
          
          <div class="heir-dalil">
            ${heir.dalil.arab ? `
            <div class="dalil-arabic">${heir.dalil.arab}</div>
            ` : ''}
            <div class="dalil-translation">
              "${currentLang === 'id' ? heir.dalil.terjemah_id : heir.dalil.terjemah_en}"
            </div>
            <div class="dalil-source">
              📖 ${heir.dalil.surah ? `QS. ${heir.dalil.surah}: ${heir.dalil.ayat}` : heir.dalil.riwayat}
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  document.getElementById('resultHeirs').innerHTML = heirsHTML;
  
  // ===== BLOCKED HEIRS =====
  if (blocked.length > 0) {
    let blockedHTML = `
      <h3>${currentLang === 'id' ? '⛔ Ahli Waris yang Terhalang (Mahjub)' : '⛔ Blocked Heirs (Mahjub)'}</h3>
    `;
    
    blocked.forEach(b => {
      let name = '';
      let reason = '';
      
      switch(b.type) {
        case 'cucu_laki':
          name = currentLang === 'id' ? `Cucu Laki-laki (${b.count} orang)` : `Grandson (${b.count})`;
          reason = currentLang === 'id' ? 
            'Terhalang oleh keberadaan anak kandung. Cucu hanya dapat waris jika tidak ada anak kandung.' :
            'Blocked by the presence of children. Grandchildren only inherit if there are no children.';
          break;
        case 'cucu_perempuan':
          name = currentLang === 'id' ? `Cucu Perempuan (${b.count} orang)` : `Granddaughter (${b.count})`;
          reason = currentLang === 'id' ? 
            'Terhalang oleh keberadaan anak kandung. Cucu hanya dapat waris jika tidak ada anak kandung.' :
            'Blocked by the presence of children. Grandchildren only inherit if there are no children.';
          break;
        case 'saudara_laki_kandung':
          name = currentLang === 'id' ? `Saudara Laki-laki Kandung (${b.count} orang)` : `Full Brother (${b.count})`;
          reason = currentLang === 'id' ? 
            (b.reason === 'mahjub_anak_laki' ? 
              'Terhalang oleh anak laki-laki. Saudara tidak dapat waris jika ada anak laki-laki.' :
              'Terhalang oleh ayah. Saudara tidak dapat waris jika ada ayah.') :
            (b.reason === 'mahjub_anak_laki' ? 
              'Blocked by son. Siblings do not inherit if there is a son.' :
              'Blocked by father. Siblings do not inherit if there is a father.');
          break;
        case 'saudara_perempuan_kandung':
          name = currentLang === 'id' ? `Saudara Perempuan Kandung (${b.count} orang)` : `Full Sister (${b.count})`;
          reason = currentLang === 'id' ? 
            (b.reason === 'mahjub_anak_laki' ? 
              'Terhalang oleh anak laki-laki. Saudara tidak dapat waris jika ada anak laki-laki.' :
              'Terhalang oleh ayah. Saudara tidak dapat waris jika ada ayah.') :
            (b.reason === 'mahjub_anak_laki' ? 
              'Blocked by son. Siblings do not inherit if there is a son.' :
              'Blocked by father. Siblings do not inherit if there is a father.');
          break;
        case 'saudara_laki_seayah':
          name = currentLang === 'id' ? `Saudara Laki-laki Seayah (${b.count} orang)` : `Paternal Brother (${b.count})`;
          reason = currentLang === 'id' ? 
            (b.reason === 'mahjub_saudara_kandung' ? 
              'Terhalang oleh saudara kandung.' :
              'Terhalang oleh anak laki-laki atau ayah.') :
            (b.reason === 'mahjub_saudara_kandung' ? 
              'Blocked by full siblings.' :
              'Blocked by son or father.');
          break;
        case 'saudara_perempuan_seayah':
          name = currentLang === 'id' ? `Saudara Perempuan Seayah (${b.count} orang)` : `Paternal Sister (${b.count})`;
          reason = currentLang === 'id' ? 
            (b.reason === 'mahjub_saudara_kandung' ? 
              'Terhalang oleh saudara kandung.' :
              'Terhalang oleh anak laki-laki atau ayah.') :
            (b.reason === 'mahjub_saudara_kandung' ? 
              'Blocked by full siblings.' :
              'Blocked by son or father.');
          break;
        case 'saudara_laki_seibu':
          name = currentLang === 'id' ? `Saudara Laki-laki Seibu (${b.count} orang)` : `Maternal Brother (${b.count})`;
          reason = currentLang === 'id' ? 
            'Terhalang oleh keberadaan anak atau ayah/kakek (furu\' atau usul).' :
            'Blocked by the presence of children or father/grandfather (furu\' or usul).';
          break;
        case 'saudara_perempuan_seibu':
          name = currentLang === 'id' ? `Saudara Perempuan Seibu (${b.count} orang)` : `Maternal Sister (${b.count})`;
          reason = currentLang === 'id' ? 
            'Terhalang oleh keberadaan anak atau ayah/kakek (furu\' atau usul).' :
            'Blocked by the presence of children or father/grandfather (furu\' or usul).';
          break;
      }
      
      blockedHTML += `
        <div class="blocked-card">
          <div class="blocked-header">
            <div class="blocked-name">${name}</div>
            <div class="blocked-status">${currentLang === 'id' ? 'MAHJUB' : 'BLOCKED'}</div>
          </div>
          <div class="blocked-reason">
            <strong>${currentLang === 'id' ? 'Alasan:' : 'Reason:'}</strong> ${reason}
          </div>
          <div class="heir-dalil" style="margin-top: 15px;">
            <div class="dalil-arabic">${dalilDatabase.mahjub.arab}</div>
            <div class="dalil-translation">
              "${currentLang === 'id' ? dalilDatabase.mahjub.terjemah_id : dalilDatabase.mahjub.terjemah_en}"
            </div>
            <div class="dalil-source">
              📖 ${dalilDatabase.mahjub.riwayat}
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

function formatRupiah(angka) {
  return 'Rp ' + Math.round(angka).toLocaleString('id-ID');
}// ===== EXPORT PDF FUNCTION =====

function exportPDF() {
  alert(currentLang === 'id' ? 
    '📄 Fitur Export PDF\n\nUntuk menggunakan fitur export PDF yang lengkap dengan dalil Al-Quran dan Hadits, aplikasi ini memerlukan library jsPDF.\n\nCara menggunakan:\n1. Gunakan browser Print (Ctrl+P / Cmd+P)\n2. Pilih "Save as PDF"\n3. Atau screenshot hasil perhitungan\n\nUntuk versi lengkap dengan auto-generate PDF, silakan hubungi developer.' :
    '📄 Export PDF Feature\n\nTo use the complete PDF export feature with Quran and Hadith evidence, this application requires the jsPDF library.\n\nHow to use:\n1. Use browser Print (Ctrl+P / Cmd+P)\n2. Select "Save as PDF"\n3. Or screenshot the calculation result\n\nFor the full version with auto-generate PDF, please contact the developer.'
  );
  
  // Alternative: Print page
  window.print();
}

// ===== ALTERNATIVE: SIMPLE PDF GENERATION =====
// Uncomment this if you want basic PDF without external library

/*
function exportPDF() {
  const { jsPDF } = window.jspdf;
  
  if (!jsPDF) {
    alert('Library jsPDF tidak tersedia. Gunakan Print (Ctrl+P) untuk menyimpan sebagai PDF.');
    window.print();
    return;
  }
  
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;
  
  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('LAPORAN WARIS ISLAM', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Perhitungan Faraid Sesuai Syariat', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;
  
  // Date
  doc.setFontSize(10);
  const today = new Date().toLocaleDateString('id-ID', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text(`Tanggal: ${today}`, margin, yPos);
  yPos += 10;
  
  // Get result data
  const summaryHTML = document.getElementById('resultSummary').innerText;
  const heirsHTML = document.getElementById('resultHeirs').innerText;
  
  // Add content
  doc.setFontSize(10);
  const splitSummary = doc.splitTextToSize(summaryHTML, pageWidth - 2 * margin);
  doc.text(splitSummary, margin, yPos);
  yPos += splitSummary.length * 5 + 10;
  
  if (yPos > pageHeight - margin) {
    doc.addPage();
    yPos = margin;
  }
  
  const splitHeirs = doc.splitTextToSize(heirsHTML, pageWidth - 2 * margin);
  doc.text(splitHeirs, margin, yPos);
  
  // Save
  doc.save('Laporan-Waris-Islam.pdf');
}
*/

// ===== ENHANCED PDF WITH FULL DETAILS =====
// This version creates a comprehensive PDF report

function generateDetailedPDF() {
  // Check if jsPDF is available
  if (typeof window.jspdf === 'undefined') {
    // Fallback to print
    alert(currentLang === 'id' ? 
      '⚠️ Library PDF tidak tersedia.\n\nGunakan Print (Ctrl+P atau Cmd+P) untuk menyimpan sebagai PDF.' :
      '⚠️ PDF library not available.\n\nUse Print (Ctrl+P or Cmd+P) to save as PDF.'
    );
    window.print();
    return;
  }
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  
  // Page settings
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;
  
  // Colors
  const primaryColor = [30, 60, 114]; // #1e3c72
  const secondaryColor = [0, 212, 255]; // #00d4ff
  const textColor = [31, 41, 55]; // #1f2937
  const grayColor = [107, 114, 128]; // #6b7280
  
  // Helper function to check page break
  function checkPageBreak(requiredSpace) {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  }
  
  // Helper function to add section
  function addSection(title, content) {
    checkPageBreak(20);
    
    // Section title
    doc.setFillColor(...primaryColor);
    doc.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin + 3, yPos + 5.5);
    yPos += 12;
    
    // Section content
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    if (typeof content === 'string') {
      const lines = doc.splitTextToSize(content, pageWidth - 2 * margin - 6);
      lines.forEach(line => {
        checkPageBreak(7);
        doc.text(line, margin + 3, yPos);
        yPos += 5;
      });
    } else if (typeof content === 'function') {
      content();
    }
    
    yPos += 5;
  }
  
  // ===== COVER PAGE =====
  
  // Logo/Icon (using text as icon)
  doc.setFontSize(60);
  doc.text('🕌', pageWidth / 2, 60, { align: 'center' });
  
  // Title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text(currentLang === 'id' ? 'LAPORAN WARIS ISLAM' : 'ISLAMIC INHERITANCE REPORT', 
    pageWidth / 2, 90, { align: 'center' });
  
  // Subtitle
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayColor);
  doc.text(currentLang === 'id' ? 'Perhitungan Faraid Sesuai Syariat' : 'Faraid Calculation According to Sharia', 
    pageWidth / 2, 100, { align: 'center' });
  
  // Date
  doc.setFontSize(11);
  const today = new Date().toLocaleDateString(currentLang === 'id' ? 'id-ID' : 'en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text((currentLang === 'id' ? 'Tanggal: ' : 'Date: ') + today, 
    pageWidth / 2, 110, { align: 'center' });
  
  // Disclaimer box
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.rect(margin, 130, pageWidth - 2 * margin, 40);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text(currentLang === 'id' ? '⚠️ DISCLAIMER' : '⚠️ DISCLAIMER', 
    margin + 5, 138);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  doc.setFontSize(9);
  const disclaimerText = currentLang === 'id' ? 
    'Laporan ini adalah hasil perhitungan otomatis berdasarkan data yang diinput. Untuk kasus kompleks, sengketa, atau keperluan legal, sangat disarankan untuk berkonsultasi dengan ulama yang kompeten atau hakim syariah. Perhitungan ini menggunakan pendapat Jumhur Ulama (konsensus 4 mazhab: Hanafi, Maliki, Syafi\'i, dan Hanbali).' :
    'This report is an automatic calculation based on input data. For complex cases, disputes, or legal purposes, it is highly recommended to consult with competent scholars or sharia judges. This calculation uses the opinion of Jumhur Ulama (consensus of 4 madhabs: Hanafi, Maliki, Shafi\'i, and Hanbali).';
  
  const disclaimerLines = doc.splitTextToSize(disclaimerText, pageWidth - 2 * margin - 10);
  let disclaimerY = 145;
  disclaimerLines.forEach(line => {
    doc.text(line, margin + 5, disclaimerY);
    disclaimerY += 4;
  });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(...grayColor);
  doc.text(currentLang === 'id' ? 
    'Dibuat dengan Kalkulator Waris Islam - 4 Mazhab' : 
    'Generated by Islamic Inheritance Calculator - 4 Madhabs', 
    pageWidth / 2, pageHeight - 15, { align: 'center' });
  
  // New page for content
  doc.addPage();
  yPos = margin;
  
  // ===== CONTENT PAGES =====
  
  // Get data from result
  const summaryElement = document.getElementById('resultSummary');
  const heirsElement = document.getElementById('resultHeirs');
  const blockedElement = document.getElementById('resultBlocked');
  
  // Section 1: Ringkasan Harta
  addSection(
    currentLang === 'id' ? '💰 RINGKASAN HARTA' : '💰 ASSET SUMMARY',
    () => {
      const summaryRows = summaryElement.querySelectorAll('.summary-row');
      summaryRows.forEach(row => {
        checkPageBreak(7);
        const label = row.querySelector('.summary-label').textContent;
        const value = row.querySelector('.summary-value').textContent;
        
        doc.setFont('helvetica', 'normal');
        doc.text(label, margin + 3, yPos);
        doc.setFont('helvetica', 'bold');
        doc.text(value, pageWidth - margin - 3, yPos, { align: 'right' });
        yPos += 6;
      });
    }
  );
  
  // Section 2: Urutan Prioritas
  addSection(
    currentLang === 'id' ? '📋 URUTAN PRIORITAS PEMBAGIAN' : '📋 DISTRIBUTION PRIORITY',
    currentLang === 'id' ? 
      '1. Biaya Pengurusan Jenazah (memandikan, mengkafani, menguburkan)\n2. Pelunasan Hutang\n3. Pelaksanaan Wasiat (maksimal 1/3 harta)\n4. Pembagian Waris kepada Ahli Waris\n\nDalil: "...sesudah dipenuhi wasiat yang dibuat atau (dan) sesudah dibayar hutangnya." (QS. An-Nisa: 11-12)' :
      '1. Funeral Expenses (washing, shrouding, burying)\n2. Debt Payment\n3. Will Execution (maximum 1/3 of assets)\n4. Inheritance Distribution to Heirs\n\nEvidence: "...after any bequest or debt." (QS. An-Nisa: 11-12)'
  );
  
  // Section 3: Ahli Waris
  const heirCards = heirsElement.querySelectorAll('.heir-card');
  
  heirCards.forEach((card, index) => {
    checkPageBreak(60);
    
    const name = card.querySelector('.heir-name').textContent;
    const amount = card.querySelector('.heir-amount').textContent;
    const fraction = card.querySelector('.heir-detail-value').textContent;
    const explanation = card.querySelector('.heir-explanation-text').textContent;
    const arabicText = card.querySelector('.dalil-arabic')?.textContent || '';
    const translation = card.querySelector('.dalil-translation').textContent;
    const source = card.querySelector('.dalil-source').textContent;
    
    // Heir box
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.3);
    const boxStartY = yPos;
    
    // Name and amount header
    doc.setFillColor(240, 249, 255);
    doc.rect(margin, yPos, pageWidth - 2 * margin, 10, 'FD');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...primaryColor);
    doc.text(name, margin + 3, yPos + 6.5);
    
    doc.setTextColor(16, 185, 129); // green
    doc.text(amount, pageWidth - margin - 3, yPos + 6.5, { align: 'right' });
    yPos += 12;
    
    // Fraction
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textColor);
    doc.text((currentLang === 'id' ? 'Bagian: ' : 'Share: ') + fraction, margin + 3, yPos);
    yPos += 7;
    
    // Explanation
    doc.setFont('helvetica', 'bold');
    doc.text(currentLang === 'id' ? '💡 Penjelasan:' : '💡 Explanation:', margin + 3, yPos);
    yPos += 5;
    
    doc.setFont('helvetica', 'normal');
    const expLines = doc.splitTextToSize(explanation, pageWidth - 2 * margin - 6);
    expLines.forEach(line => {
      checkPageBreak(5);
      doc.text(line, margin + 3, yPos);
      yPos += 4;
    });
    yPos += 3;
    
    // Dalil box
    doc.setFillColor(249, 250, 251);
    doc.rect(margin + 3, yPos, pageWidth - 2 * margin - 6, 25, 'F');
    yPos += 5;
    
    // Arabic text (if available)
    if (arabicText) {
            doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...primaryColor);
      // Note: Arabic text rendering in jsPDF requires special font
      // For now, we'll show it as regular text
      const arabicLines = doc.splitTextToSize(arabicText, pageWidth - 2 * margin - 12);
      arabicLines.forEach(line => {
        doc.text(line, pageWidth - margin - 6, yPos, { align: 'right' });
        yPos += 5;
      });
      yPos += 2;
    }
    
    // Translation
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...textColor);
    const transLines = doc.splitTextToSize(translation, pageWidth - 2 * margin - 12);
    transLines.forEach(line => {
      checkPageBreak(5);
      doc.text(line, margin + 6, yPos);
      yPos += 4;
    });
    yPos += 2;
    
    // Source
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...grayColor);
    doc.text(source, margin + 6, yPos);
    yPos += 10;
  });
  
  // Section 4: Ahli Waris Terhalang (if any)
  if (blockedElement && blockedElement.innerHTML.trim() !== '') {
    checkPageBreak(30);
    
    addSection(
      currentLang === 'id' ? '⛔ AHLI WARIS YANG TERHALANG (MAHJUB)' : '⛔ BLOCKED HEIRS (MAHJUB)',
      () => {
        const blockedCards = blockedElement.querySelectorAll('.blocked-card');
        
        blockedCards.forEach(card => {
          checkPageBreak(25);
          
          const name = card.querySelector('.blocked-name').textContent;
          const reason = card.querySelector('.blocked-reason').textContent;
          
          // Blocked box
          doc.setFillColor(254, 226, 226);
          doc.setDrawColor(239, 68, 68);
          doc.rect(margin + 3, yPos, pageWidth - 2 * margin - 6, 15, 'FD');
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(239, 68, 68);
          doc.text(name, margin + 6, yPos + 5);
          
          doc.setFontSize(8);
          doc.text('MAHJUB', pageWidth - margin - 9, yPos + 5, { align: 'right' });
          yPos += 10;
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(153, 27, 27);
          const reasonLines = doc.splitTextToSize(reason, pageWidth - 2 * margin - 12);
          reasonLines.forEach(line => {
            doc.text(line, margin + 6, yPos);
            yPos += 4;
          });
          yPos += 8;
        });
        
        // Dalil Mahjub
        yPos += 3;
        doc.setFillColor(249, 250, 251);
        doc.rect(margin + 3, yPos, pageWidth - 2 * margin - 6, 20, 'F');
        yPos += 5;
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...primaryColor);
        doc.text(currentLang === 'id' ? '📖 Dalil Penghalangan:' : '📖 Evidence of Blocking:', margin + 6, yPos);
        yPos += 5;
        
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(...textColor);
        const mahjubText = currentLang === 'id' ? dalilDatabase.mahjub.terjemah_id : dalilDatabase.mahjub.terjemah_en;
        const mahjubLines = doc.splitTextToSize(mahjubText, pageWidth - 2 * margin - 12);
        mahjubLines.forEach(line => {
          doc.text(line, margin + 6, yPos);
          yPos += 4;
        });
        yPos += 2;
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...grayColor);
        doc.text('📖 ' + dalilDatabase.mahjub.riwayat, margin + 6, yPos);
        yPos += 8;
      }
    );
  }
  
  // Section 5: Catatan Penting
  checkPageBreak(40);
  addSection(
    currentLang === 'id' ? '📌 CATATAN PENTING' : '📌 IMPORTANT NOTES',
    currentLang === 'id' ? 
      '1. Pembagian waris harus dilakukan setelah semua kewajiban (biaya jenazah, hutang, wasiat) dipenuhi.\n\n2. Wasiat maksimal 1/3 dari harta setelah biaya jenazah dan hutang, dan tidak boleh untuk ahli waris.\n\n3. Jika ada ahli waris yang terhalang (mahjub), mereka tidak mendapat bagian sama sekali.\n\n4. Pembagian ini menggunakan pendapat Jumhur Ulama (konsensus 4 mazhab).\n\n5. Untuk kasus khusus atau kompleks, konsultasikan dengan ulama yang kompeten.\n\n6. Semua ahli waris harus hadir atau diwakili saat pembagian.\n\n7. Pembagian harus dilakukan dengan adil dan transparan.' :
      '1. Inheritance distribution must be done after all obligations (funeral expenses, debts, will) are fulfilled.\n\n2. Will is maximum 1/3 of assets after funeral expenses and debts, and cannot be for heirs.\n\n3. If there are blocked heirs (mahjub), they receive nothing.\n\n4. This distribution uses the opinion of Jumhur Ulama (consensus of 4 madhabs).\n\n5. For special or complex cases, consult with competent scholars.\n\n6. All heirs must be present or represented during distribution.\n\n7. Distribution must be done fairly and transparently.'
  );
  
  // Section 6: Referensi
  checkPageBreak(35);
  addSection(
    currentLang === 'id' ? '📚 REFERENSI' : '📚 REFERENCES',
    () => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      
      const references = currentLang === 'id' ? [
        '1. Al-Quran Surah An-Nisa ayat 11-12 (Ayat Mawaris)',
        '2. Hadits Shahih Bukhari dan Muslim tentang Faraid',
        '3. Kitab Al-Fiqh al-Islami wa Adillatuhu - Dr. Wahbah Az-Zuhaili',
        '4. Kitab Fiqh Mawaris - Syaikh Muhammad Ali Ash-Shabuni',
        '5. Keputusan Majma\' Fiqh Islami (Islamic Fiqh Council)',
        '6. Fatwa-fatwa MUI tentang Waris',
        '7. Pendapat 4 Mazhab: Hanafi, Maliki, Syafi\'i, Hanbali'
      ] : [
        '1. Al-Quran Surah An-Nisa verses 11-12 (Inheritance verses)',
        '2. Hadith Sahih Bukhari and Muslim about Faraid',
        '3. Book Al-Fiqh al-Islami wa Adillatuhu - Dr. Wahbah Az-Zuhaili',
        '4. Book Fiqh Mawaris - Sheikh Muhammad Ali Ash-Shabuni',
        '5. Islamic Fiqh Council Decisions',
        '6. MUI Fatwas on Inheritance',
        '7. Opinions of 4 Madhabs: Hanafi, Maliki, Shafi\'i, Hanbali'
      ];
      
      references.forEach(ref => {
        checkPageBreak(6);
        doc.text(ref, margin + 3, yPos);
        yPos += 5;
      });
    }
  );
  
  // Footer on last page
  doc.setFontSize(8);
  doc.setTextColor(...grayColor);
  doc.text(
    currentLang === 'id' ? 
      'Dokumen ini dibuat secara otomatis oleh Kalkulator Waris Islam - 4 Mazhab' : 
      'This document is automatically generated by Islamic Inheritance Calculator - 4 Madhabs',
    pageWidth / 2, 
    pageHeight - 10, 
    { align: 'center' }
  );
  
  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...grayColor);
    doc.text(
      (currentLang === 'id' ? 'Halaman ' : 'Page ') + i + ' ' + (currentLang === 'id' ? 'dari' : 'of') + ' ' + pageCount,
      pageWidth - margin,
      pageHeight - 10,
      { align: 'right' }
    );
  }
  
  // Save PDF
  const filename = currentLang === 'id' ? 
    `Laporan-Waris-Islam-${today.replace(/\s/g, '-')}.pdf` :
    `Islamic-Inheritance-Report-${today.replace(/\s/g, '-')}.pdf`;
  
  doc.save(filename);
}

// ===== PRINT STYLES =====
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    .container, .container * {
      visibility: visible;
    }
    .container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      box-shadow: none;
      border-radius: 0;
    }
    .language-selector,
    .btn-group,
    .progress-container,
    .step:not(.active) {
      display: none !important;
    }
    .heir-card,
    .blocked-card {
      page-break-inside: avoid;
    }
  }
`;

// Add print styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);

// ===== FINAL INITIALIZATION =====
console.log('%c🕌 Kalkulator Waris Islam - 4 Mazhab', 'font-size: 20px; font-weight: bold; color: #1e3c72;');
console.log('%cAplikasi siap digunakan!', 'font-size: 14px; color: #10b981;');
console.log('%cDibuat dengan ❤️ untuk umat Islam', 'font-size: 12px; color: #6b7280;');

// Check if all required elements exist
document.addEventListener('DOMContentLoaded', function() {
  const requiredElements = [
    'totalHarta', 'biayaJenazah', 'hutang', 'nilaiAsuransi',
    'anakLaki', 'anakPerempuan', 'resultSummary', 'resultHeirs'
  ];
  
  let allExists = true;
  requiredElements.forEach(id => {
    if (!document.getElementById(id)) {
      console.error(`Element with id "${id}" not found!`);
      allExists = false;
    }
  });
  
  if (allExists) {
    console.log('%c✅ Semua elemen berhasil dimuat', 'color: #10b981; font-weight: bold;');
  } else {
    console.error('❌ Beberapa elemen tidak ditemukan. Periksa HTML!');
  }
});
