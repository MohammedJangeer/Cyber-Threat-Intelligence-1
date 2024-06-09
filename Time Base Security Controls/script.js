const width = 1200;
const height = 800;

// Define nodes and their time-based access status
const nodes = [
    { id: "External ISP", group: 1, x: 100, y: 100, access: "N/A" },
    { id: "ISP Router", group: 2, x: 300, y: 100, access: "24/7", anomaly: "No" },
    { id: "Core Router", group: 3, x: 500, y: 100, access: "8 AM - 6 PM", anomaly: "No" },
    { id: "Firewall1", group: 4, x: 700, y: 100, access: "8 AM - 6 PM", anomaly: "Yes" },
    { id: "Gateway Switch", group: 5, x: 900, y: 100, access: "24/7", anomaly: "No" },
    { id: "Web Server", group: 6, x: 1100, y: 100, access: "24/7", anomaly: "No" },
    { id: "Admin User", group: 7, x: 100, y: 300, access: "N/A", anomaly: "No" },
    { id: "Standard User", group: 7, x: 100, y: 500, access: "N/A", anomaly: "No" },
];

const links = [
    { source: "External ISP", target: "ISP Router", type: "Internet Connection" },
    { source: "ISP Router", target: "Core Router", type: "BGP/OSPF" },
    { source: "Core Router", target: "Firewall1", type: "Internal Traffic" },
    { source: "Firewall1", target: "Gateway Switch", type: "Filtered Traffic" },
    { source: "Gateway Switch", target: "Web Server", type: "Switched Traffic" },
    { source: "Admin User", target: "Web Server", type: "HTTPS/SSH" },
    { source: "Standard User", target: "Web Server", type: "HTTPS/HTTP" },
];

const trustBoundaries = [
    { id: "Internet Boundary", x: 50, y: 50, width: 250, height: 200 },
    { id: "Internal Network Boundary", x: 350, y: 50, width: 800, height: 200 },
    { id: "User Zone", x: 50, y: 250, width: 250, height: 300 },
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
    .attr("stroke", "#999")
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

node.append("text")
    .attr("dx", -20)
    .attr("dy", 20)
    .attr("class", "time-control")
    .text(d => d.access);

node.append("text")
    .attr("dx", -20)
    .attr("dy", 36)
    .attr("class", d => d.anomaly === "Yes" ? "anomaly" : "time-control")
    .text(d => d.anomaly === "Yes" ? "Anomaly Detected" : "");

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

// Course of Action for SOC Analysts
svg.append("text")
    .attr("x", 10)
    .attr("y", 700)
    .attr("class", "anomaly")
    .text("Course of Action for SOC Analysts:");

svg.append("text")
    .attr("x", 10)
    .attr("y", 720)
    .attr("class", "time-control")
    .text("1. Validate the anomaly by cross-checking logs and alerts.");

svg.append("text")
    .attr("x", 10)
    .attr("y", 740)
    .attr("class", "time-control")
    .text("2. Perform a detailed analysis of the traffic pattern causing the anomaly.");

svg.append("text")
    .attr("x", 10)
    .attr("y", 760)
    .attr("class", "time-control")
    .text("3. Isolate the affected node to prevent further potential compromise.");

svg.append("text")
    .attr("x", 10)
    .attr("y", 780)
    .attr("class", "time-control")
    .text("4. Notify relevant stakeholders and escalate as necessary.");

svg.append("text")
    .attr("x", 10)
    .attr("y", 800)
    .attr("class", "time-control")
    .text("5. Document the incident and review for future prevention measures.");