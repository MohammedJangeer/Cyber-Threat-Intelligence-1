// Define the graph using dagreD3
const g = new dagreD3.graphlib.Graph().setGraph({});

// Define nodes for user activity patterns to enhance security process
g.setNode("User", { label: "User", width: 80, height: 50 });
g.setNode("Login Page", { label: "Login Page", width: 100, height: 50 });
g.setNode("Activity Monitor", { label: "Activity Monitor", width: 120, height: 50 });
g.setNode("Time-Based Analysis", { label: "Time-Based Analysis", width: 150, height: 50 });
g.setNode("Anomaly Detection", { label: "Anomaly Detection", width: 150, height: 50 });
g.setNode("Access Control", { label: "Access Control", width: 120, height: 50 });
g.setNode("System", { label: "System", width: 80, height: 50 });

// Define edges with labels for the process flow
g.setEdge("User", "Login Page", { label: "enters credentials" });
g.setEdge("Login Page", "Activity Monitor", { label: "sends credentials" });
g.setEdge("Activity Monitor", "Time-Based Analysis", { label: "monitors activity" });
g.setEdge("Time-Based Analysis", "Anomaly Detection", { label: "analyzes patterns" });
g.setEdge("Anomaly Detection", "Access Control", { label: "detects anomalies" });
g.setEdge("Access Control", "System", { label: "controls access" });

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