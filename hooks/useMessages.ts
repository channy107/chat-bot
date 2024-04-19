import { SENDER_TYPE } from "@/constants/openai";
import { addMessage } from "@actions/message";
import { useMessageStore } from "@stores/message";

const useMessages = () => {
  const prevMessages = useMessageStore((state) => state.messages);
  const updateMessages = useMessageStore((state) => state.updateMessages);

  const addMessagesToFront = (
    userMessage: string | null,
    assistantMessage: string | null
  ) => {
    const newMessages = [
      ...prevMessages,
      { content: userMessage, senderType: SENDER_TYPE.USER },
      { content: assistantMessage, senderType: SENDER_TYPE.ASSISTANT },
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
