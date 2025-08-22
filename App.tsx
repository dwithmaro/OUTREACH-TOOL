
import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './components/Icon';

const App: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>('');
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleGenerate = useCallback(() => {
    if (companyName.trim()) {
      const message = `helloooo ${companyName.trim()} available for quicky chat?`;
      setGeneratedMessage(message);
      setIsCopied(false); // Reset copied state when new message is generated
    }
  }, [companyName]);

  const handleCopyToClipboard = useCallback(() => {
    if (generatedMessage) {
      navigator.clipboard.writeText(generatedMessage).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  }, [generatedMessage]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl shadow-2xl p-8 space-y-8 border border-slate-700">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-indigo-400">Cold DM Personalizer</h1>
          <p className="text-slate-400 mt-2">Instantly create and copy your personalized outreach message.</p>
        </header>

        <main className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="companyName" className="text-sm font-medium text-slate-300">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleGenerate(); }}
              placeholder="e.g., Google, Apple, Microsoft"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!companyName.trim()}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
          >
            Generate Message
          </button>

          {generatedMessage && (
            <div className="bg-slate-900/50 p-6 rounded-lg space-y-4 animate-fade-in border border-slate-700">
              <h2 className="text-lg font-semibold text-slate-300">Your Message:</h2>
              <div className="relative bg-slate-700 p-4 rounded-md">
                <p className="text-lg text-indigo-300 font-mono pr-12 break-words">
                  {generatedMessage}
                </p>
                <button
                  onClick={handleCopyToClipboard}
                  className="absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-full bg-slate-600 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-700 focus:ring-indigo-500 transition-colors duration-300"
                  aria-label="Copy to clipboard"
                >
                  {isCopied ? (
                    <CheckIcon className="w-5 h-5 text-green-400" />
                  ) : (
                    <CopyIcon className="w-5 h-5 text-slate-300" />
                  )}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
