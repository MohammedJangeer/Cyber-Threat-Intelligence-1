const accessControl = {
    'core-router': true,
    'firewall': true,
    'gateway-switch': true,
    'admin-user': true,
    'standard-user': false
};

function toggleAccess(component) {
    accessControl[component] = !accessControl[component];
    logActivity(component);
    updateUI();
}

function logActivity(component) {
    const logList = document.getElementById('log-list');
    const listItem = document.createElement('li');
    const timestamp = new Date().toLocaleTimeString();
    listItem.textContent = `${timestamp} - ${component} access ${accessControl[component] ? 'granted' : 'denied'}`;
    logList.appendChild(listItem);
}

function updateUI() {
    for (const [component, hasAccess] of Object.entries(accessControl)) {
        const element = document.getElementById(component);
        if (hasAccess) {
            element.style.backgroundColor = '#d4edda';
        } else {
            element.style.backgroundColor = '#f8d7da';
        }
    }
}

document.addEventListener('DOMContentLoaded', updateUI);