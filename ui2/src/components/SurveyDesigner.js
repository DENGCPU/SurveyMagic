import React, { useState } from 'react';
import QuestionDesigner from './QuestionDesigner';
import QuestionPreview from './QuestionPreview';

function SurveyDesigner() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    <div className="survey-designer">
      <QuestionDesigner addQuestion={addQuestion} />
      <QuestionPreview questions={questions} />
    </div>
  );
}

export default SurveyDesigner;
