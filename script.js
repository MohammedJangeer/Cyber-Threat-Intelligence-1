const g = new dagreD3.graphlib.Graph().setGraph({});

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

g.setEdge("Firewall", "Web Server", { label: "secures" });
g.setEdge("Firewall", "App Server", { label: "secures" });
g.setEdge("Firewall", "Database Server", { label: "secures" });
g.setEdge("Firewall", "File Server", { label: "secures" });

g.setEdge("Web Server", "Database Server", { label: "queries" });
g.setEdge("App Server", "Database Server", { label: "queries" });

g.setEdge("Web Server", "Local Storage", { label: "stores in" });
g.setEdge("App Server", "Network Storage", { label: "stores in" });

g.setEdge("Web Server", "Cloud Service", { label: "requests" });
g.setEdge("App Server", "Third-Party API", { label: "requests" });

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

d3.selectAll("g.node").on("mouseover", function (event, d) {
    const nodeName = d;
    tooltip.transition()
        .duration(200)
        .style("opacity", .9);
    tooltip.html(`<strong>${nodeName}</strong><br/>Threat: ${threats[nodeName]}`)
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
}).on("mouseout", function (event, d) {
    tooltip.transition()
        .duration(500)
        .style("opacity", 0);
});