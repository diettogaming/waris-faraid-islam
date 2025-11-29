/* =========================================
   DATABASE DALIL (AL-QURAN & HADITS)
   Disimpan dalam objek agar mudah dipanggil
   ========================================= */
const DALIL_DB = {
    // SURAH AN-NISA: 11 (Anak, Orang Tua)
    'nisa_11_anak_lk_pr': {
        ref: 'QS. An-Nisa: 11',
        arab: 'يُوصِيكُمُ ٱللَّهُ فِىٓ أَوْلَٰدِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ ٱلْأُنثَيَيْنِ',
        arti: 'Allah mensyariatkan bagimu tentang (pembagian pusaka untuk) anak-anakmu. Yaitu: bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan.'
    },
    'nisa_11_anak_pr_tunggal': {
        ref: 'QS. An-Nisa: 11',
        arab: 'وَإِن كَانَتْ وَٰحِدَةً فَلَهَا ٱلنِّصْفُ',
        arti: 'Jika anak perempuan itu seorang saja, maka ia memperoleh separuh harta.'
    },
    'nisa_11_anak_pr_jamak': {
        ref: 'QS. An-Nisa: 11',
        arab: 'فَإِن كُنَّ نِسَآءً فَوْقَ ٱثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ',
        arti: 'Jika anak perempuan itu dua orang atau lebih, maka bagi mereka dua pertiga dari harta yang ditinggalkan.'
    },
    'nisa_11_ortu_ada_anak': {
        ref: 'QS. An-Nisa: 11',
        arab: 'وَلِأَبَوَيْهِ لِكُلِّ وَٰحِدٍ مِّنْهُمَا ٱلسُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُۥ وَلَدٌ',
        arti: 'Dan untuk dua orang ibu-bapa, bagi masing-masingnya seperenam dari harta yang ditinggalkan, jika yang meninggal itu mempunyai anak.'
    },
    'nisa_11_ibu_tak_ada_anak': {
        ref: 'QS. An-Nisa: 11',
        arab: 'فَإِن لَّمْ يَكُن لَّهُۥ وَلَدٌ وَوَرِثَهُۥٓ أَبَوَاهُ فَلِأُمِّهِ ٱلثُّلُثُ',
        arti: 'Jika orang yang meninggal tidak mempunyai anak dan ia diwarisi oleh ibu-bapanya (saja), maka ibunya mendapat sepertiga.'
    },

    // SURAH AN-NISA: 12 (Pasangan)
    'nisa_12_suami_tak_ada_anak': {
        ref: 'QS. An-Nisa: 12',
        arab: 'وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَٰجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ',
        arti: 'Dan bagimu (suami-suami) seperdua dari harta yang ditinggalkan oleh istri-istrimu, jika mereka tidak mempunyai anak.'
    },
    'nisa_12_suami_ada_anak': {
        ref: 'QS. An-Nisa: 12',
        arab: 'فَإِن كَانَ لَهُنَّ وَلَدٌ فَلَكُمُ ٱلرُّبُعُ',
        arti: 'Jika istri-istrimu itu mempunyai anak, maka kamu mendapat seperempat dari harta yang ditinggalkannya.'
    },
    'nisa_12_istri_tak_ada_anak': {
        ref: 'QS. An-Nisa: 12',
        arab: 'وَلَهُنَّ ٱلرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ',
        arti: 'Para istri memperoleh seperempat harta yang kamu tinggalkan jika kamu tidak mempunyai anak.'
    },
    'nisa_12_istri_ada_anak': {
        ref: 'QS. An-Nisa: 12',
        arab: 'فَإِن كَانَ لَكُمْ وَلَدٌ فَلَهُنَّ ٱلثُّمُنُ',
        arti: 'Jika kamu mempunyai anak, maka para istri memperoleh seperdelapan dari harta yang kamu tinggalkan.'
    },
    'nisa_12_kalalah_seibu': {
        ref: 'QS. An-Nisa: 12',
        arab: 'وَإِن كَانَ رَجُلٌ يُورَثُ كَلَٰلَةً أَوِ ٱمْرَأَةٌ وَلَهُۥٓ أَخٌ أَوْ أُخْتٌ فَلِكُلِّ وَٰحِدٍ مِّنْهُمَا ٱلسُّدُسُ',
        arti: 'Jika seseorang mati baik laki-laki maupun perempuan yang tidak meninggalkan ayah dan tidak meninggalkan anak (kalalah), tetapi mempunyai seorang saudara laki-laki (seibu) atau seorang saudara perempuan (seibu), maka bagi masing-masing dari kedua jenis saudara itu seperenam harta.'
    },

    // HADITS & IJMA
    'hadits_mahjub_ayah': {
        ref: 'Ijma Ulama & Kaidah Fiqih',
        arab: 'الأقرب يحجب الأبعد',
        arti: 'Kaidah Fiqih: "Kerabat yang lebih dekat menghalangi kerabat yang lebih jauh." (Ayah menghalangi Kakek dan Saudara).'
    },
    'hadits_nenek': {
        ref: 'HR. Abu Daud & Tirmidzi',
        arab: 'أَطْعَمَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ الْجَدَّةَ السُّدُسَ',
        arti: 'Rasulullah SAW memberikan kepada nenek seperenam.'
    },
    'hadits_ashabah': {
        ref: 'HR. Bukhari & Muslim',
        arab: 'أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَهُوَ لِأَوْلَى رَجُلٍ ذَكَرٍ',
        arti: 'Berikanlah bagian-bagian tertentu (fardh) kepada yang berhak, maka sisanya adalah untuk kerabat laki-laki yang paling dekat (Ashabah).'
    }
};

