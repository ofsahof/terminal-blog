import './TerminalInput.css';

const TerminalInput = ({
    path,
    command,
    setCommand,
    handleKeyDown,
    inputRef,
    cursorPos,
    setCursorPos,
}) => {
    const handleInputChange = (e) => {
        setCommand(e.target.value);
        setCursorPos(e.target.selectionStart);
    };

    const handleInputKeyUp = (e) => {
        if (
            [
                'ArrowLeft',
                'ArrowRight',
                'ArrowUp',
                'ArrowDown',
                'Home',
                'End',
                'Backspace',
                'Delete',
            ].includes(e.key)
        ) {
            // Use requestAnimationFrame to ensure the cursor position update happens after the browser updates the selection
            requestAnimationFrame(() => {
                if (inputRef.current) {
                    setCursorPos(inputRef.current.selectionStart);
                }
            });
        }
    };

    // Calculate cursor offset
    const cursorOffset = `${cursorPos}ch`;

    return (
        <div className='input-container'>
            <div className='input-line'>
                <span className='input-line__prompt'>{path} &gt;</span>
                <div className='fake-input-wrapper'>
                    <div className='fake-input'>
                        <span className='fake-input__text'>{command}</span>
                        <div
                            className='fake-input__cursor'
                            style={{ left: cursorOffset }}
                        ></div>
                    </div>
                    <input
                        ref={inputRef}
                        className='input-line__hidden-input'
                        type='text'
                        value={command}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleInputKeyUp}
                        autoFocus
                        spellCheck='false'
                        autoComplete='off'
                        autoCapitalize='none'
                    />
                </div>
            </div>
        </div>
    );
};

export default TerminalInput;
