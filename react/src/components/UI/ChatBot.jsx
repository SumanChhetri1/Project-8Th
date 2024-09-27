import React, { useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';

const ChatBot = () => {
    const handleNewUserMessage = async (newMessage) => {
        try {
            const response = await axios.post('/api/chatbot-response', {
                message: newMessage,
            });
          
            if (response.data) {
                addResponseMessage(response.data.response);
            } else {
                addResponseMessage('Sorry, I couldn’t understand that. Could you please try again?');
            }
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            addResponseMessage('Error: Unable to connect to the chatbot service.');
        }
    };
     // useEffect to send a default greeting message when the chatbot loads
    useEffect(() => {
        addResponseMessage("Hello! Welcome to our vehicle rental service. How can I assist you today?");
    }, []);

    return (
        <div>
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                title="Vehicle Rental Support"
                subtitle="Ask us anything about renting a vehicle!"
                //profileAvatar="/path/to/avatar.png" // Optional: Add a custom avatar
            />
        </div>
    );
};

export default ChatBot;
