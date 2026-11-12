import React from "react";

export default function ExamHeader({ title, studentName, timeLeftSeconds, onFinishClick }) {
  // Format seconds into MM:SS
  const formatTime = (totalSeconds) => {
    if (totalSeconds === null || totalSeconds === undefined) return "--:--";
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const isWarningTime = timeLeftSeconds !== null && timeLeftSeconds <= 120; // Last 2 minutes

  return (
    <header className="exam-navbar">
      <div className="exam-nav-info">
        <span className="exam-nav-title">{title}</span>
        {studentName && studentName.trim() && (
          <span className="student-tag">الطالب: {studentName}</span>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {timeLeftSeconds !== null && (
          <div className={`timer-widget ${isWarningTime ? "warning" : ""}`}>
            <span>⏳</span>
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>
        )}

        <button
          type="button"
          className="btn-finish-exam"
          onClick={onFinishClick}
          title="إنهاء وتسليم الاختبار"
        >
          <span>تسليم الامتحان</span>
          <span>✓</span>
        </button>
      </div>
    </header>
  );
}

