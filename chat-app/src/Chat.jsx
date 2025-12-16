import React, { useState, useEffect } from 'react';
import Card from 'host/Card';
import Button from 'host/Button';
import eventBus from 'host/eventBus';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [hostMsg, setHostMsg] = useState('');

    useEffect(() => {
        // Listen for events from Host
        const handleHostNotification = (data) => {
            setHostMsg(data.message);
        };
        if (eventBus) {
            eventBus.on('host_notification', handleHostNotification);
        }
        return () => {
            // cleanup
        };
    }, []);

    const sendMessage = () => {
        if (!input.trim()) return;
        const newMsgs = [...messages, { id: Date.now(), text: input }];
        setMessages(newMsgs);
        setInput('');

        // Notify host about unread count (simulated logic)
        if (eventBus) {
            eventBus.dispatch('unread_count_update', newMsgs.length);
        }
    };

    return (
        <Card title="Chat Micro-Frontend">
            {hostMsg && <div style={{ background: 'yellow', padding: '5px' }}>Host says: {hostMsg}</div>}
            <div style={{ border: '1px solid #ccc', height: '150px', overflowY: 'auto', marginBottom: '10px', padding: '10px' }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{ marginBottom: '5px' }}>
                        <strong>User:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ flex: 1, padding: '8px' }}
                    placeholder="Type a message..."
                />
                <Button onClick={sendMessage}>Send</Button>
            </div>
        </Card>
    );
};

export default Chat;
