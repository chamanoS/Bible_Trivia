import React from 'react';

const GuessResults = ({ showResults, guessCorrect, userAnswer, currentScripture }) => {
  return showResults ? (
    <div className='row text-center mt-5'>
      <h4 className='heading'>Your Answer: {userAnswer}</h4>
      {guessCorrect ? (
        <i className="fas fa-check-circle fa-5x text-success"></i>
      ) : (
        <i className="fas fa-times-circle fa-5x text-danger"></i>
      )}
      <small>
        <i>
          {currentScripture.book_name} {currentScripture.chapter}:{currentScripture.verse}
        </i>
      </small>
    </div>
  ) : null;
};

export default GuessResults;
