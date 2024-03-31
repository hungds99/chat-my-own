import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className='flex flex-1 items-center justify-center'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h3 className='text-2xl font-bold tracking-tight'>Welcome to Chat with My Own</h3>
          <p className='text-sm text-muted-foreground'>
            You can start chatting as soon as you click a button.
          </p>
          <Button variant={'link'} className='mt-4'>
            <Link href='/chat'>Start Chatting</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
