
import React from 'react';

const Welcome: React.FC = () => (
  <div className="text-center p-10 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700">
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 8h.01M12 12h.01M15 12h.01M9 12h.01M12 15h.01M15 15h.01" />
    </svg>
    <h2 className="mt-4 text-2xl font-bold text-slate-200">Ready to Generate Your Test Plan?</h2>
    <p className="mt-2 text-slate-400">
      Paste your webpage's HTML source code in the box above and click "Generate Test Cases" to get started.
    </p>
  </div>
);

export default Welcome;
