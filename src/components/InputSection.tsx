import React from 'react';
import { Wand2, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

interface InputSectionProps {
  htmlContent: string;
  setHtmlContent: (content: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  htmlContent,
  setHtmlContent,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          className={cn(
            "w-full min-h-[200px] p-4 bg-slate-800/50 rounded-lg",
            "text-slate-100 font-mono text-sm",
            "border border-slate-700",
            "focus:ring-2 focus:ring-sky-500 focus:border-transparent",
            "transition-all duration-200",
            "placeholder:text-slate-500",
            "resize-y"
          )}
          placeholder="<!-- Paste your HTML here -->"
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={onGenerate}
          disabled={isLoading || !htmlContent.trim()}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-sky-500 text-white",
            "hover:bg-sky-600",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Wand2 className="h-4 w-4" />
          Generate Test Cases
        </button>
        <button
          onClick={() => setHtmlContent('')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-slate-700 text-white",
            "hover:bg-slate-600"
          )}
        >
          <FileText className="h-4 w-4" />
          Clear
        </button>
      </div>
    </div>
  );
};

export default InputSection;