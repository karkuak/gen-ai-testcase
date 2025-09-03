import React, { useState, useEffect } from 'react';
import type { UseCase } from './types';
import { generateTestCasesFromHtml } from './services/geminiService';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Welcome from './components/Welcome';
import ErrorDisplay from './components/ErrorDisplay';
import { cn } from './lib/utils';

const loadingMessages = [
  "Analyzing HTML structure...",
  "Identifying user journeys...",
  "Brewing up some test cases...",
  "Considering edge cases...",
  "Finalizing test plan...",
];

function App() {
  const [htmlContent, setHtmlContent] = useState('');
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    let interval: number;
    if (isLoading) {
      interval = window.setInterval(() => {
        setCurrentLoadingMessage(prevMessage => {
          const currentIndex = loadingMessages.indexOf(prevMessage);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 2000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLoading]);


  const handleGenerate = async () => {
    if (!htmlContent.trim()) {
      setError("Please paste some HTML content before generating.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setUseCases([]);
    setCurrentLoadingMessage(loadingMessages[0]);

    try {
      const result = await generateTestCasesFromHtml(htmlContent);
      setUseCases(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-5xl">
        <div className="space-y-8">
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
            <InputSection
              htmlContent={htmlContent}
              setHtmlContent={setHtmlContent}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          
          <div className={cn(
            "transition-all duration-300 ease-in-out",
            "rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6",
            isLoading && "animate-pulse"
          )}>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <LoadingSpinner />
                <p className="text-slate-400 animate-pulse font-medium">
                  {currentLoadingMessage}
                </p>
              </div>
            ) : error ? (
              <ErrorDisplay message={error} />
            ) : useCases.length > 0 ? (
              <ResultsDisplay useCases={useCases} />
            ) : (
              <Welcome />
            )}
          </div>
        </div>
      </main>
      <footer className="container mx-auto px-4 py-8 mt-auto text-center text-sm text-slate-500">
        <p>Built with modern web technologies • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;