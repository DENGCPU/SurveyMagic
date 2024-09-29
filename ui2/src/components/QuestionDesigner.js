import React, { useState } from 'react';

function QuestionDesigner({ addQuestion }) {
  const [questionType, setQuestionType] = useState('Short Text');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['']);

  const questionTypes = ['Short Text', 'Long Text', 'Multiple Choice', 'Checkbox List'];

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
    if (questionText.trim()) {
      addQuestion({ 
        type: questionType, 
        text: questionText, 
        options: ['Multiple Choice', 'Checkbox List'].includes(questionType) ? options.filter(opt => opt.trim() !== '') : []
      });
      setQuestionText('');
      setOptions(['']);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
        <select 
          value={questionType} 
          onChange={(e) => setQuestionType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          {questionTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter question text"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {['Multiple Choice', 'Checkbox List'].includes(questionType) && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button 
                onClick={() => handleRemoveOption(index)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button 
            onClick={handleAddOption}
            className="mt-2 text-indigo-600 hover:text-indigo-800"
          >
            + Add Option
          </button>
        </div>
      )}
      <button 
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      >
        + Add Question
      </button>
    </div>
  );
}

export default QuestionDesigner;