/* =========================================
   KELAS MATEMATIKA PECAHAN (Untuk Akurasi)
   ========================================= */
class Fraction {
    constructor(n, d) {
        this.n = n;
        this.d = d;
    }
    toFloat() { return this.n / this.d; }
    add(other) {
        return new Fraction(this.n * other.d + other.n * this.d, this.d * other.d);
    }
    toString() { return `${this.n}/${this.d}`; }
}

/* =========================================
   UI HELPERS
   ========================================= */
function toggleSpouse(gender) {
    if (gender === 'male') {
        document.getElementById('input-istri').classList.remove('hidden');
        document.getElementById('input-suami').classList.add('hidden');
        document.getElementById('check-suami').checked = false;
    } else {
        document.getElementById('input-istri').classList.add('hidden');
        document.getElementById('input-suami').classList.remove('hidden');
        document.getElementById('count-istri').value = 0;
    }
}

function showDalil(key) {
    const data = DALIL_DB[key];
    const content = `
        <div class="text-center mb-6">
            <h4 class="text-xl font-bold text-islamic mb-2">${data.ref}</h4>
            <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <p class="font-arab text-2xl text-right mb-4 leading-loose">${data.arab}</p>
                <p class="text-slate-700 italic text-sm">"${data.arti}"</p>
            </div>
        </div>
    `;
    document.getElementById('dalilContent').innerHTML = content;
    document.getElementById('dalilModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('dalilModal').classList.add('hidden');
}

/* =========================================
   CORE LOGIC (PERHITUNGAN)
   ========================================= */
function calculateInheritance() {
    // 1. Ambil Data Input
    const mazhab = document.getElementById('mazhab').value;
    const totalHarta = parseFloat(document.getElementById('harta').value) || 0;
    const heirs = {
        suami: document.getElementById('check-suami').checked,
        istri: parseInt(document.getElementById('count-istri').value) || 0,
        ayah: document.getElementById('check-ayah').checked,
        ibu: document.getElementById('check-ibu').checked,
        kakek: document.getElementById('check-kakek').checked,
        nenek: document.getElementById('check-nenek').checked,
        anakLk: parseInt(document.getElementById('count-anak-lk').value) || 0,
        anakPr: parseInt(document.getElementById('count-anak-pr').value) || 0,
        sdrSeibu: parseInt(document.getElementById('count-sdr-seibu').value) || 0,
        sdrKandungLk: parseInt(document.getElementById('count-sdr-kandung-lk').value) || 0
    };

    let results = [];
    let totalShare = new Fraction(0, 1);
    
    // Flag Penting
    const hasAnak = heirs.anakLk > 0 || heirs.anakPr > 0;
    const hasAnakLk = heirs.anakLk > 0;

    /* --- LOGIKA MAHJUB (PENGHALANG) --- */
    
    // Ayah menghalangi Kakek & Saudara (Ijma')
    if (heirs.ayah) {
        heirs.kakek = false; 
        heirs.sdrSeibu = 0; 
        heirs.sdrKandungLk = 0;
    }

    // Ibu menghalangi Nenek
    if (heirs.ibu) heirs.nenek = false;

    // Anak/Cucu menghalangi Saudara Seibu
    if (hasAnak) heirs.sdrSeibu = 0;

    /* --- PERHITUNGAN FARDH (BAGIAN PASTI) --- */

    // 1. Suami
    if (heirs.suami) {
        let share = hasAnak ? new Fraction(1, 4) : new Fraction(1, 2);
        let dalil = hasAnak ? 'nisa_12_suami_ada_anak' : 'nisa_12_suami_tak_ada_anak';
        results.push({ name: 'Suami', share: share, type: 'Fardh', dalil: dalil, note: hasAnak ? 'Ada keturunan' : 'Tidak ada keturunan' });
        totalShare = totalShare.add(share);
    }

    // 2. Istri
    if (heirs.istri > 0) {
        let share = hasAnak ? new Fraction(1, 8) : new Fraction(1, 4);
        let dalil = hasAnak ? 'nisa_12_istri_ada_anak' : 'nisa_12_istri_tak_ada_anak';
        results.push({ name: `Istri (${heirs.istri})`, share: share, type: 'Fardh', dalil: dalil, note: hasAnak ? 'Ada keturunan' : 'Tidak ada keturunan' });
        totalShare = totalShare.add(share);
    }

    // 3. Ayah
    if (heirs.ayah) {
        if (hasAnak) {
            let share = new Fraction(1, 6);
            results.push({ name: 'Ayah', share: share, type: 'Fardh', dalil: 'nisa_11_ortu_ada_anak', note: 'Mendapat 1/6 karena ada anak' });
            totalShare = totalShare.add(share);
        } else {
            results.push({ name: 'Ayah', share: new Fraction(0, 1), type: 'Ashabah', dalil: 'hadits_ashabah', note: 'Mengambil sisa harta (Ashabah)' });
        }
    }

    // 4. Ibu
    if (heirs.ibu) {
        let share = hasAnak ? new Fraction(1, 6) : new Fraction(1, 3);
        let dalil = hasAnak ? 'nisa_11_ortu_ada_anak' : 'nisa_11_ibu_tak_ada_anak';
        results.push({ name: 'Ibu', share: share, type: 'Fardh', dalil: dalil, note: hasAnak ? 'Ada anak (bagian 1/6)' : 'Tidak ada anak (bagian 1/3)' });
        totalShare = totalShare.add(share);
    }

    // 5. Anak Perempuan (Tanpa Anak Laki)
    if (heirs.anakPr > 0 && !hasAnakLk) {
        let share = heirs.anakPr > 1 ? new Fraction(2, 3) : new Fraction(1, 2);
        let dalil = heirs.anakPr > 1 ? 'nisa_11_anak_pr_jamak' : 'nisa_11_anak_pr_tunggal';
        results.push({ name: `Anak Pr (${heirs.anakPr})`, share: share, type: 'Fardh', dalil: dalil, note: 'Bagian pasti anak perempuan' });
        totalShare = totalShare.add(share);
    }

    /* --- PERHITUNGAN SISA (ASHABAH) --- */
    let usedShare = totalShare.toFloat();
    let sisa = 1 - usedShare;

    if (sisa > 0) {
        // Prioritas Ashabah
        if (heirs.anakLk > 0) {
            results.push({ name: 'Anak Laki-laki (+ Pr)', share: new Fraction(Math.round(sisa * 100), 100), type: 'Ashabah', dalil: 'nisa_11_anak_lk_pr', note: 'Anak laki-laki menghabiskan sisa (2:1 dgn pr)' });
        } else if (heirs.ayah) {
             // Ayah sudah masuk di atas sebagai ashabah jika type=Ashabah
             let ayahIdx = results.findIndex(r => r.name === 'Ayah');
             if(ayahIdx !== -1 && results[ayahIdx].type.includes('Fardh')) {
                // Ayah dapat 1/6 + Sisa (Jika ada anak perempuan saja)
                results[ayahIdx].note += ' + Sisa';
                results[ayahIdx].share = new Fraction(Math.round((results[ayahIdx].share.toFloat() + sisa) * 100), 100);
             } else if (ayahIdx !== -1) {
                results[ayahIdx].share = new Fraction(Math.round(sisa * 100), 100);
             }
        }
    }

    /* --- RENDER HASIL --- */
    renderResults(results, totalHarta, sisa * totalHarta);
}

function renderResults(results, totalHarta, sisaRupiah) {
    const container = document.getElementById('heirs-container');
    container.innerHTML = '';
    
    document.getElementById('resultSection').classList.remove('hidden');
    document.getElementById('res-harta').innerText = `Rp ${totalHarta.toLocaleString('id-ID')}`;
    
    // Tampilkan Sisa (handling koma)
    let displaySisa = sisaRupiah < 0 ? 0 : sisaRupiah;
    document.getElementById('res-sisa').innerText = `Rp ${Math.round(displaySisa).toLocaleString('id-ID')}`;

    results.forEach(item => {
        let nominal = item.share.toFloat() * totalHarta;
        let percentage = (item.share.toFloat() * 100).toFixed(1);
        
        // Tentukan warna kartu
        let classType = 'fardh';
        if (item.type === 'Ashabah') classType = 'ashabah';
        
        const html = `
            <div class="heir-card ${classType}">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-bold text-lg text-slate-800">${item.name}</h4>
                        <span class="text-xs uppercase font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded">${item.type}</span>
                        <p class="text-sm text-slate-600 mt-1 italic">${item.note}</p>
                    </div>
                    <div class="text-right">
                        <div class="font-bold text-xl text-emerald-700">Rp ${Math.round(nominal).toLocaleString('id-ID')}</div>
                        <div class="text-sm font-bold text-slate-400">${percentage}%</div>
                    </div>
                </div>
                <div class="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                    <button onclick="showDalil('${item.dalil}')" class="btn-dalil">
                        <span>📖 Lihat Dalil</span>
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });

    // Scroll ke hasil
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
}
