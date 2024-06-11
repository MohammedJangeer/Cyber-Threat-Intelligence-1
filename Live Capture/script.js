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
g.setNode("Honeypot", { label: "Honeypot\n(Decoy System)", width: 100, height: 50 });
g.setNode("NAC", { label: "Network Access Control\n(NAC)", width: 160, height: 50 });
g.setNode("Forensic Workstation", { label: "Forensic Workstation\n(Memory Forensics)", width: 160, height: 50 });

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

g.setEdge("Honeypot", "Router", { label: "monitors" });
g.setEdge("NAC", "Switch", { label: "isolates" });
g.setEdge("Forensic Workstation", "Database Server", { label: "analyzes" });
g.setEdge("Forensic Workstation", "File Server", { label: "analyzes" });

// Render the graph
const render = new dagreD3.render();
const svg = d3.select("svg");
const svgGroup = svg.append("g");

render(d3.select("svg g"), g);

const xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
svg.attr("height", g.graph().height + 40);

// Highlight the new nodes by drawing a box around them
const nodesToHighlight = ["Honeypot", "NAC", "Forensic Workstation"];
const highlightGroup = svgGroup.append("g").attr("class", "highlight-group");

nodesToHighlight.forEach(nodeId => {
    const node = g.node(nodeId);
    highlightGroup.append("rect")
        .attr("x", node.x - node.width / 2 - 10)
        .attr("y", node.y - node.height / 2 - 10)
        .attr("width", node.width + 20)
        .attr("height", node.height + 20)
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("fill", "none");
});

// Tooltip for displaying process details
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.selectAll("g.node").on("mouseover", function (event, d) {
    const nodeName = d;
    tooltip.transition()
        .duration(200)
        .style("opacity", .9);
    tooltip.html(`<strong>${nodeName}</strong>`)
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
}).on("mouseout", function (event, d) {
    tooltip.transition()
        .duration(500)
        .style("opacity", 0);
});

// Zoom and Drag functionality
const zoom = d3.zoom().on("zoom", function (event) {
    svgGroup.attr("transform", event.transform);
});

svg.call(zoom);

// Enable drag functionality
const drag = d3.drag().on("drag", function (event, d) {
    d3.select(this).attr("transform", "translate(" + event.x + "," + event.y + ")");
});

d3.selectAll("g.node").call(drag);