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