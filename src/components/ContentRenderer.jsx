import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatOrgMode } from '../utils/formatOrgMode';
import './ContentRenderer.css';

const ContentRenderer = ({ content, type }) => {
    // Basic sanitization or preparation if needed

    if (type === 'md' || type === 'markdown') {
        return (
            <div className='markdown-content'>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>
            </div>
        );
    }

    if (type === 'org') {
        return <div className='org-content'>{formatOrgMode(content)}</div>;
    }

    // Default to plain text
    return <pre className='text-content'>{content}</pre>;
};

export default ContentRenderer;
