/*
    This is the installation script for acrylic. It will install the operating systems file system and then boot the system.
*/

const acrylic_defaultFileSystem = {
    root: {
        exc: {},
        lib: {},
        usr: {},
        sys: {},
        tmp: {},
    },
    assets: {}
}

function acrylic_installation_start() {
    acrylic_installation_print("Welcome to the acrylic installation process.");
    acrylic_installation_print("This will install the operating system on your device.");
    acrylic_installation_print("Depending on your device, this may take a few minutes.");

    acrylic_installation_print("Installing file system...");
    acrylic_installation_setup();
}

function acrylic_installation_print(text) {
    // This function will print text to the installation screen. (This will be implemented later.)
}

function acrylic_installation_setup() {
    let storage = localStorage.getItem('acrylicFileSystem');

    if (storage) {
        fileSystem = JSON.parse(storage);
    } else {
        fileSystem = acrylic_defaultFileSystem;
        acrylic_system_saveFileSystem();
    }
}

function acrylic_installation_finish() {
    acrylic_installation_print("Installation complete.");
    acrylic_installation_print("Booting system...");

    acrylic_boot();
}

function acrylic_system_saveFileSystem() {
    localStorage.setItem('acrylicFileSystem', JSON.stringify(fileSystem));
}

acrylic_installation_start();