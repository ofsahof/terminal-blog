export const filesystem = {
    '~': {
        type: 'directory',
        children: {
            'about.md': {
                type: 'file',
                source: '/content/about.md',
            },
            projects: {
                type: 'directory',
                children: {
                    'terminalfolio.md': {
                        type: 'file',
                        source: '/content/projects/terminalfolio.md',
                    },
                },
            },
            blog: {
                type: 'directory',
                children: {
                    'first-post': {
                        type: 'file',
                        source: '/content/posts/first-post.org',
                    },
                },
            },
        },
    },
};
