const fileSystem = {
    root: {
        exc: {},
        lib: {},
        usr: {},
        sys: {},
        tmp: {},
    }
}

const systemUtilities = {
    applications: {},       // This object will store all the applications.
    colors: {           // Define the color palette for the operating system.
        primary: '#FF3366',   // A vibrant pink for primary interface elements.
        secondary: '#2EC4B6', // A soothing teal for secondary accents.
        tertiary: '#20A4F3',  // A bright blue for additional accents.
        accent: '#F6F7F8',    // A light grey for UI backgrounds and less prominent elements.
        shading: '#011627'    // A deep navy blue for shadows and dark backgrounds.
    }
}

function acrylic_system_bootSystem() {
    acrylic_system_setupFileSystem();
    acrylic_system_setupDesktop();
    acrylic_system_sendToLogin();

    return true;
}

function acrylic_system_setupFileSystem() {
    acrylic_utilities_fileSystem_createDirectory('usr', 'documents');
    acrylic_utilities_fileSystem_createDirectory('usr', 'images');
    acrylic_utilities_fileSystem_createDirectory('usr', 'videos');
    acrylic_utilities_fileSystem_createDirectory('usr', 'audio');
    acrylic_utilities_fileSystem_createDirectory('usr', 'downloads');

    /*
        TODO: Load all system files here, along with programs into the ./exc directory.
    */

    return true;
}

function acrylic_system_sendToLogin() {
    // This function will send the user to the login screen.

    return true;
}
