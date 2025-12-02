import React, { useState, useRef, useEffect } from "react";

function MessagePage() {
  const chatList = [
    { id: 1, name: "Rahul", img: "https://i.pravatar.cc/40?img=1" },
    { id: 2, name: "Priya", img: "https://i.pravatar.cc/40?img=2" },
    { id: 3, name: "Ankit", img: "https://i.pravatar.cc/40?img=3" }
  ];

  const initialMessages = {
    1: [
      { id: 1, sender: "other", text: "Hi 👋" },
      { id: 2, sender: "me", text: "Hello Rahul!" }
    ],
    2: [
      { id: 1, sender: "other", text: "Send me the file" },
      { id: 2, sender: "me", text: "Sure Priya!" }
    ],
    3: [
      { id: 1, sender: "other", text: "Let's meet today" },
      { id: 2, sender: "me", text: "Yes, Ankit!" }
    ]
  };

  const [activeChat, setActiveChat] = useState(chatList[0]);
  const [messages, setMessages] = useState(initialMessages[chatList[0].id]);
  const [allMessages, setAllMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectChat = (chat) => {
    setActiveChat(chat);
    setMessages(allMessages[chat.id] || []);
  };

  const sendMessage = () => {
    if (input.trim() === "") return;

    const textToSend = input;

    const newMsg = {
      id: (messages?.length || 0) + 1,
      sender: "me",
      text: textToSend
    };

    const updatedMessages = [...(messages || []), newMsg];
    setMessages(updatedMessages);
    setAllMessages(prev => ({
      ...prev,
      [activeChat.id]: updatedMessages
    }));

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const deleteMessage = (msgId) => {
    const updatedMessages = messages.filter(msg => msg.id !== msgId);
    setMessages(updatedMessages);
    setAllMessages({
      ...allMessages,
      [activeChat.id]: updatedMessages
    });
  };

  return (
    <div className="container-fluid p-0" style={{ height: "100vh" }}>
      <div className="row h-100">

        {/* LEFT SIDEBAR */}
        <div className="col-12 col-md-4 border-end p-0">
          <div className="p-3 border-bottom d-flex justify-content-between">
            <h5 className="m-0">Messages</h5>
          </div>

          <div className="overflow-auto" style={{ height: "90vh" }}>
            {chatList.map(chat => (
              <div
                key={chat.id}
                onClick={() => selectChat(chat)}
                className={`d-flex align-items-center px-3 py-2 chat-hover border-bottom ${activeChat.id === chat.id ? 'bg-light' : ''}`}
                style={{ cursor: "pointer" }}
              >
                <img src={chat.img} alt="" className="rounded-circle me-3" />
                <div>
                  <strong>{chat.name}</strong>
                  <div className="text-muted small">
                    {allMessages[chat.id]?.length ? allMessages[chat.id][allMessages[chat.id].length - 1].text : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CHAT WINDOW */}
        <div className="col-12 col-md-8 d-flex flex-column p-0">

          {/* Header */}
          <div className="p-3 border-bottom d-flex align-items-center">
            <img src={activeChat.img} alt="" className="rounded-circle me-2" />
            <strong>{activeChat.name}</strong>
          </div>

          {/* Messages */}
          <div className="flex-grow-1 p-3 overflow-auto" style={{ background: "#fafafa" }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`d-flex mb-3 ${msg.sender === "me" ? "justify-content-end" : "justify-content-start"}`}
              >
                <div className="d-flex align-items-center">
                  <div
                    className={`p-2 rounded-3 ${msg.sender === "me" ? "bg-primary text-white" : "bg-light"}`}
                    style={{ maxWidth: "60%", position: "relative" }}
                  >
                    {msg.text}
                  </div>
                  {/* Show delete button only for 'me' messages */}
                  {msg.sender === "me" && (
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      style={{
                        marginLeft: "5px",
                        background: "transparent",
                        border: "none",
                        color: "red",
                        cursor: "pointer"
                      }}
                      title="Delete message"
                    >
                      ❌
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <div className="p-3 border-top">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="btn btn-primary" onClick={sendMessage}>
                <i className="bi bi-send"></i>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default MessagePage;
