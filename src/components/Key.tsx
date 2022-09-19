export default function Keys({ letter }: { letter: String | 0 }): JSX.Element {
  return (
    <div className='border-4 border-solid flex items-center justify-center border-gray-700'>
      <span className='text-4xl font-bold text-slate-100'>
        {letter ? letter : null}
      </span>
    </div>
  );
}
