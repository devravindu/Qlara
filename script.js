// This is the JavaScript file for the project.

// Get references to DOM elements
const topicInput = document.getElementById('topicInput');
const generateBtn = document.getElementById('generateBtn');
const quoteDisplay = document.getElementById('quoteDisplay');

// IMPORTANT: Replace "YOUR_OPENAI_API_KEY_HERE" with your actual OpenAI API key
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";

// Function to generate a quote
function generateQuote() {
    const topic = topicInput.value.trim();

    // 1. Check for empty topic input
    if (!topic) {
        quoteDisplay.textContent = "Please enter a topic.";
        return;
    }

    // 2. Check if API key is the placeholder
    if (OPENAI_API_KEY === "YOUR_OPENAI_API_KEY_HERE") {
        quoteDisplay.textContent = "Please configure the OpenAI API key.";
        return;
    }

    // Simulate API call for now (if both checks above pass)
    quoteDisplay.textContent = `This is a sample quote about ${topic}.`;
}

// Add event listener to the generate button
generateBtn.addEventListener('click', generateQuote);
