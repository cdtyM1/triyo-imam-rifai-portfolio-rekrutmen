// Data Karya (skema A) — update lebih cepat cukup edit array ini.
// Output: window.WORKS

(function () {
  const svgThumb = (bg1, bg2, label) => {
    const safe = String(label).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg1}"/>
      <stop offset="1" stop-color="${bg2}"/>
    </linearGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="24"/>
    </filter>
  </defs>
  <rect width="1200" height="600" fill="url(#g)"/>
  <circle cx="300" cy="180" r="140" fill="rgba(255,255,255,0.28)" filter="url(#blur)"/>
  <circle cx="920" cy="120" r="170" fill="rgba(255,255,255,0.18)" filter="url(#blur)"/>
  <circle cx="820" cy="480" r="200" fill="rgba(0,0,0,0.18)" filter="url(#blur)"/>

  <g fill="rgba(255,255,255,0.92)" font-family="Arial, Helvetica, sans-serif">
    <text x="70" y="330" font-size="70" font-weight="800">${safe}</text>
    <text x="70" y="405" font-size="34" opacity="0.92" font-weight="700">Triyo Imam Rifa'i</text>
  </g>

  <g opacity="0.55" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="3">
    <path d="M80 480 C 250 380, 450 520, 620 440 S 980 420, 1120 480"/>
  </g>
</svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  const WORKS = [
    {
      id: 'foto-panning',
      category: 'Fotografi',
      title: 'Fotografi Panning Shoot',
      shortDesc: 'Teknik panning untuk menangkap kesan gerak yang halus.',
      desc: 'Serangkaian foto panning yang menekankan subjek tetap tajam dengan latar bergerak lembut. Saya fokus pada komposisi, kecepatan rana, dan timing pengambilan gambar.',
      tools: ['Komposisi', 'Timing', 'Pengaturan kamera'],
      highlights: ['Subjek lebih tajam, latar lebih mengalir', 'Konsistensi framing antar seri', 'Pemilihan angle untuk menonjolkan dinamika'],
      image: svgThumb('#7C5CFF', '#2EE9A6', 'Panning Shoot')
    },
    {
      id: 'desain-instagram',
      category: 'Desain Grafis',
      title: 'Desain Postingan Instagram',
      shortDesc: 'Template konten visual yang menarik dan mudah dipahami.',
      desc: 'Desain postingan untuk kebutuhan promosi/branding: hierarki teks jelas, palet warna konsisten, dan elemen visual rapi. Cocok untuk kebutuhan timeline IG.',
      tools: ['CorelDRAW', 'Photoshop', 'Layout konten'],
      highlights: ['Keterbacaan tinggi di mobile', 'Konsistensi tema warna', 'Penataan teks & visual terstruktur'],
      image: svgThumb('#FF4D6D', '#7C5CFF', 'Post IG')
    },
    {
      id: 'vector-bus',
      category: 'Desain Vector',
      title: 'Desain Vector Bus',
      shortDesc: 'Ilustrasi vector dengan garis bersih dan warna yang rapi.',
      desc: 'Pembuatan desain vector bertema transportasi. Fokus pada bentuk, proporsi, dan detail yang tetap enak dilihat ketika diubah ukuran.',
      tools: ['Vector tracing', 'Konsistensi warna', 'Detail shape'],
      highlights: ['Bersih saat di-scaling', 'Palet warna selaras', 'Proporsi sesuai objek'],
      image: svgThumb('#2EE9A6', '#1B65FF', 'Vector Bus')
    },
    {
      id: 'lanyard',
      category: 'Desain Event',
      title: 'Desain Lanyard',
      shortDesc: 'Desain identitas event dengan layout siap produksi.',
      desc: 'Desain lanyard untuk kebutuhan event: hierarki informasi jelas dan gaya grafis dibuat agar terlihat menonjol namun tetap terbaca.',
      tools: ['Layout event', 'Tipografi', 'Kerapian grid'],
      highlights: ['Informasi terbaca jelas', 'Paduan warna untuk kontras', 'Siap untuk materi produksi'],
      image: svgThumb('#1B65FF', '#7C5CFF', 'Lanyard')
    },
    {
      id: 'kaos',
      category: 'Desain Apparel',
      title: 'Desain Kaos',
      shortDesc: 'Konsep grafis kaos dengan komposisi kuat.',
      desc: 'Konsep desain kaos dengan penempatan elemen grafis yang seimbang. Fokus pada tampilan yang tetap menarik di berbagai ukuran dan jarak pandang.',
      tools: ['Komposisi desain', 'Color separation (konsep)', 'Siap cetak (konsep)'],
      highlights: ['Komposisi kuat', 'Warna mudah dipadukan', 'Tampilan tetap enak dilihat'],
      image: svgThumb('#FFB703', '#FF4D6D', 'Desain Kaos')
    }
  ];

  window.WORKS = WORKS;
})();
