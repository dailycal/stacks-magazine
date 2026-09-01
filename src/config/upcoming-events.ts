export interface UpcomingEvent {
	// Display date, e.g. "May 2" or "May 2-3". Also used to bucket events by
	// month: the page groups however many events at the top of the list
	// share the same leading month name as the very first entry into their
	// own "<Month>" section, and everything else falls under "Past Events".
	date: string;
	// Event description. May contain a simple <i>...</i> tag (e.g. for a
	// film title), rendered as raw HTML.
	name: string;
	link: string;
}

// One-off dated events, most recent first — add new events to the top of
// this list so the page's "current month" section stays correct without
// needing to reorder anything.
export const upcomingEvents: UpcomingEvent[] = [
	{
		date: "May 29",
		name: "Late to the Party: 1960s Dance Night @ Thee Stork Club, 9 p.m.",
		link: "https://lapena.org/event/las-mermeladas-at-la-pena-2-2/2026-05-20/",
	},
	{
		date: "May 20",
		name: "Las Mermeladas: Music Jam Session @ La Peña Cultural Center, 6:30 p.m.",
		link: "https://lapena.org/event/las-mermeladas-at-la-pena-2-2/2026-05-20/",
	},
	{
		date: "May 19",
		name: "When We Win: Political Education Film Series @ La Peña Cultural Center, 7:30 p.m.",
		link: "https://lapena.org/event/when-we-win-political-education-film-series/2026-05-19/",
	},
	{
		date: "May 17",
		name: "Film and Video Makers at Cal Screening @ BAMPFA, 2 p.m.",
		link: "https://bampfa.org/visit/calendar?date=2026-05",
	},
	{
		date: "May 16",
		name: "Drum Masterclass @ 924 Gilman St., 12 p.m.",
		link: "https://www.eventbrite.com/e/give-the-drummer-some-free-masterclass-series-tickets-1979197215149?aff=ebdsoporgprofile",
	},
	{
		date: "May 13",
		name: "Rainer Werner Fassbinder’s “In a Year of 13 Moons” @ BAMPFA, 7 p.m.",
		link: "https://bampfa.org/visit/calendar?date=2026-05",
	},
	{
		date: "May 10",
		name: "Chinese Calligraphy Workshop @ BAMPFA, 1 p.m.",
		link: "https://bampfa.org/visit/calendar?date=2026-05",
	},
	{
		date: "May 8",
		name: "Mortified @ The DNA Lounge, 7:30 p.m.",
		link: "https://www.dnalounge.com/calendar/2026/05-08a.html",
	},
	{
		date: "May 4",
		name: "Freakyoke @ Thee Stork Club, 8 p.m.",
		link: "https://wl.eventim.us/event/freakyoke-54/664123?afflky=TheeStorkClub",
	},
	{
		date: "May 2-3",
		name: "Berkeley Bluegrass Festival @ The Freight, 6 p.m.",
		link: "https://secure.thefreight.org/15764/15765-berkeley-bluegrass-festival-260502",
	},
	{
		date: "May 2",
		name: "The Rocky Horror Picture Show @ Rialto Cinemas, 11:30 p.m.",
		link: "https://rialtocinemas.com/coming-soon-elm/rocky-horror-picture-show-elm/",
	},
	{
		date: "March 25",
		name: "Alejandro Jodorowsky’s <i>The Holy Mountain</i> @ BAMPFA, 7 p.m.",
		link: "https://bampfa.org/event/holy-mountain-intro",
	},
	{
		date: "March 22",
		name: "Agnès Varda’s Cléo <i>From 5 to 7</i> @ BAMPFA, 2 p.m.",
		link: "https://bampfa.org/event/cleo-5-7",
	},
	{
		date: "March 13",
		name: "Empowering Women of Color Open Mic @ La Peña Cultural Center, 8 p.m.",
		link: "https://lapena.org/event/empowering-women-of-color-open-mic-3/",
	},
	{
		date: "March 8",
		name: "Granulating Watercolors with Berkeley Painting Club @ BAMPFA, 1 p.m.",
		link: "https://bampfa.org/event/granulating-watercolors",
	},
	{
		date: "March 7",
		name: "Nowruz Market 1405 @ La Peña Cultural Center, 3 p.m.",
		link: "https://lapena.org/event/nowrouz-market-1405/",
	},
	{
		date: "March 5",
		name: "Grateful Dead Exhibition @ Art House Gallery and Cultural Center, 6:30 p.m.",
		link: "https://berkeleyarthouse.wordpress.com/wp-content/uploads/2026/02/3-5.jpg",
	},
	{
		date: "March 4",
		name: "The Moth Story Slam @ Freight & Salvage, 7 p.m.",
		link: "https://thefreight.org/shows/",
	},
	{
		date: "February 28 & March 1",
		name: "Two-Day Letterpress Workshop @ Arts Research Center, 10 a.m.",
		link: "https://arts.berkeley.edu/news/two-day-letterpress-workshop",
	},
	{
		date: "February 28",
		name: "Lunar New Year Festival @ Fourth Street, 12 p.m.",
		link: "https://www.fourthstreetmakersrow.com/upcoming-events",
	},
	{
		date: "February 22",
		name: "Shadow Puppets Workshop @ Shapeshifters Cinema, 12 p.m.",
		link: "https://shapeshifterscinema.com/",
	},
	{
		date: "February 21",
		name: "Bingo & Brunch @ The New Parkway Theater, 1 p.m.",
		link: "https://www.thenewparkway.com/upcomingevents/calendar/",
	},
	{
		date: "February 21",
		name: "Drum Masterclass @ 924 Gilman St., 12 p.m.",
		link: "https://www.924gilman.org/",
	},
];

