// Inisialisasi bahasa dan elemen yang akan diubah
let currentLang = 'id';

// Fungsi mengubah bahasa dengan pengecekan eksistensi elemen
function changeLang(lang) {
  currentLang = lang;

  const titleEl = document.querySelector('.title');
  if (titleEl) {
    titleEl.textContent = lang === 'id' ? 'Kalkulator Waris Islam - 4 Mazhab' : 'Islamic Inheritance Calculator - 4 Madhabs';
  }

  const subtitleEl = document.querySelector('.subtitle');
  if (subtitleEl) {
    subtitleEl.textContent = lang === 'id'
      ? 'Aplikasi ini membantu Anda menghitung pembagian waris sesuai hukum Islam berdasarkan Al-Quran dan Sunnah dengan pendapat 4 Mazhab.'
      : 'This application helps you calculate inheritance distribution according to Islamic law based on the Quran and Sunnah with the opinions of 4 Madhabs.';
  }

  const fiturTitle = document.querySelector('#fiturTitle');
  const fiturList = document.querySelectorAll('.fitur-item');
  if (fiturTitle && fiturList.length) {
    if (lang === 'id') {
      fiturTitle.textContent = '✨ Fitur Aplikasi:';
      fiturList[0].textContent = 'Perhitungan akurat sesuai 4 mazhab (Hanafi, Maliki, Syafi\'i, Hanbali)';
      fiturList[1].textContent = 'Penjelasan lengkap dengan dalil Al-Quran & Hadits';
      fiturList[2].textContent = 'Export PDF dengan detail lengkap';
      fiturList[3].textContent = 'Multi-bahasa (Indonesia & English)';
      fiturList[4].textContent = 'Deteksi otomatis penghalangan (Mahjub)';
    } else {
      fiturTitle.textContent = '✨ Features:';
      fiturList[0].textContent = 'Accurate calculation according to 4 madhabs (Hanafi, Maliki, Shafi\'i, Hanbali)';
      fiturList[1].textContent = 'Complete explanation with Quran & Hadith evidence';
      fiturList[2].textContent = 'Export PDF with detailed report';
      fiturList[3].textContent = 'Multi-language (Indonesian & English)';
      fiturList[4].textContent = 'Automatic blocking detection (Mahjub)';
    }
  }

  const disclaimerTitle = document.querySelector('#disclaimerTitle');
  const disclaimerText = document.querySelector('#disclaimerText');
  if (disclaimerTitle && disclaimerText) {
    if (lang === 'id') {
      disclaimerTitle.textContent = '⚠️ Disclaimer:';
      disclaimerText.textContent = 'Aplikasi ini adalah alat bantu perhitungan. Untuk kasus kompleks atau sengketa, konsultasikan dengan ulama atau hakim syariah yang kompeten.';
    } else {
      disclaimerTitle.textContent = '⚠️ Disclaimer:';
      disclaimerText.textContent = 'This app is a calculation tool. For complex cases or disputes, consult competent scholars or sharia judges.';
    }
  }

  const btnStart = document.getElementById('btnStart');
  if (btnStart) {
    btnStart.textContent = lang === 'id' ? 'Mulai Perhitungan →' : 'Start Calculation →';
  }
}

// Event listeners untuk tombol bahasa
document.getElementById('btn-id').addEventListener('click', () => changeLang('id'));
document.getElementById('btn-en').addEventListener('click', () => changeLang('en'));

// Inisialisasi tampilan bahasa default
changeLang('id');

// Dark mode toggle (contoh jika Anda mau tambahkan tombol toggle nanti)
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}

// Contoh Anda bisa panggil toggleDarkMode() dari tombol,  
// Jika mau saya buatkan fitur toggle tombol nanti bisa saya kirimkan.

// Fungsi format rupiah
function formatRupiah(input) {
  let val = input.value.replace(/[^0-9]/g, '');
  if (val === '') {
    input.value = '';
    return;
  }
  input.value = parseInt(val).toLocaleString('id-ID');
}

// Ekspor fungsi jika diperlukan
