import React, { useState } from "react";

const ReportButton = ({ reportText, type, id }) => {
  const [reportStatus, setReportStatus] = useState(null);

  const reportContent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/perspective/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: reportText, id: id, type: type }),
        }
      );

      if (response.ok) {
        setReportStatus("Report submitted successfully!");
      } else {
        setReportStatus("Failed to submit report.");
      }
    } catch (error) {
      console.error("Error:", error);
      setReportStatus("An error occurred while submitting the report.");
    }
  };

  return (
    <div className="bg-white text-black">
      <button
        onClick={reportContent}
        className="bg-white text-black px-4 py-2 border border-white rounded hover:text-blue"
      >
        Report
      </button>
      {reportStatus && (
        <p className="mt-2 text-sm font-medium">{reportStatus}</p>
      )}
    </div>
  );
};

export default ReportButton;
