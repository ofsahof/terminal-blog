import React, { useEffect, useRef, useState } from 'react';

const WebBrowser = ({
    onExit,
    url = '/odev/index.html',
    title = 'Web Ödevi',
}) => {
    const iframeRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onExit();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', handleResize);
        };
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
                overflow: 'hidden'
            }}
        >
            {/* Header / Toolbar */}
            <div
                style={{
                    padding: isMobile ? '12px 15px' : '10px 20px',
                    borderBottom: '2px solid #333',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'monospace',
                    background: '#222'
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', marginRight: '10px' }}>
                    <span style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: isMobile ? '14px' : '16px',
                        fontWeight: 'bold'
                    }}>
                        🌐 {title}
                    </span>
                    {!isMobile && (
                        <small style={{ opacity: 0.5, fontSize: '11px' }}>
                            {url}
                        </small>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexShrink: 0 }}>
                    {!isMobile && (
                        <small style={{ opacity: 0.7, fontSize: '12px' }}>Çıkmak için [ESC]</small>
                    )}
                    <button
                        onClick={onExit}
                        style={{
                            cursor: 'pointer',
                            background: '#ea6962', // Soft red
                            border: 'none',
                            color: 'white',
                            padding: isMobile ? '8px 16px' : '4px 12px',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            fontSize: '13px',
                            transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                        {isMobile ? 'KAPAT' : 'X'}
                    </button>
                </div>
            </div>

            {/* Iframe Content */}
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