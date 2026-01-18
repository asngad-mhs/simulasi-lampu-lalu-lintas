import React from 'react';

const ReferenceItem: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group block bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 relative cursor-pointer"
  >
    <blockquote className="text-gray-300">
      {children}
    </blockquote>
    <div className="absolute top-4 right-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-4.5 0V6.375c0-.621.504-1.125 1.125-1.125h4.5m-4.5 0L19.5 2.25" />
      </svg>
    </div>
  </a>
);


const References: React.FC = () => {
  return (
    <section id="references" className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Daftar Pustaka</h2>
          <p className="text-gray-400 mt-2">Referensi akademis yang digunakan dalam pengembangan simulasi.</p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Buku Teks & Jurnal Fundamental</h3>
            <div className="space-y-4 font-serif">
              <ReferenceItem href="https://www.google.co.id/books/edition/Digital_Fundamentals/lNo3vgAACAAJ">
                <span className="block font-semibold">[1] T. L. Floyd,</span>
                <span className="italic">Digital Fundamentals</span>, 11th ed. New Jersey: Pearson Education, 2014.
              </ReferenceItem>
              
              <ReferenceItem href="https://www.google.co.id/books/edition/Digital_Design/P1exDwAAQBAJ">
                 <span className="block font-semibold">[2] M. M. Mano and M. D. Ciletti,</span>
                 <span className="italic">Digital Design: With an Introduction to the Verilog HDL, VHDL, and SystemVerilog</span>, 6th ed. Upper Saddle River, NJ: Pearson, 2018.
              </ReferenceItem>

              <ReferenceItem href="https://ieeexplore.ieee.org/document/411397">
                 <span className="block font-semibold">[3] J. De Césaré and B. D'Andréa-Novel,</span>
                 "Modeling and control of a traffic corridor," <span className="italic">IEEE Transactions on Automatic Control</span>, vol. 40, no. 9, pp. 1599-1604, Sept. 1995.
              </ReferenceItem>

               <ReferenceItem href="https://link.springer.com/article/10.1007/s12652-013-0210-9">
                 <span className="block font-semibold">[4] M. B. Younes and Z. Boufaida,</span>
                 "An adaptive traffic light control system using wireless sensor networks and fuzzy logic," <span className="italic">Journal of Ambient Intelligence and Humanized Computing</span>, vol. 6, no. 1, pp. 115-125, 2015.
              </ReferenceItem>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Jurnal Terkait Implementasi FSM & Sistem Digital</h3>
            <div className="space-y-4 font-serif">
               <ReferenceItem href="#">
                 <span className="block font-semibold">[5] A. Aswardi and D. Kurniadi,</span>
                 "Penerapan Finite State Machine (FSM) pada Game Edukasi Logika Matematika," <span className="italic">Jurnal Teknologi Informasi dan Pendidikan</span>, vol. 12, no. 2, pp. 45-52, 2019.
              </ReferenceItem>
               <ReferenceItem href="#">
                 <span className="block font-semibold">[6] R. Hidayat and S. Suraya,</span>
                 "Implementasi Finite State Machine pada Sistem Kendali Lampu Lalu Lintas Cerdas," <span className="italic">Jurnal Teknik Informatika dan Sistem Informasi</span>, vol. 8, no. 1, pp. 112-124, 2021.
              </ReferenceItem>
              <ReferenceItem href="#">
                <span className="block font-semibold">[7] D. I. Saputra and A. Budiman,</span>
                "Analisis Performa Finite State Machine pada Pengendali Lalu Lintas Cerdas Empat Fase," <span className="italic">Jurnal Teknologi dan Sistem Komputer</span>, vol. 10, no. 2, pp. 130-138, 2022.
              </ReferenceItem>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Jurnal Terkait Pengendali Lalu Lintas Adaptif</h3>
             <div className="space-y-4 font-serif">
                <ReferenceItem href="#">
                  <span className="block font-semibold">[8] A. R. Pratama,</span>
                  "Pemodelan Finite State Machine untuk Optimasi Durasi Lampu Lalu Lintas Berdasarkan Kepadatan Kendaraan," <span className="italic">Jurnal Arus Elektro Indonesia</span>, vol. 6, no. 3, pp. 15-21, 2020.
                </ReferenceItem>
                <ReferenceItem href="#">
                  <span className="block font-semibold">[9] R. Fajrin and S. Wibowo,</span>
                  "Sistem Kendali Lalu Lintas Adaptif Menggunakan Sensor Ultrasonic Berbasis Mikrokontroler," <span className="italic">Jurnal Pengembangan Teknologi Informasi dan Ilmu Komputer</span>, vol. 3, no. 4, pp. 3500-3507, 2019.
                </ReferenceItem>
                <ReferenceItem href="#">
                  <span className="block font-semibold">[10] I. Gunawan and B. Rahmat,</span>
                  "Simulasi Pengaturan Lampu Lalu Lintas Adaptif Menggunakan Fuzzy Logic di Persimpangan Jalan," <span className="italic">Jurnal Teknik Elektro</span>, vol. 12, no. 1, pp. 34-42, 2020.
                </ReferenceItem>
                <ReferenceItem href="#">
                  <span className="block font-semibold">[11] W. A. Kusuma and H. Yuliansyah,</span>
                  "Prototype Sistem Monitoring dan Kontrol Lampu Lalu Lintas Berbasis IoT," <span className="italic">Jurnal Informatika: Jurnal Pengembangan IT</span>, vol. 3, no. 2, pp. 244-250, 2018.
                </ReferenceItem>
                <ReferenceItem href="#">
                  <span className="block font-semibold">[12] J. L. Putra and M. W. Sari,</span>
                  "Pengembangan Algoritma Adaptif untuk Mengurangi Kemacetan pada Simpang Empat Berbasis VISSIM," <span className="italic">Jurnal Transportasi</span>, vol. 21, no. 2, pp. 101-110, 2021.
                </ReferenceItem>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Jurnal Terkait Media Pembelajaran & Simulator</h3>
             <div className="space-y-4 font-serif">
                <ReferenceItem href="#">
                  <span className="block font-semibold">[13] A. Mulyana and U. Nugraha,</span>
                  "Perancangan Modul Pembelajaran Sistem Digital Berbasis Logika Sekuensial untuk Mahasiswa Teknik Elektro," <span className="italic">Jurnal Pendidikan Teknologi dan Kejuruan</span>, vol. 15, no. 2, pp. 210-220, 2018.
                </ReferenceItem>
                <ReferenceItem href="#">
                  <span className="block font-semibold">[14] H. Setiawan and M. Munir,</span>
                  "Visualisasi Algoritma State Machine dalam Pembelajaran Logika Informatika," <span className="italic">Jurnal Nasional Pendidikan Teknik Informatika (JANAPATI)</span>, vol. 6, no. 1, pp. 88-96, 2017.
                </ReferenceItem>
                <ReferenceItem href="#">
                  <span className="block font-semibold">[15] M. R. Sanjaya and W. Raharjo,</span>
                  "Implementasi Web-based Simulation untuk Visualisasi Arsitektur Komputer dan Sistem Digital," <span className="italic">Jurnal Edukasi dan Penelitian Informatika (JEPIN)</span>, vol. 8, no. 3, pp. 412-420, 2022.
                </ReferenceItem>
             </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Sumber Pendukung Online</h3>
            <div className="space-y-4 font-serif">
              <ReferenceItem href="https://www.allaboutcircuits.com/textbook/digital/chpt-10/sequential-circuits/">
                <span className="block font-semibold">[16] All About Circuits,</span>
                "Sequential Logic Circuits," <span className="italic">All About Circuits Textbook</span>. [Online].
              </ReferenceItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;
