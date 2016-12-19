//The syntax of this model does the same as the User model's syntax
export class Message {
  content: string;
  username: string;
  //ID the message and the user for DB CRUD
  //UserID will help to id the creator of the message
  //messageID to id different messages, same content.
  messageId?: string;
  userId?: string;

  constructor(
    content: string,
    username: string,
    messageId?: string,
    userId?: string){
    this.content = content;
    this.username = username;
    this.userId = userId;
    this.messageId = messageId;
  }
}
