const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
  try {
    const questions = await EleventyFetch('https://marketplace-ms.monday.com/marketplace_ms/public/compliance_questions', { duration: "1d", type: "json" });
    
    // Group questions by type
    const questionsByType = questions.reduce((acc, question) => {
      if (!acc[question.type]) {
        acc[question.type] = [];
      }
      acc[question.type].push({
        id: question.id,
        question: question.question,
        answerType: question.answerType,
        allowFileUpload: question.allowFileUpload,
        isFileUploadMandatory: question.isFileUploadMandatory,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt
      });
      return acc;
    }, {});

    return {
      all: questions,
      byType: questionsByType
    };
  } catch (error) {
    console.error('Error fetching compliance questions:', error);
    return {
      all: [],
      byType: {}
    };
  }
}; 