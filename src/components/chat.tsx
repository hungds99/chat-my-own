'use client';

import ChatInput from '@/components/chat-input';
import ChatMessage, { Message } from '@/components/chat-message';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateId } from '@/lib/math';
import { readChunks } from '@/lib/stream';
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    setLoading(true);
    setMessages((prev: Message[]) => {
      return [...prev, { id: generateId(), message, role: 'user' }];
    });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
          question: message,
        }),
      });

      const reader = response.body?.getReader();

      let result = '';
      // let messageIndex: number | null = null;

      for await (const chunk of readChunks(reader)) {
        result += chunk;

        // setMessages((prevMessages) => {
        //   let newMessages = [...prevMessages];
        //   if (messageIndex === null || newMessages[messageIndex] === undefined) {
        //     messageIndex = newMessages.length;
        //     newMessages.push({
        //       id: Math.random().toString(),
        //       message: chunk,
        //       role: 'bot',
        //     });
        //   } else if (newMessages[messageIndex] !== undefined) {
        //     newMessages[messageIndex].message += chunk;
        //   }
        //   return newMessages;
        // });
      }

      setMessages((prev: Message[]) => {
        return [...prev, { id: generateId(), message: result, role: 'bot' }];
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

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
            <ChatMessage key={message.id} message={{ ...message }} />
          ))}
        </div>
      </div>
      <div className='flex-1' />
      <ChatInput loading={loading} onSubmit={sendMessage} />
    </div>
  );
}
