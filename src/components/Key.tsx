export default function Keys({ letter }: { letter: String | 0 }): JSX.Element {
  let bg = 'bg-inherit';
  if (letter) {
    const split = letter.split(':');
    if (split.length === 2) {
      switch (split[1]) {
        case 'E':
          bg = 'bg-green-500';
          break;
        case 'Y':
          bg = 'bg-yellow-500';
          break;
        case 'N':
          bg = 'bg-zinc-800';
        default:
          break;
      }
    }
    letter = split[0];
  }
  return (
    <div
      className={`border-2 border-solid flex items-center justify-center border-zinc-700 ${bg}`}
    >
      <span className='text-4xl font-bold text-slate-100'>
        {letter ? letter : null}
      </span>
    </div>
  );
}
