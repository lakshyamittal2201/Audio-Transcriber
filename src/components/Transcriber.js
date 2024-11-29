import { useState } from 'react';
import Microphone from './Microphone'; // Assuming you already have this component

// Transcriber component: handles the audio recording, transcription, and history saving
const Transcriber = () => {
    // State to store the current transcription text
    const [transcription, setTranscription] = useState('');
    
    // State to store past transcriptions in history
    const [history, setHistory] = useState([]); // To store past transcriptions
    
    // State to handle errors during the transcription process
    const [error, setError] = useState(null);

    // Function to handle audio data received from the microphone component
    const handleAudioData = (audioBlob) => {
        // Establishing a WebSocket connection to Deepgram's transcription service
        const ws = new WebSocket('wss://api.deepgram.com/v1/listen', [
            'token',
            'aef36004ad8dcdfe1f4d5382c40b4e89eb539cf8', // Replace this with your Deepgram API token
        ]);

        // On WebSocket connection open, send the audio data to Deepgram
        ws.onopen = () => {
            ws.send(audioBlob);
        };

        // On receiving a message (transcription result) from Deepgram
        ws.onmessage = (message) => {
            try {
                // Parse the received message
                const data = JSON.parse(message.data);
                
                // Extract the transcription from the message, with fallback to empty string
                const transcript = data.channel?.alternatives?.[0]?.transcript || '';

                // If a valid transcript is found, update the transcription state
                if (transcript) {
                    setTranscription((prev) => `${prev} ${transcript}`);
                }
            } catch (err) {
                // Error handling for parsing issues
                console.error('Error parsing transcription:', err);
                setError('An error occurred while processing the transcription.');
            }
        };

        // Error handling for WebSocket connection issues
        ws.onerror = (err) => {
            console.error('WebSocket error:', err);
            setError('An error occurred while connecting to the transcription service.');
        };

        // Handle WebSocket closure
        ws.onclose = () => {
            console.log('WebSocket closed');
        };
    };

    // Function to save the current transcription to the history
    const saveTranscription = () => {
        if (transcription.trim()) {
            // Save the transcription to history and reset the transcription state
            setHistory((prev) => [...prev, transcription.trim()]);
            setTranscription(''); // Clear current transcription
        }
    };

    return (
        <div className="p-4">
            {/* Header */}
            <h1 className="text-2xl font-bold mb-4">Audio Transcriber</h1>

            {/* Microphone Component for starting and stopping the recording */}
            <Microphone onAudioData={handleAudioData} />

            {/* Transcription Output */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Current Transcription:</h2>
                <p className="border p-2 mt-2 rounded bg-gray-100">
                    {/* Display the transcription or a placeholder message */}
                    {transcription || 'No transcription yet.'}
                </p>

                {/* Save button to store the current transcription */}
                <button
                    onClick={saveTranscription}
                    disabled={!transcription.trim()} // Disable if there is no transcription text
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
                >
                    Save Transcription
                </button>
            </div>

            {/* History Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Past Transcriptions:</h2>
                {history.length > 0 ? (
                    // Display past transcriptions in a list if any exist
                    <ul className="list-disc pl-5 mt-2">
                        {history.map((item, index) => (
                            <li key={index} className="mb-2 bg-gray-100 p-2 rounded">
                                {item}
                            </li>
                        ))}
                    </ul>
                ) : (
                    // If no past transcriptions, show a message
                    <p className="text-gray-500">No past transcriptions saved.</p>
                )}
            </div>

            {/* Error Handling */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default Transcriber;
