import React, { useEffect } from "react";

const OPTION_LETTERS = ["أ", "ب", "ج", "د", "هـ", "و"];

export default function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  isFlagged,
  onSelectOption,
  onToggleFlag,
  onNext,
  onPrev,
  onSubmitClick,
}) {
  const isFirst = questionIndex === 0;
  const isLast = questionIndex === totalQuestions - 1;

  // دعم التنقل واختيار الإجابات عبر لوحة المفاتيح
  useEffect(() => {
    const handleKeyDown = (e) => {
      // تجنب التداخل إذا كان المستخدم يكتب في حقل إدخال
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key >= "1" && e.key <= String(question.options.length)) {
        const optionIdx = parseInt(e.key, 10) - 1;
        onSelectOption(optionIdx);
      } else if (e.key === "ArrowLeft") {
        if (!isLast) onNext();
      } else if (e.key === "ArrowRight") {
        if (!isFirst) onPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [question, questionIndex, isFirst, isLast, onSelectOption, onNext, onPrev]);

  return (
    <div className="question-card">
      {/* رأس بطاقة السؤال */}
      <div className="question-header">
        <div className="question-badge">
          <span>سؤال {questionIndex + 1}</span>
          <span style={{ opacity: 0.7 }}>من {totalQuestions}</span>
        </div>

        <button
          type="button"
          className={`btn-flag-toggle ${isFlagged ? "active" : ""}`}
          onClick={onToggleFlag}
          title="تمييز هذا السؤال للرجوع إليه قبل التسليم"
        >
          <span>{isFlagged ? "★ تم تمييزه للمراجعة" : "☆ تمييز للمراجعة"}</span>
        </button>
      </div>

      {/* نص السؤال */}
      <h2 className="question-text">{question.question}</h2>

      {/* قائمة الاختيارات */}
      <div className="options-list">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const letter = OPTION_LETTERS[idx] || (idx + 1);

          return (
            <div
              key={idx}
              className={`option-card ${isSelected ? "selected" : ""}`}
              onClick={() => onSelectOption(idx)}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
            >
              <div className="option-letter">{letter}</div>
              <div className="option-content">{option}</div>
              <div className="option-radio-dot"></div>
            </div>
          );
        })}
      </div>

      {/* أزرار التنقل السفلية */}
      <div className="question-nav-controls" style={{ marginTop: "2.5rem" }}>
        <button
          type="button"
          className="btn-nav btn-nav-prev"
          onClick={onPrev}
          disabled={isFirst}
        >
          <span>السابق</span>
          <span>→</span>
        </button>

        {isLast ? (
          <button
            type="button"
            className="btn-nav btn-nav-submit"
            onClick={onSubmitClick}
          >
            <span>مراجعة وتسليم الامتحان</span>
            <span>✓</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn-nav btn-nav-next"
            onClick={onNext}
          >
            <span>←</span>
            <span>التالي</span>
          </button>
        )}
      </div>
    </div>
  );
}

