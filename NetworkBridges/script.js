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

// Render the graph
const render = new dagreD3.render();
const svg = d3.select("svg");
const svgGroup = svg.append("g");

render(d3.select("svg g"), g);

const xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
svg.attr("height", g.graph().height + 40);

// Add sensors to the DFD
svgGroup.append("circle")
    .attr("cx", g.node("Router").x)
    .attr("cy", g.node("Router").y - 40)
    .attr("r", 10)
    .attr("fill", "red")
    .append("title")
    .text("Inline Sensor: Monitors and filters traffic");

svgGroup.append("circle")
    .attr("cx", g.node("Switch").x)
    .attr("cy", g.node("Switch").y - 40)
    .attr("r", 10)
    .attr("fill", "blue")
    .append("title")
    .text("Passive Sensor: Detects unauthorized activation");

svgGroup.append("circle")
    .attr("cx", g.node("Firewall").x)
    .attr("cy", g.node("Firewall").y - 40)
    .attr("r", 10)
    .attr("fill", "green")
    .append("title")
    .text("Inline Sensor: Blocks malicious traffic");

svgGroup.append("circle")
    .attr("cx", g.node("Web Server").x)
    .attr("cy", g.node("Web Server").y - 40)
    .attr("r", 10)
    .attr("fill", "yellow")
    .append("title")
    .text("Endpoint Agent: Reports system activity");

// Add bridges to the DFD
svgGroup.append("rect")
    .attr("x", g.node("Desktop").x - 40)
    .attr("y", g.node("Desktop").y + 20)
    .attr("width", 80)
    .attr("height", 20)
    .attr("fill", "purple")
    .append("title")
    .text("Bridge: Potential data exfiltration point");

svgGroup.append("rect")
    .attr("x", g.node("Mobile Device").x - 60)
    .attr("y", g.node("Mobile Device").y + 20)
    .attr("width", 120)
    .attr("height", 20)
    .attr("fill", "orange")
    .append("title")
    .text("Bridge: Potential unauthorized access point");

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

// Tooltip for displaying process details
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.selectAll("g.node, rect").on("mouseover", function (event, d) {
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

// Add bridge info box
d3.select("#network-map-container")
    .append("div")
    .attr("id", "bridge-info")
    .html(`
        <h3>Bridges</h3>
        <p><strong>Purple:</strong> Potential data exfiltration point</p>
        <p><strong>Orange:</strong> Potential unauthorized access point</p>
    `);