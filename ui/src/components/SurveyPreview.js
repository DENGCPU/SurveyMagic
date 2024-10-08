import React from 'react';
import QuestionPreview from './QuestionPreview';

function SurveyPreview({ questions, removeQuestion, answers, handleAnswerChange }) {
  if (questions.length === 0) {
    return <p className="text-gray-500">还没有添加任何问题。</p>;
  }

  return (
    <>
      {questions.map((question, index) => (
        <QuestionPreview
          key={`question-${index}`}
          question={question}
          index={index}
          removeQuestion={removeQuestion}
          answer={answers[index]}
          handleAnswerChange={handleAnswerChange}
        />
      ))}
    </>
  );
}

export default SurveyPreview;
