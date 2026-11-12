import React from "react";

export default function ExamSummaryModal({
  isOpen,
  totalQuestions,
  answeredCount,
  onConfirmSubmit,
  onCancel,
}) {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">📑</div>
        <h3 className="modal-title">تأكيد تسليم الامتحان</h3>
        <p style={{ color: "var(--exam-text-muted)", fontSize: "0.95rem" }}>
          هل أنت متأكد من رغبتك في إنهاء الامتحان واعتماد النتيجة النهائية؟
        </p>

        <div className="modal-stats">
          <div className="modal-stat-box">
            <span className="modal-stat-num answered">{answeredCount}</span>
            <span className="modal-stat-label">أسئلة تمت الإجابة عليها</span>
          </div>

          <div className="modal-stat-box">
            <span className="modal-stat-num unanswered">{unansweredCount}</span>
            <span className="modal-stat-label">أسئلة متبقية دون إجابة</span>
          </div>
        </div>

        {unansweredCount > 0 && (
          <div className="modal-warning">
            ⚠️ تنبيه: لديك {unansweredCount} {unansweredCount === 1 ? "سؤال لم تجب عليه" : "أسئلة لم تجب عليها"}، سيتم احتسابها خاطئة عند التسليم!
          </div>
        )}

        <div className="modal-actions">
          <button
            type="button"
            className="modal-btn modal-btn-confirm"
            onClick={onConfirmSubmit}
          >
            نعم، تسليم الامتحان الآن
          </button>
          <button
            type="button"
            className="modal-btn modal-btn-cancel"
            onClick={onCancel}
          >
            متابعة الحل والمراجعة
          </button>
        </div>
      </div>
    </div>
  );
}

