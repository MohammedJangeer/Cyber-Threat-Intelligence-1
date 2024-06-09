const recommendations = [
    { id: "A", text: "Implement session locks after set periods of time for privileged accounts, upon privileged user requests, or in reaction to suspicious behavior. Only reestablish access after the user provides a matched-pair challenge response." },
    { id: "E", text: "Identify, document, and enforce security controls on which user actions may be performed on a system without passing the matched-pair challenge response—for example, contacting technical support or making emergency calls." },
    { id: "G", text: "Develop matched-pair authentication processes that are resistant to replay attacks by establishing large sets of one-time challenge response authenticators." },
    { id: "I", text: "Capture information that uniquely identifies user devices requesting authentication to gain intelligence on unidentified adversaries who fail the matched-pair challenge response." },
    { id: "K", text: "Require in-person matched-pair input to mitigate compromise of the challenge response identification system." },
    { id: "M", text: "Physically and logically segregate the matched-pair challenge response system and enforce strict access controls to safeguard it against compromise." }
];

const securityControls = [
    { id: "B", text: "Session Lock", control: "AC-11: Session Lock" },
    { id: "C", text: "Identification and Authentication", control: "IA-2: Identification and Authentication (Organizational Users)" },
    { id: "D", text: "Identification Challenge", control: "IA-2: Identification and Authentication (Organizational Users) - (1) Network Access to Privileged Accounts - (3) Local Access to Privileged Accounts" },
    { id: "F", text: "Permitted Actions", control: "AC-14: Permitted Actions Without Identification or Authentication" },
    { id: "H", text: "Replay Resistant Authentication", control: "IA-2: Identification and Authentication (Organizational Users) - (8) Network Access to Privileged Accounts—Replay Resistant" },
    { id: "J", text: "Device Identification", control: "IA-3: Device Identification and Authentication - (4) Device Attestation" },
    { id: "L", text: "In-Person Registration", control: "IA-4: Identifier Management - (7) In-Person Registration" },
    { id: "N", text: "Segregation and Access Control", control: "IA-5: Authenticator Management - (6) Protection of Authenticators" }
];

const links = [
    { source: "A", target: "B", label: "AC-11: Session Lock" },
    { source: "A", target: "C", label: "IA-2: Identification and Authentication (Organizational Users)" },
    { source: "A", target: "D", label: "IA-2: Identification and Authentication (Organizational Users) - (1) Network Access to Privileged Accounts - (3) Local Access to Privileged Accounts" },
    { source: "E", target: "F", label: "AC-14: Permitted Actions Without Identification or Authentication" },
    { source: "G", target: "H", label: "IA-2: Identification and Authentication (Organizational Users) - (8) Network Access to Privileged Accounts—Replay Resistant" },
    { source: "I", target: "J", label: "IA-3: Device Identification and Authentication - (4) Device Attestation" },
    { source: "K", target: "L", label: "IA-4: Identifier Management - (7) In-Person Registration" },
    { source: "M", target: "N", label: "IA-5: Authenticator Management - (6) Protection of Authenticators" }
];

const svg = d3.select("#diagram"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

const simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke-width", 2);

const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(recommendations.concat(securityControls))
    .enter().append("g");

const circles = node.append("circle")
    .attr("r", 10)
    .attr("fill", d => recommendations.find(r => r.id === d.id) ? "#67a9cf" : "#ef8a62")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

const labels = node.append("text")
    .text(d => d.text)
    .attr("x", 12)
    .attr("y", 4);

node.append("title")
    .text(d => d.text);

simulation
    .nodes(recommendations.concat(securityControls))
    .on("tick", ticked);

simulation.force("link")
    .links(links);

function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => "translate(" + d.x + "," + d.y + ")");
}

function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}