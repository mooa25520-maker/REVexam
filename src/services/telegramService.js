/**
 * ====================================================================
 * خدمة إرسال نتائج الامتحانات إلى بوت تليجرام (Telegram Bot Service)
 * ====================================================================
 * يمكنك وضع التوكن والـ Chat ID الخاص بك مباشرة في هذا الملف
 * أو إضافتهما في ملف .env بالشكل التالي:
 * VITE_TELEGRAM_BOT_TOKEN=توكن_البوت_الخاص_بك
 * VITE_TELEGRAM_CHAT_ID=معرف_المحادثة_او_القناة
 */

export const TELEGRAM_CONFIG = {
  // استبدل هذا بالتوكن الخاص ببوتك (أو استخدم متغيرات البيئة)
  botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "YOUR_BOT_TOKEN_HERE",
  // استبدل هذا بمعرف الشات أو القناة (Chat ID)
  chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID || "YOUR_CHAT_ID_HERE",
};

/**
 * دالة لتأمين وتنسيق النصوص البرمجية لـ Telegram HTML
 */
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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
 * إرسال تقرير النتيجة الكامل للتلجرام
 */
export async function sendExamResultToTelegram({
  studentName,
  parentPhone,
  examTitle,
  questions,
  answers,
  timeSpentSeconds,
  passingPercentage,
}) {
  const botToken = TELEGRAM_CONFIG.botToken;
  const chatId = TELEGRAM_CONFIG.chatId;

  // التحقق من وجود التوكن والآيدي قبل الإرسال
  if (!botToken || botToken === "YOUR_BOT_TOKEN_HERE" || !chatId || chatId === "YOUR_CHAT_ID_HERE") {
    console.warn(
      "⚠️ [Telegram] لم يتم ضبط TELEGRAM_CONFIG.botToken أو TELEGRAM_CONFIG.chatId حتى الآن. يرجى إدخال بيانات البوت في src/services/telegramService.js أو ملف .env"
    );
    return { success: false, reason: "missing_credentials" };
  }

  // حساب النتيجة والإحصائيات
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

  // التاريخ والوقت بتوقيت مصر
  const submissionDate = new Date().toLocaleString("ar-EG", {
    timeZone: "Africa/Cairo",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // بناء تفاصيل كل سؤال
  const letters = ["أ", "ب", "ج", "د", "هـ", "و"];
  const questionsBreakdown = questions
    .map((q, idx) => {
      const userChoiceIdx = answers[idx];
      const isCorrect = userChoiceIdx === q.correctAnswer;
      const isUnanswered = userChoiceIdx === undefined;

      const userChoiceText = !isUnanswered && q.options[userChoiceIdx]
        ? `${letters[userChoiceIdx] || ""}) ${q.options[userChoiceIdx]}`
        : "لم تتم الإجابة";

      const correctChoiceText = `${letters[q.correctAnswer] || ""}) ${q.options[q.correctAnswer]}`;

      let statusIcon = "❌";
      let detailsLine = "";
      if (isCorrect) {
        statusIcon = "✅";
        detailsLine = `👈 إجابة الطالب: ${escapeHtml(userChoiceText)}`;
      } else if (isUnanswered) {
        statusIcon = "⚠️";
        detailsLine = `👈 لم يجب - الصحيحة: <b>${escapeHtml(correctChoiceText)}</b>`;
      } else {
        statusIcon = "❌";
        detailsLine = `👈 إجابة الطالب: <s>${escapeHtml(userChoiceText)}</s>\n👈 الإجابة الصحيحة: <b>${escapeHtml(correctChoiceText)}</b>`;
      }

      return `${statusIcon} <b>س${idx + 1}: ${escapeHtml(q.question)}</b>\n${detailsLine}`;
    })
    .join("\n\n");

  // نص الرسالة الشامل بتنسيق HTML
  const message = `
🎓 <b>نتيجة امتحان جديدة</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>اسم الطالب:</b> ${escapeHtml(studentName)}
📱 <b>رقم ولي الأمر:</b> <code>${escapeHtml(parentPhone)}</code>
📋 <b>الامتحان:</b> ${escapeHtml(examTitle || "امتحان إلكتروني")}
📅 <b>تاريخ التسليم:</b> ${submissionDate}
⏱️ <b>الوقت المستغرق:</b> ${timeFormatted}

📊 <b>الدرجة النهائية:</b> <b>${correctCount}</b> من <b>${totalQuestions}</b> (${percentage}%)
🏆 <b>الحالة:</b> ${isPassed ? "<b>ناجح بجدارة 🎉</b>" : "<b>راسب (لم يجتز) ⚠️</b>"}
✅ الصحيحة: ${correctCount} | ❌ الخاطئة: ${wrongCount} | ⚪ بدون حل: ${unansweredCount}
━━━━━━━━━━━━━━━━━━━━

📝 <b>تفاصيل إجابات الطالب:</b>
${questionsBreakdown}
`.trim();

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const data = await response.json();
    if (data.ok) {
      console.log("✅ [Telegram] تم إرسال نتيجة الامتحان إلى تليجرام بنجاح!");
      return { success: true, data };
    } else {
      console.error("❌ [Telegram] فشل إرسال النتيجة:", data);
      return { success: false, error: data };
    }
  } catch (err) {
    console.error("❌ [Telegram Error] حدث خطأ أثناء الاتصال بتليجرام:", err);
    return { success: false, error: err };
  }
}

