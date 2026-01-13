<template>
  <section
    id="the-team"
    class="about-section"
  >
    <div class="section-header">
      <h2>{{ text.heading }}</h2>
    </div>

    <div class="about-copy">
      <p v-html="text.paragraph1" />
    </div>

    <div class="about-figure">
      <div class="svg-container">
        <svg
          id="force-svg"
          ref="svg"
          class="svg"
          role="img"
          :width="width"
          :height="height"
          :aria-label="text.ariaLabel"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { isMobile } from "mobile-device-detect";
import * as d3 from "d3";

// Importing images from assets

const props = defineProps({
    text: { 
      type: Object,
      default() {
        return {}
      } 
    }
});

const cloneNodes = (source = []) => {
    if (!Array.isArray(source)) return []
    return source.map((node) => ({ ...node }))
}

// global variables
const mobileView = isMobile;
let width = 0;
let height = 0;
let nodeRadius = 45;

const svg = ref(null);

const nodes = ref(cloneNodes(props.text?.nodes));
watch(
    () => props.text?.nodes,
    (next) => {
        nodes.value = cloneNodes(next);
        if (svg.value) resizeAndDraw();
    }
);

// use same highlight color as the badge buttons
const badgeSelectionColor = "var(--white-soft)";

onMounted(() => {
    resizeAndDraw();
    window.addEventListener('resize', resizeAndDraw);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeAndDraw);
});

// adjust the cluster space based on svg and screen 
function resizeAndDraw() {

  const bounds = svg.value.getBoundingClientRect();
  width = bounds.width;
  height = bounds.height;  

  // edit multipliers here to change desktop node size
  nodeRadius = window.innerHeight < 700 
    ? Math.min(width, height) * 0.28 
    : Math.min(width, height) * 0.15;
    
  nodeRadius = mobileView 
    ? Math.min(width, height) * 0.18 
    : nodeRadius;
  
  d3.select(svg.value).selectAll('*').remove();
  drawGraph();
}

