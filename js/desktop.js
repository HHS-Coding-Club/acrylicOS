function acrylic_system_setupDesktop() {
    const desktop = document.getElementById('desktop');
    desktop.innerHTML = ''; // Clear the desktop initially

    // Style the desktop
    desktop.style.width = '100%';
    desktop.style.height = '100vh';
    desktop.style.backgroundColor = '#e0e0e0';
    desktop.style.position = 'relative';
    desktop.style.display = 'flex';
    desktop.style.flexWrap = 'wrap';
    desktop.style.alignItems = 'flex-start';
    desktop.style.justifyContent = 'center';
    desktop.style.padding = '20px';
    desktop.style.boxSizing = 'border-box';

    // Add the taskbar
    desktop.appendChild(acrylic_desktop_createTaskbar());
    acrylic_desktop_setBackgroundAsImage('assets/wallpapers/Scifi-Room.png');

    return true;
}

function acrylic_desktop_createTaskbar() {
    let taskbar = document.createElement('div');
    taskbar.style.position = 'fixed';
    taskbar.style.bottom = '0';
    taskbar.style.left = '0';
    taskbar.style.width = '100%';
    taskbar.style.backgroundImage = `linear-gradient(to right, ${systemUtilities.colors.primary}, ${systemUtilities.colors.secondary})`;
    taskbar.style.color = systemUtilities.colors.accent;
    taskbar.style.display = 'flex';
    taskbar.style.alignItems = 'center';
    taskbar.style.justifyContent = 'space-between';
    taskbar.style.padding = '5px 20px';

    // Create a container for window icons in the taskbar
    const windowContainer = document.createElement('div');
    windowContainer.id = 'window-container';
    windowContainer.style.flexGrow = '1';
    windowContainer.style.display = 'flex';
    windowContainer.style.alignItems = 'center';
    windowContainer.style.overflowX = 'auto'; // In case of many windows
    taskbar.appendChild(windowContainer);

    taskbar.innerHTML += '<div class="taskbar-content">AcrylicOS Taskbar</div>'; // Keep your other taskbar content
    return taskbar;
}

function acrylic_desktop_createIcon(name, icon, onClick) {
    let iconElement = document.createElement('div');
    iconElement.style.width = '100px';
    iconElement.style.height = '100px';
    iconElement.style.backgroundColor = '#ffffff';
    iconElement.style.border = '1px solid #e0e0e0';
    iconElement.style.borderRadius = '5px';
    iconElement.style.display = 'flex';
    iconElement.style.alignItems = 'center';
    iconElement.style.justifyContent = 'center';
    iconElement.style.margin = '10px';
    iconElement.style.cursor = 'pointer';

    iconElement.innerHTML = `<img src="${icon}" style="width: 50px; height: 50px;"><br>${name}`;

    iconElement.addEventListener('click', onClick);

    return iconElement;
}

function acrylic_desktop_createWindow(title, content) {
    const window = document.createElement('div');
    window.className = 'window';
    window.style.width = '300px';
    window.style.minHeight = '200px';
    window.style.backgroundColor = '#FFF';
    window.style.border = '1px solid #CCC';
    window.style.borderRadius = '5px';
    window.style.position = 'absolute';
    window.style.left = '50%';
    window.style.top = '50%';
    window.style.transform = 'translate(-50%, -50%)';
    window.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    window.style.zIndex = '1000';
    window.style.resize = 'both';
    window.style.overflow = 'auto';

    // Window title bar
    const titleBar = document.createElement('div');
    titleBar.style.padding = '10px';
    titleBar.style.backgroundColor = '#0072ff';
    titleBar.style.color = 'white';
    titleBar.style.cursor = 'move';
    titleBar.style.display = 'flex';
    titleBar.style.justifyContent = 'space-between';

    const titleLabel = document.createElement('span');
    titleLabel.textContent = title;
    titleBar.appendChild(titleLabel);

    // Window controls
    const controls = document.createElement('div');

    // Create a window icon for the taskbar
    const windowIcon = document.createElement('div');
    windowIcon.textContent = title; // Consider using an <img> or <span> with styles
    windowIcon.style.cursor = 'pointer';
    windowIcon.onclick = function() {
        if (window.style.display === 'none') {
            window.style.display = 'block'; // Restore the window
            windowIcon.style.opacity = '1';  // Reset opacity when window is restored
        } else {
            window.style.display = 'none'; // Minimize the window
            windowIcon.style.opacity = '0.5'; // Visual cue that the window is minimized
        }
    };
    document.getElementById('window-container').appendChild(windowIcon);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.onclick = () => {
        window.remove(); // Remove the window
        windowIcon.remove(); // Also remove its icon from the taskbar
    };

    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '_';
    minimizeButton.onclick = function() {
        window.style.display = 'none';
        windowIcon.style.opacity = '0.5'; // Visual cue that the window is minimized
    };

    const fullscreenButton = document.createElement('button');
    fullscreenButton.textContent = '[]';
    fullscreenButton.onclick = () => {
        if (!window.classList.contains('fullscreen')) {
            window.style.width = '100%';
            window.style.height = '100%';
            window.style.top = '0';
            window.style.left = '0';
            window.style.transform = 'none';
            window.classList.add('fullscreen');
        } else {
            window.style.width = '300px';
            window.style.height = 'auto';
            window.style.top = '50%';
            window.style.left = '50%';
            window.style.transform = 'translate(-50%, -50%)';
            window.classList.remove('fullscreen');
        }
    };

    controls.appendChild(minimizeButton);
    controls.appendChild(fullscreenButton);
    controls.appendChild(closeButton);
    titleBar.appendChild(controls);
    titleBar.onmousedown = function(event) {
        dragWindow(event, window);
    };

    const contentArea = document.createElement('div');
    contentArea.innerHTML = content;
    contentArea.style.padding = '20px';

    window.appendChild(titleBar);
    window.appendChild(contentArea);
    document.getElementById('desktop').appendChild(window);
}


function dragWindow(event, windowElement) {
    let startX = event.clientX;
    let startY = event.clientY;
    let startLeft = windowElement.offsetLeft;
    let startTop =  windowElement.offsetTop;

    function onMouseMove(event) {
        let newX = startLeft + event.clientX - startX;
        let newY = startTop + event.clientY - startY;
        windowElement.style.left = newX + 'px';
        windowElement.style.top = newY + 'px';
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function acrylic_desktop_setBackgroundAsImage(imageUrl) {
    const desktop = document.getElementById('desktop');
    desktop.style.backgroundImage = `url(${imageUrl})`;
    desktop.style.backgroundSize = 'cover';
    desktop.style.backgroundPosition = 'center';

    return true;
}

function acrylic_desktop_setBackgroundAsColor(color) {
    const desktop = document.getElementById('desktop');
    desktop.style.backgroundColor = color;

    return true;
}

function acrylic_desktop_setBackgroundAsGradient(color1, color2) {
    const desktop = document.getElementById('desktop');
    desktop.style.backgroundImage = `linear-gradient(to right, ${color1}, ${color2})`;

    return true;
}
