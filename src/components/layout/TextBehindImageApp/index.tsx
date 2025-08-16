import React, { useEffect } from 'react';
import {view} from "@risingstack/react-easy-state";

export const TextBehindImageApp = view(() => {
    useEffect(() => {
        // Redirect to the standalone text-behind-image page
        window.location.href = '/text-behind-image.html';
    }, []);

    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Redirecting to Text Behind Image...</h2>
                <p>If you're not redirected automatically, <a href="/text-behind-image.html">click here</a></p>
            </div>
        </div>
    );
});