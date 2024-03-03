import { useEffect, useState } from 'react';
import useConversation from '../store/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = function () {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, setMessages } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);

  return [loading];
};

export default useGetMessages;
