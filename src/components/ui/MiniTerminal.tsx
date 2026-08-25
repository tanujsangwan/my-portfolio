import React, { useState, useRef, useEffect } from 'react';

interface HistoryItem {
  type: 'input' | 'output';
  content: string;
}

const MiniTerminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', content: 'TanujOS v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';

    switch (trimmedCmd) {
      case 'help':
        output = 'Available commands:\n  whoami    - Display basic info\n  skills    - List top skills\n  projects  - List projects\n  contact   - Show contact email\n  clear     - Clear terminal screen\n  sudo      - ???';
        break;
      case 'whoami':
        output = 'Tanuj Sangwan | B.Tech CSE @ VIT-AP | CGPA: 8.97';
        break;
      case 'skills':
        output = 'Python, Java, React, FastAPI, Machine Learning, Data Structures';
        break;
      case 'projects':
        output = '1. Interactive Personal Portfolio (React, Framer Motion)';
        break;
      case 'contact':
        output = 'Email: tanujsangwan1770@gmail.com';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'sudo':
        output = 'Nice try. Permission denied. 🚨';
        break;
      case '':
        output = '';
        break;
      default:
        output = `bash: ${trimmedCmd}: command not found`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', content: cmd },
      ...(output ? [{ type: 'output', content: output } as HistoryItem] : [])
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="w-full bg-[#0f172a] rounded-xl overflow-hidden shadow-2xl border border-slate-700 font-mono text-sm">
      {/* Title bar */}
      <div className="bg-slate-800 px-4 py-2 flex items-center border-b border-slate-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-slate-400 text-xs font-semibold">tanuj@portfolio:~</div>
      </div>

      {/* Terminal content area */}
      <div 
        className="p-4 h-48 overflow-y-auto cursor-text text-slate-300" 
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, index) => (
          <div key={index} className="mb-1 whitespace-pre-wrap">
            {item.type === 'input' ? (
              <div>
                <span className="text-green-400">tanuj@portfolio:~$</span> <span className="text-white">{item.content}</span>
              </div>
            ) : (
              <div className="text-slate-300">{item.content}</div>
            )}
          </div>
        ))}
        
        {/* Input line */}
        <div className="flex">
          <span className="text-green-400 mr-2">tanuj@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white border-none focus:ring-0 p-0"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default MiniTerminal;
