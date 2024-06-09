const nodes = [
    { id: 'External ISP' },
    { id: 'ISP Router' },
    { id: 'Core Router' },
    { id: 'Firewall1' },
    { id: 'Gateway Switch' },
    { id: 'Web Server' },
    { id: 'Admin User' },
    { id: 'Standard User' },
    { id: 'Packet Sniffer' },
    { id: 'Camera' },
    { id: 'Water Sensor' },
    { id: 'Wiretapping Sensor' },
    { id: 'TIC Sensor' }
];

const links = [
    { source: 'External ISP', target: 'ISP Router' },
    { source: 'ISP Router', target: 'Core Router' },
    { source: 'Core Router', target: 'Firewall1' },
    { source: 'Firewall1', target: 'Gateway Switch' },
    { source: 'Gateway Switch', target: 'Web Server' },
    { source: 'Admin User', target: 'Core Router' },
    { source: 'Standard User', target: 'Core Router' },
    { source: 'Packet Sniffer', target: 'Core Router' },
    { source: 'Camera', target: 'Firewall1' },
    { source: 'Water Sensor', target: 'Gateway Switch' },
    { source: 'Wiretapping Sensor', target: 'ISP Router' },
    { source: 'TIC Sensor', target: 'External ISP' }
];

const svg = d3.select("#network-map")
    .append("svg")
    .attr("width", '100%')
    .attr("height", '1200px');  // Adjust height to ensure scrolling

const width = document.getElementById('network-map').clientWidth;
const height = 1200;  // Adjust height to ensure scrolling

const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-400))
    .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("class", "link");

const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter().append("g");

node.append("circle")
    .attr("r", 10)
    .attr("class", d => d.id.includes('Sensor') ? 'sensor' : 'node');

node.append("text")
    .attr("dy", -3)
    .attr("x", 12)
    .text(d => d.id);

simulation.on("tick", () => {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node.attr("transform", d => `translate(${d.x},${d.y})`);
});