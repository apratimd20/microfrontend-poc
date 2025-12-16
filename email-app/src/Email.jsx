import React, { useState } from 'react';
import Card from 'host/Card';
import Button from 'host/Button';

const emails = [
    { id: 1, subject: "Welcome to React MFE", from: "admin@example.com", body: "This is a POC for Micro-Frontends." },
    { id: 2, subject: "Meeting Reminder", from: "boss@example.com", body: "Don't forget the meeting at 10 AM." },
    { id: 3, subject: "Newsletter", from: "news@example.com", body: "Check out the latest tech trends." }
];

const Email = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);

    return (
        <Card title="Email Micro-Frontend">
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '40%', borderRight: '1px solid #ccc', paddingRight: '10px' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {emails.map(email => (
                            <li key={email.id} style={{ marginBottom: '10px' }}>
                                <Button onClick={() => setSelectedEmail(email)}>
                                    {email.subject}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ width: '60%' }}>
                    {selectedEmail ? (
                        <div>
                            <h4>{selectedEmail.subject}</h4>
                            <p><strong>From:</strong> {selectedEmail.from}</p>
                            <p>{selectedEmail.body}</p>
                            <Button onClick={() => setSelectedEmail(null)}>Close</Button>
                        </div>
                    ) : (
                        <p>Select an email to read</p>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default Email;
