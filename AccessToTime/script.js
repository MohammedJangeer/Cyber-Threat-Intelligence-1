// Define the graph using dagreD3
const g = new dagreD3.graphlib.Graph().setGraph({});

// Define nodes for time security measures and SOC alert handling process
g.setNode("System Clock", { label: "System Clock", width: 100, height: 50 });
g.setNode("NTP Server", { label: "NTP Server", width: 100, height: 50 });
g.setNode("Time Data Encryption", { label: "Time Data Encryption", width: 150, height: 50 });
g.setNode("Nonce Generation", { label: "Nonce Generation", width: 130, height: 50 });
g.setNode("Time Sync Log", { label: "Time Sync Log", width: 120, height: 50 });
g.setNode("SOC Analyst", { label: "SOC Analyst", width: 100, height: 50 });
g.setNode("Alert System", { label: "Alert System", width: 100, height: 50 });
g.setNode("Mitigation Actions", { label: "Mitigation Actions", width: 150, height: 50 });

// Define edges with labels for the process flow
g.setEdge("System Clock", "NTP Server", { label: "syncs time" });
g.setEdge("NTP Server", "Time Data Encryption", { label: "verifies & encrypts" });
g.setEdge("Time Data Encryption", "Nonce Generation", { label: "adds nonce" });
g.setEdge("Nonce Generation", "Time Sync Log", { label: "logs time sync" });
g.setEdge("Time Sync Log", "SOC Analyst", { label: "monitors logs" });
g.setEdge("SOC Analyst", "Alert System", { label: "detects anomalies" });
g.setEdge("Alert System", "Mitigation Actions", { label: "triggers actions" });
g.setEdge("Mitigation Actions", "System Clock", { label: "updates settings" });

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