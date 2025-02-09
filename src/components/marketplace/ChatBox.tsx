import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender?: {
    full_name: string;
    avatar_url: string;
  };
}

interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  currentUserId: string;
}

export function ChatBox({
  messages,
  onSendMessage,
  currentUserId,
}: ChatBoxProps) {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg bg-background">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${msg.sender_id === currentUserId ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.sender?.avatar_url} />
                <AvatarFallback>{msg.sender?.full_name?.[0]}</AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-3 max-w-[80%] ${msg.sender_id === currentUserId ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
