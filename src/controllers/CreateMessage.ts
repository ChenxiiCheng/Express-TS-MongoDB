import Message, { MessageModel } from '@schemas/Message';

class CreateMessageController {
  async run(messageData: MessageModel, tags: string[]): Promise<MessageModel> {
    const message = await Message.create({
      subject: 'haha',
      body: 'xixi',
      tags,
    });
    return message;
  }
}

export default CreateMessageController;
