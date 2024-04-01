import { BotMessageSquare } from 'lucide-react';
import Link from 'next/link';

import Nav from './nav';

export default function Sidebar() {
  return (
    <div className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link href='/' className='flex items-center gap-2 font-semibold'>
            <BotMessageSquare className='h-10 w-10' />
            <span className='text-xl'>Chat My Own</span>
          </Link>
        </div>
        <div className='flex-1'>
          <Nav />
        </div>
      </div>
    </div>
  );
}
