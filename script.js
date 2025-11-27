/* Inisialisasi bahasa */
let currentLang = 'id';

function changeLang(lang) {
  currentLang = lang;
  const title = document.querySelector('.title');
  const subtitle = document.querySelector('.subtitle');

  if(title) title.textContent = lang === 'id' ? 'Kalkulator Waris Islam - 4 Mazhab' : 'Islamic Inheritance Calculator - 4 Madhabs';
  if(subtitle) subtitle.textContent = lang === 'id'
    ? 'Aplikasi ini membantu Anda menghitung pembagian waris sesuai hukum Islam berdasarkan Al-Quran dan Sunnah dengan pendapat 4 Mazhab.'
    : 'This application helps calculate inheritance shares based on Quran & Sunnah with 4 Madhabs opinions.';
}

document.getElementById('btn-id').addEventListener('click', () => changeLang('id'));
document.getElementById('btn-en').addEventListener('click', () => changeLang('en'));

/* Navigasi antara landing page dan step 1 */
const btnStart = document.getElementById('btnStart');
const landingPage = document.getElementById('landingPage');
const step1 = document.getElementById('step1');
const backStep1 = document.getElementById('backStep1');

btnStart.addEventListener('click', () => {
  landingPage.classList.add('hidden');
  step1.classList.remove('hidden');
});

backStep1.addEventListener('click', () => {
  step1.classList.add('hidden');
  landingPage.classList.remove('hidden');
});

/* Form step 1 submit event */
document.getElementById('formStep1').addEventListener('submit', e => {
  e.preventDefault();
  alert(currentLang === 'id' ? 'Lanjut ke input data waris berikutnya' : 'Proceed to next inheritance input step');
  // Disini Anda lanjut buat step 2 dan seterusnya
});

/* Inisialisasi default */
changeLang('id');
