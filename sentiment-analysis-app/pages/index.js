import React, { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const loadingMessages = [
    "Peering into your soul...",
    "Calculating feels...",
    "Adjusting sarcasm levels...",
    "Analyzing emotional overflow...",
    "Compiling sentiment binaries...",
    "Decrypting mood swings...",
    "Feeding the hamsters that power this thing...",
    "Applying sentiment filters..."
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setLoadingMessage(randomMessage);
    setIsLoading(true);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(`Sentiment: ${data[0].label} with confidence ${data[0].score.toFixed(2)}`);
    } catch (error) {
      setResult('Failed to analyze sentiment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', textAlign: 'center', margin: 'auto', marginTop: '50px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', color: '#123456' }}>Sentiment Analysis</h1>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          style={{ 
            width: '100%', // Ensures it fills the form
            height: '150px', // Increased height for better visibility
            margin: '10px 0', 
            padding: '15px',
            fontSize: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }} 
        />
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '15px 20px', 
            fontSize: '18px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer'
          }}
        >
          Analyze
        </button>
      </form>
      {isLoading ? (
        <p style={{ marginTop: '20px' }}>{loadingMessage}</p>
      ) : result && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f8ff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px', border: '1px solid #ccc' }}>
          <p style={{ fontSize: '16px', color: '#333' }}>{result}</p>
        </div>
      )}
    </div>
  );
}
