
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Semua kolom wajib diisi.');
      setStatus('error');
      return;
    }
    // Simple email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Format email tidak valid.');
        setStatus('error');
        return;
    }

    setError('');
    setStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000); // Reset status after 4 seconds
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Hubungi Kami</h2>
          <p className="text-gray-400 mt-2">Punya pertanyaan atau masukan? Kirimkan pesan kepada kami atau hubungi langsung.</p>
        </div>
        
        <div className="flex justify-center items-center gap-3 mb-8 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span className="text-gray-300">Telepon:</span>
            <a href="tel:089670924182" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
              089670924182
            </a>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-800/50 p-8 rounded-lg border border-gray-700">
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nama</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Pesan</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                ></textarea>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </div>
          </form>
          {status === 'success' && (
            <p className="mt-4 text-center text-green-400">Terima kasih! Pesan Anda telah berhasil dikirim.</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-center text-red-400">{error}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;