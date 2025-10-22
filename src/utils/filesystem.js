import firstPost from "../content/posts/first-content"

export const filesystem = {
  '~': {
    type: 'directory',
    children: {
      'about.txt': {
        type: 'file',
        content: 'Hey there! It\'s ofsahof.This is my personel web page \nFor using other commands type "help"'
      },
      'projects': {
        type: 'directory',
        children: {
          'terminalfolio.txt': {
            type: 'file',
            content: 'This projects itself. You can find the source code from github/ofsahof'
          }
        }
      },
      'blog': {
        type: 'directory',
        children: {
          'first-post': {
            type: 'file',
            content: firstPost
          }
        }
      },
    }
  }
};