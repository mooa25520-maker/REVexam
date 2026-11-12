import React, { useState } from "react";

export default function WelcomeScreen({
  config,
  totalQuestions,
  studentName,
  setStudentName,
  parentPhone,
  setParentPhone,
  onStartExam,
}) {
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // تنظيف وتوحيد صيغة رقم الهاتف المصري
  const normalizeEgyptianPhone = (val) => {
    if (!val) return "";
    let clean = val.trim().replace(/[\s\-()]/g, "");
    if (clean.startsWith("+20")) clean = "0" + clean.slice(3);
    else if (clean.startsWith("0020")) clean = "0" + clean.slice(4);
    else if (clean.startsWith("20") && clean.length === 12) clean = "0" + clean.slice(2);
    return clean;
  };

  // التحقق من صحة البيانات
  const validateForm = () => {
    let isValid = true;

    // 1. التحقق من اسم الطالب
    const trimmedName = (studentName || "").trim();
    if (!trimmedName) {
      setNameError("يرجى إدخال اسم الطالب قبل بدء الامتحان");
      isValid = false;
    } else if (trimmedName.length < 3) {
      setNameError("اسم الطالب يجب أن يكون 3 أحرف على الأقل");
      isValid = false;
    } else {
      setNameError("");
    }

    // 2. التحقق من رقم ولي الأمر (مصري 11 رقم يبدأ بـ 010 أو 011 أو 012 أو 015)
    const cleanedPhone = normalizeEgyptianPhone(parentPhone || "");
    const egyptianPhoneRegex = /^(010|011|012|015)[0-9]{8}$/;

    if (!cleanedPhone) {
      setPhoneError("يرجى إدخال رقم ولي الأمر للمتابعة");
      isValid = false;
    } else if (!egyptianPhoneRegex.test(cleanedPhone)) {
      setPhoneError("رقم الهاتف غير صحيح! يجب أن يكون رقم مصري مكون من 11 رقماً يبدأ بـ (010 أو 011 أو 012 أو 015)");
      isValid = false;
    } else {
      setPhoneError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // حفظ الرقم بالصيغة المنظمة
      setParentPhone(normalizeEgyptianPhone(parentPhone));
      onStartExam();
    }
  };

  return (
    <div className="welcome-card">
      <div className="welcome-header">
        <div className="welcome-badge">
          <span>📝</span>
          <span>{config.subject || "اختبار إلكتروني"}</span>
        </div>
        <h1 className="welcome-title">{config.title}</h1>
        <p className="welcome-subtitle">{config.subtitle}</p>
      </div>

      <div className="welcome-body">
        {/* إحصائيات سريعة عن الامتحان */}
        <div className="stats-ribbon">
          <div className="stat-item">
            <span className="stat-icon">❓</span>
            <div className="stat-value">{totalQuestions}</div>
            <div className="stat-label">عدد الأسئلة</div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">⏱️</span>
            <div className="stat-value">
              {config.totalTimeMinutes > 0 ? `${config.totalTimeMinutes} دقيقة` : "مفتوح"}
            </div>
            <div className="stat-label">مدة الاختبار</div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <div className="stat-value">{config.passingPercentage}%</div>
            <div className="stat-label">نسبة النجاح</div>
          </div>
        </div>

        {/* نموذج إدخال بيانات الطالب وولي الأمر */}
        <form onSubmit={handleSubmit} noValidate>
          {/* اسم الطالب */}
          <div className="student-input-group">
            <label htmlFor="studentName">
              اسم الطالب <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="studentName"
              className={`student-input ${nameError ? "has-error" : ""}`}
              placeholder="اكتب اسم الطالب بالكامل هنا..."
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                if (nameError) setNameError("");
              }}
              autoFocus
            />
            {nameError && (
              <div className="field-error-msg">
                <span>⚠️</span>
                <span>{nameError}</span>
              </div>
            )}
          </div>

          {/* رقم ولي الأمر */}
          <div className="student-input-group">
            <label htmlFor="parentPhone">
              رقم هاتف ولي الأمر (مصري) <span className="required-star">*</span>
            </label>
            <input
              type="tel"
              id="parentPhone"
              dir="ltr"
              style={{ textAlign: "right" }}
              className={`student-input ${phoneError ? "has-error" : ""}`}
              placeholder="مثال: 01012345678 أو 011 / 012 / 015..."
              value={parentPhone}
              onChange={(e) => {
                setParentPhone(e.target.value);
                if (phoneError) setPhoneError("");
              }}
            />
            {phoneError && (
              <div className="field-error-msg">
                <span>⚠️</span>
                <span>{phoneError}</span>
              </div>
            )}
          </div>

          {/* تعليمات الاختبار */}
          {config.instructions && config.instructions.length > 0 && (
            <div className="instructions-box">
              <div className="instructions-header">
                <span>📋</span>
                <span>تعليمات هامة قبل البدء:</span>
              </div>
              <ul className="instructions-list">
                {config.instructions.map((inst, index) => (
                  <li key={index}>{inst}</li>
                ))}
              </ul>
            </div>
          )}

          {/* زر بدء الامتحان الرئيسي */}
          <button type="submit" className="btn-start-exam">
            <span>بدء الامتحان الآن</span>
            <span style={{ fontSize: "1.4rem" }}>🚀</span>
          </button>
        </form>
      </div>
    </div>
  );
}
