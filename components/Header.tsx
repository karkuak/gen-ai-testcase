
import React from 'react';

const Header: React.FC = () => (
  <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700">
    <div className="container mx-auto p-4 flex items-center justify-center">
      <div className="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">
          Webpage Test Case Generator
        </h1>
      </div>
    </div>
  </header>
);

export default Header;
