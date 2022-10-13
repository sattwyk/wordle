import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Board from '../components/Board';
import Key from '../components/Key';
import Modal from '../components/Modal';
import Keyboard from '../components/Keyboard';
import data from '../../data.json';
import Head from 'next/head';

interface Props {
  actualWord: string;
  WORDS: { [key: string]: true };
}

type RangeType = {
  [key: string]: number[];
};

const keyboardKeyState = {
  q: 'D',
  w: 'D',
  e: 'D',
  r: 'D',
  t: 'D',
  y: 'D',
  u: 'D',
  i: 'D',
  o: 'D',
  p: 'D',
  a: 'D',
  s: 'D',
  d: 'D',
  f: 'D',
  g: 'D',
  h: 'D',
  j: 'D',
  k: 'D',
  l: 'D',
  enter: 'D',
  z: 'D',
  x: 'D',
  c: 'D',
  v: 'D',
  b: 'D',
  n: 'D',
  m: 'D',
  backspace: 'D',
};

const Home: NextPage<Props> = ({ actualWord, WORDS }) => {
  const [currentActualWord, setCurrentActualWord] = useState(actualWord);
  const [words, setWords] = useState(Array(30).fill(0));
  const [currentLetter, setCurrentLetter] = useState(0);
  const [currentWord, setCurrentWord] = useState(1);
  const [usedWords, setUsedWords] = useState<{ [key: string]: true }>({});
  const [keyboard, setKeyboard] = useState<{ [key: string]: string }>(
    keyboardKeyState
  );
  const [modal, setModal] = useState<{ open: boolean; state: 'win' | 'loose' }>(
    { open: false, state: 'win' }
  );

  const keys = words.map((letter, i) => <Key key={i} letter={letter} />);

  const reset = () => {
    const KEYWORDS = Object.keys(WORDS);
    let newWord = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];
    setWords(Array(30).fill(0));
    setCurrentLetter(0);
    setCurrentWord(1);
    setUsedWords({});
    setKeyboard(keyboardKeyState);
    while (newWord === currentActualWord) {
      newWord = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];
    }
    setCurrentActualWord(newWord);
  };

  const onClose = () => {
    setModal((pre) => ({ ...pre, open: false }));
    reset();
  };

  useEffect(() => {
    const RANGE: RangeType = {
      1: [0, 4],
      2: [5, 9],
      3: [10, 14],
      4: [15, 19],
      5: [20, 24],
      6: [25, 29],
    };

    const getCurrentWord = () => {
      let cw = '';
      const [lower, upper] = RANGE[currentWord];

      for (let i = lower; i <= upper; i++) {
        cw += words[i];
      }

      return cw.toLowerCase();
    };

    const checkWin = () => {
      if (getCurrentWord() === currentActualWord) {
        setModal({ open: true, state: 'win' });
        return true;
      }

      return false;
    };

    const checkWord = (word: String) => {
      const newWords = [...words];
      const [lower, upper] = RANGE[currentWord];

      const arr = [];
      for (let i = 0; i <= 4; i++) {
        const k = word[i].toLowerCase();
        if (word[i] === currentActualWord[i]) {
          arr.push(':E');
          setKeyboard((keys) => ({ ...keys, [k]: 'E' }));
        } else if (currentActualWord.includes(word[i])) {
          arr.push(':Y');
          if (keyboard[k] !== 'E') {
            setKeyboard((keys) => ({ ...keys, [k]: 'Y' }));
          }
        } else {
          arr.push(':N');
          if (keyboard[k] !== 'E' && keyboard[k] !== 'Y') {
            setKeyboard((keys) => ({ ...keys, [k]: 'N' }));
          }
        }
      }

      let j = 0;
      for (let i = lower; i <= upper; i++) {
        newWords[i] += arr[j];
        j++;
      }

      setWords(() => newWords);
    };
    const revertBack = () => {
      const newWords = [...words];
      const [lower, upper] = RANGE[currentWord];

      for (let i = lower; i <= upper; i++) {
        newWords[i] = newWords[i].split(':')[0];
      }

      setWords(() => newWords);
    };

    const handleError = () => {
      const newWords = [...words];
      const [lower, upper] = RANGE[currentWord];

      for (let i = lower; i <= upper; i++) {
        newWords[i] += ':R';
      }

      setWords(() => newWords);
      setTimeout(revertBack, 100);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentLetter >= 0 && currentLetter <= 30 && !modal.open) {
        const code = e.key.toLowerCase().charCodeAt(0);
        const newWords = [...words];
        if (
          e.key.length === 1 &&
          code >= 97 &&
          code <= 122 &&
          currentWord <= 6
        ) {
          const [lower, upper] = RANGE[currentWord];
          if (
            currentLetter < 30 &&
            currentLetter >= lower &&
            currentLetter <= upper
          ) {
            newWords[currentLetter] = e.key.toUpperCase();
            setWords(() => newWords);
            setCurrentLetter((current) => current + 1);
          }
        } else if (e.key.toLowerCase() === 'backspace') {
          const [lower, _] = RANGE[currentWord];
          if (currentLetter && currentLetter >= lower + 1) {
            newWords[currentLetter - 1] = 0;
            setWords(() => newWords);
            setCurrentLetter((current) => current - 1);
          }
        } else if (e.key.toLowerCase() === 'enter') {
          const [, upper] = RANGE[currentWord];
          const cw = getCurrentWord();
          const gotAWord = currentLetter === upper + 1;
          if (gotAWord && WORDS[cw] && !usedWords[cw]) {
            checkWord(cw);
            setCurrentWord((word) => word + 1);
            setUsedWords((words) => ({ ...words, [cw]: true }));
            if (!checkWin() && currentWord === 6) {
              setModal({ open: true, state: 'loose' });
            }
          } else if (gotAWord) handleError();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    words,
    currentLetter,
    currentWord,
    WORDS,
    currentActualWord,
    usedWords,
    keyboard,
    modal.open,
  ]);

  return (
    <div className='bg-[#121213] h-screen'>
      <header className='border  border-x-0 border-solid	border-zinc-800 p-3'>
        <h1 className='text-4xl text-center font-bold text-slate-100'>
          Wordle
        </h1>
      </header>
      <main>
        <Board>{keys}</Board>
        <Keyboard keys={keyboard} />
      </main>
      <Modal
        open={modal.open}
        state={modal.state}
        onClose={onClose}
        actualWord={currentActualWord}
      />
    </div>
  );
};

export async function getStaticProps() {
  const WORDS = Object.keys(data);
  return {
    props: {
      actualWord: WORDS[Math.floor(Math.random() * WORDS.length)],
      WORDS: data,
    },
  };
}

export default Home;
