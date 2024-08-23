import React, { useState } from 'react';
import Header from './components/Header';
import Scoreboard from './components/Scoreboard';
import ScriptureDisplay from './components/ScriptureDisplay';
import Controls from './components/Controls';
import ResultDialog from './components/ResultDialog';
import Footer from './components/Footer';
import Loader from './components/common/Loader';
import { bible } from './utils/bibleData';
import { fetchScripture } from './utils/api';
import { Box, Container, Typography, Button } from '@mui/material';

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
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him should not perish but have eternal life."
  });
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalStreaks, setTotalStreaks] = useState(0);
  const [round, setRound] = useState(1);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);

  const generateScripture = async () => {
    setShowResults(false);
    setLoading(true);

    let i = 0;

    if (searchFilter === 1) i = Math.floor(Math.random() * 66);
    if (searchFilter === 2) i = Math.floor(Math.random() * 39);
    if (searchFilter === 3) i = Math.floor(Math.random() * 27 + 39);

    const book = bible[i].book;
    const chapter = Math.floor(Math.random() * bible[i].chapters) + 1;
    const verse = Math.floor(Math.random() * 20) + 1; // Adjust range as needed

    try {
      const data = await fetchScripture(book, chapter, verse);

      if (data.error) {
        // Retry if verse not found
        generateScripture();
      } else {
        setCurrentScripture({
          book_name: data.reference.split(' ')[0],
          chapter: data.verses[0].chapter,
          verse: data.verses[0].verse,
          text: data.verses[0].text,
        });
      }
    } catch (error) {
      console.error('Error fetching scripture:', error);
    }

    setLoading(false);
  };

  const generateAnswer = async () => {
    const userAnswer = prompt("Type the book name:");
    if (!userAnswer) return;

    setUserAnswer(userAnswer);

    const isCorrect = userAnswer.trim().toLowerCase() === currentScripture.book_name.trim().toLowerCase();
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
    setResultDialogOpen(true);

    // Increment the round if less than 30
    if (round < 30) {
      setRound(prevRound => prevRound + 1);
    }
  };

  const handleCloseResultDialog = () => {
    setResultDialogOpen(false);
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setTotalStreaks(0);
    setRound(1);
    setCurrentScripture({
      book_name: "John",
      chapter: 3,
      verse: 16,
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him should not perish but have eternal life."
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />
      <Container  maxWidth="md">
        <Scoreboard score={score} streak={streak} totalStreaks={totalStreaks} round={round} />
        {loading ? (
          <Loader />
        ) : (
          <ScriptureDisplay currentScripture={currentScripture} />
        )}
        <Controls
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          generateScripture={generateScripture}
          generateAnswer={generateAnswer}
          round={round}
        />
        {showResults && (
          <ResultDialog
            open={resultDialogOpen}
            handleClose={handleCloseResultDialog}
            guessCorrect={guessCorrect}
            userAnswer={userAnswer}
            currentScripture={currentScripture}
          />
        )}
        {round > 30 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h5">Game Over!</Typography>
            <Typography variant="h6">Your final score is {score}.</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={resetGame}>
              Play Again
            </Button>
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
