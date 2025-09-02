
import React from 'react';
import type { UseCase } from '../types';
import UseCaseCard from './UseCaseCard';

interface ResultsDisplayProps {
  useCases: UseCase[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ useCases }) => {
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-cyan-400 border-b border-slate-700 pb-2">
        Generated Test Plan
      </h2>
      {useCases.map((useCase, index) => (
        <UseCaseCard key={useCase.id || index} useCase={useCase} />
      ))}
    </div>
  );
};

export default ResultsDisplay;
