import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GripVertical, Trash2 } from 'lucide-react';

function QuestionPreview({ question, index, removeQuestion }) {
  return (
    <Draggable draggableId={`question-${index}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="bg-white rounded-lg shadow mb-4 relative flex"
        >
          <div 
            {...provided.dragHandleProps} 
            className="p-4 cursor-move flex items-center justify-center"
          >
            <GripVertical size={20}  className="text-gray-400" />
          </div>
          <div className="flex-grow p-6">
            <div className="flex items-center mb-4">
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
        </div>
      )}
    </Draggable>
  );
}

export default QuestionPreview;
