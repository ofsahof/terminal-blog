import React from 'react';
import './TerminalHistory.css';

const HistoryItem = ({ item }) => {
    if (typeof item === 'string') {
        return (
            <div
                className='history__line'
                dangerouslySetInnerHTML={{ __html: item }}
            />
        );
    }
    if (React.isValidElement(item)) {
        return <div className='history__line'>{item}</div>;
    }
    // Handle object structure from new hook implementation if needed later
    if (typeof item === 'object' && item.content) {
        if (item.type === 'component') {
            return <div className='history__line'>{item.content}</div>;
        }
        return (
            <div
                className='history__line'
                dangerouslySetInnerHTML={{ __html: item.content }}
            />
        );
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
