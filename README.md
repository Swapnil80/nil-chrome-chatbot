# NIL (Natural Interaction Layer) Chrome Extension

A Chrome extension that provides a chat interface to interact with the DeepSeek R1 model through Ollama.

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

Please let me know when you have successfully stopped the Ollama service, and then we can try running the command above again. 