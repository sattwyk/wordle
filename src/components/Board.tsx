import { ReactElement } from 'react';

type props = {
  children: ReactElement[];
};
export default function Board({ children }: props): ReactElement {
  return (
    <div className='mx-auto my-10 h-[400px] w-[350px] grid grid-rows-6 grid-cols-5 gap-1.5'>
      {children}
    </div>
  );
}
