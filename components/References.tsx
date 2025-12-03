
import React from 'react';

const ReferenceItem: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group block bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 relative cursor-pointer"
  >
    <blockquote className="text-gray-300 italic">
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
          <h2 className="text-4xl font-bold text-cyan-400">Referensi & Daftar Pustaka</h2>
          <p className="text-gray-400 mt-2">Sumber bacaan lebih lanjut untuk eksplorasi konsep.</p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Buku Teks</h3>
            <div className="space-y-4">
              <ReferenceItem href="https://www.google.co.id/books/edition/Digital_Fundamentals/lNo3vgAACAAJ">
                Floyd, T. L. (2014). <span className="text-cyan-400 not-italic">Digital Fundamentals (11th ed.)</span>. Pearson.
                <p className="text-sm text-gray-400 mt-2 not-italic">Sebuah buku teks komprehensif yang mencakup semua aspek dasar sirkuit digital, termasuk gerbang logika, flip-flop, dan state machines.</p>
              </ReferenceItem>
              <ReferenceItem href="https://www.google.co.id/books/edition/Digital_Design/P1exDwAAQBAJ">
                Mano, M. M., & Ciletti, M. D. (2018). <span className="text-cyan-400 not-italic">Digital Design: With an Introduction to the Verilog HDL, VHDL, and SystemVerilog (6th ed.)</span>. Pearson.
                 <p className="text-sm text-gray-400 mt-2 not-italic">Referensi klasik yang mendalam tentang desain sirkuit logika kombinasional dan sekuensial.</p>
              </ReferenceItem>
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Jurnal Ilmiah</h3>
             <div className="space-y-4">
              <ReferenceItem href="https://ieeexplore.ieee.org/document/411397">
                De Césaré, J., & D'Andréa-Novel, B. (1995). <span className="text-cyan-400 not-italic">Modeling and control of a traffic corridor.</span> IEEE Transactions on Automatic Control, 40(9), 1599-1604.
                 <p className="text-sm text-gray-400 mt-2 not-italic">Contoh penerapan teori kontrol pada sistem lalu lintas, menunjukkan evolusi dari model sederhana ke sistem yang lebih kompleks.</p>
              </ReferenceItem>
               <ReferenceItem href="https://link.springer.com/article/10.1007/s12652-013-0210-9">
                Younes, M. B., & Boufaida, Z. (2015). <span className="text-cyan-400 not-italic">An adaptive traffic light control system using wireless sensor networks and fuzzy logic.</span> Journal of Ambient Intelligence and Humanized Computing, 6(1), 115-125.
                 <p className="text-sm text-gray-400 mt-2 not-italic">Artikel yang relevan dengan "Mode Cerdas", membahas penggunaan sensor dan logika fuzzy (salah satu bentuk AI) untuk kontrol lalu lintas adaptif.</p>
              </ReferenceItem>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Sumber Online</h3>
            <div className="space-y-4">
              <ReferenceItem href="https://www.allaboutcircuits.com/textbook/digital/chpt-10/sequential-circuits/">
                All About Circuits. (n.d.). <span className="text-cyan-400 not-italic">Sequential Logic Circuits</span>.
                <p className="text-sm text-gray-400 mt-2 not-italic">Serangkaian tutorial online gratis yang sangat baik untuk memahami sirkuit sekuensial, termasuk berbagai jenis flip-flop dan aplikasinya.</p>
              </ReferenceItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;
