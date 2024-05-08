export default {
    pageTitle: "Vue3 template",
    sections: {
        A: {
            title: "Section A",
            id: "sectionA",
            image: "sectionA_banner.png",
            alt: "An overhead view of a braided river, surrounded by snow-covered ground."
        },
        B: {
            title: "Section B",
            id: "sectionB",
            image: "sectionB_banner.jpg",
            alt: "An overhead view of a river flowing through a snow-covered decidious forest."
        }
    },
    components: {
        IntroSection: {
            heading: "Introduction",
            paragraph1: "Here is a paragraph with some introductory context for this viz.",
            paragraph2: "Here is another paragraph of introductory context.",
            caption: "This is a caption for this figure.",
            paragraph3: "Here's a paragraph that follows the figure.",
            paragraph3_bullet1: "Here is a bullet.",
            paragraph4: "And another paragraph."
        },
        RegionalViolins: {
            heading: "svg import w/ d3-added interaction + v-for",
            paragraph1: "First paragraph of text.",
            paragraph2: "Second paragraph of text."
        },
        BarChartExample: {
            heading: "d3 bar chart from data",
            paragraph1: "First paragraph of text.",
            paragraph2: "Second paragraph of text.",
            paragraph3: "Third paragraph of text."
        }
    }
}