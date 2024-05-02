import React, { useState, useEffect, useMemo } from 'react';


export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div style={{ width: '90%', maxWidth: '600px', textAlign: 'center', margin: 'auto', marginTop: '50px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', color: '#123456' }}>Sentiment Analysis</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          style={{ 
            width: '100%', 
            height: '100px', 
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
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#45a049";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#4CAF50";
          }}
        >
          Analyze
        </button>
      </form>
      {result && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          backgroundColor: '#f8f8f8', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          borderRadius: '10px', 
          border: '1px solid #ddd'
        }}>
          <p style={{ fontSize: '16px', color: '#333' }}>{result}</p>
        </div>
      )}
    </div>
  );
}