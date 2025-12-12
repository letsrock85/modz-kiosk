// MODZ Catalog Table of Contents Data
// Based on 2026_modz_catalog.pdf (December 2024 update)
// Total catalog pages: 73

const MODZ_TOC = {
  name: "MODZ",
  totalPages: 73,
  hasDetailedTOC: true,
  categories: [
    {
      name: "MODZ® Batteries",
      page: 1,
      items: []
    },
    {
      name: "MODZ® Windshields",
      page: 3,
      items: []
    },
    {
      name: "MODZ® Original Wheels",
      page: 5,
      items: [
        { name: "Ambush", page: 5 },
        { name: "Assassin", page: 6 },
        { name: "Assault", page: 7 },
        { name: "Blitz", page: 8 },
        { name: "Bomber", page: 9 },
        { name: "Carnage", page: 10 },
        { name: "Chaos", page: 11 },
        { name: "Convict", page: 12 },
        { name: "Drift", page: 13 },
        { name: "Falcon", page: 14 },
        { name: "Felon", page: 15 },
        { name: "Formula", page: 16 },
        { name: "Fury", page: 17 },
        { name: "Galaxy", page: 18 },
        { name: "Gladiator", page: 19 },
        { name: "Halo", page: 20 },
        { name: "Matrix", page: 21 },
        { name: "Mauler", page: 22 },
        { name: "Maverick", page: 23 },
        { name: "Mayhem", page: 24 },
        { name: "Reaper", page: 25 },
        { name: "Renegade", page: 26 },
        { name: "Torrent", page: 27 },
        { name: "Steel Wheels", page: 28 }
      ]
    },
    {
      name: "Tires",
      page: 29,
      items: [
        { name: "Cruze", page: 29 },
        { name: "Gripz", page: 30 },
        { name: "Guardian", page: 31 },
        { name: "Roverz", page: 32 },
        { name: "Street Fox", page: 33 },
        { name: "Tesseract", page: 34 },
        { name: "X-Armory", page: 35 },
        { name: "X Comp", page: 36 },
        { name: "X-Trail", page: 37 }
      ]
    },
    {
      name: "MODZ® Chargers",
      page: 38,
      items: []
    },
    {
      name: "MODZ® Steering Wheels",
      page: 39,
      items: [
        { name: "Barton", page: 39 },
        { name: "Driskill", page: 40 },
        { name: "Zilker", page: 41 },
        { name: "Scorecard Holders", page: 42 }
      ]
    },
    {
      name: "MODZ® Seats",
      page: 43,
      items: [
        { name: "FS1 Gen-1", page: 43 },
        { name: "FS1 Gen-2", page: 45 },
        { name: "FS2", page: 47 },
        { name: "FSX", page: 49 },
        { name: "FS3", page: 51 },
        { name: "Rear Seat Cushions and Covers", page: 53 },
        { name: "Evolution Covers", page: 55 },
        { name: "Denago Covers", page: 57 },
        { name: "Dach Covers", page: 59 },
        { name: "Epic Covers", page: 60 },
        { name: "Tara Covers", page: 61 },
        { name: "Teko Covers", page: 62 },
        { name: "Scalez", page: 63 },
        { name: "Flip4 (rear seat kit)", page: 64 }
      ]
    },
    {
      name: "All Sports",
      page: 65,
      items: [
        { name: "Lift Kits", page: 65 }
      ]
    },
    {
      name: "MODZ® Accessories",
      page: 66,
      items: [
        { name: "Clays Basket", page: 66 },
        { name: "Cooler Racks", page: 67 },
        { name: "Nerf Bars", page: 68 }
      ]
    },
    {
      name: "Performance",
      page: 69,
      items: [
        { name: "Navitas", page: 69 },
        { name: "MODZ® Motors", page: 70 }
      ]
    }
  ]
};

// Other catalogs - simpler structure (no TOC needed)
const MODZ_BATTERY_TOC = {
  name: "MODZ Battery",
  totalPages: 20,
  hasDetailedTOC: false
};

const EKT_TOC = {
  name: "EKT",
  totalPages: 30,
  hasDetailedTOC: false
};

const MOTORCODE_TOC = {
  name: "Motorcode",
  totalPages: 25,
  hasDetailedTOC: false
};

// Export for use
const CATALOGS = {
  modz: MODZ_TOC,
  'modz-battery': MODZ_BATTERY_TOC,
  ekt: EKT_TOC,
  motorcode: MOTORCODE_TOC
};
