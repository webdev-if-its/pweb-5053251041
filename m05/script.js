// PERTEMUAN 5 — JavaScript Dasar dan DOM
//
// Sama seperti index.html di m01: kode ini sengaja ditulis "asal jalan".
// Sebagian fungsi punya bug kecil, sebagian lain baru separuh jadi (tandanya
// komentar TODO). Perbaiki dan lengkapi bertahap, Level 1 sampai 10.
//
// Baca SOAL.md, lalu jalankan:  npm run levels
// File yang kalian sentuh: hanya file ini. Jangan ubah index.html atau test/.

export const katalog = [
  { judul: 'Laskar Pelangi', penulis: 'Andrea Hirata', harga: 45000, tersedia: true },
  { judul: 'Bumi Manusia', penulis: 'Pramoedya Ananta Toer', harga: 60000, tersedia: false },
  { judul: 'Cantik Itu Luka', penulis: 'Eka Kurniawan', harga: 55000, tersedia: true },
  { judul: 'Negeri 5 Menara', penulis: 'Ahmad Fuadi', harga: 40000, tersedia: true },
  { judul: 'Ayat-Ayat Cinta', penulis: 'Habiburrahman El Shirazy', harga: 0, tersedia: false },
];

// Level 1 — ada bug: harga 0 malah menampilkan "Rp" tanpa angka sama sekali.
export function formatRupiah(angka) {
  if (angka === 0) return 'Rp 0';
  return 'Rp ' + angka.toLocaleString('id-ID');
}

// Level 2 — TODO: kembalikan buku yang `tersedia` saja, TANPA mengubah
// array `daftar` yang asli (jangan pakai .sort/.splice/push ke `daftar`).
export function saringTersedia(daftar) {
  daftar = daftar.filter((b) => b.tersedia);
  return daftar;
}

// Level 3 — TODO: ambil elemen #judul-pengumuman dengan querySelector,
// lalu ubah teksnya menjadi HURUF BESAR SEMUA.
export function sorotJudulPengumuman() {
  // tulis di sini
  let judulPengumuman = document.querySelector('#judul-pengumuman');
  judulPengumuman.textContent = judulPengumuman.textContent.toUpperCase();
}

// Level 4 — TODO: ambil SEMUA <li> di #daftar-pengumuman dengan
// querySelectorAll. Untuk setiap <li> yang teksnya mengandung kata "tutup"
// (tanpa peduli huruf besar/kecil), tambahkan prefix "⚠ " di depan teksnya.
// Jangan tambahkan prefix dua kali kalau fungsi ini terpanggil berulang.
export function tandaiPengumumanPenting() {
  // tulis di sini
  let pengumuman = document.querySelectorAll('#daftar-pengumuman li');
  pengumuman.forEach((p) => {
    if (p.textContent.toLowerCase().includes('tutup')) {
      if (!p.textContent.startsWith('⚠ ')) {
        p.textContent = '⚠ ' + p.textContent;
      }
    }
  });
}

// Level 5 — TODO: buat SATU elemen <article> untuk satu buku, memakai
// document.createElement dan textContent (BUKAN  — aturan ini
// berlaku untuk seluruh file, bukan cuma fungsi ini).
// Struktur minimal: <article><h3>judul</h3><p>penulis</p><p>harga</p></article>
// Kembalikan elemen itu (jangan langsung ditempel ke halaman di sini).
export function buatKartuBuku(buku) {
  let article = document.createElement('article');
  let h3 = document.createElement('h3');
  let p1 = document.createElement('p');
  let p2 = document.createElement('p');

  h3.textContent = buku.judul;
  p1.textContent = buku.penulis;
  p2.textContent = formatRupiah(buku.harga);

  article.appendChild(h3);
  article.appendChild(p1);
  article.appendChild(p2);

  return article;
}

// Level 6 & 10 — TODO: kosongkan #katalog, lalu render ulang dari `data`.
// Fungsi ini HARUS dipakai untuk semua kondisi tampilan katalog: daftar
// penuh, hasil pencarian, maupun daftar kosong (Level 9 dan Level 10 sama-
// sama lewat sini, jangan bikin fungsi render terpisah).
// - Perbarui #ringkasan, misalnya "5 buku ditemukan".
// - Kalau `data` kosong, tampilkan pesan di dalam #katalog, misalnya
//   "Tidak ada buku yang cocok." — jangan biarkan #katalog kosong melompong.
// - Setiap kartu yang ditampilkan harus bisa diklik (lihat Level 7).
export function render(data) {
  // tulis di sini
  let katalog = document.querySelector('#katalog');
  katalog.textContent = '';
  let ringkasan = document.querySelector('#ringkasan');
  ringkasan.textContent = `${data.length} buku ditemukan`;

  if (data.length === 0) {
    katalog.textContent = 'Tidak ada buku yang cocok.';
    return;
  }

  data.forEach((buku) => {
    let kartu = buatKartuBuku(buku);
    kartu.addEventListener('click', () => {
      tampilkanDetail(buku);
    });
    katalog.appendChild(kartu);
  });
}

// Level 7 — dipanggil saat sebuah kartu diklik. TODO: tampilkan judul,
// penulis, dan harga buku itu di #panel-detail (textContent).
function tampilkanDetail(buku) {
  // tulis di sini
  let panelDetail = document.querySelector('#panel-detail');

  let h3 = document.createElement('h3');
  let p1 = document.createElement('p');
  let p2 = document.createElement('p');

  panelDetail.textContent = buku.judul;
  p1.textContent = buku.penulis;
  p2.textContent = formatRupiah(buku.harga);

  panelDetail.appendChild(h3);
  panelDetail.appendChild(p1);
  panelDetail.appendChild(p2);
}

// Level 8 & 9 — TODO: pasang event listener 'submit' pada #form-cari.
// - Level 8: cegah reload halaman (preventDefault).
// - Level 9: ambil nilai #input-cari, saring `katalog` yang judulnya
//   mengandung kata itu (tanpa peduli huruf besar/kecil), lalu panggil
//   render(hasil) — bukan menulis ulang kode tampilan di sini.
export function pasangFormCari() {
  // tulis di sini
  let formCari = document.querySelector('#form-cari');
  formCari.addEventListener('submit', (event) => {
    event.preventDefault();
    let inputCari = document.querySelector('#input-cari').value.toLowerCase();
    let hasil = katalog.filter((buku) => buku.judul.toLowerCase().includes(inputCari));
    render(hasil);
  });
}

// Bootstrap halaman — jangan hapus, ini yang membuat halaman "hidup" saat
// dibuka di browser. Boleh dibaca untuk mengerti urutan pemanggilan.
sorotJudulPengumuman();
tandaiPengumumanPenting();
render(katalog);
pasangFormCari();
