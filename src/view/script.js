/* globals d3 */
/* Fork of Force-Directed Graph by Mike Bostock */
/* https://observablehq.com/@d3/force-directed-graph */
const colorNode = ((scale, d) => scale(d.group)).bind(
  null,
  d3.scaleOrdinal(d3.schemeCategory10)
);

const charge = d3.forceManyBody().distanceMin(30).distanceMax(200);
/**
 * @param {*} data
 * @param {{
 *     labels?: boolean // default false
 * }} config
 */
function plot(width, height, data, config) {
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
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", 2);

  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 5)
    .attr("fill", colorNode)
    .call(drag(simulation));

    let labels
    if (config?.labels) {
      labels = svg
        .append("g")
        .attr("color", "#333")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .attr("style", "font-family: Arial; font-size: 12px;")
        .call(drag(simulation));
    }

  node.append("title").text((d) => d.id);

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    if (labels) {
        labels
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .text(d => d.id)
    }
  });
  svg.call(zoom(node, link, labels));
  return svg.node();
}

function zoom(node, link, labels) {
  return d3.zoom().on("zoom", function () {
    node.attr("transform", d3.event.transform);
    link.attr("transform", d3.event.transform);
    if (labels) {
        labels.attr("transform", d3.event.transform);
    }
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
root.appendChild(plot(width, height, /* data */, /* config */));
