import React, { useEffect, useRef } from 'react';

const WebBrowser = ({
    onExit,
    url = '/odev/index.html',
    title = 'Web Ödevi',
}) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onExit();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onExit]);

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#1a1a1a',
                color: 'white',
            }}
        >
            {}
            <div
                style={{
                    padding: '10px',
                    borderBottom: '2px solid #333',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'monospace',
                }}
            >
                <span>
                    🌐 {title} ({url})
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <small style={{ opacity: 0.7 }}>Çıkmak için [ESC]</small>
                    <button
                        onClick={onExit}
                        style={{
                            cursor: 'pointer',
                            background: 'red',
                            border: 'none',
                            color: 'white',
                            padding: '2px 8px',
                        }}
                    >
                        X
                    </button>
                </div>
            </div>

            {}
            <iframe
                ref={iframeRef}
                src={url}
                title='Odev Sitesi'
                style={{
                    flex: 1,
                    width: '100%',
                    border: 'none',
                    backgroundColor: 'white',
                }}
            />
        </div>
    );
};

export default WebBrowser;
