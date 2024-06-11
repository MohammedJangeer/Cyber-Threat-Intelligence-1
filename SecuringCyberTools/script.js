// Define the graph using dagreD3
const g = new dagreD3.graphlib.Graph().setGraph({});

// Define nodes for an example cyber attack and its mitigation
g.setNode("Attacker", { label: "Attacker", width: 80, height: 50 });
g.setNode("Phishing Email", { label: "Phishing Email", width: 100, height: 50 });
g.setNode("User", { label: "User", width: 80, height: 50 });
g.setNode("Compromised Tool", { label: "Compromised Tool", width: 150, height: 50 });
g.setNode("SOC Analyst", { label: "SOC Analyst", width: 100, height: 50 });
g.setNode("Alert System", { label: "Alert System", width: 100, height: 50 });
g.setNode("Mitigation Actions", { label: "Mitigation Actions", width: 150, height: 50 });
g.setNode("Secure Tool", { label: "Secure Tool", width: 100, height: 50 });

// Define edges with labels for the process flow
g.setEdge("Attacker", "Phishing Email", { label: "sends" });
g.setEdge("Phishing Email", "User", { label: "clicks link" });
g.setEdge("User", "Compromised Tool", { label: "executes tool" });
g.setEdge("Compromised Tool", "SOC Analyst", { label: "detects anomaly" });
g.setEdge("SOC Analyst", "Alert System", { label: "generates alert" });
g.setEdge("Alert System", "Mitigation Actions", { label: "triggers actions" });
g.setEdge("Mitigation Actions", "Secure Tool", { label: "secures tool" });

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