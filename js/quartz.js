/*
    Quartz

    This is quartz, the shell for acrylic. It is designed to be unix-like, but with a simpler design philosophy, since it will be running on a web browser.
*/

const quartz = {
    info: {
        name: 'Quartz',
        version: '0.0.1',
        developer: 'colack'         // For now, I will be developing this shell. ( I don't think the club will be able to do this lol. )
    },
    commands: {},                   // Commands will be stored here.
    history: [],                    // History will be stored here.
}

function quartz_boot() {
    quartz_loadCommands();
    quartz_loadHistory();
    
    quartz_start();
}

function quartz_loadCommands() {
    // This function will load all commands into the quartz shell.
    // This will be done by loading all commands from the commands directory.
    // The commands will be loaded into the quartz.commands object.

    return true;
}

function quartz_loadHistory() {
    // This function will load the command history from the local storage.
    // The command history will be stored in the quartz.history array.

    return true;
}

function quartz_start() {
    // This function will start the quartz shell.
    // It will display the welcome message, and start the command line.

    return true;
}