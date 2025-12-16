import React from 'react';
import Email from './Email';

const App = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Email App Standalone</h1>
            <p>Note: Shared components might not work if Host is not running/available in standalone mode.</p>
            <React.Suspense fallback="Loading...">
                <Email />
            </React.Suspense>
        </div>
    );
};

export default App;
