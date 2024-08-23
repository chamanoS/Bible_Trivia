// ResultDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Slide } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResultDialog = ({ open, handleClose, guessCorrect, userAnswer, currentScripture }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="result-dialog-description"
    >
      <DialogTitle>
        {guessCorrect ? 'Correct!' : 'Incorrect'}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          {guessCorrect ? (
            <CheckCircleIcon color="success" fontSize="large" />
          ) : (
            <CancelIcon color="error" fontSize="large" />
          )}
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          Your Answer: <strong>{userAnswer}</strong>
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Correct Answer: <strong>{currentScripture.book_name} {currentScripture.chapter}:{currentScripture.verse}</strong>
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
          "{currentScripture.text}"
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialog;
