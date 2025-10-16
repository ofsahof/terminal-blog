import ofsContent from '../../content/man/ofs';

const manPages = {
  'ofs': ofsContent,
  'ofsahof': ofsContent,
};

export default {
  name: 'man',
  description: "Display the manual for a command or topic (e.g., 'man ofs').",
  execute: (args) => {
    if (args.length === 0) return 'Usage: man [topic]';
    const topic = args[0].toLowerCase();
    if (manPages[topic]) {
      return manPages[topic];
    }
    return `No manual entry for ${topic}`;
    // TODO man page list
  },
};