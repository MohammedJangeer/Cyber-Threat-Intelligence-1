// Define the graph using dagreD3
const g = new dagreD3.graphlib.Graph().setGraph({});

// Define nodes with labels and dimensions
g.setNode("Admin User", { label: "Admin User", width: 100, height: 50 });
g.setNode("Standard User", { label: "Standard User", width: 100, height: 50 });
g.setNode("Desktop", { label: "Desktop", width: 100, height: 50 });
g.setNode("Laptop", { label: "Laptop", width: 100, height: 50 });
g.setNode("Mobile Device", { label: "Mobile Device", width: 120, height: 50 });
g.setNode("Router", { label: "Router", width: 80, height: 50 });
g.setNode("Switch", { label: "Switch", width: 80, height: 50 });
g.setNode("Firewall", { label: "Firewall", width: 80, height: 50 });
g.setNode("Web Server", { label: "Web Server", width: 100, height: 50 });
g.setNode("App Server", { label: "App Server", width: 100, height: 50 });
g.setNode("Database Server", { label: "Database Server", width: 130, height: 50 });
g.setNode("File Server", { label: "File Server", width: 100, height: 50 });
g.setNode("Cloud Service", { label: "Cloud Service", width: 100, height: 50 });
g.setNode("Third-Party API", { label: "Third-Party API", width: 120, height: 50 });
g.setNode("Local Storage", { label: "Local Storage", width: 100, height: 50 });
g.setNode("Network Storage", { label: "Network Storage", width: 120, height: 50 });

// Define edges with labels
g.setEdge("Admin User", "Desktop", { label: "uses" });
g.setEdge("Admin User", "Laptop", { label: "uses" });
g.setEdge("Standard User", "Desktop", { label: "uses" });
g.setEdge("Standard User", "Laptop", { label: "uses" });
g.setEdge("Standard User", "Mobile Device", { label: "uses" });

g.setEdge("Desktop", "Router", { label: "connects to" });
g.setEdge("Laptop", "Router", { label: "connects to" });
g.setEdge("Mobile Device", "Router", { label: "connects to" });

g.setEdge("Router", "Switch", { label: "connects to" });
g.setEdge("Switch", "Firewall", { label: "connects to" });
g.setEdge("Firewall", "Web Server", { label: "protects" });
g.setEdge("Firewall", "App Server", { label: "protects" });
g.setEdge("Firewall", "Database Server", { label: "protects" });
g.setEdge("Firewall", "File Server", { label: "protects" });

g.setEdge("Desktop", "Local Storage", { label: "stores in" });
g.setEdge("Laptop", "Local Storage", { label: "stores in" });
g.setEdge("App Server", "Network Storage", { label: "stores in" });

g.setEdge("Web Server", "Cloud Service", { label: "requests" });
g.setEdge("App Server", "Third-Party API", { label: "requests" });

// Render the graph
const render = new dagreD3.render();
const svg = d3.select("svg"),
    svgGroup = svg.append("g");

render(d3.select("svg g"), g);

const xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
svg.attr("height", g.graph().height + 40);

// Zoom functionality
const zoom = d3.zoom().on("zoom", function (event) {
    svgGroup.attr("transform", event.transform);
});
svg.call(zoom);

// Tooltip for displaying threats and security controls
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

const threats = {
    "Admin User": "Potential insider threat, privileged account misuse",
    "Standard User": "Phishing attacks, social engineering",
    "Desktop": "Malware infection, unauthorized access",
    "Laptop": "Lost/stolen device, unauthorized access",
    "Mobile Device": "Unsecured Wi-Fi, lost/stolen device",
    "Router": "DDoS attacks, configuration flaws",
    "Switch": "Physical tampering, misconfigurations",
    "Firewall": "Misconfigurations, DDoS attacks",
    "Web Server": "SQL injection, cross-site scripting",
    "App Server": "Code injection, API vulnerabilities",
    "Database Server": "SQL injection, data breaches",
    "File Server": "Ransomware, unauthorized access",
    "Cloud Service": "Data breaches, API vulnerabilities",
    "Third-Party API": "Data leakage, insecure communication",
    "Local Storage": "Physical theft, unauthorized access",
    "Network Storage": "Data breaches, ransomware"
};

const securityControls = {
    "Admin User": "RBAC, MFA",
    "Standard User": "User training, email filtering",
    "Desktop": "Antivirus, EDR",
    "Laptop": "Encryption, remote wipe",
    "Mobile Device": "MDM, VPN",
    "Router": "Access control lists, firmware updates",
    "Switch": "Network segmentation, port security",
    "Firewall": "Intrusion prevention, regular updates",
    "Web Server": "WAF, regular patching",
    "App Server": "Input validation, secure coding",
    "Database Server": "Encryption, access controls",
    "File Server": "Encryption, backups",
    "Cloud Service": "CASB, encryption",
    "Third-Party API": "Secure API gateway, regular audits",
    "Local Storage": "Encryption, physical security",
    "Network Storage": "Encryption, access controls"
};

// Add sensor icon for baseline configuration
svgGroup.append("circle")
    .attr("cx", g.node("Router").x - 30)
    .attr("cy", g.node("Router").y - 50)
    .attr("r", 10)
    .attr("fill", "red")
    .append("title")
    .text("Baseline Configuration: Alerts SOC team");

// Add asset inventory box
svgGroup.append("rect")
    .attr("x", g.node("Firewall").x + 200)
    .attr("y", g.node("Firewall").y - 50)
    .attr("width", 200)
    .attr("height", 150)
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("stroke-width", 1.5);

svgGroup.append("text")
    .attr("x", g.node("Firewall").x + 300)
    .attr("y", g.node("Firewall").y - 35)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "black")
    .text("Asset Inventory");

svgGroup.append("text")
    .attr("x", g.node("Firewall").x + 300)
    .attr("y", g.node("Firewall").y - 15)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .attr("fill", "black")
    .text("List of authorized devices");

svgGroup.append("text")
    .attr("x", g.node("Firewall").x + 300)
    .attr("y", g.node("Firewall").y + 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .attr("fill", "black")
    .text("Connected to the network");

// Add dotted area for network segmentation
svgGroup.append("rect")
    .attr("x", g.node("Firewall").x - 300)
    .attr("y", g.node("Firewall").y - 150)
    .attr("width", 600)
    .attr("height", 300)
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("stroke-width", 1.5)
    .style("stroke-dasharray", ("3, 3"));

svgGroup.append("text")
    .attr("x", g.node("Firewall").x)
    .attr("y", g.node("Firewall").y - 160)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "black")
    .text("Network Segmentation");

// Add icons for network traffic monitoring around the switch and router
svgGroup.append("rect")
    .attr("x", g.node("Switch").x - 20)
    .attr("y", g.node("Switch").y - 20)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", "blue")
    .append("title")
    .text("Network Traffic Monitoring: Switch");

svgGroup.append("rect")
    .attr("x", g.node("Router").x + 20)
    .attr("y", g.node("Router").y - 20)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", "blue")
    .append("title")
    .text("Network Traffic Monitoring: Router");

// Tooltip for displaying threats and security controls
d3.selectAll("g.node").on("mouseover", function (event, d) {
    const nodeName = d;
    tooltip.transition()
        .duration(200)
        .style("opacity", .9);
    tooltip.html(`<strong>${nodeName}</strong><br/>Threat: ${threats[nodeName]}<br/>Security Controls: ${securityControls[nodeName]}`)
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
}).on("mouseout", function (event, d) {
    tooltip.transition()
        .duration(500)
        .style("opacity", 0);
});