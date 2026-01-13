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
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Buku Teks & Jurnal</h3>
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
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Sumber Pendukung</h3>
            <div className="space-y-4 font-serif">
              <ReferenceItem href="https://www.allaboutcircuits.com/textbook/digital/chpt-10/sequential-circuits/">
                <span className="block font-semibold">[5] All About Circuits,</span>
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