import React from 'react';
import Chat from './Chat';

const App = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Chat App Standalone</h1>
            <p>Note: Shared components might not work if Host is not running/available in standalone mode unless mocked or federated correctly.</p>
            <React.Suspense fallback="Loading...">
                <Chat />
            </React.Suspense>
        </div>
    );
};

export default App;

