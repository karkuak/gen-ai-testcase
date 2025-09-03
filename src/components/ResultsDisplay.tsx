import React from 'react';
import { Copy } from 'lucide-react';
import type { UseCase } from '../types';

interface ResultsDisplayProps {
  useCases: UseCase[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ useCases }) => {
  return (
    <div className="space-y-6">
      {useCases.map((useCase, index) => (
        <div key={index} className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Test Case {index + 1}</h3>
            <button
              onClick={() => navigator.clipboard.writeText(JSON.stringify(useCase, null, 2))}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
          </div>
          <pre className="overflow-x-auto p-4 bg-slate-900 rounded-md">
            <code>{JSON.stringify(useCase, null, 2)}</code>
          </pre>
        </div>
      ))}
    </div>
  );
};

export default ResultsDisplay;