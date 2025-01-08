const fs = require('fs');
const { default: ollama } = require("ollama");
const { join } = require('path');

// Function to interact with the Ollama API
async function chatWithModel(content) {
  try {
    const response = await ollama.chat({
      model: "llama3.2:latest",
      messages: [{ role: "user", content }]
    });

    return response.message.content; // Return chatbot response content
  } catch (error) {
    throw new Error(`Ollama API error: ${error.message}`);
  }
}

// Function to process all files in the folder
async function processAllFiles(inputFolderPath, outputFolderPath) {
  try {
    // Ensure the output directory exists
    if (!fs.existsSync(outputFolderPath)) {
      fs.mkdirSync(outputFolderPath, { recursive: true });
    }

    // Read all files from the input directory
    const files = fs.readdirSync(inputFolderPath);

    for (const fileName of files) {
      try {
        const inputFilePath = join(inputFolderPath, fileName);
        const inputContent = fs.readFileSync(inputFilePath, "utf-8");

        // Get the chatbot response
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

// Input and Output folder paths
const inputFolderPath = "Question";
const outputFolderPath = "Output";

// Start processing files
processAllFiles(inputFolderPath, outputFolderPath);
