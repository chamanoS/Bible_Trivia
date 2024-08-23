import React from 'react';
import { useState } from 'react';

function App() {

  const [searchFilter, setSearchFilter] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [guessCorrect, setGuessCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentScripture, setCurrentScripture] = useState({
    book_name: "John",
    chapter:3,
    verse:16,
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him should not perish but have eternal life"
  });

  const [bible] = useState([
    { book:"Genesis",   chapters:50 },
    { book:"Exodus",    chapters:40},
    { book:"Leviticus", chapters:27},
    { book:"Numbers",   chapters:36},
    { book:"Deuteronomy", chapters:34},
    { book:"Joshua",      chapters:24},
    { book:"Judges", chapters:21},
    { book:"Ruth",   chapters:4},
    { book:"1 Samuel", chapters:31},
    { book:"2 Samuel", chapters:24},
    { book:"1 Kings", chapters:22},
    { book:"2 Kings", chapters:25},
    { book:"1 Chronicles", chapters:29},
    { book:"2 Chronicles", chapters:36},
    { book:"Ezra", chapters:10},
    { book:"Nehemiah", chapters:13},
    { book:"Esther", chapters:10},
    { book:"Job",    chapters:42},
    { book:"Psalms", chapters:150},
    { book:"Proverbs", chapters:31},
    { book:"Ecclesiastes", chapters:12},
    { book:"Song of Solomon", chapters:8},
    { book:"Isaiah", chapters:66},
    { book:"Jeremiah", chapters:52},
    { book:"Lamentations", chapters:5},
    { book:"Ezekiel", chapters:48},
    { book:"Daniel", chapters:12},
    { book:"Hosea", chapters:14},
    { book:"Joel", chapters:3},
    { book:"Amos", chapters:9},
    { book:"Obadiah", chapters:1},
    { book:"Jonah", chapters:4},
    { book:"Micah", chapters:7},
    { book:"Nahum", chapters:3},
    { book:"Habakkuk", chapters:3},
    { book:"Zephaniah", chapters:3},
    { book:"Haggai", chapters:2},
    { book:"Zechariah", chapters:14},
    { book:"Malachi", chapters:4},
    { book: "Matthew", chapters:28 },
    { book: "Mark", chapters:16 },
    { book: "Luke", chapters:24 },
    { book: "John", chapters:21 },
    { book: "Acts", chapters:28 },
    { book: "Romans", chapters:16 },
    { book: "1 Corinthians", chapters:16 },
    { book: "2 Corinthians", chapters:13 },
    { book: "Galatians", chapters:6 },
    { book: "Ephesians", chapters:6 },
    { book: "Philippians", chapters:4 },
    { book: "Colossians", chapters:4 },
    { book: "1 Thessalonians", chapters:5 },
    { book: "2 Thessalonians", chapters:3 },
    { book: "1 Timothy", chapters:6 },
    { book: "2 Timothy", chapters:4 },
    { book: "Titus", chapters:3 },
    { book: "Philemon", chapters:1 },
    { book: "Hebrews", chapters:13 },
    { book: "James", chapters:5 },
    { book: "1 Peter", chapters:5 },
    { book: "2 Peter", chapters:3 },
    { book: "1 John", chapters:5 },
    { book: "2 John", chapters:1 },
    { book: "3 John", chapters:1 },
    { book: "Jude", chapters:1 },
    { book: "Revelation", chapters:22 }
    ]);

const generateScripture = async (e) => {
  e.preventDefault();
  setShowResults(false);

  setCurrentScripture({
    book_name:"",
    chapter:1,
    verse:1,
    text:"..."
  })


  let i = 0;

  if(searchFilter === 1) i = Math.floor(Math.random()*68 + 1);
  if(searchFilter === 2) i = Math.floor(Math.random()*38 + 1);
  if(searchFilter === 3) i = Math.floor(Math.random()*26 + 38);

  var book = bible[i].book;
  var chapter =Math.floor(Math.random()*bible[i].chapters + 1);
  var verse = (chapter === 117 ? 2 : Math.floor(Math.random()*8 +1));

  const res = await fetch(`https://bible-api.com/${book}${chapter}:${verse}?translation=kjv`);
  const data = await res.json();

  setCurrentScripture({
    book_name:data.verses[0].book_name,
    chapter:data.verses[0].chapter,
    verse:data.verses[0].verse,
    text:data.verses[0].text,
  })

  console.log(data)
}

const generateAnswer = async (e) => {
  e.preventDefault();

  const userAnswer = await window.prompt("Type the book name");
  setUserAnswer(userAnswer)
  setGuessCorrect(userAnswer.trim().toLocaleLowerCase() === currentScripture.book_name.trim().toLocaleLowerCase()) //compare the real bible book
 
  setShowResults(true);
}

  return (
    <div className='container text-center m-5'>
    <div className="card m-5">
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>{currentScripture.text}</p>
          <footer className="blockquote-footer"> <cite title="Source Title">Book Name?</cite></footer>
        </blockquote>
      </div>
    </div>

    <form className='form-group'>
      <div className='container'>
        <div className='d-flex'>
          <select className='' value={searchFilter} onChange={(e)=> setSearchFilter(e.target.value)}>
            <option value={1}>All Book</option>
            <option value={2}>Old Testament</option>
            <option value={3}>New Testament</option>
          </select>

          <button  className='btn btn-primary' onClick={(e)=> generateScripture(e)} >Generate Scripture</button>
          <button  className='btn btn-info'  onClick={(e)=> generateAnswer(e)}>Answer</button>
        </div>
        
      </div>
     
    </form>

    {showResults &&

        <div className='row text-center mt-5'>
        <h4 className='heading'> Your Answer: {userAnswer} </h4>
        {guessCorrect ?  <i className="fas fa-check-circle fa-5x text-success" ></i> :
          <i className="fas fa-times-circle fa-5x text-danger" ></i> 
        }
       
      
        <small><i>{currentScripture.book_name} {currentScripture.chapter}: {currentScripture.verse}</i></small>
        </div>

    }

  </div>
  );
}

export default App;
