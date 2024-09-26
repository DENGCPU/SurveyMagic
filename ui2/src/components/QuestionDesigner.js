import React, { useState } from 'react';

function QuestionDesigner({ addQuestion }) {
  const [questionType, setQuestionType] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['']);

  const questionTypes = ['多选题', '复选框列表', '短文本', '长文本'];

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    const question = {
      type: questionType,
      text: questionText,
      options: questionType === '多选题' || questionType === '复选框列表' ? options : [],
    };
    addQuestion(question);
    setQuestionType('');
    setQuestionText('');
    setOptions(['']);
  };

  return (
    <div className="question-designer">
      <h2>问题设计器</h2>
      <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
        <option value="">选择问题类型</option>
        {questionTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="输入问题文本"
      />
      {(questionType === '多选题' || questionType === '复选框列表') && (
        <div className="options">
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`选项 ${index + 1}`}
              />
              <button onClick={() => handleRemoveOption(index)}>删除选项</button>
            </div>
          ))}
          <button onClick={handleAddOption}>添加选项</button>
        </div>
      )}
      <button onClick={handleSubmit}>添加问题到调查</button>
    </div>
  );
}

export default QuestionDesigner;
