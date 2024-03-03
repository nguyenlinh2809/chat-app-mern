import Message from './Message';
import useGetMessages from '../hooks/userGetMessages';
import useConversation from '../store/useConversation';
import { useEffect, useRef } from 'react';
import { useListenIoMessage } from '../hooks/useListenIoMessage';

function Messages() {
  const [loading] = useGetMessages();
  const { messages } = useConversation();
  const ref = useRef();
  useListenIoMessage();

  useEffect(() => {
    setTimeout(() => {
      ref?.current?.scrollIntoView(false);
      console.log(ref);
    }, 0);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && <MessageSkeleton />}

      {!loading &&
        messages.map((message) => (
          <div key={message._id} ref={ref}>
            <Message message={message} />
          </div>
        ))}

      {!loading && !messages.length && (
        <div className="text-white text-center">Type and send a message</div>
      )}
    </div>
  );
}

export default Messages;

const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 items-center">
        <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-48"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
};
