import React from 'react';
import { ClipboardCheck } from 'lucide-react';

const Welcome: React.FC = () => (
  <div className="text-center p-6 sm:p-10 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700">
    <ClipboardCheck className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-slate-500" />
    <h2 className="mt-4 text-xl sm:text-2xl font-bold text-slate-200">Ready to Generate Your Test Plan?</h2>
    <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-prose mx-auto">
      Paste your webpage's HTML source code in the box above and click "Generate Test Cases" to get started.
    </p>
  </div>
);

export default Welcome;