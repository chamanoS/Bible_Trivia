// Controls.js
import React from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const Controls = ({ searchFilter, setSearchFilter, generateScripture, generateAnswer, round }) => {
  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
      <FormControl variant="outlined" sx={{ minWidth: 150 }}>
        <InputLabel>Testament</InputLabel>
        <Select
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          label="Testament"
          disabled={round > 30}
        >
          <MenuItem value={1}>All Books</MenuItem>
          <MenuItem value={2}>Old Testament</MenuItem>
          <MenuItem value={3}>New Testament</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<ShuffleIcon />}
        onClick={generateScripture}
        disabled={round > 30}
      >
        Generate Scripture
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<QuestionAnswerIcon />}
        onClick={generateAnswer}
        disabled={round > 30}
      >
        Submit Answer
      </Button>
    </Box>
  );
};

export default Controls;
