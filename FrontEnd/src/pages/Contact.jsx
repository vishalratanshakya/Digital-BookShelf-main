import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 px-10 py-10">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className="text-zinc-400 mb-6 max-w-2xl">
        Have questions, feedback, or need help with your orders? Reach out to us using the details below.
      </p>
      <div className="space-y-2 text-zinc-300 text-sm">
        <p>Address: Ghaziabad, India</p>
        <p>Phone: <a href="tel:9084410891" className="text-indigo-400 hover:text-indigo-300">9084410891</a></p>
        <p>Email: <a href="mailto:info@digitalbookshelf.com" className="text-indigo-400 hover:text-indigo-300">info@digitalbookshelf.com</a></p>
      </div>
    </div>
  );
};

export default Contact;
