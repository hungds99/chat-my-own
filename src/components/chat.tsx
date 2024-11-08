'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/tw';
import { useChat } from 'ai/react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export default function Chat() {
  const { messages, input, handleSubmit, handleInputChange, isLoading } = useChat({
    api: '/api/open-ai/chat',
  });

  return (
    <div className='relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2'>
      <div className='space-y-2 mb-4'>
        <div className='flex items-center space-x-2'>
          <Avatar className='w-8 h-8'>
            <AvatarImage
              alt='User'
              src='https://api.dicebear.com/8.x/adventurer/svg?seed=Trouble'
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className='text-md font-medium leading-none'>You</div>
        </div>
        <div className='space-y-4'>
          {messages.map((message) => (
            <div key={message.id} className='flex items-center space-x-2'>
              <div
                className={cn('flex flex-1 space-x-2', {
                  'justify-end': message.role === 'user',
                })}
              >
                <Avatar className='w-8 h-8'>
                  <AvatarImage
                    alt='User'
                    src={
                      message.role === 'user'
                        ? 'https://api.dicebear.com/8.x/adventurer/svg?seed=Trouble'
                        : 'https://api.dicebear.com/8.x/bottts/svg?seed=Felix'
                    }
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className='rounded-lg p-3 bg-gray-100 dark:bg-gray-800'>
                  <div dangerouslySetInnerHTML={{ __html: message.content }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex-1' />
      <form onSubmit={handleSubmit}>
        <div className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'>
          <Label htmlFor='message' className='sr-only'>
            Message
          </Label>
          <Textarea
            id='message'
            placeholder='Type your message here...'
            className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <div className='flex items-center p-3 pt-0'>
            <Button type='submit' size='sm' className='ml-auto gap-1.5'>
              <Send className='size-3.5' />
              Ask AI
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
