import congrats from './../assets/congrats.gif';
import tryAgain from './../assets/tryagain.gif';

import Image from 'next/image';

type prop = {
  open: boolean;
  state: 'win' | 'loose';
  onClose: () => void;
  actualWord: string;
};

export default function Modal({
  open,
  state,
  onClose,
  actualWord,
}: prop): JSX.Element | null {
  if (!open) return null;
  let gif;
  let text;
  let color;
  if (state === 'win') {
    gif = <Image src={congrats} alt='Congrats' height={300} width={300} />;
    text = 'Congratulations!';
    color = 'text-green-500';
  } else {
    gif = <Image src={tryAgain} alt='Congrats' height={300} width={300} />;
    text = 'Well Played :(';
    color = 'text-red-500';
  }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
      <div className='w-[500px] h-[600px] flex flex-col items-center justify-center bg-zinc-600 bg-opacity-95 relative rounded-md text-slate-100'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-8 h-8 absolute right-1 top-1 cursor-pointer'
          onClick={onClose}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <h1 className='text-4xl font-mono'>{text}</h1>
        <h2 className={`text-3xl font-bold ${color}`}>
          {actualWord.toUpperCase()}
        </h2>
        {gif}
        <button
          className='p-3 bg-zinc-500 rounded-md flex items-center justify-center gap-2'
          onClick={onClose}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
            />
          </svg>
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
