import fs from "fs";
import ollama from "ollama";


function loadFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error('Error loading file at ${filePath}:, error.message');
    throw error;
  }
}


function saveFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log('Response has been saved to ${filePath}.');
  } catch (error) {
    console.error('Error saving to file at ${filePath}:, error.message');
    throw error;
  }
}


async function executeChat() {
  try {
    const inputFilePath = "q.txt";
    const inputContent = loadFile(inputFilePath);

    const response = await ollama.chat({
      model: "qwen2:0.5b",
      messages: [{ role: "user", content: inputContent }]
    });

    const chatbotResponse = response.message.content;

    const outputFilePath = "a.txt";
    saveFile(outputFilePath, chatbotResponse);
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

executeChat();



// import fs from "fs/promises";
// import ollama from "ollama";


// const inputFilePath = "input.txt";
// const outputFilePath = "output.txt";

// const inputContent = await fs.readFile(inputFilePath, "utf-8",(err)=>{
//   if(err) throw err;
//   console.log("input.txt has been read.");
// });

// async function getChatbotResponse(inputContent) {
//   // Asking ollama chatbot
//   const response = await ollama.chat({
//     model: "llama3.2:latest",
//     messages: [{ role: "user", content: inputContent }],
//   });

//   // Fetching chatbot answer
//   return response?.message?.content || "No response from chatbot.";
// }

// const chatbotResponse = await getChatbotResponse(inputContent);

// // Writing chatbot answer to output.txt
// await fs.writeFile(outputFilePath, chatbotResponse,(err)=>{
//   if(err) throw err;
//   console.log("output.txt has been written.");
// });