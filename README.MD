# 🌟 JS Based Personal LLM 🌟

## 🛠️ Setup Instructions

### 1️⃣ Repository Cloning 
1. Open your terminal or command prompt  🖥️
2. Clone the repository using the following command 🔗 
   ```bash
   git clone https://github.com/PranavFaladu/OpenTalkJS
3. Now enter into the clone file by using command 📂
   ```bash
   cd OpenTalkJS
4. Now open the editor ✍️
5. Write the script in the script.js file  📝
   ```bash
   const { default: ollama } = require("ollama"); 

async function runChat() {
  try {
    const response = await ollama.chat({
      model: "llama3.2:latest",
      messages: [{ role: "user", content: "Generate marketing email" }],
    });

    console.log("Chatbot Response:", response.message.content);
  } catch (error) {
    console.error("Error occurred:", error.message || error);
  }
}

runChat();
### 2️⃣ Dependencies installation
1. Check the version for the node using the command 🛠️
   ```bash
   node -v
2. Now install ollam model 📦
   ```bash
   npm install ollama
3. Check the version of the ollama 🔍
   ```bash
   ollama --version

### 3️⃣ Application execution
1. Run the application using the command 🚦
   ```bash 
   node script.js
2. View the Output 🎉
   Your personal LLM will respond to your query about the capital of the UK!


