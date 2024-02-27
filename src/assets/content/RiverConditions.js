export default {
    riverConditionsCharts: [
        // TO DO: 
        //URL to a video/animation version of the RC? which file to point to for that
            // - I think they should be the drupal:  https://www.usgs.gov/media/videos/us-river-conditions-october-december-2022 for example. I think I can pull these URLS from the vislist.csv or whatever
        //author? Do you want it to say Created By VizLab or Water Resources Mission Area or anything
        //is the thumbnail a correct version to be pulling in and displaying here? Quality looks fine to me.
            //some of the thumbnails are B&W
            //some of them are small square vs the larger rectangle - pre FY22
        {
            id: '2',
            name: 'Oct-Dec 2024',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-october-december-2023',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY24_Q1/',
            image_basename: 'river_conditions_oct_dec_2023_square_thumbnail_color',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2024, Quarter 1, spanning from October-December 2023.'
        }
        ,
        {
            id: '3',
            name: 'Jul-Sep 2023',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-july-september-2023',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY23_Q4/',
            image_basename: 'river_conditions_jul_sep_2023_visid_thumbnail',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2023, Quarter 4, spanning from July-September 2023.'
        },
        {
            id: '4',
            name: 'Apr-Jun 2023',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-april-june-2023',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY23_Q3/',
            image_basename: 'river_conditions_apr_jun_2023_visid_thumbnail',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2023, Quarter 3, spanning from April-June 2023.'
        },
        {
            id: '5',
            name: 'Jan-Mar 2023',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-january-march-2023',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY23_Q2/',
            image_basename: 'river_conditions_jan_mar_2023_square_thumbnail_color',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2023, Quarter 2, spanning from January-March 2023.'
        },
        {
            id: '6',
            name: 'Oct-Dec 2022',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-october-december-2022',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY23_Q1/',
            image_basename: 'river_conditions_oct_dec_2022_visid_thumbnail',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2022, Quarter 1, spanning from October-December 2022.'
        },
        {
            id: '7',
            name: 'Jul-Sep 2022',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-july-september-2022',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY22_Q4/',
            image_basename: 'river_conditions_jul_sep_2022_visid_thumbnail',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2022, Quarter 4, spanning from July-September 2022.'
        },
        {
            id: '8',
            name: 'Apr-Jun 2022',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-april-june-2022',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY22_Q3/',
            image_basename: 'river_conditions_apr_jun_2022_thumbnail',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2022, Quarter 3, spanning from April-June 2022.'
        },
        {
            id: '9',
            name: 'Jan-Mar 2022',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-january-march-2022',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY22_Q2/',
            image_basename: 'river_conditions_jan_mar_2022_thumbnail',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2022, Quarter 2, spanning from January-March 2022.'
        },
        { 
            id: '10',
            name: 'Oct-Dec 2021',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-october-december-2021',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY22_Q1/',
            image_basename: 'river_conditions_oct_dec_2021_thumbnail',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2022, Quarter 1, spanning from October-December 2021.'
        },
        {//***this one appears to have the wrong thumbnail in the FY21_Q4 folder on Sharepoint */
            id: '11',
            name: 'Jan-Mar 2021',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-january-march-2021',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY21_Q4/',
            image_basename: 'river_conditions_jan_mar_2021_thumbnail',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2021, Quarter 4, spanning from January-March 2021.'
        },
        {
            id: '12',
            name: 'Apr-Jun 2021',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-april-june-2021',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY21_Q3/',
            image_basename: 'river_conditions_apr_jun_2021_thumbnail',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2021, Quarter 3, spanning from April-June 2021'
        },
        {
            id: '13',
            name: 'Jan-Mar 2021',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-january-march-2021',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY21_Q2/',
            image_basename: 'river_conditions_jan_mar_2021_thumbnail',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2021, Quarter 2, spanning from January-March 2021'
        },
        {
            id: '14',
            name: 'Oct-Dec 2020',
            drupal_url: 'https://www.usgs.gov/media/videos/us-river-conditions-october-december-2020',
            code_url: 'https://github.com/DOI-USGS/gage-conditions-gif',
            folder: 'FY21_Q1/',
            image_basename: 'river_conditions_oct_dec_2020_thumbnail',
            image_type: 'png',
            image_alt: 'River Conditions for Fiscal Year 2021, Quarter 1, spanning from October-December 2020'
        }
    ]
};