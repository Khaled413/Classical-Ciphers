import React, { useState, useEffect } from 'react';
import { Lock, Unlock, RefreshCw, Shield, Key, FileKey, Moon, Sun, Github, Facebook, Mail, Dna } from 'lucide-react';
import { CipherUtils } from './utils/ciphers';

type CipherType = 'caesar' | 'vigenere' | 'playfair';

function App() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [cipherType, setCipherType] = useState<CipherType>('caesar');
  const [result, setResult] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * window.innerWidth}px`;
      sparkle.style.top = `${Math.random() * window.innerHeight}px`;
      document.body.appendChild(sparkle);

      sparkle.style.animation = 'sparkle 1.5s ease-in-out forwards';
      setTimeout(() => sparkle.remove(), 1500);
    };

    const interval = setInterval(createSparkle, 300);
    return () => clearInterval(interval);
  }, []);

  const handleEncryptDecrypt = () => {
    let encrypted = '';
    
    switch (cipherType) {
      case 'caesar':
        const shift = parseInt(key) || 0;
        encrypted = CipherUtils.caesarCipher(text, shift, !isEncrypting);
        break;
      case 'vigenere':
        encrypted = CipherUtils.vigenereCipher(text, key, !isEncrypting);
        break;
      case 'playfair':
        if (isEncrypting) {
          encrypted = CipherUtils.playfairCipher(text, key);
        } else {
          encrypted = 'Playfair decryption not implemented';
        }
        break;
    }
    
    setResult(encrypted);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="dna-helix" />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 relative">
          <div className="absolute left-[1150px] top-1/2 -translate-y-1/2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="theme-toggle-new"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
          <h1 className="text-5xl font-bold flex items-center justify-center gap-4">
            <span className="star-decoration">✦</span>
            Classical Ciphers
            <span className="star-decoration">✦</span>
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="glass-card p-8 interactive-hover">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Shield className="w-12 h-12 shield-icon" />
                  <Key className="w-6 h-6 absolute -right-1 -bottom-1 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold">Encryption Tool</h2>
              </div>
              <Dna className="w-8 h-8 dna-icon" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Cipher Type</label>
              <div className="grid grid-cols-3 gap-4">
                {(['caesar', 'vigenere', 'playfair'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setCipherType(type)}
                    className={`
                      px-4 py-3 rounded-lg font-medium capitalize transition-all duration-300
                      relative overflow-hidden group
                      ${cipherType === type
                        ? 'bg-[#0066CC] dark:bg-purple-600 text-white shadow-lg'
                        : 'glass-card hover:bg-[#0066CC]/20 dark:hover:bg-purple-600/20'
                      }
                    `}
                  >
                    <div className="flex items-center justify-center gap-2 relative z-10">
                      <FileKey className={`w-4 h-4 ${cipherType === type ? 'animate-pulse' : ''}`} />
                      {type}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Input Text</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-32 px-4 py-2 rounded-lg glass-card focus:ring-2 focus:ring-[#0066CC] dark:focus:ring-purple-500 focus:ring-opacity-50"
                  placeholder="Enter text to encrypt/decrypt..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {cipherType === 'caesar' ? 'Shift Value' : 'Key'}
                </label>
                <input
                  type={cipherType === 'caesar' ? 'number' : 'text'}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg glass-card focus:ring-2 focus:ring-[#0066CC] dark:focus:ring-purple-500 focus:ring-opacity-50"
                  placeholder={cipherType === 'caesar' ? 'Enter shift value...' : 'Enter key...'}
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsEncrypting(!isEncrypting)}
                  className="glass-card px-4 py-2 rounded-lg hover:bg-[#0066CC]/20 dark:hover:bg-purple-600/20 transition-all duration-300 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Switch to {isEncrypting ? 'Decrypt' : 'Encrypt'}
                </button>
                
                <button
                  onClick={handleEncryptDecrypt}
                  className="flex-1 bg-[#0066CC] dark:bg-purple-600 hover:bg-[#0052a3] dark:hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  {isEncrypting ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Encrypt
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      Decrypt
                    </>
                  )}
                </button>
              </div>

              {result && (
                <div>
                  <label className="block text-sm font-medium mb-2">Result</label>
                  <div className="glass-card p-4 rounded-lg">
                    <p className="font-mono break-all">{result}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Instructions</h3>
            <div className="instructions space-y-2">
              <p>1. Choose a cipher type from the options above (Caesar, Vigenère, or Playfair).</p>
              <p>2. Enter the text you want to encrypt or decrypt in the input field.</p>
              <p>3. For Caesar cipher: Enter a shift value (number).</p>
              <p>4. For Vigenère/Playfair: Enter a key word.</p>
              <p>5. Click the encrypt/decrypt button to see the result.</p>
              <p>Note: Playfair cipher currently only supports encryption.</p>
            </div>
          </div>
        </div>

        <footer className="footer-container">
          <div className="flex items-center gap-4">
            <img
              src={isDarkMode ? "/src/Untitled design2.png" : "/src/Untitled design.png"}
              alt="Logo"
              className="logo-image"
            />
            <span className="brand-name">Khaled Ali</span>
          </div>
          
          <div className="footer-content">
            <p className="text-sm mb-1">© 2025 Khaled Ali. All rights reserved.</p>
            <p className="text-sm">Built with React and Tailwind CSS</p>
          </div>

          <div className="social-links">
            <a href="https://github.com/Khaled413" target="_blank" rel="noopener noreferrer" className="social-link">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100008117198852" target="_blank" rel="noopener noreferrer" className="social-link">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="mailto:ka1739102@gmail.com" className="social-link">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;