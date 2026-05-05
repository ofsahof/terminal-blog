import React from 'react';
import './TerminalHistory.css';

const HistoryItem = ({ item }) => {
    if (typeof item === 'string') {
        return <pre className='history__line history__line--text'>{item}</pre>;
    }
    if (React.isValidElement(item)) {
        return <div className='history__line'>{item}</div>;
    }
    if (typeof item === 'object' && item.content) {
        if (item.type === 'component') {
            return <div className='history__line'>{item.content}</div>;
        }
        return <pre className='history__line history__line--text'>{item.content}</pre>;
    }

    return null;
};

const TerminalHistory = ({ history, terminalRef }) => {
    return (
        <div className='history-container' ref={terminalRef}>
            {history.map((line, index) => (
                <HistoryItem key={index} item={line} />
            ))}
        </div>
    );
};

export default TerminalHistory;
