import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GripVertical, Trash2 } from 'lucide-react';

function SurveyPreview({ questions, removeQuestion }) {
  if (questions.length === 0) {
    return <p className="text-gray-500">还没有添加任何问题。</p>;
  }

  return (
    <>
      {questions.map((question, index) => (
        <Draggable key={`question-${index}`} draggableId={`question-${index}`} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className="bg-white p-4 rounded-lg shadow mb-4 relative"
            >
              <div className="flex items-center mb-2">
                <div {...provided.dragHandleProps} className="mr-2 cursor-move">
                  <GripVertical size={20} />
                </div>
                <h3 className="font-medium text-lg text-left flex-grow mr-2">{question.text}</h3>
                <button
                  onClick={() => removeQuestion(index)}
                  className="text-red-500 hover:text-red-700 flex-shrink-0"
                >
                  <Trash2 size={20} />
                </button>
              </div>
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
          )}
        </Draggable>
      ))}
    </>
  );
}

export default SurveyPreview;
