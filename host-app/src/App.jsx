import React, { Suspense, useEffect, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import eventBus from './eventBus';
import './design-system/theme.css';

// Lazy load micro-frontends
const ChatApp = React.lazy(() => import('chatApp/Chat'));
const EmailApp = React.lazy(() => import('emailApp/Email'));

const App = () => {
    const [unreadMessages, setUnreadMessages] = useState(0);

    useEffect(() => {
        // Listen for unread message count updates from Chat App
        const handleUnreadUpdate = (count) => {
            console.log("Host received unread count:", count);
            setUnreadMessages(count);
        };

        if (eventBus) {
            eventBus.on('unread_count_update', handleUnreadUpdate);
        }

        return () => {
            if (eventBus) {
                eventBus.remove('unread_count_update', handleUnreadUpdate);
            }
        };
    }, []);

    const notifyApps = () => {
        eventBus.dispatch('host_notification', { message: 'Hello from Host!' });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Host Application (Shell)</h1>
            <p>Unread Chat Messages: <strong>{unreadMessages}</strong></p>
            <button onClick={notifyApps} className="primary-btn">Notify Micro-Apps</button>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ flex: 1 }}>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading Chat...</div>}>
                            <ChatApp />
                        </Suspense>
                    </ErrorBoundary>
                </div>
                <div style={{ flex: 1 }}>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading Email...</div>}>
                            <EmailApp />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
};

export default App;
