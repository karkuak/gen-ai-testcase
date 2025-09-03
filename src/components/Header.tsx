import React from 'react';
import { Sparkles, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/75 backdrop-blur supports-[backdrop-filter]:bg-slate-900/75">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sky-400" />
            <span className="font-semibold text-xl tracking-tight">FooBar Test Case Generator</span>
          </div>
          <nav className="flex items-center gap-4">
            <a
              href="https://github.com/yourusername/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
