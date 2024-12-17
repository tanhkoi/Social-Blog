import React, { useState } from "react";

const BlogAudio = ({ blogText }) => {
    const [audioUrl, setAudioUrl] = useState(null);

    const generateAudio = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/audio/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: blogText }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
            } else {
                console.error("Error generating audio");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <button onClick={generateAudio}>Convert to Audio</button>
            {audioUrl && (
                <audio controls>
                    <source src={audioUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default BlogAudio;
