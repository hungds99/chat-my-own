import { Button } from '@/components/ui/button';
import { BotMessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className='flex flex-1 items-center justify-center'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <BotMessageSquare className='w-10 h-10' color='#2258d8' />
          <h3 className='text-2xl font-bold tracking-tight'>Welcome to Chat with My Own</h3>
          <p className='text-sm text-muted-foreground'>
            You can start chatting as soon as you click a button.
          </p>
          <Button variant={'link'} className='mt-4'>
            <Link href='/ai'>Start Chat</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
