type Prop = {
  keys: { [key: string]: string };
};
export default function Keyboard({ keys }: Prop): JSX.Element {
  const listKeys = Object.entries(keys).map(([key, mode]) => {
    const backspace = (
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
          d='M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z'
        />
      </svg>
    );

    let bg = 'bg-zinc-500';
    switch (mode) {
      case 'E':
        bg = 'bg-green-500';
        break;
      case 'Y':
        bg = 'bg-yellow-500';
        break;
      case 'N':
        bg = 'bg-zinc-700';
        break;
      default:
        break;
    }

    return (
      <li
        onClick={() => {}}
        className={`text-slate-100 text-md flex items-center justify-center h-7 py-7 rounded cursor-pointer ${bg} ${
          key === 'enter' && 'col-span-2'
        }`}
        key={`KEYBOARD ${key}`}
      >
        {key === 'backspace' ? backspace : key.toUpperCase()}
      </li>
    );
  });

  return (
    <div className='mx-auto my-2 absolute bottom-0 right-1 left-1 w-[500px]'>
      <ul className='grid grid-row-3 grid-cols-10 gap-2'>{listKeys}</ul>
    </div>
  );
}
