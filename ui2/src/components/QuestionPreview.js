import React from 'react';

function QuestionPreview({ questions }) {
  return (
    <div className="question-preview">
      <h2>问题预览</h2>
      {questions.map((question, index) => (
        <div key={index} className="question">
          <h3>{question.text}</h3>
          <p>类型: {question.type}</p>
          {(question.type === '多选题' || question.type === '复选框列表') && (
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ul>
          )}
          {question.type === '短文本' && <input type="text" placeholder="短文本回答" />}
          {question.type === '长文本' && <textarea placeholder="长文本回答"></textarea>}
        </div>
      ))}
    </div>
  );
}

export default QuestionPreview;
