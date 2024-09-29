import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import QuestionDesigner from './QuestionDesigner';
import SurveyPreview from './SurveyPreview';
import { StrictModeDroppable } from '../utils/StrictModeDroppable';

function SurveyDesigner() {
  const [questions, setQuestions] = useState([]);
  const surveyPreviewRef = useRef(null);

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuestions(items);
  };

  useEffect(() => {
    if (surveyPreviewRef.current) {
      surveyPreviewRef.current.scrollTop = surveyPreviewRef.current.scrollHeight;
    }
  }, [questions]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen">
        <div className="w-1/3 p-4 overflow-y-auto sticky top-0 h-screen">
          <h2 className="text-2xl font-semibold mb-4">Question Designer</h2>
          <QuestionDesigner addQuestion={addQuestion} />
        </div>
        <div className="w-2/3 p-4 overflow-y-auto" ref={surveyPreviewRef}>
          <h2 className="text-2xl font-semibold mb-4">Survey Preview</h2>
          <StrictModeDroppable droppableId="questions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <SurveyPreview questions={questions} removeQuestion={removeQuestion} />
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </div>
      </div>
    </DragDropContext>
  );
}

export default SurveyDesigner;
