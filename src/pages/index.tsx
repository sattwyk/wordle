import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Board from '../components/Board';
import Key from '../components/Key';
const Home: NextPage = () => {
  const [word, setWord] = useState(Array(30).fill(0));

  const [currentLetter, setCurrentLetter] = useState(0);

  const keys = word.map((letter, i) => <Key key={i} letter={letter} />);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentLetter >= 0 && currentLetter <= 30) {
        const code = e.key.toLowerCase().charCodeAt(0);
        const newWord = [...word];
        if (e.key.length === 1 && code >= 97 && code <= 122) {
          if (currentLetter < 30) {
            newWord[currentLetter] = e.key.toUpperCase();
            setWord(() => newWord);
            setCurrentLetter((current) => current + 1);
          }
        } else if (e.key.toLowerCase() === 'backspace') {
          if (currentLetter) {
            newWord[currentLetter - 1] = 0;
            setWord(() => newWord);
            setCurrentLetter((current) => current - 1);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [word, currentLetter]);

  return (
    <div className='bg-[#121213] h-screen'>
      <header className='border  border-x-0 border-solid	border-gray-800 p-3'>
        <h1 className='text-4xl text-center font-bold text-slate-100'>
          Wordle {currentLetter}
        </h1>
      </header>
      <main>
        <Board>{keys}</Board>
      </main>
    </div>
  );
};

export default Home;
