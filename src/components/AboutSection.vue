<template>
  <section
    :id="sectionId"
    class="content-section"
  >
    <div class="section-header">
      <h2
        :id="titleId"
        :data-section-anchor="sectionId"
      >
        <a
          class="section-title-link"
          :href="`#${titleId}`"
        >
          {{ headingText }}
        </a>
      </h2>
      <p
        v-if="text.summary"
        class="section-summary"
        v-html="text.summary"
      ></p>
      <p
        v-if="contactIntro && contactHref"
        class="section-summary about-contact"
      >
        {{ contactIntro }}
        <a
          :href="contactHref"
        >
          {{ contactLabel }}
        </a>
      </p>
    </div>

    <div class="svg-container">
      <svg
        ref="svg"
        class="about-chart"
        role="img"
        :width="width"
        :height="height"
        :aria-label="text.ariaLabel"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { isMobile } from "mobile-device-detect";
import * as d3 from "d3";
import sections from "@/assets/content/sections.json"

// Importing images from assets

const props = defineProps({
  text: {
    type: Object,
    default() {
      return {}
    }
  },
  id: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  }
});

const teamMeta = sections.team || {}

const sectionId = computed(() => props.id || teamMeta.id || "team")
const headingText = computed(() => props.title || teamMeta.title || "team")
const titleId = computed(() => `${sectionId.value}`)
const contactIntro = computed(() => teamMeta.contact?.intro || "")
const contactHref = computed(() => teamMeta.contact?.href || "")
const contactLabel = computed(() => teamMeta.contact?.label || "")

const cloneMembers = (source = []) => {
    if (!Array.isArray(source)) return []
    return source.map((member) => ({ ...member }))
}

// global variables
const mobileView = isMobile;
let width = 0;
let height = 0;
let nodeRadius = 45;

const svg = ref(null);

const members = ref(cloneMembers(props.text?.members));
watch(
    () => props.text?.members,
    (next) => {
        members.value = cloneMembers(next);
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
  if (!svg.value) return

  const bounds = svg.value.getBoundingClientRect();
  width = bounds.width;
  height = bounds.height;

  if (!width || !height) {
    return
  }

  // edit multipliers here to change desktop node size
  nodeRadius = window.innerHeight < 700 
    ? Math.min(width, height) * 0.3 
    : Math.min(width, height) * 0.18;
    
  nodeRadius = mobileView 
    ? Math.min(width, height) * 0.18 
    : nodeRadius;
  
  d3.select(svg.value).selectAll('*').remove();
  drawGraph();
}

// make the bubble viz
function drawGraph() {

    if (!members.value.length) {
        return;
    }

    // for group positioning
    const groupNames = [...new Set(members.value.map(d => d.group))];
    const groupCenters = new Map();

    groupNames.forEach(group => {
        const cx = width / 2 + (Math.random() - 0.75) * width * 0.75;
        const cy = height / 2 + (Math.random() - 0.75) * height * 0.75;
        groupCenters.set(group, { x: cx, y: cy });
    });

    // force simulation to control positioning
    const simulation = d3.forceSimulation(members.value)
        .force('charge', d3.forceManyBody().strength(d => -200 - Math.random() * 100))
        .force('center', d3.forceCenter(width / 2, height / 2).strength(0.05))
        .force('collision', d3.forceCollide().radius(nodeRadius*1.1))
        // custom clustering force that pulls each node towards its' group center
        .force('cluster', forceCluster(0.025));

    // build the svg
    const svgElement = d3.select(svg.value);

    svgElement.append('desc')
        .attr("id", "force-svg-desc")
        .text(props.text.ariaDescription)

    svgElement.append("defs").selectAll("clipPath")
        .data(members.value)
        .join("clipPath")
        .attr("id", d => `clip-${d.id}`)
        .append("circle")
        .attr("r", nodeRadius);

    // add circles to create rippling aura effect
    const rippleGroup = svgElement.append('g')
        .attr('class', 'ripples')

    const node = svgElement.append('g')
        .selectAll('a')
        .data(members.value)
        .join('a')
        .attr('xlink:href', d => d.href || null)
        .attr('target', '_blank')
        .attr('aria-hidden', d => d.href ? false : true)
        .attr('aria-label', d => d.href ? `Link to USGS staff profile for ${d.name}` : null)
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
        .data(members.value)
        .enter()
        .append('pattern')
        .attr('id', d => `pattern-${d.id}`)
        .attr('height', 1)
        .attr('width', 1)
        .attr('patternContentUnits', 'objectBoundingBox')

    // add profile images
    patterns.append('image')
        .attr('href', d => d.image)
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
        .data(members.value)
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
            window.open(d.href, '_blank');
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
            members.value.forEach(d => {
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
.section-summary {
  max-width: 80ch;
}

.section-summary.about-contact {
  padding-bottom: 0.8rem;
  word-break: keep-all;
  hyphens: none;
}

.svg-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
}

.about-chart {
  width: 100%;
  height: 100%;
  overflow: visible;
  display: block;
}
</style>
