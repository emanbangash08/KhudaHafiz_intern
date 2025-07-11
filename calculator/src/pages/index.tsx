// pages/calculator.tsx
import React, { useState } from 'react';
import Head from 'next/head';

export default function Calculator() {
  const [input, setInput] = useState('');

  const handleClick = (value: string) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-purple-900 to-black flex items-center justify-center">
      <Head>
        <title>Simple Calculator</title>
      </Head>
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-4 text-purple-700">Calculator</h1>
        <input
          type="text"
          value={input}
          readOnly
          className="w-full mb-4 text-right text-2xl p-3 border border-purple-300 rounded-xl bg-gray-50 text-gray-900 focus:outline-none"
        />
        <div className="grid grid-cols-4 gap-4">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(btn)}
              className={`py-4 rounded-xl text-lg font-semibold shadow-md transition text-white ${
                btn === '=' ? 'col-span-4 bg-purple-600 hover:bg-purple-700' :
                btn === 'C' ? 'bg-red-500 hover:bg-red-600' :
                'bg-gray-700 hover:bg-gray-800'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


