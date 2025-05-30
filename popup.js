let conversationHistory = [];

document.addEventListener('DOMContentLoaded', async function() {
    const chatContainer = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const statusDiv = document.getElementById('status');
    const clearHistoryButton = document.getElementById('clear-history-button');

    // Load conversation history from storage
    await loadConversationHistory();

    // Display loaded history
    renderConversationHistory();

    // Check if Ollama is running
    checkOllamaStatus();

    function checkOllamaStatus() {
        fetch('http://localhost:11434/api/tags')
            .then(response => {
                if (response.ok) {
                    statusDiv.textContent = 'Connected to Ollama';
                    statusDiv.style.color = '#4caf50';
                } else {
                    throw new Error('Ollama not responding');
                }
            })
            .catch(error => {
                statusDiv.textContent = 'Ollama not running';
                statusDiv.style.color = '#f44336';
            });
    }

    function addMessage(content, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = content;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Function to render all messages in conversationHistory
    function renderConversationHistory() {
        chatContainer.innerHTML = ''; // Clear current messages
        conversationHistory.forEach(message => {
            addMessage(message.content, message.role === 'user');
        });
    }

    // Function to load history from chrome.storage
    async function loadConversationHistory() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['conversationHistory'], function(result) {
                if (result.conversationHistory) {
                    conversationHistory = result.conversationHistory;
                } else {
                    conversationHistory = [];
                }
                resolve();
            });
        });
    }

    // Function to save history to chrome.storage
    async function saveConversationHistory() {
        return new Promise((resolve) => {
            chrome.storage.local.set({'conversationHistory': conversationHistory}, function() {
                resolve();
            });
        });
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message to UI
        addMessage(message, true);
        userInput.value = '';

        // Add to conversation history
        conversationHistory.push({ role: 'user', content: message });
        await saveConversationHistory();

        try {
            const response = await fetch('http://localhost:11434/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'deepseek-r1',
                    messages: conversationHistory,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response from Ollama');
            }

            const data = await response.json();
            let botResponse = data.message.content;

            // Remove content within <think>...</think> tags
            const thinkTagRegex = /<think>[\s\S]*?<\/think>/g;
            botResponse = botResponse.replace(thinkTagRegex, '').trim();

            // Post-process the response to replace "AI assistant" with "NIL - AI assistant"
            botResponse = botResponse.replace(/AI assistant/g, 'NIL - AI assistant');

            // Simple Markdown to HTML conversion:
            // Convert bold text (**text** to <strong>text</strong>)
            botResponse = botResponse.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            
            // Convert numbered lists (e.g., 1. Item to <li>Item</li> and wrap in <ol>)
            // This is a basic conversion and might not handle all cases perfectly.
            const listItems = botResponse.split('\n').map(line => {
                if (/^\d+\.\s/.test(line)) {
                    return `<li>${line.substring(line.indexOf('.') + 1).trim()}</li>`;
                } else {
                    return line;
                }
            });
            
            // Simple approach to wrap consecutive list items in <ol>
            let htmlResponse = '';
            let inList = false;
            listItems.forEach(item => {
                if (item.startsWith('<li>')) {
                    if (!inList) {
                        htmlResponse += '<ol>';
                        inList = true;
                    }
                    htmlResponse += item;
                } else {
                    if (inList) {
                        htmlResponse += '</ol>';
                        inList = false;
                    }
                    htmlResponse += item + '<br/>'; // Add line break for non-list items
                }
            });
            if (inList) {
                htmlResponse += '</ol>';
            }

            botResponse = htmlResponse;

            // Add bot response to UI
            addMessage(botResponse, false);

            // Add to conversation history
            conversationHistory.push({ role: 'assistant', content: botResponse });
            await saveConversationHistory();

        } catch (error) {
            addMessage('Error: Could not connect to Ollama. Make sure it is running.', false);
            console.error('Error:', error);
        }
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Clear history button event listener
    clearHistoryButton.addEventListener('click', async function() {
        conversationHistory = []; // Clear the conversation history array
        chatContainer.innerHTML = ''; // Remove all messages from the UI
        await chrome.storage.local.remove('conversationHistory');
    });
}); 