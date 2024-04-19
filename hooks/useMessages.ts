import { addMessage } from "@actions/message";
import { useMessageStore } from "@store/message";

const useMessages = () => {
  const prevMessages = useMessageStore((state) => state.messages);
  const updateMessages = useMessageStore((state) => state.updateMessages);

  const addMessagesToFront = (
    userMessage: string | null,
    assistantMessage: string | null
  ) => {
    const newMessages = [
      ...prevMessages,
      { content: userMessage, senderType: "user" },
      { content: assistantMessage, senderType: "assistant" },
    ];
    updateMessages(newMessages);
  };

  const addMessagesToServer = async (
    conversationId: string,
    prompt: string,
    responseMessage: string | null
  ) => {
    await addMessage(conversationId, prompt, responseMessage);
  };
  return { addMessagesToFront, addMessagesToServer };
};

export default useMessages;
