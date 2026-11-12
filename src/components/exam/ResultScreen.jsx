import React, { useState } from "react";

const OPTION_LETTERS = ["أ", "ب", "ج", "د", "هـ", "و"];

export default function ResultScreen({
  questions,
  answers,
  studentName,
  parentPhone,
  timeSpentSeconds,
  passingPercentage,
  emailStatus,
  emailError,
  onRestartExam,
}) {
  const [filterMode, setFilterMode] = useState("all"); // 'all' | 'wrong' | 'correct'

  // حساب الدرجات والإحصائيات
  const totalQuestions = questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  questions.forEach((q, idx) => {
    const userAnswer = answers[idx];
    if (userAnswer === undefined) {
      unansweredCount++;
    } else if (userAnswer === q.correctAnswer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = scorePercentage >= passingPercentage;

  // تنسيق الوقت المستغرق
  const formatTimeSpent = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    if (mins === 0) return `${remainingSecs} ثانية`;
    return `${mins} دقيقة و ${remainingSecs} ثانية`;
  };

  // تصفية الأسئلة للمراجعة
  const filteredQuestions = questions.map((q, idx) => {
    const userAnswer = answers[idx];
    const isCorrect = userAnswer === q.correctAnswer;
    const isUnanswered = userAnswer === undefined;
    return { ...q, originalIndex: idx, userAnswer, isCorrect, isUnanswered };
  }).filter((item) => {
    if (filterMode === "correct") return item.isCorrect;
    if (filterMode === "wrong") return !item.isCorrect;
    return true;
  });

  return (
    <div className="results-card">
      {/* الرأس والدرجة النهائية */}
      <div className="results-hero">
        <div className={`results-score-badge ${isPassed ? "passed" : "failed"}`}>
          <span className="score-number">{scorePercentage}%</span>
          <span className="score-max">{correctCount} من {totalQuestions}</span>
        </div>

        <h1 className="results-title">
          {isPassed ? "تهانينا! لقد اجتزت الاختبار بنجاح 🎉" : "للأسف، لم تتجاوز درجة النجاح المطلوبة"}
        </h1>

        <p className="results-message">
          {studentName && studentName.trim() ? (
            <span>
              <strong>الطالب:</strong> {studentName}{" "}
              {parentPhone && <span>| <strong>رقم ولي الأمر:</strong> {parentPhone} </span>}
              —{" "}
            </span>
          ) : ""}
          درجة النجاح المقررة هي {passingPercentage}%.
          {isPassed
            ? " أداء رائع، استمر في التميز!"
            : " لا تقلق، يمكنك مراجعة الأخطاء وإعادة المحاولة للتحسن."}
        </p>

        {/* إشعار حالة إرسال البريد الإلكتروني */}
        {emailStatus === "sending" && (
          <div style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            color: "#1e40af",
            padding: "0.85rem 1.25rem",
            borderRadius: "10px",
            marginTop: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "0.95rem",
            fontWeight: "700"
          }}>
            <span>⏳</span>
            <span>جاري إرسال النتيجة إلى البريد الإلكتروني...</span>
          </div>
        )}

        {emailStatus === "success" && (
          <div style={{
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            color: "#065f46",
            padding: "0.85rem 1.25rem",
            borderRadius: "10px",
            marginTop: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "0.95rem",
            fontWeight: "700"
          }}>
            <span>✅</span>
            <span>تم إرسال نتيجة الامتحان بنجاح إلى البريد الإلكتروني!</span>
          </div>
        )}

        {emailStatus === "error" && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            padding: "0.85rem 1.25rem",
            borderRadius: "10px",
            marginTop: "1.25rem",
            textAlign: "right",
            fontSize: "0.9rem",
            fontWeight: "600"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <span>⚠️</span>
              <strong>تنبيه بخصوص إرسال الإيميل:</strong> {emailError}
            </div>
            <div style={{ fontSize: "0.85rem", opacity: 0.85 }}>
              يرجى مراجعة الكونسول (F12) أو التأكد من إعدادات القالب وحساب البريد في لوحة تحكم EmailJS.
            </div>
          </div>
        )}
      </div>

      {/* شبكة الإحصائيات التفصيلية */}
      <div className="results-grid">
        <div className="result-stat-box success">
          <span className="result-stat-value">{correctCount}</span>
          <span className="result-stat-label">إجابات صحيحة</span>
        </div>

        <div className="result-stat-box danger">
          <span className="result-stat-value">{wrongCount}</span>
          <span className="result-stat-label">إجابات خاطئة</span>
        </div>

        <div className="result-stat-box">
          <span className="result-stat-value">{unansweredCount}</span>
          <span className="result-stat-label">لم يتم حلها</span>
        </div>

        <div className="result-stat-box primary">
          <span className="result-stat-value" style={{ fontSize: "1.15rem" }}>
            {formatTimeSpent(timeSpentSeconds)}
          </span>
          <span className="result-stat-label">الوقت المستغرق</span>
        </div>
      </div>

      {/* أزرار الإجراءات */}
      <div className="results-actions">
        <button
          type="button"
          className="btn-retake"
          onClick={onRestartExam}
        >
          <span>إعادة الامتحان مجدداً</span>
          <span>🔄</span>
        </button>
      </div>

      {/* قسم المراجعة التفصيلية للإجابات */}
      <div className="review-section">
        <div className="review-header">
          <h2 className="review-title">مراجعة الأسئلة والإجابات النموذجية</h2>

          <div className="review-filters">
            <button
              type="button"
              className={`filter-btn ${filterMode === "all" ? "active" : ""}`}
              onClick={() => setFilterMode("all")}
            >
              جميع الأسئلة ({totalQuestions})
            </button>
            <button
              type="button"
              className={`filter-btn ${filterMode === "wrong" ? "active" : ""}`}
              onClick={() => setFilterMode("wrong")}
            >
              الخاطئة فقط ({wrongCount + unansweredCount})
            </button>
            <button
              type="button"
              className={`filter-btn ${filterMode === "correct" ? "active" : ""}`}
              onClick={() => setFilterMode("correct")}
            >
              الصحيحة فقط ({correctCount})
            </button>
          </div>
        </div>

        <div className="review-list">
          {filteredQuestions.map((q) => {
            const statusClass = q.isCorrect ? "is-correct" : "is-wrong";

            return (
              <div key={q.id} className={`review-item ${statusClass}`}>
                <div className="review-question-title">
                  <span>س {q.originalIndex + 1}:</span>
                  <span>{q.question}</span>
                  <span style={{ marginRight: "auto", fontSize: "0.9rem", fontWeight: "700" }}>
                    {q.isCorrect ? (
                      <span style={{ color: "var(--exam-success)" }}>✓ إجابة صحيحة</span>
                    ) : q.isUnanswered ? (
                      <span style={{ color: "var(--exam-warning)" }}>⚠️ لم تجب على السؤال</span>
                    ) : (
                      <span style={{ color: "var(--exam-danger)" }}>✗ إجابة خاطئة</span>
                    )}
                  </span>
                </div>

                <div className="review-options">
                  {q.options.map((opt, optIdx) => {
                    const isCorrectChoice = optIdx === q.correctAnswer;
                    const isUserChoice = optIdx === q.userAnswer;

                    let optClass = "review-option";
                    if (isCorrectChoice) optClass += " correct-answer";
                    else if (isUserChoice && !isCorrectChoice) optClass += " user-wrong-answer";

                    return (
                      <div key={optIdx} className={optClass}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ opacity: 0.6 }}>{OPTION_LETTERS[optIdx]}.</span>
                          <span>{opt}</span>
                        </div>
                        <div>
                          {isCorrectChoice && <span>(الإجابة الصحيحة ✓)</span>}
                          {isUserChoice && !isCorrectChoice && <span>(إجابتك التي اخترتها ✗)</span>}
                          {isUserChoice && isCorrectChoice && <span>(إجابتك الصحيحة ✓)</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="review-explanation">
                    <strong>💡 التوضيح والشرح: </strong>
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