// Recurring weekly events with no specific calendar date — shown in their
// own section below the dated events, in the same order as the old site.
export const weeklyEvents: UpcomingEvent[] = [
	{
		date: "Monday",
		name: "Blues Mondays @ Eli’s Mile High Club, 7 p.m.",
		link: "https://www.elismilehighclub.com/",
	},
	{
		date: "Monday",
		name: "Irish céili dancing @ The Starry Plough, 7:30 p.m.",
		link: "https://thestarryplough.com/calendar/",
	},
	{
		date: "Tuesday",
		name: "Open mic night @ The Starry Plough, 7:30 p.m.",
		link: "https://thestarryplough.com/calendar/",
	},
	{
		date: "Tuesday",
		name: "Bingo & Beer @ The New Parkway Theater, 7:30 p.m.",
		link: "https://www.thenewparkway.com/upcomingevents/calendar/",
	},
	{
		date: "Wednesday",
		name: "Trivia night @ Waystation Brew, 7 p.m.",
		link: "https://www.waystationberkeley.com/wednesday-night-trivia/",
	},
	{
		date: "Wednesday",
		name: "Arts & Culture Talk @ Berkeley City Club, first Wednesday of the month, 7 p.m.",
		link: "https://www.visitberkeley.com/events/arts-culture-talk-at-berkeley-city-club/",
	},
	{
		date: "Friday",
		name: "First Fridays in Oakland, first Friday of each month, 5 p.m. to 9:30 p.m.",
		link: "https://www.oaklandfirstfridays.org/",
	},
	{
		date: "Saturday",
		name: "Grand Lake farmer’s market, Oakland, 9 a.m to 2 p.m.",
		link: "https://www.visitoakland.com/event/grand-lake-farmers-market/28965/",
	},
	{
		date: "Saturday",
		name: "Berkeley Balkan Bacchanal @ The Starry Plough, every third Saturday, 8 p.m.",
		link: "https://thestarryplough.com/event/berkeley-balkan-bacchanal-14/the-starry-plough-pub/california/",
	},
	{
		date: "Sunday",
		name: "Karaoke @ Eli’s Mile High Club, 2nd and 4th Sundays, 8 p.m.",
		link: "https://www.instagram.com/p/DOcsndnEfcl/?img_index=5",
	},
	{
		date: "Sunday",
		name: "Alameda Point Antiques Faire, first Sunday of the month, 6 a.m. to 3 p.m.",
		link: "https://alamedapointantiquesfaire.com/",
	},
];
