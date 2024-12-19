/* eslint-disable react/prop-types */
import { useState } from "react";

const BlogAudio = ({ blogText }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false); // Trạng thái để kiểm tra quá trình xử lý

  const generateAudio = async () => {
    setIsGenerating(true); // Bắt đầu xử lý
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
    } finally {
      setIsGenerating(false); // Kết thúc xử lý
    }
  };

  return (
    <div className="bg-white text-black p-4">
      {!audioUrl && !isGenerating && ( // Hiển thị nút nếu chưa có audio và không đang xử lý
        <button
          onClick={generateAudio}
          className="bg-white text-black px-4 py-2 border border-white rounded hover:text-blue"
        >
          Convert to Audio
        </button>
      )}
      {isGenerating && ( // Hiển thị thông báo khi đang xử lý
        <p className="text-sm font-medium">Generating audio...</p>
      )}
      {audioUrl && ( // Hiển thị audio player nếu audio đã sẵn sàng
        <audio controls>
          <source src={audioUrl} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default BlogAudio;