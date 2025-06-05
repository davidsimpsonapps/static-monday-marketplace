const fetch = require('node-fetch');

module.exports = async function() {
  try {
    const response = await fetch('https://marketplace-ms.monday.com/marketplace_ms/public/compliance_questions');
    const questions = await response.json();
    
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