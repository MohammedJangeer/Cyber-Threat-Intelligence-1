const width = 1200;
const height = 800;

const nodes = [
    { id: "External ISP", group: 1, x: 50, y: 50 },
    { id: "ISP Router", group: 2, x: 200, y: 50 },
    { id: "Core Router", group: 3, x: 400, y: 50 },
    { id: "Firewall1", group: 4, x: 600, y: 50 },
    { id: "Gateway Switch", group: 5, x: 800, y: 50 },
    { id: "Web Server", group: 6, x: 1000, y: 50 },
    { id: "Admin User", group: 7, x: 50, y: 200 },
    { id: "Standard User", group: 7, x: 50, y: 300 },
    { id: "Intercepted Node", group: 8, x: 525, y: 150 }
];

const links = [
    // Normal operation links
    { source: "External ISP", target: "ISP Router", type: "Internet Connection" },
    { source: "ISP Router", target: "Core Router", type: "BGP/OSPF" },
    { source: "Core Router", target: "Firewall1", type: "Internal Traffic" },
    { source: "Firewall1", target: "Gateway Switch", type: "Filtered Traffic" },
    { source: "Gateway Switch", target: "Web Server", type: "Switched Traffic" },
    { source: "Admin User", target: "Web Server", type: "HTTPS/SSH" },
    { source: "Standard User", target: "Web Server", type: "HTTPS/HTTP" },
    
    // Attack scenario links
    { source: "External ISP", target: "Admin User", type: "Phishing Email", stroke: "red" },
    { source: "Standard User", target: "Web Server", type: "SQL Injection", stroke: "red" },
    { source: "Standard User", target: "Web Server", type: "XSS Attack", stroke: "red" },
    { source: "Admin User", target: "Core Router", type: "Privilege Escalation", stroke: "red" },
    { source: "Standard User", target: "Web Server", type: "DoS Attack", stroke: "red" },
    { source: "Standard User", target: "Intercepted Node", type: "Intercepted HTTPS Traffic", stroke: "red" },
    { source: "Intercepted Node", target: "Web Server", type: "Intercepted HTTPS Traffic", stroke: "red" }
];

const trustBoundaries = [
    { id: "Internet Trust Boundary", x: 20, y: 20, width: 200, height: 120 },
    { id: "Internal Network Boundary", x: 350, y: 20, width: 700, height: 120 },
    { id: "User Zone", x: 20, y: 180, width: 200, height: 150 }
];

const svg = d3.select("#dfd")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Draw trust boundaries
svg.selectAll(".trust-boundary")
    .data(trustBoundaries)
    .enter().append("rect")
    .attr("class", "trust-boundary")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("height", d => d.height);

// Draw links
const link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke", d => d.stroke ? d.stroke : "#999")
    .attr("stroke-width", 2);

// Draw nodes
const node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`);

node.append("circle")
    .attr("r", 20)
    .attr("fill", d => d3.schemeCategory10[d.group]);

node.append("text")
    .attr("dx", -20)
    .attr("dy", 4)
    .text(d => d.id);

// Position links
link.attr("x1", d => nodes.find(n => n.id === d.source).x)
    .attr("y1", d => nodes.find(n => n.id === d.source).y)
    .attr("x2", d => nodes.find(n => n.id === d.target).x)
    .attr("y2", d => nodes.find(n => n.id === d.target).y);

// Draw link labels
svg.selectAll(".link-label")
    .data(links)
    .enter().append("text")
    .attr("x", d => (nodes.find(n => n.id === d.source).x + nodes.find(n => n.id === d.target).x) / 2)
    .attr("y", d => (nodes.find(n => n.id === d.source).y + nodes.find(n => n.id === d.target).y) / 2)
    .attr("fill", "black")
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .text(d => d.type);