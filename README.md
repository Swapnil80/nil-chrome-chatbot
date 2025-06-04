# NIL (Natural Interaction Layer) Chrome Extension

A Chrome extension that provides a chat interface to interact with the DeepSeek R1 model through Ollama.
![logo01](https://github.com/user-attachments/assets/51f8fde1-ef89-4036-a8a9-747eeb1036dd)

## Prerequisites

1. Chrome browser
2. Ollama installed on your system
3. DeepSeek R1 model pulled in Ollama

## Setup

1. Install Ollama from [https://ollama.ai](https://ollama.ai)

2. Pull the DeepSeek R1 model:
```bash
ollama pull deepseek-r1
```

3. Install the Chrome Extension:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the directory containing these files

## Usage

1. Make sure Ollama is running on your system

2. Click the DeepSeek Chatbot icon in your Chrome toolbar to open the chat interface

3. Start chatting! The extension will maintain conversation history during your session

## Features

- Clean, modern chat interface
- Real-time connection status with Ollama
- Conversation history
- Error handling for API communication
- Uses the DeepSeek R1 model for high-quality responses

## Note

Make sure Ollama is running on your system before using the extension. The extension communicates with Ollama running on localhost:11434.

## Development

The extension consists of:
- `manifest.json`: Extension configuration
- `popup.html`: Chat interface
- `popup.js`: Chat functionality
- `icons/`: Extension icons (you'll need to add these) 

To resolve the "address already in use" error, you might need to manually stop the Ollama service on your system. You might need to consult the Ollama documentation or search online for how to stop the Ollama background service on macOS based on your installation method. Common ways might involve using `launchctl` if it's a launchd service, or other service management tools.

Once you have confirmed that the Ollama service is completely stopped and no `ollama` process is running and listening on port 11434 (you can verify this with `lsof -i :11434`), then you can try running the command to start Ollama with the correct origins:

```bash
OLLAMA_ORIGINS=chrome-extension://kalbpplgpfneinipiemjppgpbnblkmei ollama serve
```
Please let me know when you have successfully stopped the Ollama service, and then we can try running the command above again

## What does Nil Look like?
NIL was meant to be integrated in such a way that you can access it whenever you want and It wont take a whole lot of your space or an extra Tab in your browser. That's why I decided to make it as Chrome Extension.
![image](https://github.com/user-attachments/assets/1b6b0e98-bbdb-4d66-814d-c3cc76cabc9d)


<img width="397" alt="Screenshot 2025-05-30 at 2 55 46 pm" src="https://github.com/user-attachments/assets/15b482aa-dcfd-4636-8665-010f71d86e6c" />
<img width="398" alt="Screenshot 2025-05-30 at 2 56 01 pm" src="https://github.com/user-attachments/assets/f65cc6d7-7687-47ea-94a0-ac31e24d13d6" />
<img width="401" alt="Screenshot 2025-05-30 at 2 57 37 pm" src="https://github.com/user-attachments/assets/6577f7d2-9e21-478c-b274-3653ece425f5" />
<img width="399" alt="Screenshot 2025-05-30 at 2 57 47 pm" src="https://github.com/user-attachments/assets/99b35ec4-5a8b-469d-9387-44046bb8c051" />




