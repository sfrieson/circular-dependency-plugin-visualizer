/* globals d3 */
/* Fork of Force-Directed Graph by Mike Bostock */
/* https://observablehq.com/@d3/force-directed-graph */
const colorNode = ((scale, d) => scale(d.group)).bind(
  null,
  d3.scaleOrdinal(d3.schemeCategory10)
);

const charge = d3.forceManyBody().distanceMin(30).distanceMax(200);

function plot(width, height, data) {
  const nodes = Object.keys(data.nodes).map((key) => data.nodes[key]);
  const links = Object.keys(data.links).map((key) => data.links[key]);
  const simulation = d3
    .forceSimulation(nodes)
    .force("charge", charge)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.id)
    )
    .force("center", d3.forceCenter(0, 0));

  const svg = d3
    .create("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height]);

  const link = svg
    .append("g")
    .attr("class", "line-group")
    .selectAll("line")
    .data(links)
    .join("line");

  // const node = svg
  //   .append("g")
  //   .attr("class", "node-group")
  //   .selectAll("circle")
  //   .data(nodes)
  //   .join("circle")
  //   .attr("r", 5)
  //   .attr("fill", colorNode)
  //   .call(drag(simulation));

  // let labels = svg
  //   .append("g")
  //   .selectAll("text")
  //   .data(nodes)
  //   .join("text")
  //   .attr("class", "label")
  //   .call(drag(simulation));

  var gnodes = svg
    .selectAll("g.gnode")
    .data(nodes)
    .enter()
    .append("g")
    .classed("gnode", true);

  var node = gnodes
    .append("circle")
    .attr("class", "node")
    .attr("r", 5)
    .style("fill", colorNode)
    .call(drag(simulation));

  // Append the labels to each group
  var labels = gnodes
    .append("text")
    .attr("class", "label")
    .text((d) => d.id);

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    labels
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .text((d) => d.id);
  });
  svg.call(zoom(gnodes, link, labels));
  return svg.node();
}

function zoom(node, link, labels) {
  return d3.zoom().on("zoom", function () {
    node.attr("transform", d3.event.transform);
    link.attr("transform", d3.event.transform);
    labels.attr("transform", d3.event.transform);
  });
}

function drag(simulation) {
  return d3
    .drag()
    .on("start", function (d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", function (d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    })
    .on("end", function (d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
}

const root = document.getElementById("root");
const rootStyles = window.getComputedStyle(root);
const height = parseInt(rootStyles.height, 10);
const width = parseInt(rootStyles.width, 10);
// eslint-disable-next-line comma-dangle
root.appendChild(plot(width, height /* data */));
