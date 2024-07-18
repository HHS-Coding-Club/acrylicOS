function acrylic_utilities_fileSystem_createDirectory(path, name) {
    if (fileSystem.root[path][name] === undefined) {
        fileSystem.root[path][name] = {};
    }
     
    return fileSystem.root[path][name];
}

function acrylic_utilities_fileSystem_createFile(path, name, type, content) {
    if (fileSystem.root[path][name] === undefined) {
        fileSystem.root[path][name] = {
            type: type,
            content: content
        }
    }

    return fileSystem.root[path][name];
}

function acrylic_utilities_fileSystem_deleteFile(path, name) {
    if (fileSystem.root[path][name] !== undefined) {
        delete fileSystem.root[path][name];
    }

    return fileSystem.root[path];
}

function acrylic_utilities_fileSystem_readFile(path, name) {
    if (fileSystem.root[path][name] !== undefined) {
        return fileSystem.root[path][name];
    }

    return null;
}

function acrylic_utilities_fileSystem_updateFile(path, name
    , content) {
    if (fileSystem.root[path][name] !== undefined) {
        fileSystem.root[path][name].content = content;
    }

    return fileSystem.root[path][name];
}

function acrylic_utilities_fileSystem_listFiles(path) {
    return Object.keys(fileSystem.root[path]);
}

function acrylic_utilities_fileSystem_listAllFiles() {
    return Object.keys(fileSystem.root);
}
