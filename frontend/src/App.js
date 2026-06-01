import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function App() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userText = message;

    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: userText
      }
    ]);

    setMessage("");

    try {

      const res = await axios.post(
        "http://localhost:5000/api/chat",
        {
          message: userText
        }
      );

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: res.data.reply
        }
      ]);

    } catch {

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong."
        }
      ]);
    }
  };


  const handleKeyPress = (e) => {

    if (e.key === "Enter") {
      sendMessage();
    }
  };


  return (

    <div style={styles.page}>

      <div style={styles.chatContainer}>

        <div style={styles.header}>
          Education Assistant
        </div>


        <div style={styles.messagesContainer}>

          {messages.map((msg, index) => (

            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user"
                    ? "flex-end"
                    : "flex-start"
              }}
            >

              <div
                style={{
                  ...styles.messageBubble,

                  ...(msg.sender === "user"
                    ? styles.userBubble
                    : styles.botBubble)
                }}
              >

                <div style={{ lineHeight: "1.6" }}>

                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                  >
                    {msg.text}
                  </ReactMarkdown>

                </div>

              </div>

            </div>

          ))}

        </div>


        <div style={styles.inputContainer}>

          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={handleKeyPress}
            placeholder="Ask about the course..."
            style={styles.input}
          />


          <button
            onClick={sendMessage}
            style={styles.sendButton}
          >
            ↑
          </button>

        </div>

      </div>

    </div>
  );
}


const styles = {

  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb"
  },


  chatContainer: {
    width: "900px",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    background: "white",
    borderRadius: "20px",
    boxShadow:
      "0 4px 20px rgba(0,0,0,0.1)",
    overflow: "hidden"
  },


  header: {
    padding: "20px",
    fontSize: "22px",
    fontWeight: "bold",
    borderBottom: "1px solid #eee"
  },


  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },


  messageBubble: {
    maxWidth: "70%",
    padding: "14px 18px",
    borderRadius: "20px",
    fontSize: "15px"
  },


  userBubble: {
    background: "#2563eb",
    color: "white"
  },


  botBubble: {
    background: "#f1f5f9",
    color: "#111"
  },


  inputContainer: {
    display: "flex",
    padding: "20px",
    gap: "12px",
    borderTop: "1px solid #eee"
  },


  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "#f1f5f9",
    borderRadius: "30px",
    padding: "16px 20px",
    fontSize: "16px"
  },


  sendButton: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    fontSize: "22px",
    background: "#111",
    color: "white"
  },
  markdown: {
  fontSize: "15px"
}
};


export default App;