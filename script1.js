const fs = require('fs');
const { default: ollama } = require("ollama");
const { join } = require('path');


async function chatWithModel(content) {
  try {
    const response = await ollama.chat({
      model: "llama3.2:latest",
      messages: [{ role: "user", content }]
    });

    return response.message.content; 
  } catch (error) {
    throw new Error(`Ollama API error: ${error.message}`);
  }
}


async function processAllFiles(inputFolderPath, outputFolderPath) {
  try {
 
    if (!fs.existsSync(outputFolderPath)) {
      fs.mkdirSync(outputFolderPath, { recursive: true });
    }

    const files = fs.readdirSync(inputFolderPath);

    for (const fileName of files) {
      try {
        const inputFilePath = join(inputFolderPath, fileName);
        const inputContent = fs.readFileSync(inputFilePath, "utf-8");

        const chatbotResponse = await chatWithModel(inputContent);

        const outputFilePath = join(outputFolderPath, fileName);
        fs.writeFileSync(outputFilePath, chatbotResponse, "utf-8");

        console.log(`Processed: ${fileName}`);
      } catch (fileError) {
        console.error(`Error processing file ${fileName}:`, fileError.message);
      }
    }

    console.log("All chatbot responses have been saved.");
  } catch (error) {
    console.error("Error occurred while processing files:", error.message);
  }
}

const inputFolderPath = "Question";
const outputFolderPath = "Output";

processAllFiles(inputFolderPath, outputFolderPath);
