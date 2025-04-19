export interface ChatMessage {
  id: string;
  content: any;
  isUser: boolean;
  isLoading?: boolean;
}
