import React, { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null); // Store the result as an object or array
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
      const response = await fetch(
        "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: text })
        }
      );
      const data = await response.json();

      // Assuming the structure is as described before
      if (data && Array.isArray(data) && data.length > 0 && Array.isArray(data[0]) && data[0].length > 0) {
        const sortedData = data[0].sort((a, b) => b.score - a.score);
        const mainSentiment = sortedData[0];
        const subSentiment = sortedData.slice(1);
        setResult({
          main: `Main Sentiment: ${mainSentiment.label} with confidence ${mainSentiment.score.toFixed(2)}`,
          details: subSentiment.map(item => `${item.label} confidence: ${item.score.toFixed(2)}`)
        });
      } else {
        setResult({ error: 'No sentiment data returned or data format is incorrect. Please try again with different text.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'Failed to analyze sentiment due to an error.' });
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
            width: '100%', 
            height: '150px', 
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
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {isLoading ? (
        <p style={{ marginTop: '20px' }}>{loadingMessage}</p>
      ) : result && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f8ff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px', border: '1px solid #ccc' }}>
          {result.error ? (
            <p style={{ color: 'red' }}>{result.error}</p>
          ) : (
            <>
              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{result.main}</p>
              {result.details.map((detail, index) => (
                <p key={index}>{detail}</p>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
