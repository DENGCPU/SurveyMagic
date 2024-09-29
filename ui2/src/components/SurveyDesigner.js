import React, { useState } from 'react';
import QuestionDesigner from './QuestionDesigner';
import QuestionPreview from './QuestionPreview';

function SurveyDesigner() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Survey Design Tool</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Question Designer</h2>
          <QuestionDesigner addQuestion={addQuestion} />
        </div>
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Question Preview</h2>
          <QuestionPreview questions={questions} removeQuestion={removeQuestion} />
        </div>
      </div>
    </div>
  );
}

export default SurveyDesigner;
