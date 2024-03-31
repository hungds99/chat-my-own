import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/tw';

export type Message = {
  id: string;
  message: string;
  role: 'user' | 'bot';
};

type ChatMessageProps = {
  message: Message;
};

export default function ChatMessage(props: ChatMessageProps) {
  const { message } = props;

  return (
    <div className='flex items-center space-x-2'>
      <div
        className={cn('flex flex-1 space-x-2', {
          'justify-end': message.role === 'user',
        })}
      >
        <Avatar className='order-2 w-8 h-8'>
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
          <div dangerouslySetInnerHTML={{ __html: message.message }} />
        </div>
      </div>
    </div>
  );
}
