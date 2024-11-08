import { LayoutGrid, User2Icon } from 'lucide-react';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
      <Link
        href='#'
        className='flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-muted-foreground transition-all hover:text-primary'
      >
        <LayoutGrid className='h-4 w-4' />
        Home
      </Link>

      <Link
        href='/open-ai'
        className='flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-muted-foreground transition-all hover:text-primary'
      >
        <User2Icon className='h-4 w-4' />
        Open AI
      </Link>
    </nav>
  );
}
