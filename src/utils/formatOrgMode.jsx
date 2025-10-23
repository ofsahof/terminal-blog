export const formatOrgMode = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockContent = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.trim().startsWith('#+BEGIN_SRC')) {
            inCodeBlock = true;
            codeBlockContent = [];
            continue;
        }

        if (line.trim().startsWith('#+END_SRC')) {
            inCodeBlock = false;
            elements.push(
                <pre
                    key={`cb-${i}`}
                    style={{
                        backgroundColor: 'var(--bg)',
                        color: 'var(--fg)',
                        padding: '10px',
                        borderRadius: '5px',
                        margin: '10px 0',
                        overflowX: 'auto',
                        fontFamily: '"Fira Code", monospace',
                        fontSize: '0.9rem',
                    }}
                >
                    <code>{codeBlockContent.join('\n')}</code>
                </pre>
            );
            continue;
        }

        if (inCodeBlock) {
            codeBlockContent.push(line);
            continue;
        }

        if (line.startsWith('*** ')) {
            elements.push(
                <h4
                    key={i}
                    style={{ color: 'var(--aqua)', margin: '10px 0 2px 0' }}
                >
                    {line.substring(4)}
                </h4>
            );
        } else if (line.startsWith('** ')) {
            elements.push(
                <h3
                    key={i}
                    style={{ color: 'var(--yellow)', margin: '12px 0 2px 0' }}
                >
                    {line.substring(3)}
                </h3>
            );
        } else if (line.startsWith('* ')) {
            elements.push(
                <h2
                    key={i}
                    style={{
                        color: 'var(--blue)',
                        margin: '15px 0 5px 0',
                        borderBottom: '1px solid var(--gray)',
                    }}
                >
                    {line.substring(2)}
                </h2>
            );
        } else if (line.trim().startsWith('- ')) {
            elements.push(
                <div
                    key={i}
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginLeft: '20px',
                    }}
                >
                    <span
                        style={{
                            color: 'var(--purple)',
                            marginRight: '10px',
                            lineHeight: '1.5',
                        }}
                    >
                        •
                    </span>
                    <span style={{ lineHeight: '1.5', color: 'inherit' }}>
                        {line.trim().substring(2)}
                    </span>
                </div>
            );
        } else {
            const content = line.trim() === '' ? '\u00A0' : line;
            elements.push(
                <p
                    key={i}
                    style={{
                        margin: '0',
                        padding: '0',
                        lineHeight: '1.5',
                        color: 'inherit',
                    }}
                >
                    {content}
                </p>
            );
        }
    }

    return <div>{elements}</div>;
};
