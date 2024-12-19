import React, { useState } from "react";
import { toast } from 'react-toastify';

const ReportButton = ({ reportText, type, id }) => {
  const [reportStatus, setReportStatus] = useState(null);

  const reportContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:8080/api/perspective/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text: reportText, id: id, type: type }),
      });

      if (response.ok) {
        toast.success('Report submitted successfully!!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error('Failed to submit report', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setReportStatus("An error occurred while submitting the report.");
    }
  };

  return (
    <div>
      <button className="mx-4 py-2 text-black bg-white  border-white hover:bg-white" onClick={reportContent}>Report</button>
    </div>
  );
};

export default ReportButton;