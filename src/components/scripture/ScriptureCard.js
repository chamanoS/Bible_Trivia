import React from 'react';

const ScriptureCard = ({ currentScripture }) => {
  return (
    <div className="card m-5">
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>{currentScripture.text}</p>
          <footer className="blockquote-footer">
            <cite title="Source Title">Book Name?</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  );
};

export default ScriptureCard;
