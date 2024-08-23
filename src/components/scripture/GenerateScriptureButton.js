import React from 'react';

const GenerateScriptureButton = ({ generateScripture }) => {
  return (
    <button className='btn btn-primary' onClick={generateScripture}>
      Generate Scripture
    </button>
  );
};

export default GenerateScriptureButton;
