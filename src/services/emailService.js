import emailjs from "@emailjs/browser";

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_cm5cbor",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_iz48wlm",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "TA41PryDvgGKzkM1p",
};

// تهيئة EmailJS بالمفتاح العام
try {
  emailjs.init({
    publicKey: EMAILJS_CONFIG.publicKey,
  });
} catch (e) {
  console.warn("EmailJS init warning:", e);
}

/**
 * تنسيق الوقت المستغرق
 */
function formatDuration(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins === 0) return `${secs} ثانية`;
  return `${mins} دقيقة و ${secs} ثانية`;
}

/**
 * إرسال نتيجة الامتحان عبر البريد الإلكتروني باستخدام EmailJS
 */
export async function sendExamResultEmail({
  studentName,
  parentPhone,
  examTitle,
  questions,
  answers,
  timeSpentSeconds,
  passingPercentage,
}) {
  const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;

  // حساب الدرجات
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

  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = percentage >= (passingPercentage || 60);
  const timeFormatted = formatDuration(timeSpentSeconds || 0);

  const submissionDate = new Date().toLocaleString("ar-EG", {
    timeZone: "Africa/Cairo",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // بناء تفاصيل كل سؤال وإجابة الطالب
  const letters = ["أ", "ب", "ج", "د", "هـ", "و"];
  const questionsBreakdown = questions
    .map((q, idx) => {
      const userChoiceIdx = answers[idx];
      const isCorrect = userChoiceIdx === q.correctAnswer;
      const isUnanswered = userChoiceIdx === undefined;

      const userChoiceText = !isUnanswered && q.options[userChoiceIdx]
        ? `(${letters[userChoiceIdx] || ""}) ${q.options[userChoiceIdx]}`
        : "لم تتم الإجابة";

      const correctChoiceText = `(${letters[q.correctAnswer] || ""}) ${q.options[q.correctAnswer]}`;

      let status = isCorrect ? "✅ صحيح" : isUnanswered ? "⚠️ لم يجب" : "❌ خطأ";

      return [
        `س${idx + 1}: ${q.question}`,
        `• إجابة الطالب: ${userChoiceText} [${status}]`,
        !isCorrect ? `• الإجابة الصحيحة: ${correctChoiceText}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  // نص التقرير الكامل
  const fullSummary = `
تقرير نتيجة امتحان جديد
================================
• اسم الطالب: ${studentName}
• رقم هاتف ولي الأمر: ${parentPhone}
• عنوان الامتحان: ${examTitle}
• التاريخ والتوقيت: ${submissionDate}
• الوقت المستغرق: ${timeFormatted}
--------------------------------
• النتيجة النهائية: ${correctCount} من ${totalQuestions} (${percentage}%)
• الحالة: ${isPassed ? "ناجح" : "راسب"}
• الإجابات الصحيحة: ${correctCount}
• الإجابات الخاطئة: ${wrongCount}
• الأسئلة غير المجابة: ${unansweredCount}
================================

تفاصيل إجابات الطالب:
--------------------------------
${questionsBreakdown}
`.trim();

  // تمرير المتغيرات بجميع المسميات المحتملة لدعم أي قالب في EmailJS
  const subjectLine = `نتيجة امتحان: ${studentName} - ${examTitle} (${isPassed ? "ناجح" : "راسب"})`;

  const templateParams = {
    // 1. المتغيرات الشائعة وقوالب التواصل
    from_name: studentName,
    to_name: "المسؤول / ولي الأمر",
    name: studentName,
    student_name: studentName,
    user_name: studentName,

    // بريد إلكتروني وهمي أو احتياطي في حال كان القالب يطلب from_email أو reply_to
    from_email: "noreply@digitalbang.ma",
    reply_to: "noreply@digitalbang.ma",
    email: "noreply@digitalbang.ma",

    // بيانات الهاتف
    phone: parentPhone,
    parent_phone: parentPhone,
    phone_number: parentPhone,

    // بيانات الامتحان والموضوع
    subject: subjectLine,
    exam_title: examTitle,
    title: examTitle,
    company: "منصة الامتحان الإلكتروني",
    role: "طالب",

    // الدرجات
    score: `${correctCount} / ${totalQuestions} (${percentage}%)`,
    percentage: `${percentage}%`,
    status: isPassed ? "ناجح" : "راسب",
    time_spent: timeFormatted,
    submission_date: submissionDate,

    // نص الرسالة
    message: fullSummary,
    details: fullSummary,
    content: fullSummary,
  };

  console.log("📤 [EmailJS] بدء إرسال الإيميل بالبيانات:", {
    serviceId,
    templateId,
    studentName,
    parentPhone,
  });

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      { publicKey }
    );
    console.log("✅ [EmailJS] تم الإرسال بنجاح!", response);
    return { success: true, status: response.status, text: response.text };
  } catch (error) {
    console.error("❌ [EmailJS Error] فشل الإرسال بالخطأ:", error);
    // استخراج رسالة الخطأ لتسهيل معرفة السبب
    const errorMsg = error?.text || error?.message || JSON.stringify(error);
    return { success: false, error: errorMsg };
  }
}
