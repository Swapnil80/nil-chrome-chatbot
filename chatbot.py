import requests
import json
import os
from dotenv import load_dotenv

class DeepSeekChatbot:
    def __init__(self, model_name="deepseek-r1"):
        self.base_url = "http://localhost:11434/api"
        self.model = model_name
        self.conversation_history = []

    def generate_response(self, user_input):
        # Add user message to history
        self.conversation_history.append({"role": "user", "content": user_input})
        
        # Prepare the request payload
        payload = {
            "model": self.model,
            "messages": self.conversation_history,
            "stream": False
        }

        try:
            # Make request to Ollama API
            response = requests.post(f"{self.base_url}/chat", json=payload)
            response.raise_for_status()
            
            # Parse the response
            result = response.json()
            assistant_message = result['message']['content']
            
            # Add assistant response to history
            self.conversation_history.append({"role": "assistant", "content": assistant_message})
            
            return assistant_message

        except requests.exceptions.RequestException as e:
            return f"Error communicating with Ollama: {str(e)}"

def main():
    print("Welcome to the DeepSeek Chatbot!")
    print("Type 'quit' to exit the conversation.")
    
    chatbot = DeepSeekChatbot()
    
    while True:
        user_input = input("\nYou: ").strip()
        
        if user_input.lower() == 'quit':
            print("Goodbye!")
            break
            
        response = chatbot.generate_response(user_input)
        print("\nAssistant:", response)

if __name__ == "__main__":
    main() 