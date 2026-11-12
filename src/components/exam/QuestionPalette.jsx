import React from "react";

export default function QuestionPalette({
  totalQuestions,
  currentIndex,
  answers,
  flaggedQuestions,
  onSelectQuestion,
}) {
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <>
      {/* شريط نسبة التقدم */}
      <div className="exam-progress-bar-container">
        <div className="progress-labels">
          <span className="progress-question-counter">
            السؤال {currentIndex + 1} من {totalQuestions}
          </span>
          <span className="progress-percentage">
            تمت الإجابة على {answeredCount} من {totalQuestions} ({progressPercent}%)
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* لوحة أرقام الأسئلة والتنقل المباشر */}
      <div className="palette-container">
        <div className="palette-header">
          <span className="palette-title">التنقل السريع بين الأسئلة</span>
          <div className="palette-legend">
            <div className="legend-item">
              <span className="legend-dot answered"></span>
              <span>تمت الإجابة</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot flagged"></span>
              <span>مراجعة</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot current"></span>
              <span>الحالي</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot unanswered"></span>
              <span>غير مجاب</span>
            </div>
          </div>
        </div>

        <div className="palette-grid">
          {Array.from({ length: totalQuestions }, (_, index) => {
            const isCurrent = index === currentIndex;
            const isAnswered = answers[index] !== undefined;
            const isFlagged = flaggedQuestions[index] === true;

            let pillClass = "palette-pill";
            if (isCurrent) pillClass += " current";
            if (isAnswered) pillClass += " answered";
            if (isFlagged) pillClass += " flagged";

            return (
              <button
                key={index}
                type="button"
                className={pillClass}
                onClick={() => onSelectQuestion(index)}
                title={`الانتقال إلى السؤال ${index + 1}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

