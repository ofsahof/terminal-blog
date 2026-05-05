import { findEntry, resolvePath } from './pathHelper';
import { cloneFilesystem } from './vfsState';

const getParentPathAndName = (inputPath, currentPath) => {
    const resolved = resolvePath(inputPath, currentPath);
    if (resolved === '~') {
        return null;
    }

    const parts = resolved.split('/');
    const name = parts.pop();
    const parentPath = parts.join('/') || '~';
    return { resolved, parentPath, name };
};

export const mkdirAtPath = (filesystem, inputPath, currentPath) => {
    const result = getParentPathAndName(inputPath, currentPath);
    if (!result || !result.name) {
        return { error: `mkdir: cannot create directory '${inputPath}'` };
    }

    const nextFs = cloneFilesystem(filesystem);
    const parent = findEntry(result.parentPath, nextFs);
    if (!parent || parent.type !== 'directory') {
        return { error: `mkdir: cannot create directory '${inputPath}'` };
    }
    if (parent.children[result.name]) {
        return { error: `mkdir: cannot create directory '${inputPath}': File exists` };
    }
    parent.children[result.name] = { type: 'directory', children: {} };
    return { filesystem: nextFs };
};

export const touchAtPath = (filesystem, inputPath, currentPath) => {
    const result = getParentPathAndName(inputPath, currentPath);
    if (!result || !result.name) {
        return { error: `touch: cannot touch '${inputPath}'` };
    }

    const nextFs = cloneFilesystem(filesystem);
    const parent = findEntry(result.parentPath, nextFs);
    if (!parent || parent.type !== 'directory') {
        return { error: `touch: cannot touch '${inputPath}'` };
    }
    if (parent.children[result.name]) {
        return { filesystem: nextFs };
    }
    parent.children[result.name] = { type: 'file', source: null, content: '' };
    return { filesystem: nextFs };
};

export const rmAtPath = (filesystem, inputPath, currentPath) => {
    const result = getParentPathAndName(inputPath, currentPath);
    if (!result || !result.name) {
        return { error: `rm: cannot remove '${inputPath}'` };
    }

    const nextFs = cloneFilesystem(filesystem);
    const parent = findEntry(result.parentPath, nextFs);
    if (!parent || parent.type !== 'directory') {
        return { error: `rm: cannot remove '${inputPath}'` };
    }

    const target = parent.children[result.name];
    if (!target) {
        return { error: `rm: cannot remove '${inputPath}': No such file or directory` };
    }
    if (target.type === 'directory' && Object.keys(target.children || {}).length > 0) {
        return { error: `rm: cannot remove '${inputPath}': Directory not empty` };
    }

    delete parent.children[result.name];
    return { filesystem: nextFs };
};
