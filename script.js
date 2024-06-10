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
g.setEdge("File Server", "Network Storage", { label: "stores in" });

g.setEdge("Web Server", "Cloud Service", { label: "accesses" });
g.setEdge("App Server", "Third-Party API", { label: "accesses" });

// Add threat modeling information (STRIDE)
const threats = {
    "Admin User": "Potential for elevation of privilege",
    "Standard User": "Potential for spoofing identity",
    "Desktop": "Potential for tampering with data",
    "Laptop": "Potential for information disclosure",
    "Mobile Device": "Potential for denial of service",
    "Router": "Potential for tampering with data",
    "Switch": "Potential for information disclosure",
    "Firewall": "Potential for denial of service",
    "Web Server": "Potential for elevation of privilege",
    "App Server": "Potential for information disclosure",
    "Database Server": "Potential for tampering with data",
    "File Server": "Potential for information disclosure",
    "Cloud Service": "Potential for denial of service",
    "Third-Party API": "Potential for information disclosure",
    "Local Storage": "Potential for tampering with data",
    "Network Storage": "Potential for information disclosure"
};

const svg = d3.select("#network-map");
const inner = svg.append("g");

const render = new dagreD3.render();
render(inner, g);

const svgGroup = svg.select("g");
const zoom = d3.zoom().on("zoom", (event) => {
    svgGroup.attr("transform", event.transform);
});
svg.call(zoom);

const initialScale = 0.75;
svg.call(zoom.transform, d3.zoomIdentity.translate((svg.node().clientWidth - g.graph().width * initialScale) / 2, 20).scale(initialScale));

svg.attr("height", g.graph().height * initialScale + 40);

// Make the SVG responsive
window.addEventListener("resize", () => {
    svg.attr("width", svg.node().clientWidth)
        .attr("height", svg.node().clientHeight);
});

window.dispatchEvent(new Event('resize'));

// Add tooltips for threats
const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

d3.selectAll(".node").on("mouseover", function (event, d) {
    const node = d3.select(this).select("rect");
    const nodeName = node.text();

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