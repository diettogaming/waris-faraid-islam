// Inisialisasi
let currentLang = 'id';
let currentStepNum = 0;
const totalSteps = 7;

// Dalil tambahan
const haditsHutang = {
  arab: "مَا مِنْ مُسْلِمٍ يَتَوَفَّاهُ اللَّهُ وَعَلَيْهِ دَيْنٌ إِلَّا حُرِمَتْ عَلَيْهِ الصَّلَاةُ",
  terjemah_id: "Tidaklah seorang muslim meninggal dunia dengan meninggalkan hutang, kecuali shalat jenazahnya diharamkan.",
  riwayat: "HR. Abu Daud dan Tirmidzi"
};
const dalilUrutan = {
  arab: "مِن بَعْدِ وَصِيَّةٍ يُوصِى بِهَا أَوْ دَيْنٍ",
  terjemah_id: "Sesudah dipenuhi wasiat yang ia buat atau sesudah dibayar hutangnya...",
  surah: "An-Nisa",
  ayat: 11
};

// Change language UI
function changeLang(lang) {
  currentLang = lang;
  document.getElementById('btn-id').classList.toggle('bg-blue-600', lang==='id');
  document.getElementById('btn-id').classList.toggle('text-white', lang==='id');
  document.getElementById('btn-en').classList.toggle('bg-blue-600', lang==='en');
  document.getElementById('btn-en').classList.toggle('text-white', lang==='en');
  // Update teks UI sesuai bahasa (implementasi i18n bisa ditambah nanti)
  // Contoh sederhana:
  document.querySelector('.title').textContent = lang==='id' ? 'Kalkulator Waris Islam - 4 Mazhab' : 'Islamic Inheritance Calculator - 4 Madhabs';
}

// Step navigation
function nextStep(step) {
  if(step<0 || step>totalSteps) return;
  document.querySelector(`.step.active`).classList.remove('active');
  const next = document.getElementById(`step${step}`);
  if(next) next.classList.add('active');
  currentStepNum = step;
  window.scrollTo({top:0, behavior: 'smooth'});
}
function prevStep(step) {
  nextStep(step);
}

// Format Rupiah
function formatRupiah(input) {
  let val = input.value.replace(/[^0-9]/g, '');
  if(val==='') {input.value='';return;}
  input.value = parseInt(val).toLocaleString('id-ID');
}
function parseCurrency(val) {
  if(!val) return 0;
  return parseInt(val.toString().replace(/[^0-9]/g, '')) || 0;
}

// Toggle dark mode
const htmlEl = document.documentElement;
document.getElementById('btnStart').addEventListener('dblclick', () => {
  htmlEl.classList.toggle('dark');
});

// Fungsi tampilkan dalil di ringkasan hasil
function tampilkanDalilHutangDanUrutan() {
  const resultSummary = document.getElementById('resultSummary');
  if(!resultSummary) return;
  
  const html = `
    <div class="dalil-section mt-6 p-4 bg-blue-50 dark:bg-blue-800 rounded-xl text-blue-800 dark:text-blue-200">
      <h4 class="font-semibold mb-2">📜 Dalil Hadits Tentang Hutang dan Urutan Pembagian</h4>
      <p style="font-family:'Amiri', serif; font-size:18px; text-align:right; direction:rtl;">${haditsHutang.arab}</p>
      <p class="italic">"${haditsHutang.terjemah_id}"</p>
      <p class="font-bold">${haditsHutang.riwayat}</p>
      <hr class="my-4 border-blue-400 dark:border-blue-600">
      <p style="font-family:'Amiri', serif; font-size:18px; text-align:right; direction:rtl;">${dalilUrutan.arab}</p>
      <p class="italic">"${dalilUrutan.terjemah_id}"</p>
      <p class="font-bold">QS. ${dalilUrutan.surah}: ${dalilUrutan.ayat}</p>
    </div>
  `;
  resultSummary.insertAdjacentHTML('beforeend', html);
}

// Fungsi reset perhitungan
function resetCalculation() {
  location.reload();
}

// Fungsi utama hitung perhitungan dan tampil hasil (placeholder)
function calculate() {
  alert('Fungsi hitung belum diimplementasi di contoh ini.');
}

// Event listeners bahasa dan start (demo)
document.getElementById('btn-id').addEventListener('click', () => changeLang('id'));
document.getElementById('btn-en').addEventListener('click', () => changeLang('en'));
document.getElementById('btnStart').addEventListener('click', () => nextStep(1));

// Inisialisasi bahasa default
changeLang('id');
