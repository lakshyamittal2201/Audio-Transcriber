// App.js
import React from 'react';
import Transcriber from './components/Transcriber'; // Importing the Transcriber component

// Main App component: it renders the UI for the audio transcriber application
const App = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Main heading for the app */}
      <h1 className="text-3xl font-bold text-center mb-6">Audio Transcriber</h1>

      {/* Only one header should exist */}
      {/* Transcriber component is responsible for handling audio recording and transcription */}
      <Transcriber />
    </div>
  );
};

export default App;
