import { ReactElement } from 'react';

type props = {
  children: ReactElement[];
};
export default function Board({ children }: props): ReactElement {
  return (
    <div className='mx-auto my-20 h-[455px] w-[455px] grid grid-rows-6 grid-cols-5 gap-2'>
      {children}
    </div>
  );
}
