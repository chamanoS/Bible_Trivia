import React from 'react';
import SelectFilter from '../common/SelectFilter';
import GenerateScriptureButton from './GenerateScriptureButton';
import AnswerButton from './AnswerButton';

const ScriptureForm = ({ searchFilter, setSearchFilter, generateScripture, generateAnswer }) => {
  return (
    <form className='form-group'>
      <div className='container'>
        <div className='d-flex'>
          <SelectFilter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
          <GenerateScriptureButton generateScripture={generateScripture} />
          <AnswerButton generateAnswer={generateAnswer} />
        </div>
      </div>
    </form>
  );
};

export default ScriptureForm;