function drawGraph() {

    if (!nodes.value.length) {
        return;
    }

    // for group positioning
    const groupNames = [...new Set(nodes.value.map(d => d.group))];
    const groupCenters = new Map();

    groupNames.forEach(group => {
        const cx = width / 2 + (Math.random() - 0.75) * width * 0.75;
        const cy = height / 2 + (Math.random() - 0.75) * height * 0.75;
        groupCenters.set(group, { x: cx, y: cy });
    });

    // force simulation to control positioning
    const simulation = d3.forceSimulation(nodes.value)
        .force('charge', d3.forceManyBody().strength(d => -200 - Math.random() * 100))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(nodeRadius*1.1))
        // custom clustering force that pulls each node towards its' group center
        .force('cluster', forceCluster(0.1));

    // build the svg
    const svgElement = d3.select(svg.value);

    svgElement.append('desc')
        .attr("id", "force-svg-desc")
        .text(props.text.ariaDesc)

    svgElement.append("defs").selectAll("clipPath")
        .data(nodes.value)
        .join("clipPath")
        .attr("id", d => `clip-${d.id}`)
        .append("circle")
        .attr("r", nodeRadius);

    // add circles to create rippling aura effect
    const rippleGroup = svgElement.append('g')
        .attr('class', 'ripples')

    const node = svgElement.append('g')
        .selectAll('a')
        .data(nodes.value)
        .join('a')
        .attr('xlink:href', d => d.url || null)
        .attr('target', '_blank')
        .attr('aria-hidden', d => d.url ? false : true)
        .attr('aria-label', d => d.url ? `Link to USGS staff profile for ${d.name}` : null)
        .append('circle')
        .attr('aria-hidden', true)
        .attr('r', nodeRadius)
        .attr('stroke', badgeSelectionColor)
        .attr('stroke-width', 6)
        .style('fill', d => `url(#pattern-${d.id})`)
        .call(drag(simulation));

    // svg defs
    const defs = svgElement.append('defs');

    defs.append('filter')
        .attr('id', 'psychedelic-glow')
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%')
        .html(`
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
            <feColorMatrix in="blur" mode="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 20 -10" result="goo"/>
            <feBlend in="SourceGraphic" in2="goo" />
        `);

    // define styles for images in bubbles
    const patterns = defs.append('defs')
        .selectAll('pattern')
        .data(nodes.value)
        .enter()
        .append('pattern')
        .attr('id', d => `pattern-${d.id}`)
        .attr('height', 1)
        .attr('width', 1)
        .attr('patternContentUnits', 'objectBoundingBox')

    // add profile images
    patterns.append('image')
        .attr('href', d => d.img)
        .attr('height', 1)
        .attr('width', 1)
        .style('opacity', 0.8)
        .attr('preserveAspectRatio', 'xMidYMid slice')
        .style('filter', 'grayscale(100%)'); // greyscale images

    // tint images with accent color
    patterns.append('rect')
        .attr('width', 1)
        .attr('height', 1)
        .attr('fill', badgeSelectionColor)
        .style('opacity', 0.1);

    // name labels for mouseover
    const labels = svgElement.append('g')
        .selectAll('text')
        .data(nodes.value)
        .join('text')
        .text(d => d.id)
        .attr('x', d => d.x)
        .attr('y', d => d.y - nodeRadius - 10)
        .attr('text-anchor', 'middle')
        .attr("dominant-baseline", "central")
        .style('visibility', 'hidden')
        .attr('pointer-events', 'none');

    //mouseover effects
    node.on('mouseover', (event, d) => {

        d3.select(event.currentTarget)
            .style('fill', badgeSelectionColor)
            .style('opacity', 0.8);

        labels.filter(ld => ld.id === d.id)
            .style('visibility', 'visible')
            .style('fill', 'black')
            .style('font-weight', '800')
            .style('stroke', 'white')
            .style('stroke-width', '0.1');

        createRippleEffect(d)

        })
        .on('mouseout', (event, d) => {

            d3.select(event.currentTarget)
                .style('fill', `url(#pattern-${d.id})`)
                .style('opacity', 1);

            labels.filter(ld => ld.id === d.id)
                .style('visibility', 'hidden');
        })
        .on('click', (event, d) => {
            window.open(d.url, '_blank');
        });

    // allow circles to move
    simulation.on('tick', () => {
        
        node
            .attr('cx', d => {
                d.x = constrain(d.x, nodeRadius, width - nodeRadius);
                return d.x;
            })
            .attr('cy', d => {
                d.y = constrain(d.y, nodeRadius, height - nodeRadius);
                return d.y;
            });

        labels
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    });

    // allow dragging of circles
    function drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }

    // but dont drag outside the container
    function constrain(value, min, max) {
        return Math.max(min+10, Math.min(max-10, value));
    }

    function forceCluster(strength = 0.1) {
        return alpha => {
            nodes.value.forEach(d => {
                // get the target center for the circle's group
                const center = groupCenters.get(d.group);

                // find the distance between the circle and the center
                const dx = center.x - d.x;
                const dy = center.y - d.y;

                // adjust the force so the circle is pulled towards the group center
                d.vx += dx * strength * alpha;
                d.vy += dy * strength * alpha;
            });
        };
    }
    function createRippleEffect(d) {
        const rippleCount = 1;
        const duration = 1000;
        const rippleRadius = nodeRadius * 3;

        for (let i = 0; i < rippleCount; i++) {
            rippleGroup.append('circle')
                .attr('cx', d.x)
                .attr('cy', d.y)
                .attr('r', 0)
                .attr('fill', 'none')
                .attr('stroke', badgeSelectionColor)
                .attr('stroke-width', 9)
                .attr('opacity', 0.8)
                .attr('filter', 'url(#psychedelic-glow)')
                .transition()
                .delay((i-1) * 600)
                .duration(duration)
                .ease(d3.easeSinInOut)
                .attr('r', rippleRadius)
                .attr('opacity', 0)
                .remove();
        }
    }
}

</script>

<style lang="scss" scoped>
.about-section {
  padding: 4rem 2rem 5rem;
  margin: 0 auto;
  max-width: 1200px;
}

.about-copy {
  max-width: 65ch;
  margin-bottom: 2rem;
}

.about-copy p {
  padding-bottom: 0.8rem;
}

.about-figure {
  margin-top: 2rem;
}

@media (min-width: 960px) {
  .about-copy {
    max-width: 50%;
  }
}

.svg-container {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60vh;
}
#force-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
  display: block;
}
</style>
