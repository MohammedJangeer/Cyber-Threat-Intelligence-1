const accessControl = {
    'core-router': true,
    'firewall': true,
    'gateway-switch': true,
    'admin-user': true,
    'standard-user': false
};

const nodes = [
    { id: 'core-router', x: 100, y: 200, label: 'Core Router' },
    { id: 'firewall', x: 300, y: 200, label: 'Firewall' },
    { id: 'gateway-switch', x: 500, y: 200, label: 'Gateway Switch' },
    { id: 'admin-user', x: 200, y: 400, label: 'Admin User' },
    { id: 'standard-user', x: 400, y: 400, label: 'Standard User' },
];

document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('network-svg');

    nodes.forEach(node => {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('id', node.id);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', 40);
        circle.setAttribute('fill', accessControl[node.id] ? '#d4edda' : '#f8d7da');

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.textContent = node.label;

        group.appendChild(circle);
        group.appendChild(text);
        svg.appendChild(group);
    });

    updateUI();
});

function toggleAccess() {
    const component = document.getElementById('component-select').value;
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
    nodes.forEach(node => {
        const element = document.getElementById(node.id).querySelector('circle');
        if (accessControl[node.id]) {
            element.setAttribute('fill', '#d4edda');
        } else {
            element.setAttribute('fill', '#f8d7da');
        }
    });
}