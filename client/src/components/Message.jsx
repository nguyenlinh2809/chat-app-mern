import { useAuthContext } from '../contexts/authContext';
import useConversation from '../store/useConversation';

function Message({ message }) {
  const { selectedConversation } = useConversation();
  const { user } = useAuthContext();
  const fromMe = user._id === message.senderId;
  console.log(message, 'message');
  console.log(selectedConversation, 'selectedConversation');
  return (
    <div className={`chat ${fromMe ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={fromMe ? user.profilePic : selectedConversation.profilePic}
          />
        </div>
      </div>
      <div className="chat-bubble">{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {message.createdAt}
      </div>
    </div>
  );
}

export default Message;
