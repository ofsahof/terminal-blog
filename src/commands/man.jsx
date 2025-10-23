import React from 'react';
import { fetchContent } from '../utils/contentFetcher.js';

const MAN_BASE_PATH = '/content/man';

export default {
  name: 'man',
  description: 'Display the manual page for a command or topic.',

  execute: async (args, context) => {
    if (args.length === 0) {
      return 'Usage: man [topic]';
    }

    const topic = args[0].toLowerCase();
    const filePath = `${MAN_BASE_PATH}/${topic}.txt`;

    try {
      const htmlContent = await fetchContent(filePath);

      if (!htmlContent || htmlContent.trim() === '') {
        return `man: No manual entry for ${topic}`;
      }

      return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;

    } catch (error) {
      return `man: No manual entry for ${topic}`;
    }
  },
};

