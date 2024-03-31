'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CornerDownLeft, Mic, Paperclip, Send } from 'lucide-react';
import { useState } from 'react';

type ChatInputProps = {
  onSubmit: (message: string) => void;
  loading?: boolean;
};

export default function ChatInput(props: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event?.preventDefault();
    props.onSubmit(message);
    setMessage('');
  };

  return (
    <div className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'>
      <Label htmlFor='message' className='sr-only'>
        Message
      </Label>
      <Textarea
        id='message'
        placeholder='Type your message here...'
        className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
        value={message}
        onChange={handleChange}
      />
      <div className='flex items-center p-3 pt-0'>
        <Button
          size='sm'
          className='ml-auto gap-1.5'
          onClick={handleSubmit}
          disabled={props.loading || !message.trim()}
        >
          <Send className='size-3.5' />
          Send Message
        </Button>
      </div>
    </div>
  );
}
