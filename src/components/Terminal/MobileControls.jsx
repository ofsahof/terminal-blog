import './MobileControls.css';

const MobileControls = ({ onKey }) => {
    // Only show on touch devices or small screens usually,
    // but CSS media queries will handle the display toggle.

    const handleTouchStart = (e, key) => {
        e.preventDefault(); // Prevent focus loss or double firing
        onKey(key);
    };

    return (
        <div className='mobile-controls'>
            <div className='mobile-controls__row'>
                <button
                    className='mobile-btn'
                    onTouchStart={(e) => handleTouchStart(e, 'Tab')}
                    onClick={() => onKey('Tab')} // Click fallback for desktops/testing
                    title='Tab (Complete)'
                >
                    TAB
                </button>
                <button
                    className='mobile-btn'
                    onTouchStart={(e) => handleTouchStart(e, 'ArrowUp')}
                    onClick={() => onKey('ArrowUp')}
                    title='Arrow Up (History)'
                >
                    ▲
                </button>
                <button
                    className='mobile-btn'
                    onTouchStart={(e) => handleTouchStart(e, 'ArrowDown')}
                    onClick={() => onKey('ArrowDown')}
                    title='Arrow Down (History)'
                >
                    ▼
                </button>
                <button
                    className='mobile-btn mobile-btn--red'
                    onTouchStart={(e) => handleTouchStart(e, 'Escape')}
                    onClick={() => onKey('Escape')}
                    title='Escape (Exit Game)'
                >
                    ESC
                </button>
            </div>
        </div>
    );
};

export default MobileControls;
