import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../hooks/useSendMessage';

function MessageInput() {
  const [message, setMessage] = useState('');
  const [loading, sendMessage] = useSendMessage();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    sendMessage(message);
    setMessage('');
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="absolute inset-y-0 end-0 flex items-center pe-3 text-white">
          {loading ? 'Loading...' : <BsSend />}
        </button>
      </div>
    </form>
  );
}

export default MessageInput;