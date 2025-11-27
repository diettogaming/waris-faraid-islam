// Bahasa: default Indonesia
let currentLang = 'id';

// Fungsi ganti bahasa dengan pengecekan agar tidak error
function changeLang(lang) {
  currentLang = lang;

  const title = document.querySelector('.title');
  if (title)
    title.textContent =
      lang === 'id' ? 'Kalkulator Waris Islam - 4 Mazhab' : 'Islamic Inheritance Calculator - 4 Madhabs';

  const subtitle = document.querySelector('.subtitle');
  if (subtitle)
    subtitle.textContent =
      lang === 'id'
        ? 'Aplikasi ini membantu Anda menghitung pembagian waris sesuai hukum Islam berdasarkan Al-Quran dan Sunnah dengan pendapat 4 Mazhab.'
        : 'This app helps calculate Islamic inheritance shares based on Quran & Sunnah with 4 madhabs opinions.';
}

document.getElementById('btn-id').addEventListener('click', () => changeLang('id'));
document.getElementById('btn-en').addEventListener('click', () => changeLang('en'));

const landing = document.getElementById('landingPage');
const step1 = document.getElementById('step1');
const btnStart = document.getElementById('btnStart');
const backStep1 = document.getElementById('backStep1');
const formStep1 = document.getElementById('formStep1');

// Fungsi navigasi sederhana
btnStart.addEventListener('click', () => {
  landing.classList.add('hidden');
  step1.classList.remove('hidden');
});

backStep1.addEventListener('click', () => {
  step1.classList.add('hidden');
  landing.classList.remove('hidden');
});

formStep1.addEventListener('submit', (e) => {
  e.preventDefault();
  alert(currentLang === 'id' ? 'Lanjut ke input data waris berikutnya' : 'Proceed to next inheritance input step');
  // TODO: buat step input berikutnya
});

// Inisialisasi bahasa saat load
changeLang('id');
