import { asTextResult } from '../utils/commandResult';

export default {
    name: 'github',
    description: 'Fetch public repositories from GitHub.',
    execute: async (args) => {
        const username = args[0] || 'ofsahof';
        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=5`
        );

        if (!response.ok) {
            return asTextResult(`github: user '${username}' not found or API unavailable`);
        }

        const repos = await response.json();
        if (!Array.isArray(repos) || repos.length === 0) {
            return asTextResult(`github: no public repositories found for '${username}'`);
        }

        const lines = repos.map((repo) => `- ${repo.name}: ${repo.html_url}`);
        return asTextResult(lines.join('\n'));
    },
};
