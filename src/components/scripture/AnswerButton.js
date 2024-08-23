import React from 'react';

const AnswerButton = ({ generateAnswer }) => {
  return (
    <button className='btn btn-info' onClick={generateAnswer}>
      Answer
    </button>
  );
};

export default AnswerButton;
