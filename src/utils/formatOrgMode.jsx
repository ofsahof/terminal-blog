export const formatOrgMode = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockContent = [];
    let codeBlockLang = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.trim().startsWith('#+BEGIN_SRC')) {
            inCodeBlock = true;
            codeBlockContent = [];
            codeBlockLang = line.trim().substring(12).trim().toLowerCase();
            continue;
        }

        if (line.trim().startsWith('#+END_SRC')) {
            inCodeBlock = false;
            elements.push(
                <pre key={`cb-${i}`} className='org-output__code-block'>
                    <code>{codeBlockContent.join('\n')}</code>
                </pre>
            );
            codeBlockLang = '';
            codeBlockLang;
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
                    className='org-output__heading org-output__heading--h3'
                >
                    {line.substring(4)}
                </h4>
            );
        } else if (line.startsWith('** ')) {
            elements.push(
                <h3
                    key={i}
                    className='org-output__heading org-output__heading--h2'
                >
                    {line.substring(3)}
                </h3>
            );
        } else if (line.startsWith('* ')) {
            elements.push(
                <h2
                    key={i}
                    className='org-output__heading org-output__heading--h1'
                >
                    {line.substring(2)}
                </h2>
            );
        } else if (line.trim().startsWith('- ')) {
            elements.push(
                <div key={i} className='org-output__list-item'>
                    <span className='org-output__list-bullet'>•</span>
                    <span className='org-output__list-text'>
                        {line.trim().substring(2)}
                    </span>
                </div>
            );
        } else {
            const content = line.trim() === '' ? '\u00A0' : line;
            elements.push(
                <div key={i} className='org-output__paragraph'>
                    {content}
                </div>
            );
        }
    }
    return <div className='org-output'>{elements}</div>;
};
