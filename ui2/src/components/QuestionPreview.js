import React from 'react';

function QuestionPreview({ questions }) {
  if (questions.length === 0) {
    return <p className="text-gray-500">还没有添加任何问题。</p>;
  }

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div key={index} className="border-b pb-4">
          <h3 className="font-medium text-lg mb-2">{question.text}</h3>
          <p className="text-sm text-gray-500 mb-3">类型: {question.type}</p>
          {question.type === 'Short Text' && (
            <input type="text" placeholder="短答案" className="w-full p-2 border rounded-md" />
          )}
          {question.type === 'Long Text' && (
            <textarea placeholder="长答案" className="w-full p-2 border rounded-md" rows="3"></textarea>
          )}
          {question.type === 'Multiple Choice' && (
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  <input type="radio" id={`q${index}-o${optionIndex}`} name={`question-${index}`} className="mr-2" />
                  <label htmlFor={`q${index}-o${optionIndex}`}>{option}</label>
                </div>
              ))}
            </div>
          )}
          {question.type === 'Checkbox List' && (
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  <input type="checkbox" id={`q${index}-o${optionIndex}`} name={`question-${index}`} className="mr-2" />
                  <label htmlFor={`q${index}-o${optionIndex}`}>{option}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default QuestionPreview;
