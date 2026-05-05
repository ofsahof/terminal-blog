import { filesystem as defaultFilesystem } from './filesystem';

const VFS_STORAGE_KEY = 'terminal-vfs';

const clone = (value) => JSON.parse(JSON.stringify(value));

export const loadFilesystem = () => {
    const raw = localStorage.getItem(VFS_STORAGE_KEY);
    if (!raw) {
        return clone(defaultFilesystem);
    }

    try {
        return JSON.parse(raw);
    } catch (_error) {
        return clone(defaultFilesystem);
    }
};

export const saveFilesystem = (filesystem) => {
    localStorage.setItem(VFS_STORAGE_KEY, JSON.stringify(filesystem));
};

export const resetFilesystem = () => {
    localStorage.removeItem(VFS_STORAGE_KEY);
    return clone(defaultFilesystem);
};

export const cloneFilesystem = (filesystem) => clone(filesystem);
