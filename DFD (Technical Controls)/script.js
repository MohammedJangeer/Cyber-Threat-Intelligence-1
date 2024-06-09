const width = 1200;
const height = 800;

const nodes = [
    { id: "External ISP", group: 1, x: 100, y: 100 },
    { id: "ISP Router", group: 2, x: 300, y: 100 },
    { id: "Core Router", group: 3, x: 500, y: 100 },
    { id: "Firewall1", group: 4, x: 700, y: 100 },
    { id: "Gateway Switch", group: 5, x: 900, y: 100 },
    { id: "Web Server", group: 6, x: 1100, y: 100 },
    { id: "Admin User", group: 7, x: 100, y: 300 },
    { id: "Standard User", group: 7, x: 100, y: 500 },
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
    { id: "Internet Trust Boundary", x: 50, y: 50, width: 250, height: 200 },
    { id: "Internal Network Boundary", x: 350, y: 50, width: 800, height: 200 },
    { id: "User Zone", x: 50, y: 250, width: 250, height: 300 }
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

// Add STRIDE threats and technical controls
svg.selectAll(".stride-threats")
    .data(links)
    .enter().append("text")
    .attr("x", d => (nodes.find(n => n.id === d.source).x + nodes.find(n => n.id === d.target).x) / 2)
    .attr("y", d => (nodes.find(n => n.id === d.source).y + nodes.find(n => n.id === d.target).y) / 2 + 15)
    .attr("fill", "red")
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .text(d => {
        if (d.type === "Internet Connection") return "Spoofing Identity: Implement strong authentication mechanisms";
        if (d.type === "Internal Traffic") return "Tampering with Data: Employ data integrity checks and encryption";
        if (d.type === "Filtered Traffic") return "Repudiation: Enable logging and auditing mechanisms";
        if (d.type === "Switched Traffic") return "Information Disclosure: Utilize access control lists and encryption";
        return "";
    });