import React, { useState, useEffect, useRef } from "react";
import { examConfig, sampleQuestions } from "./data/examData";
import { sendExamResultEmail } from "./services/emailService";
import { sendExamResultToTelegram } from "./services/telegramService";
import WelcomeScreen from "./components/exam/WelcomeScreen";
import ExamHeader from "./components/exam/ExamHeader";
import QuestionPalette from "./components/exam/QuestionPalette";
import QuestionCard from "./components/exam/QuestionCard";
import ExamSummaryModal from "./components/exam/ExamSummaryModal";
import ResultScreen from "./components/exam/ResultScreen";
import "./styles/exam.css";

export default function App() {
  // حالة التطبيق: 'welcome' (البداية) | 'in_progress' (أثناء الحل) | 'results' (النتيجة والمراجعة)
  const [examState, setExamState] = useState("welcome");

  // بيانات الطالب والامتحان
  const [studentName, setStudentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionIndex]: optionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { [questionIndex]: true }
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // 'sending' | 'success' | 'error' | null
  const [emailError, setEmailError] = useState("");

  // المؤقت الزمني
  const totalDurationSeconds = examConfig.totalTimeMinutes > 0 ? examConfig.totalTimeMinutes * 60 : null;
  const [timeLeft, setTimeLeft] = useState(totalDurationSeconds);
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef(null);

  // إدارة المؤقت أثناء الامتحان
  useEffect(() => {
    if (examState === "in_progress") {
      timerRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1);

        if (totalDurationSeconds !== null) {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              // انتهاء الوقت تلقائياً وتسليم الامتحان
              handleDirectSubmit();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examState, totalDurationSeconds]);

  // بدء الامتحان
  const handleStartExam = () => {
    setAnswers({});
    setFlaggedQuestions({});
    setCurrentQuestionIndex(0);
    setTimeSpent(0);
    setTimeLeft(totalDurationSeconds);
    setIsSubmitModalOpen(false);
    setEmailStatus(null);
    setEmailError("");
    setExamState("in_progress");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // اختيار إجابة لسؤال معين
  const handleSelectOption = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  // تمييز السؤال بعلامة مراجعة
  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex],
    }));
  };

  // الانتقال للسؤال التالي
  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // الانتقال للسؤال السابق
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // الانتقال المباشر لسؤال بالرقم
  const handleSelectQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // فتح نافذة تأكيد التسليم
  const handleOpenSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  // تأكيد التسليم الفعلي
  const handleDirectSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSubmitModalOpen(false);
    setExamState("results");
    window.scrollTo({ top: 0, behavior: "smooth" });

    setEmailStatus("sending");
    setEmailError("");

    // إرسال نتيجة الامتحان عبر الإيميل (EmailJS)
    sendExamResultEmail({
      studentName,
      parentPhone,
      examTitle: examConfig.title,
      questions: sampleQuestions,
      answers,
      timeSpentSeconds: timeSpent,
      passingPercentage: examConfig.passingPercentage,
    }).then((res) => {
      if (res && res.success) {
        setEmailStatus("success");
      } else {
        setEmailStatus("error");
        setEmailError(res?.error || "حدث خطأ غير متوقع");
      }
    }).catch((err) => {
      setEmailStatus("error");
      setEmailError(err?.text || err?.message || "فشل الاتصال بخدمة البريد");
    });

    // إرسال نتيجة الامتحان إلى بوت التلجرام
    sendExamResultToTelegram({
      studentName,
      parentPhone,
      examTitle: examConfig.title,
      questions: sampleQuestions,
      answers,
      timeSpentSeconds: timeSpent,
      passingPercentage: examConfig.passingPercentage,
    });
  };

  // إعادة الامتحان
  const handleRestart = () => {
    handleStartExam();
  };

  const answeredCount = Object.keys(answers).length;
  const currentQuestion = sampleQuestions[currentQuestionIndex];

  return (
    <div className="exam-app-wrapper">
      <div className="exam-container">
        {/* شاشة البداية والترحيب مع زر "بدء الامتحان" */}
        {examState === "welcome" && (
          <WelcomeScreen
            config={examConfig}
            totalQuestions={sampleQuestions.length}
            studentName={studentName}
            setStudentName={setStudentName}
            parentPhone={parentPhone}
            setParentPhone={setParentPhone}
            onStartExam={handleStartExam}
          />
        )}

        {/* شاشة الامتحان التفاعلية */}
        {examState === "in_progress" && (
          <>
            <ExamHeader
              title={examConfig.title}
              studentName={studentName}
              timeLeftSeconds={timeLeft}
              onFinishClick={handleOpenSubmitModal}
            />

            <QuestionPalette
              totalQuestions={sampleQuestions.length}
              currentIndex={currentQuestionIndex}
              answers={answers}
              flaggedQuestions={flaggedQuestions}
              onSelectQuestion={handleSelectQuestion}
            />

            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
                totalQuestions={sampleQuestions.length}
                selectedAnswer={answers[currentQuestionIndex]}
                isFlagged={Boolean(flaggedQuestions[currentQuestionIndex])}
                onSelectOption={handleSelectOption}
                onToggleFlag={handleToggleFlag}
                onNext={handleNext}
                onPrev={handlePrev}
                onSubmitClick={handleOpenSubmitModal}
              />
            )}

            {/* نافذة تأكيد التسليم */}
            <ExamSummaryModal
              isOpen={isSubmitModalOpen}
              totalQuestions={sampleQuestions.length}
              answeredCount={answeredCount}
              onConfirmSubmit={handleDirectSubmit}
              onCancel={() => setIsSubmitModalOpen(false)}
            />
          </>
        )}

        {/* شاشة النتيجة والمراجعة */}
        {examState === "results" && (
          <ResultScreen
            questions={sampleQuestions}
            answers={answers}
            studentName={studentName}
            parentPhone={parentPhone}
            timeSpentSeconds={timeSpent}
            passingPercentage={examConfig.passingPercentage}
            emailStatus={emailStatus}
            emailError={emailError}
            onRestartExam={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
