export const filesystem = {
  '~': {
    type: 'directory',
    children: {
      'about.txt': {
        type: 'file',
        source: '/content/about.txt'
      },
      'projects': {
        type: 'directory',
        children: {
          'terminalfolio.txt': {
            type: 'file',
            source: '/content/projects/terminalfolio.txt',
          }
        }
      },
      'blog': {
        type: 'directory',
        children: {
          'first-post': {
            type: 'file',
            source: '/content/posts/first-post.org'
          }
        }
      },
    }
  }
};