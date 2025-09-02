
import React from 'react';

interface InputSectionProps {
  htmlContent: string;
  onHtmlContentChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  htmlContent,
  onHtmlContentChange,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">1. Paste Webpage HTML</h2>
      <p className="text-slate-400 mb-4 text-sm">
        Navigate to the webpage you want to test, right-click, select "View Page Source", and copy the entire HTML content. Paste it into the text area below.
      </p>
      <textarea
        value={htmlContent}
        onChange={(e) => onHtmlContentChange(e.target.value)}
        placeholder="<!DOCTYPE html>..."
        className="w-full h-48 p-3 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow duration-200 text-sm font-mono"
        disabled={isLoading}
      />
      <div className="mt-6 text-center">
        <button
          onClick={onGenerate}
          disabled={isLoading || !htmlContent}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 shadow-lg"
        >
          {isLoading ? 'Generating...' : 'Generate Test Cases'}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
