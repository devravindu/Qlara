// This is the JavaScript file for the project.

// Get references to DOM elements
const topicInput = document.getElementById('topicInput');
const generateBtn = document.getElementById('generateBtn');
const quoteDisplay = document.getElementById('quoteDisplay');
const loadingIndicator = document.getElementById('loadingIndicator');

// IMPORTANT: Replace "YOUR_OPENAI_API_KEY_HERE" with your actual OpenAI API key
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";

// Function to generate a quote
function generateQuote() {
    const topic = topicInput.value.trim();

    // Show loading indicator and clear previous quote
    loadingIndicator.style.display = "block";
    quoteDisplay.textContent = "";

    // 1. Check for empty topic input
    if (!topic) {
        quoteDisplay.textContent = "Please enter a topic.";
        loadingIndicator.style.display = "none";
        return;
    }

    // 2. Check if API key is the placeholder
    if (OPENAI_API_KEY === "YOUR_OPENAI_API_KEY_HERE") {
        quoteDisplay.textContent = "Please configure the OpenAI API key.";
        loadingIndicator.style.display = "none";
        return;
    }

    // Prepare for API call
    const prompt = `Generate a short, inspirational quote about "${topic}".`;

    // Make the API call to OpenAI
    // For more information on the OpenAI API, visit: https://beta.openai.com/docs/
    // This example uses the "completions" endpoint with "text-davinci-003".
    // For chat-based models like "gpt-3.5-turbo" or "gpt-4", you would use the "chat/completions" endpoint
    // and structure the 'messages' array accordingly.
    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003", // Or a newer model like "gpt-3.5-turbo" if using Chat Completions
            prompt: prompt,
            max_tokens: 60, // Adjust as needed for quote length
            temperature: 0.7 // Adjust for creativity (0.0 to 1.0, higher is more creative)
        })
    })
    .then(response => {
        if (!response.ok) {
            // Try to get more specific error from OpenAI response
            return response.json().then(errorData => {
                throw new Error(`OpenAI API Error: ${response.status} ${response.statusText}. Details: ${errorData.error ? errorData.error.message : 'No specific details.'}`);
            }).catch(() => {
                // Fallback if parsing errorData fails
                throw new Error(`OpenAI API Error: ${response.status} ${response.statusText}.`);
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.choices && data.choices.length > 0 && data.choices[0].text) {
            quoteDisplay.textContent = data.choices[0].text.trim();
        } else {
            quoteDisplay.textContent = "Could not generate a quote. The API returned an unexpected response.";
        }
    })
    .catch(error => {
        console.error("Error calling OpenAI API:", error);
        quoteDisplay.textContent = `Error: ${error.message}. Check the console for more details.`;
    })
    .finally(() => {
        loadingIndicator.style.display = "none";
    });
}

// Add event listener to the generate button
generateBtn.addEventListener('click', generateQuote);
