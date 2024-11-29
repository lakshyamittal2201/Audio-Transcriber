import { useState, useRef } from 'react';

// Microphone component: handles the start and stop of audio recording.
const Microphone = ({ onAudioData }) => {
    // State to track whether the microphone is currently recording
    const [isRecording, setIsRecording] = useState(false);
    // Reference to hold the MediaRecorder instance for recording audio
    const mediaRecorderRef = useRef(null);

    // Function to start recording when called
    const startRecording = async () => {
        try {
            // Request access to the user's microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Create a new MediaRecorder to capture the audio stream
            mediaRecorderRef.current = new MediaRecorder(stream);

            // When audio data is available, pass it to the parent component using the onAudioData callback
            mediaRecorderRef.current.ondataavailable = (e) => onAudioData(e.data);

            // Start recording the audio
            mediaRecorderRef.current.start();

            // Update the state to indicate that recording is in progress
            setIsRecording(true);
        } catch (err) {
            console.error('Error starting recording:', err);
            // Handle any errors that might occur while requesting media access
        }
    };

    // Function to stop recording when called
    const stopRecording = () => {
        // Stop the MediaRecorder when the recording is finished
        mediaRecorderRef.current.stop();

        // Update the state to indicate that recording has stopped
        setIsRecording(false);
    };

    return (
        <div className="flex flex-col items-center">
            {/* Button to either start or stop the recording based on the current state */}
            <button
                onClick={isRecording ? stopRecording : startRecording} // Toggle start/stop recording
                className={`p-4 rounded-full text-white transition-all ${
                    isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
            >
                {isRecording ? 'Stop Recording' : 'Start Recording'} {/* Display the appropriate button text */}
            </button>

            {/* Show feedback to the user indicating whether recording is in progress */}
            {isRecording ? (
                <p className="mt-4 text-red-500 font-semibold">Recording in progress...</p>
            ) : (
                <p className="mt-4 text-gray-500 font-semibold">Not recording</p>
            )}
        </div>
    );
};

export default Microphone;
