// Fungsi untuk mendapatkan data dalil dari JSON
async function getDalil() {
  const response = await fetch('dalil.json');
  return await response.json();
}

// Fungsi untuk menampilkan dalil
function showDalil(dalil) {
  document.getElementById('eduText').innerHTML = `
    <p><strong>Dalil:</strong> ${dalil.arabic}</p>
    <p><strong>Terjemahan:</strong> ${dalil.translation}</p>
    <p><strong>Sumber:</strong> ${dalil.source}</p>
  `;
  document.getElementById('eduPopup').style.display = 'block';
}

// Fungsi untuk menutup modal
function closeEduPopup() {
  document.getElementById('eduPopup').style.display = 'none';
}

// Perhitungan warisan (contoh dasar)
function calculateInheritance() {
  let harta = parseFloat(document.getElementById('harta').value);
  let biayaJenazah = parseFloat(document.getElementById('biaya_jenazah').value);
  let totalHarta = harta - biayaJenazah;

  // Menampilkan hasil
  let resultHTML = `
    <p>Total Harta Bersih: ${totalHarta}</p>
  `;

  document.getElementById('resultDetails').innerHTML = resultHTML;

  // Tampilkan dalil penghalang waris jika ada
  let dalil = {
    arabic: "فَإِن كَانَ لَكُمْ وَلَدٌ فَلَكُمُ الرُّبُعُ مِمَّا تَرَكْتُم",
    translation: "Jika kamu mempunyai anak, maka bagi mereka seperempat dari harta yang kamu tinggalkan.",
    source: "QS. An-Nisa 12"
  };
  showDalil(dalil);
}

// Event Listener untuk tombol "Selanjutnya"
document.getElementById('nextStep').addEventListener('click', () => {
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step3').style.display = 'block';
});

document.getElementById('nextStep2').addEventListener('click', () => {
  document.getElementById('step3').style.display = 'none';
  document.getElementById('step4').style.display = 'block';
});

document.getElementById('nextStep3').addEventListener('click', () => {
  document.getElementById('step4').style.display = 'none';
  document.getElementById('step5').style.display = 'block';
});

document.getElementById('nextStep4').addEventListener('click', () => {
  document.getElementById('step5').style.display = 'none';
  document.getElementById('step6').style.display = 'block';
});

document.getElementById('nextStep5').addEventListener('click', () => {
  calculateInheritance();
});
