import React from 'react';

const Journal: React.FC = () => {
  return (
    <section id="journal" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Jurnal Teknis: Membedah Simulasi</h2>
          <p className="text-gray-400 mt-2">Dari Sirkuit Flip-Flop Sederhana ke Kontrol Cerdas.</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-cyan-400">1. Pendahuluan</h3>
            <p>
              Lampu lalu lintas adalah pilar fundamental dalam manajemen lalu lintas perkotaan. Di balik operasinya yang tampak sederhana, terdapat sebuah prinsip inti dari ilmu komputer dan elektronika: <strong>logika sekuensial</strong>. Jurnal ini bertujuan untuk membedah bagaimana konsep tersebut, yang secara fisik diwujudkan oleh sirkuit seperti flip-flop, dapat disimulasikan untuk mengendalikan sistem lampu lalu lintas.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-cyan-400">2. Tinjauan Pustaka</h3>
            <p>
              Studi mengenai sistem kendali lalu lintas telah berkembang dari model elektromekanik menuju sistem cerdas. Menurut <strong>Mano & Ciletti (2018)</strong>, sirkuit logika sekuensial adalah fondasi dari sistem digital yang memiliki memori, yang diimplementasikan sebagai <em>Finite State Machine (FSM)</em> untuk aplikasi kontrol sekuensial seperti lampu lalu lintas.
            </p>
            <p className="mt-4">
              Penelitian oleh <strong>Younes & Boufaida (2015)</strong> menyoroti keterbatasan sistem <em>fixed-time</em> konvensional yang tidak responsif terhadap fluktuasi trafik nyata. Mereka mengusulkan sistem adaptif yang menggunakan sensor jaringan nirkabel dan logika fuzzy. Simulasi TrafficSim ini mengadopsi pendekatan serupa secara visual, di mana algoritma "Mode Cerdas" bertindak sebagai agen adaptif yang memantau variabel kepadatan antrian (<em>demand</em>) untuk memodulasi durasi siklus hijau secara dinamis.
            </p>
             <p className="mt-4">
              Konsep dasar ini juga didukung oleh teori kontrol klasik yang dijelaskan oleh <strong>De Césaré & D'Andréa-Novel (1995)</strong>, yang menekankan pentingnya pemodelan koridor lalu lintas untuk optimalisasi arus kendaraan.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-cyan-400">3. Konsep Dasar: Flip-Flop sebagai Memori 1-Bit</h3>
            <p>
              Jantung dari setiap sistem sekuensial adalah kemampuan untuk "mengingat" informasi dari masa lalu. Di dunia digital, elemen memori terkecil adalah <strong>flip-flop</strong>, sebuah sirkuit yang dapat menyimpan satu bit informasi (nilai 0 atau 1). Ia akan mempertahankan nilainya sampai dipicu oleh sinyal jam (clock signal) untuk beralih ke keadaan baru.
            </p>
            <p>
              Dalam konteks simulasi ini, kita dapat membayangkan setiap fase lampu (misalnya, "Utara-Selatan Hijau") direpresentasikan oleh serangkaian nilai bit yang disimpan dalam beberapa flip-flop.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-cyan-400">4. Membangun Finite State Machine (FSM)</h3>
            <p>
              Dengan merangkai beberapa flip-flop, kita dapat membangun sebuah <strong>Finite State Machine (FSM)</strong>. FSM adalah model matematika yang memiliki jumlah keadaan (state) yang terbatas dan aturan transisi yang jelas antar keadaan tersebut. Siklus lampu lalu lintas adalah contoh FSM yang sempurna:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>State 1:</strong> NS Hijau, EW Merah</li>
              <li><strong>State 2:</strong> NS Kuning, EW Merah</li>
              <li><strong>State 3:</strong> Semua Merah (transisi)</li>
              <li><strong>State 4:</strong> NS Merah, EW Hijau</li>
              <li><strong>State 5:</strong> NS Merah, EW Kuning</li>
              <li><strong>State 6:</strong> Semua Merah (transisi kembali ke State 1)</li>
            </ul>
            <p>
              Dalam sirkuit fisik, sinyal jam akan memicu transisi dari satu state ke state berikutnya. Dalam simulasi perangkat lunak kita, fungsi `setTimeout` bertindak sebagai sinyal jam tersebut.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-cyan-400">5. Implementasi dalam Kode: Abstraksi Perangkat Keras</h3>
            <p>
              Meskipun kita tidak mensimulasikan gerbang logika secara individual, array `BASE_SEQUENCE` di komponen `Simulation.tsx` adalah representasi perangkat lunak dari FSM kita:
            </p>
            <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
              <code>
{`const BASE_SEQUENCE = [
  { ns: LightState.GREEN, ew: LightState.RED, duration: 5000 },
  { ns: LightState.YELLOW, ew: LightState.RED, duration: 2000 },
  // ... state lainnya
];`}
              </code>
            </pre>
            <p>
              Setiap objek dalam array ini adalah sebuah <strong>state</strong>. Properti `ns` dan `ew` adalah <strong>output</strong> dari FSM pada state tersebut (lampu mana yang menyala), dan `duration` adalah waktu tunggu sebelum sinyal jam berikutnya "berdetak". Variabel `currentIndex` dalam state React berfungsi sebagai register yang menyimpan state saat ini, persis seperti fungsi flip-flop.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-cyan-400">6. Evolusi: Dari Flip-Flop Statis ke AI Adaptif</h3>
            <p>
             Sistem FSM berbasis flip-flop murni bersifat <strong>statis dan deterministik</strong>. Durasinya tetap, tidak peduli apakah jalanan ramai atau sepi. Inilah batasan utama dari "Mode Klasik".
            </p>
            <p>
              "Mode Cerdas" dalam simulasi ini memperkenalkan lapisan abstraksi di atas FSM dasar. Ia menambahkan "input" eksternal (jumlah mobil yang disimulasikan) yang tidak ada dalam logika flip-flop sederhana. Sebuah algoritma kemudian secara dinamis mengubah parameter FSM (yaitu `duration`) sebagai respons terhadap input tersebut. Ini mencerminkan bagaimana sistem modern menggunakan mikrokontroler atau AI untuk mengoptimalkan alur, sementara logika sekuensial dasarnya masih tetap menjadi fondasi.
            </p>
          </div>
          
           <div>
            <h3 className="text-2xl font-bold text-cyan-400">7. Kesimpulan</h3>
            <p>
             Simulasi ini secara efektif menjembatani kesenjangan antara konsep fundamental elektronika digital dengan aplikasi praktis di dunia nyata. Ini menunjukkan bagaimana prinsip-prinsip sederhana seperti flip-flop dapat diskalakan, diabstraksikan, dan ditingkatkan dengan logika modern untuk menciptakan sistem yang tidak hanya berfungsi, tetapi juga cerdas dan efisien.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journal;