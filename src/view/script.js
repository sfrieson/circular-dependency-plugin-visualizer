/* globals d3 */
const colorNode = ((scale, d) => scale(d.group))
  .bind(null, d3.scaleOrdinal(d3.schemeCategory10));

const charge = d3.forceManyBody()
  .distanceMin(30)
  .distanceMax(200);

function plot (width, height, data) {
  const { nodes, links } = data;
  const simulation = d3.forceSimulation(nodes)
    .force('charge', charge)
    .force('link', d3.forceLink(links).id(d => d.id))
    .force('x', d3.forceX())
    .force('y', d3.forceY());

  const svg = d3.create('svg')
    .attr('viewBox', [-width / 2, -height / 2, width, height]);

  const link = svg.append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', 2);

  const node = svg.append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 5)
    .attr('fill', colorNode)
    .call(drag(simulation));

  node.append('title')
    .text(d => d.id);

  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  });
  svg.call(zoom(node, link));
  return svg.node();
}

function zoom (node, link) {
  return d3.zoom()
    .on('zoom', function () {
      node.attr('transform', d3.event.transform);
      link.attr('transform', d3.event.transform);
    });
}

function drag (simulation) {
  return d3.drag()
    .on('start', function (d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on('drag', function (d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    })
    .on('end', function (d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
}

const root = document.getElementById('root');
const rootStyles = window.getComputedStyle(root);
const height = parseInt(rootStyles.height, 10);
const width = parseInt(rootStyles.width, 10);
root.appendChild(plot(width, height /* data */));
