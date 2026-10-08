// Masthead data for the about page's right-hand column (src/pages/about.astro):
// staff, editors, creative, and credits listings.

export interface MastheadPerson {
  name: string;
  url?: string;
}

export interface MastheadEntry {
  role: string;
  people: MastheadPerson[];
}

export interface MastheadSection {
  heading?: string;
  entries: MastheadEntry[];
}

export const about: {
  staff: MastheadSection;
  editors: MastheadSection;
  creative: MastheadSection;
  credits: MastheadSection;
} = {
  // Staff section
  staff: {
    entries: [
      { role: "Editor-in-Chief", people: [{ name: "Swasti Singhai" }] },
      { role: "Managing Editor", people: [{ name: "Aarya Mukherjee" }] },
      { role: "Creative Director", people: [{ name: "Hayes Gaboury" }] },
    ],
  },
  // Editors section
  editors: {
    heading: "Editors",
    entries: [
      {
        role: "Magazine Managing Editor",
        people: [{ name: "Sam Grotenstein" }, { name: "Blue Burkett" }],
      },
      {
        role: "Editors",
        people: [{ name: "Tingri Monahan" }, { name: "Jolie Feld" }],
      },
      {
        role: "Contributing Editors",
        people: [{ name: "Caleb Silver" }, { name: "Elise Fisher" }],
      },
      {
        role: "Night Editors",
        people: [
          { name: "Caroline Hunt" },
          { name: "Ella Kirshbaum" },
          { name: "Kelcie Lee" },
          { name: "Megan Lam" },
          { name: "Serene Han" },
        ],
      },
    ],
  },
  // Creative section
  creative: {
    heading: "Creative",
    entries: [
      {
        role: "Graphics editor", people: [
          { name: "Eleanor Robertson" },
          { name: "Noelle Chang" }
        ]
      },
      {
        role: "Photo editors", people: [
          { name: "Mina Lavapies" },
          { name: "Ella Reed" },
          { name: "Joe Zheng" }
        ]
      },
    ],
  },
  // Credits section
  credits: {
    heading: "Credits",
    entries: [
      {
        role: "Website by",
        people: [
          { name: "Joever Orillosa" },
          { name: "Siddhartha Chatterjee" },
          {
            name: "Brendan Raykoff",
            url: "https://raykoff.org/"
          }
        ],
      },
      {
        role: "Logo by",
        people: [{ name: "Alyssa Nguyen" }],
      },
      {
        role: "Founding Editors",
        people: [
          { name: "Clara Brownstein" },
          { name: "Ananya Rupanagunta" },
          { name: "Aarya Mukherjee" },
          { name: "Elise Fisher" },
          { name: "Sam Grotenstein" },
          { name: "Stella Merims" },
        ],
      },
    ],
  },
};
