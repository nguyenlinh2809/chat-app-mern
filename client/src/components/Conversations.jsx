import useGetConversations from '../hooks/useGetConversations';
import Conversation from './Coversation';
import useConversation from '../store/useConversation';

function Conversations() {
  const [loading, conversations] = useGetConversations();
  const selectedConversation = useConversation(
    (state) => state.selectedConversation
  );
  const setSelectedConversation = useConversation(
    (state) => state.setSelectedConversation
  );
  const handleClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading && 'Loading...'}
      {!loading &&
        conversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => handleClick(conversation)}
            className={
              selectedConversation?._id === conversation._id
                ? 'bg-blue-500'
                : ''
            }
          >
            <Conversation conversation={conversation} />
          </div>
        ))}
    </div>
  );
}

export default Conversations;
