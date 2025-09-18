import React, { useState, useRef } from 'react';
import Modal from './Modal';

const Contact: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
        formRef.current?.reset();
    };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-brand-green mb-2">Thank You!</h1>
            <p className="text-gray-700 mb-6">Your message has been sent. Our team will get back to you within 24 hours.</p>
            <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-brand-green hover:bg-brand-light-green text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors"
            >
                Close
            </button>
        </div>
      </Modal>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-green">Contact Us</h1>
          <p className="mt-2 text-lg text-gray-600">Have questions or need support? We're here to help.</p>
        </div>
        
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact-name">
              Full Name
            </label>
            <input className="bg-gray-50 shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-light-green" id="contact-name" type="text" placeholder="John Farmer" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact-email">
              Email Address
            </label>
            <input className="bg-gray-50 shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-light-green" id="contact-email" type="email" placeholder="farmer@example.com" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea className="bg-gray-50 shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-light-green h-32" id="message" placeholder="How can we help you today?" required />
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-brand-green hover:bg-brand-light-green text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline w-full sm:w-auto transition-transform transform hover:scale-105" type="submit">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;