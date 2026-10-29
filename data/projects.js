// Project data.
//
// This file contains data only — no HTML, no rendering, no logic beyond
// the data itself. Every view (grid, project page) reads from
// the same `images` array per project; there is no separate list of
// "display" images to keep in sync.
//
// Project.thumbnail — optional. The src of the image to show on the grid
//                    card. Defaults to images[0].
//
// Image.emphasis  — editorial layout weight in the project-page gallery
//                    ("large" | "medium" | "small"). Controls visual
//                    weight/composition, not literal pixel size.
// Image.focalPoint — optional. Only meaningful where an image is
//                    cropped (object-fit: cover) — the grid card and the
//                    "Next project" strip, both of which show the
//                    thumbnail. Ignored everywhere else.

export const projects = [

  {
    slug: "in-the-quarry",
    title: "In the Quarry",
    year: 2023,
    type: "Academic",
    location: "Ústí nad Labem, Czech Republic",
    program: "Cultural Architecture",

    description: [
      "Ustí nad Labem, Czech Republic, is a city with deep historical roots and a strong connection to its iconic quarry. Until the 1970s, the quarry was actively used for the extraction of rare minerals such as natrolite. Today, the abandoned industrial landscape remains as a powerful spatial and geological structure, offering opportunities for architectural intervention that can give new value to the site for both residents and visitors.",
      "The concept focuses on transforming the former quarry into a cultural destination by introducing new facilities that engage directly with the existing terrain. The project aims to preserve the character of the industrial landscape while reactivating it through architecture. By inserting new spatial elements into the quarry, the design seeks to create meaningful encounters between people, history, and landscape.",
      "At the core of the proposal is an auditorium that functions as both a viewpoint and a cultural space. It allows visitors to experience the entire quarry from within, framing unique visual connections between interior and exterior. In addition to its role as an observation space, the auditorium is designed to host exhibitions, lectures, and film screenings, establishing the quarry as a new platform for cultural activity and public engagement.",
    ],

    images: [
      {
        src: "01-AD9-cover.jpg",
        alt: "Aerial view of the former quarry site in Ústí nad Labem, with the auditorium inserted into the landscape.",
        emphasis: "large",
        focalPoint: "bottom",
      },
      {
        src: "02-AD9-axonometry.jpg",
        alt: "Axonometric drawing of the auditorium structure within the quarry.",
        emphasis: "large",
      },
      {
        src: "03-AD9-snitt-landskap.jpg",
        alt: "Section through the quarry landscape showing the building's relationship to the terrain.",
        emphasis: "medium",
      },
      {
        src: "04-AD9-section-long.jpg",
        alt: "Long section through the auditorium building.",
        emphasis: "medium",
      },
      {
        src: "05-AD9-plan.jpg",
        alt: "Floor plan of the auditorium, entrance, café and technical spaces.",
        emphasis: "medium",
        caption: "1. Entrance / Café  2. Elevator  3. Storage  4. Accessible WC  5. 4× WC<br>6. Staff WC  7. Technical Room  8. Equipment Room  9. Seating Area  10. Auditorium",
      },
      {
        src: "06-AD9-interior-entrance.jpg",
        alt: "Interior view of the entrance space.",
        emphasis: "small",
      },
      {
        src: "07-AD9-interior-movie.jpg",
        alt: "Interior view of the auditorium during a film screening.",
        emphasis: "small",
      },
      {
        src: "08-AD9-interior-no-movie.jpg",
        alt: "Interior view of the auditorium without a screening, showing the seating and framed view of the quarry.",
        emphasis: "small",
      },
    ],
  },

  {
    slug: "shifted",
    title: "Shifted",
    year: 2022,
    type: "Bachelor's Thesis",
    location: "Prague, Czech Republic",
    program: "Mixed-Use",

    description: [
      "Malá Strana is a historically significant district in Prague, characterized by its layered urban fabric and strong cultural identity. The project is situated in a context defined by challenging topography, high traffic pressure, and underutilized spatial potential. The site also plays an important role as a connection between the northern and central parts of the city, making it a strategic point for urban intervention.",
      "The concept focuses on strengthening social cohesion and activating the site as a civic catalyst within a dense urban environment. By introducing a new architectural structure, the project aims to improve spatial continuity and enhance movement through the area. The intervention is conceived as both a building and an infrastructural element, working with the existing terrain to create clearer and more accessible urban flows.",
      "The proposal takes the form of a stepped structure that integrates circulation and public space. This strategy transforms the building into a spatial connector, improving accessibility in an area with limited movement options. At the same time, it establishes spaces for gathering and interaction, reinforcing the role of the project as a social and functional link within the city.",
    ],

    images: [
      {
        src: "01-ad6.jpg",
        alt: "Exterior view of the stepped structure in Malá Strana, Prague.",
        emphasis: "large",
      },
      {
        src: "02-ad6.jpg",
        alt: "Concept diagram showing the stepped structure's relationship to the site.",
        emphasis: "small",
      },
      {
        src: "03-ad6.jpg",
        alt: "Diagram of circulation through the building.",
        emphasis: "small",
      },
      {
        src: "04-ad6.jpg",
        alt: "Site plan showing the building's position between Malá Strana and the surrounding urban fabric.",
        emphasis: "large",
      },
      {
        src: "05-ad6.jpg",
        alt: "Floor plan of the lower level.",
        emphasis: "small",
      },
      {
        src: "06-ad6.jpg",
        alt: "Floor plan of an upper level.",
        emphasis: "small",
      },
      {
        src: "07-ad6.jpg",
        alt: "Section through the stepped structure.",
        emphasis: "small",
      },
      {
        src: "08-ad6.jpg",
        alt: "Section showing the public circulation route through the building.",
        emphasis: "small",
      },
      {
        src: "09-ad6.jpg",
        alt: "Interior view of one of the stepped public spaces.",
        emphasis: "large",
      },
      {
        src: "10-ad6.jpg",
        alt: "Interior view showing the connection between levels.",
        emphasis: "large",
      },
      {
        src: "11-ad6.jpg",
        alt: "Exterior view of the completed structure integrated into the urban terrain.",
        emphasis: "large",
      },
    ],
  },

  {
    slug: "womens-house",
    title: "Women's House",
    year: 2021,
    type: "Competition",
    location: "Baghere Village, Senegal",
    program: "Cultural",

    description: [
      "The project is located in a rural settlement in southern Senegal, where the brief calls for the development of a women's house. The initiative aims to support social and cultural development while addressing and strengthening women's rights in a context shaped by poverty and post-colonial conditions. The proposal positions architecture as a tool for empowerment and community building within a vulnerable social framework.",
      "The concept is based on creating an open and accessible spatial structure that fosters interaction, learning, and collective activity among women. Rather than a closed building, the design is conceived as a pavilion-like framework that encourages openness and participation. This approach allows the architecture to act as both a physical and symbolic platform for visibility, dialogue, and exchange.",
      "The women's house is expressed as a light and permeable structure that integrates shaded communal spaces for gathering and engagement. It functions as a social anchor within the community, offering a place for meetings, workshops, and shared activities. Through its openness and adaptability, the building supports the ongoing empowerment of women while reinforcing their role in the local social and cultural landscape.",
    ],

    images: [
      {
        src: "01-womens-house.jpg",
        alt: "Exterior view of the women's house pavilion in Baghere Village, Senegal.",
        emphasis: "large",
        focalPoint: "bottom",
      },
      {
        src: "07-womens-house.jpg",
        alt: "Interior view of a shaded communal space.",
        emphasis: "small",
      },
      {
        src: "06-womens-house.jpg",
        alt: "Interior view of a gathering space within the pavilion.",
        emphasis: "small",
      },
      {
        src: "08-womens-house.jpg",
        alt: "Detail view of the pavilion's shading structure.",
        emphasis: "small",
      },
      {
        src: "03-womens-house.jpg",
        alt: "Site plan showing the pavilion within the village.",
        emphasis: "large",
      },
      {
        src: "02-womens-house.jpg",
        alt: "Floor plan of the women's house.",
        emphasis: "medium",
      },
      {
        src: "04-womens-house.jpg",
        alt: "Section through the pavilion showing the open, permeable structure.",
        emphasis: "large",
      },
      {
        src: "05-womens-house.jpg",
        alt: "Exterior view of the pavilion's shaded communal area.",
        emphasis: "large",
      },
    ],
  },

  {
    slug: "lean-to",
    title: "Lean-to",
    year: 2020,
    type: "Academic",
    location: "Prague, Czech Republic",
    program: "Kindergarten",

    description: [
      "Prague's university hospital was founded in the 1790s and has played a central role in the city's medical history. The project explores the introduction of a kindergarten within this context, addressing the need for childcare facilities connected to a healthcare environment. By integrating a new program into the hospital setting, the proposal aims to support both staff and families through a more holistic and socially responsive infrastructure.",
      "The concept is based on elevating the kindergarten above ground level, creating a light and open structure that resembles a shelter in the landscape. This lifted volume establishes a safe and stimulating environment for children, while maintaining a clear separation from the more controlled hospital functions below. The architectural gesture introduces a sense of playfulness and openness within a highly institutional context, offering a softer counterpoint to the surrounding medical environment.",
    ],

    images: [
      {
        src: "01-AD3-exterior.jpg",
        alt: "Exterior view of the elevated kindergarten structure above the hospital grounds in Prague.",
        emphasis: "small",
      },
      {
        src: "02-AD3-concept.jpg",
        alt: "Concept diagram showing the kindergarten lifted above the hospital site.",
        emphasis: "medium",
      },
      {
        src: "03-AD3-siteplan.jpg",
        alt: "Site plan showing the kindergarten's position within the hospital complex.",
        emphasis: "small",
      },
      {
        src: "04-AD3-axo-exploded.jpg",
        alt: "Exploded axonometric drawing of the kindergarten structure.",
        emphasis: "small",
      },
      {
        src: "05-AD3-plan-1.jpg",
        alt: "Floor plan of the kindergarten, level one.",
        emphasis: "small",
      },
      {
        src: "06-AD3-plan-2.jpg",
        alt: "Floor plan of the kindergarten, level two.",
        emphasis: "small",
      },
      {
        src: "07-AD3-section-long.jpg",
        alt: "Long section through the elevated kindergarten.",
        emphasis: "large",
      },
      {
        src: "08-AD3-section-short.jpg",
        alt: "Short section through the kindergarten structure.",
        emphasis: "large",
      },
      {
        src: "09-AD3-classRoom.png",
        alt: "Interior view of a classroom.",
        emphasis: "small",
      },
      {
        src: "10-AD3-teacherRoom.png",
        alt: "Interior view of a staff room.",
        emphasis: "small",
      },
      {
        src: "11-AD3-axo-cover.jpg",
        alt: "Axonometric cover drawing of the kindergarten.",
        emphasis: "small",
      },
      {
        src: "12-AD3-night-display.jpg",
        alt: "Night view of the elevated kindergarten structure, lit from within.",
        emphasis: "small",
      },
    ],
  },

  {
    slug: "sagvaag-senior-garden",
    title: "Sagvåg Senior Garden",
    year: 2024,
    type: "Master's Thesis",
    location: "Sagvåg, Norway",
    program: "Senior Housing",
    thumbnail: "06-apt-sagvaag.jpg",

    description: [
      "The master's thesis is situated in a site in Sagvåg center, where the initial brief called for housing tailored to elderly residents. The project investigates how architecture can challenge conventional housing models, promote social interaction, and reduce isolation. Grounded in the principles of senior housing and shared living, the proposal consists of five private residential units and one shared building designed to support collective activities.",
      "The concept reinterprets the developer's request for six identical buildings by introducing a more socially and spatially diverse structure. One unit is replaced with a shared building, shifting the focus toward community, flexibility, and age-friendly design. This approach balances economic considerations with social sustainability, while creating a clearer relationship between private and collective spaces.",
      "The private dwellings are adapted to the site's topography and regulatory framework, and feature a timber screen façade that provides weather protection while establishing a semi-open threshold between private and shared space. The shared building functions as the social core, with a fireplace lounge, communal kitchen, and dining area that encourage interaction on residents' own terms. In addition, a workshop extends the program with practical functions, offering a space for shared tools, activities, and informal gathering. Together, these elements create a living environment that supports both independence and connection.",
    ],

    images: [
      {
        src: "01-cover-sagvaag.jpg",
        alt: "Overview of the private residential units and shared building in Sagvåg.",
        emphasis: "large",
      },
      {
        src: "02-plan-sagvaag.jpg",
        alt: "Site plan showing the five private units and the shared building.",
        emphasis: "large",
      },
      {
        src: "03-apt-sagvaag.jpg",
        alt: "Exterior view of one of the private residential units.",
        emphasis: "large",
      },
      {
        src: "04-apt-sagvaag.jpg",
        alt: "Exterior view showing the timber screen façade of a private unit.",
        emphasis: "large",
      },
      {
        src: "05-apt-sagvaag.jpg",
        alt: "Floor plan of a private residential unit.",
        emphasis: "small",
      },
      {
        src: "06-apt-sagvaag.jpg",
        alt: "Interior view of a private residential unit.",
        emphasis: "small",
      },
      {
        src: "07-apt-sagvaag.jpg",
        alt: "Interior view showing the living space of a private unit.",
        emphasis: "small",
      },
      {
        src: "08-apt-sagvaag.jpg",
        alt: "Detail view of the timber screen façade.",
        emphasis: "small",
      },
      {
        src: "09-cmnhouse-sagvaag.jpg",
        alt: "Exterior view of the shared common house.",
        emphasis: "large",
      },
      {
        src: "10-cmnhouse-sagvaag.jpg",
        alt: "Interior view of the fireplace lounge in the common house.",
        emphasis: "large",
      },
      {
        src: "11-cmnhouse-sagvaag.jpg",
        alt: "Interior view of the communal kitchen and dining area.",
        emphasis: "large",
      },
      {
        src: "12-cmnhouse-sagvaag.jpg",
        alt: "Interior view of the common house's shared spaces.",
        emphasis: "large",
      },
      {
        src: "13-cmnhouse-sagvaag.jpg",
        alt: "Floor plan of the common house.",
        emphasis: "small",
      },
      {
        src: "14-cmnhouse-sagvaag.jpg",
        alt: "Section through the common house.",
        emphasis: "small",
      },
      {
        src: "15-cmnhouse-sagvaag.jpg",
        alt: "Detail view of the common house's construction.",
        emphasis: "small",
      },
      {
        src: "16-shed-sagvaag.jpg",
        alt: "Exterior view of the shared workshop shed.",
        emphasis: "large",
      },
      {
        src: "17-shed-sagvaag.jpg",
        alt: "Interior view of the workshop, showing shared tools and equipment.",
        emphasis: "large",
      },
      {
        src: "18-shed-sagvaag.jpg",
        alt: "Interior view of the workshop's informal gathering space.",
        emphasis: "large",
      },
      {
        src: "19-shed-sagvaag.jpg",
        alt: "Detail view of the workshop shed's construction.",
        emphasis: "small",
      },
    ],
  },

  {
    slug: "passage",
    title: "Passage",
    year: 2021,
    type: "Academic",
    location: "Prague, Czech Republic",
    program: "Center",

    description: [
      "Řepy is a residential district on the western edge of Prague, bordered by Zlíčín along a dividing train line. The area combines industrial facilities with a well-connected residential fabric, offering access to public transport, sports facilities, and local amenities. The metropolitan plan further anticipates urban transformation in the area, proposing to reroute and underground the existing tram line, signaling a shift in the site's long-term role within the city.",
      "The project responds to the spatial gap between Řepy and Zlíčín by introducing a public facility that functions as both a destination and a connector. The program brings together a climbing hall, gym, and dining spaces, while integrating the existing train stop into the building's ground level. A passage runs through the structure and continues as a tunnel beneath the rail line, physically linking the two districts. The surrounding open space is organized as a landscape of parks, cycling paths, and recreational areas, establishing a new active threshold between the two neighborhoods.",
    ],

    images: [
      {
        src: "01-AD5-cover.jpg",
        alt: "Exterior view of the public facility connecting Řepy and Zlíčín, Prague.",
        emphasis: "large",
      },
      {
        src: "02-AD5-axo.jpg",
        alt: "Axonometric drawing of the climbing hall, gym and dining spaces.",
        emphasis: "large",
      },
      {
        src: "03-AD5.jpg",
        alt: "Interior view of the passage running through the building.",
        emphasis: "large",
      },
      {
        src: "05-AD5.jpg",
        alt: "Floor plan showing the passage and train stop integrated into the ground level.",
        emphasis: "medium",
      },
      {
        src: "06-AD5.jpg",
        alt: "Interior view of the climbing hall.",
        emphasis: "small",
      },
      {
        src: "07-AD5.jpg",
        alt: "Section through the passage and tunnel beneath the rail line.",
        emphasis: "small",
      },
    ],
  },
];
