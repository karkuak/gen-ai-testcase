
import React, { useState } from 'react';
import type { UseCase, TestScenario } from '../types';

interface UseCaseCardProps {
  useCase: UseCase;
}

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const Tag: React.FC<{ type: TestScenario['type'] }> = ({ type }) => {
    const baseClasses = 'px-2 py-0.5 text-xs font-semibold rounded-full';
    const typeClasses = {
        Positive: 'bg-green-500/20 text-green-300',
        Negative: 'bg-red-500/20 text-red-300',
        'Edge Case': 'bg-yellow-500/20 text-yellow-300',
    };
    return <span className={`${baseClasses} ${typeClasses[type]}`}>{type}</span>;
};


const UseCaseCard: React.FC<UseCaseCardProps> = ({ useCase }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-slate-700/50 hover:bg-slate-700 transition-colors"
      >
        <div className="text-left">
            <h3 className="text-lg font-bold text-slate-100">{useCase.id}: {useCase.title}</h3>
            <p className="text-sm text-slate-400 mt-1">{useCase.description}</p>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-slate-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-4 space-y-4">
          {useCase.scenarios.map((scenario) => (
            <div key={scenario.id} className="bg-slate-900/50 p-4 rounded-md border border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-cyan-400 pr-4">{scenario.id}: {scenario.title}</h4>
                <Tag type={scenario.type} />
              </div>
              
              <div className="mt-3">
                <h5 className="text-sm font-semibold text-slate-300 mb-1">Steps:</h5>
                <ol className="list-decimal list-inside text-slate-400 text-sm space-y-1">
                  {scenario.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="mt-3">
                <h5 className="text-sm font-semibold text-slate-300 mb-1">Expected Result:</h5>
                <p className="text-slate-400 text-sm bg-slate-800 p-2 rounded">{scenario.expectedResult}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UseCaseCard;
