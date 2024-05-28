<template>
    <VizSection
        id="bar-chart"
        :figures="true"
        :fig-caption="false"
    >
        <!-- HEADING -->
        <template #heading>
            <h2>
                {{ text.heading }}
            </h2>
        </template>
        <!-- FIGURES -->
        <template #aboveExplanation>
            <p v-html="text.paragraph1" />
        </template>
        <template #figures>
            <div
            id="grid-container-interactive"
            >
                <div id="state-dropdown-container" />
                <div id="chart-container">
                </div>
            </div>
        </template>
        <!-- EXPLANATION -->
        <template #belowExplanation>
            <p v-html="text.paragraph2" />
            <p v-html="text.paragraph3" />
        </template>
    </VizSection>
</template>
  
<script setup>
    import { onMounted, ref } from "vue";
    import * as d3 from 'd3';
    import VizSection from '@/components/VizSection.vue';

    // define props
    defineProps({
        text: { type: Object }
    })

    // global variables 
    // Maybe variables defined w/ 'let' and later updated should be refs?
    const publicPath = import.meta.env.BASE_URL;
    let chartData;
    let dataTypes;
    let chartDimensions;
    let chartBounds;
    let yScale;
    const nationalViewName = 'all states and territories'
    const bodyCSS = window.getComputedStyle(document.body)
    const focalColor = bodyCSS.getPropertyValue('--color-bar-focal');
    const defaultColor = bodyCSS.getPropertyValue('--color-bar-default');
    
    // Set up dynamically updating variables as refs
    const currentType = ref();
    currentType.value = 'Bottled water'
    const currentState = ref();
    currentState.value = nationalViewName

    // Declare behavior on mounted
    // functions called here
    onMounted(() => {
        loadData();
    });

    // Functions
    function loadData() {
        let promises = [
        d3.csv(publicPath + 'state_facility_type_summary.csv'),
      ];
      Promise.all(promises).then(callback)
    }

    function callback(data) {
        chartData = data[0];
        dataTypes = [... new Set(chartData.map(d => d.WB_TYPE))]

        // Set up state dropdown
        // get list of unique states
        const stateList = [... new Set(chartData.map(d => d.NAME))]
        stateList.unshift(nationalViewName)
        // add state dropdown
        addDropdown(stateList)

        initChart();
        drawChart(currentState.value);
    }

    function addDropdown(data) {

        const dropdownID = 'state-dropdown'
        const dropdownContainer = d3.select("#" + dropdownID + "-container")

        const dropdown = dropdownContainer
            .append("select")
            .attr("id", dropdownID)
            .attr("class", "dropdown")
            .attr("aria-label", "state dropdown")
            .attr("tabindex", 0)
            .on("change", function() {
                // Update dropdown text + width
                updateDropdown(this.options[this.selectedIndex].text, dropdownID)

                let selectedArea = this.value
                updateCurrentState(selectedArea);

                drawChart(currentState.value)
            })

        // Append options to dropdown
        dropdown.selectAll("stateOptions")
            .data(data)
            .enter()
            .append("option")
            .attr("value", d => d)
            .text(d => d)

        // Set default value and width of dropdown
        updateDropdown(currentState.value, dropdownID)
    }

    function updateCurrentState(val) {
        currentState.value = val;
    }

    function updateDropdown(text, dropdownID) {
        // Update dropdown text
        d3.select('#' + dropdownID)
            .property('value', text)

        // Add tmp dropdown, which will only ever have one option (the current one)
        // https://stackoverflow.com/questions/20091481/auto-resizing-the-select-element-according-to-selected-options-width
        const tmpSelect = document.createElement("select")
        tmpSelect.classList.add('dropdown') // Add dropdown class to match dropdown styling
        tmpSelect.classList.add('tmp-dropdown') // add tmp-dropdown class to match h3 styling
        const tmpOption = document.createElement("option");
        tmpOption.setAttribute("value", text);
        var t = document.createTextNode(text);
        tmpOption.appendChild(t);
        tmpSelect.appendChild(tmpOption);
        window.document.body.appendChild(tmpSelect)
        
        // Update dropdown width based on width of tmp dropdown
        const tmpDropdownWidth = tmpSelect.offsetWidth / 10 // Divide by 10 to get in rem instead of px
        const dropdownElement = document.getElementById(dropdownID);
        const bufferForBorder = 2 // in rem, same as border-right in .dropdown class PLUS room for arrow background image
        dropdownElement.style.width = tmpDropdownWidth + bufferForBorder + "rem";

        // Remove tmp dropdown
        window.document.body.removeChild(tmpSelect)
    }

    function initChart() {

        // define histogram dimensions relative to container dimensions
        const desktopWidth = 300;
        const desktopHeight = window.innerHeight * .35;

        chartDimensions = {
            width: desktopWidth,
            height: desktopHeight,
            margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
            }
        }
        chartDimensions.boundedWidth = chartDimensions.width - chartDimensions.margin.left - chartDimensions.margin.right
        chartDimensions.boundedHeight = chartDimensions.height - chartDimensions.margin.top - chartDimensions.margin.bottom
        
        // draw canvas for histogram
        const chartSVG = d3.select("#chart-container")
            .append("svg")
            .attr("viewBox", [0, 0, (chartDimensions.width), (chartDimensions.height)].join(' '))
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("id", "chart-svg")

        // assign role for accessibility
        chartSVG.attr("role", "figure")
            .attr("tabindex", 0)
            .append("title")

        chartBounds = chartSVG.append("g")
            .style("transform", `translate(${
            chartDimensions.margin.left
            }px, ${
            chartDimensions.margin.top
            }px)`)

        // init static elements for histogram
        chartBounds.append("g")
            .attr("class", "rects")
            .attr("role", "list")
            .attr("tabindex", 0)
            .attr("aria-label", "bar chart bars")

        // Y axis
        // scale for the y-axis
        yScale = d3.scaleBand()
            .domain(dataTypes)
            .range([0, chartDimensions.boundedHeight])
            .padding(0);
    }

    function updateCurrentType(val) {
        currentType.value = val;
    }

    function drawChart(state) {

        let data;
        if (state === nationalViewName) {
            let dataArray = []
            dataTypes.forEach(function(type) {
            let totalCount = chartData
                .filter(d => d.WB_TYPE === type)
                .map(d => parseInt(d.site_count))
                .reduce(function(acc, value) {
                return acc + value
                })
            let dataObj = {
                NAME: nationalViewName,
                state_abbr: null,
                WB_TYPE: type,
                site_count: totalCount
            }
            dataArray.push(dataObj)
            })
            data = dataArray
        } else {
            data = chartData.filter(d =>
            d.NAME === state)
        }

        // accessor functions
        const yAccessor = d => d.WB_TYPE
        const xAccessor = d => parseInt(d.site_count) // # values in each bin
        const colorAccessor = d => d.WB_TYPE
        const identifierAccessor = d => d.WB_TYPE.replace(' ', '-')

        //add title
        d3.select("#chart-container").select("title")
            .text(`Bar chart of distribution of facility types for ${state}`)

        // create x scale
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, xAccessor)]) // use x accessor w/ raw data
            .range([chartDimensions.boundedWidth, 0])
            .nice()

        // draw data
        let rectGroups = chartBounds.selectAll(".rects")
            .selectAll(".rect")
            .data(data, d => d.WB_TYPE)

        const oldRectGroups = rectGroups.exit()

        oldRectGroups.selectAll('rect')
            .transition(getExitTransition())
            .attr("x", 0)
            .attr("width", 0)

        oldRectGroups.selectAll('text')
            .transition(getExitTransition())
            .attr("x", 0)

        oldRectGroups.transition(getExitTransition()).remove()

        const newRectGroups = rectGroups.enter().append("g")
            .attr("class", "rect " + state)
            .attr("id", d => 'rect-group-' + identifierAccessor(d))
            .attr("tabindex", "0")
            .attr("role", "listitem")
            .attr("aria-label", d => `There are ${
            xAccessor(d)
            } ${
            yAccessor(d)
            } facilities in ${
            state
            }`)

        // append rects and set default x and width, so that when appear, come out from left
        const barHeight = yScale.bandwidth() / 6
        newRectGroups.append("rect")
            .attr("y", d => yScale(yAccessor(d)) + yScale.bandwidth() - barHeight)
            .attr("x", 0)
            .attr("height", barHeight)
            .attr("width", 0)
            .style("fill", d => d.WB_TYPE === currentType.value ? focalColor : defaultColor)

        // update rectGroups to include new points
        rectGroups = newRectGroups.merge(rectGroups)

        // make sure aria-labels are updated
        rectGroups
            .attr("aria-label", d => `There are ${
            xAccessor(d)
            } ${
            yAccessor(d)
            } facilities in ${
            state
            }`)

        const barRects = rectGroups.select("rect")

        // Update bars based on data values
        barRects.transition(getUpdateTransition())
            .attr("id", d => 'rect-' + identifierAccessor(d))
            .attr("y", d => yScale(yAccessor(d)) + yScale.bandwidth() - barHeight)
            .attr("x", 0)
            .attr("height", barHeight)
            .attr("width", d => chartDimensions.boundedWidth - xScale(xAccessor(d)))
            .style("fill", d => d.WB_TYPE === currentType.value ? focalColor : defaultColor)
            .attr("class", d => 'bar ' + identifierAccessor(d))

        // Append full-width recangles to aid interaction
        newRectGroups.append("rect")
            .attr("y", d => yScale(yAccessor(d)))
            .attr("x", 0)
            .attr("height", yScale.bandwidth())
            .attr("width", chartDimensions.boundedWidth)
            .style("fill", 'white')
            .style("fill-opacity", 0)

        // Append text and set default position
        newRectGroups.append("text")
            .attr("y", d => yScale(yAccessor(d)) + yScale.bandwidth()/2)
            .attr("x", 0)

        // Set up interaction
        rectGroups
            .on("click", (event, d) => {
            // set current type
            updateCurrentType(colorAccessor(d))

            // build identifier for d3 selection
            let currentIdentifier = currentType.value.replace(' ', '-')

            // style bar chart
            d3.selectAll('.bar')
                .transition(getUpdateTransition())
                .style("fill", defaultColor)

            d3.selectAll('#rect-' + currentIdentifier)
                .transition(getUpdateTransition())
                .style("fill", focalColor)
            })

        rectGroups.select("text")
            .transition(getUpdateTransition())
            .attr("class", "bar-label chart-text")
            .attr("aria-hidden", "true") // hide from screen reader since have aria-label for rect groups
            .attr("y", d => yScale(yAccessor(d)) + yScale.bandwidth() / 2)
            .attr("x", 0)
            .style("text-anchor", "start")
            .attr("alignment-baseline", "middle") // center text
            .attr("dominant-baseline", "middle") // required for Firefox
            .text(d => {
                const count = xAccessor(d); 
                let suffix;
                switch(yAccessor(d)) {
                case 'Brewery':
                suffix = count > 1 ? 'Breweries' : yAccessor(d);
                break;
                case 'Distillery':
                suffix = count > 1 ? 'Distilleries' : yAccessor(d);
                break;
                case 'Winery':
                suffix = count > 1 ? 'Wineries' : yAccessor(d);
                break;
                case 'Soft drinks':
                suffix = count > 1 ? 'Soft drink facilities' : 'Soft drink facility';
                break;
                default:
                suffix =  count > 1 ? yAccessor(d) + ' facilities' : yAccessor(d) + ' facility';
                }

                return d3.format(',')(xAccessor(d)) + " " + suffix;
            })
    }

    function getUpdateTransition() {
      return d3.transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
    }

    function getExitTransition() {
      return d3.transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
    }
</script>
  
<style scoped lang="scss">
    #grid-container-interactive {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: max-content max-content;
        grid-template-areas:
            "dropdown"
            "chart";
        justify-items: center;
        margin: 3rem auto 5rem auto;
        width: 100%;
    }
    #chart-container {
        grid-area: chart;
        height: 40vh;
    }
    
</style>

<style lang="scss">
/* css for elements added and classed w/ d3 */
    .dropdown {
        transition: width 1s, transform 1s;
    }
    .chart-text {
        user-select: none;
    }
</style>
  