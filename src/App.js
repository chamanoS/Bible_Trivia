import React, { useState } from 'react';
import ScriptureCard from './components/scripture/ScriptureCard';
import ScriptureForm from './components/scripture/ScriptureForm';
import GuessResults from './components/scripture/GuessResults';
import Loader from './components/common/Loader';
import { bible } from './utils/bibleData';
import { fetchScripture } from './utils/api';


function App() {
  const [searchFilter, setSearchFilter] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [guessCorrect, setGuessCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentScripture, setCurrentScripture] = useState({
    book_name: "John",
    chapter: 3,
    verse: 16,
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him should not perish but have eternal life"
  });
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalStreaks, setTotalStreaks] = useState(0); // New state for total number of streaks
  const [round, setRound] = useState(1); // New state for current round

  const generateScripture = async (e) => {
    e.preventDefault();
    setShowResults(false);
    setLoading(true);

    let i = 0;

    if (searchFilter === 1) i = Math.floor(Math.random() * 68 + 1);
    if (searchFilter === 2) i = Math.floor(Math.random() * 38 + 1);
    if (searchFilter === 3) i = Math.floor(Math.random() * 26 + 38);

    const book = bible[i].book;
    const chapter = Math.floor(Math.random() * bible[i].chapters + 1);
    const verse = chapter === 117 ? 2 : Math.floor(Math.random() * 8 + 1);

    const data = await fetchScripture(book, chapter, verse);

    setCurrentScripture({
      book_name: data.verses[0].book_name,
      chapter: data.verses[0].chapter,
      verse: data.verses[0].verse,
      text: data.verses[0].text,
    });

    setLoading(false);
  };

  const generateAnswer = async (e) => {
    e.preventDefault();
    const userAnswer = await window.prompt("Type the book name");
    setUserAnswer(userAnswer);

    const isCorrect = userAnswer.trim().toLocaleLowerCase() === currentScripture.book_name.trim().toLocaleLowerCase();
    setGuessCorrect(isCorrect);

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setStreak(prevStreak => prevStreak + 1);
    } else {
      if (streak > 0) {
        setTotalStreaks(prevTotalStreaks => prevTotalStreaks + 1);
      }
      setStreak(0);
    }

    setShowResults(true);

    // Increment the round
    setRound(prevRound => prevRound + 1);
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setTotalStreaks(0);
    setRound(1);
  };

  return (
    <div className='container text-center m-5'>
      <div>
        <h3>Score: {score}</h3>
        <h4>Streak: {streak}</h4>
        <h4>Total Streaks: {totalStreaks}</h4>
        <h5>Round: {round} / 30</h5>
        <button className='btn btn-warning' onClick={resetGame}>Reset Game</button>
      </div>
      {loading ? <Loader /> : <ScriptureCard currentScripture={currentScripture} />}
      {round <= 30 ? (
        <ScriptureForm
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          generateScripture={generateScripture}
          generateAnswer={generateAnswer}
        />
      ) : (
        <h4>Game Over! Your final score is {score}.</h4>
      )}
      <GuessResults
        showResults={showResults}
        guessCorrect={guessCorrect}
        userAnswer={userAnswer}
        currentScripture={currentScripture}
      />
    </div>
  );
}

export default App;
