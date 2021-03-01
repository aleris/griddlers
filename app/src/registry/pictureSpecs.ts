import { FillEmpty } from "../board/Board";
import { PictureSpec } from "./PictureSpec";

export const pictureSpecs: PictureSpec[] = [
  {
    id: "A0215AAF-1E0C-4BC3-90A1-8C87BE1E3853",
    cellSpecs: `
###
`,
    palette: {
      ".": FillEmpty,
      "#": "#444",
    },
    difficulty: 1,
  },
  {
    id: "9EB579A8-1AAA-4010-8CD9-21DA9C3E9B2F",
    cellSpecs: `
#.#
`,
    palette: {
      ".": FillEmpty,
      "#": "#444",
    },
    difficulty: 1.1,
  },
  {
    id: "991F6816-93FB-419E-B907-1D3CA84887E",
    cellSpecs: `
.#
##
`,
    palette: {
      ".": FillEmpty,
      "#": "#444",
    },
    difficulty: 1.2,
  },
  {
    id: "AE546636-E4B8-49E6-B3E8-2446EE6F238F",
    cellSpecs: `
#.#
###
`,
    palette: {
      ".": FillEmpty,
      "#": "#444",
    },
    difficulty: 1.3,
  },
  {
    id: "197AE2EE-2EDA-445E-A36F-4C907F215A24",
    cellSpecs: `
.##
##.
`,
    palette: {
      ".": FillEmpty,
      "#": "#444",
    },
    difficulty: 1.4,
  },
  {
    id: "EF8BAFBE-8BB4-4750-BB8A-DEC409FA7481",
    cellSpecs: `
..#
#.#
`,
    palette: {
      ".": FillEmpty,
      "#": "#444",
    },
    difficulty: 1.5,
  },
  {
    id: "870CBD29-C872-4D57-876F-C677505FEABC",
    cellSpecs: `
.##.
####
.##.
`,
    palette: {
      ".": FillEmpty,
      "#": "#444",
    },
    difficulty: 1.6,
  },
  {
    id: "94A08FEE-909A-4101-BB8C-1FB93074A289",
    cellSpecs: `
####
#..#
####
`,
    palette: {
      ".": FillEmpty,
      "#": "#444",
    },
    difficulty: 1.7,
  },
  {
    id: "C63CB23A-E808-4759-B73A-A8010B4533BD",
    cellSpecs: `
#.#.
.##.
.#.#
`,
    palette: {
      ".": FillEmpty,
      "#": "#444",
    },
    difficulty: 1.8,
  },
  {
    id: "F7D8670C-155F-497B-8CA3-D4EE7FF37695",
    cellSpecs: `
#...
###.
.#.#
`,
    palette: {
      ".": FillEmpty,
      "#": "#444",
    },
    difficulty: 1.9,
  },
  {
    id: "2B5F9642-78CA-4A76-9DF1-46627068A3D1",
    cellSpecs: `
.##..##.
########
#####.##
.###.##.
..####..
...##...
`,
    palette: {
      ".": FillEmpty,
      "#": "#444",
    },
    difficulty: 2,
  },
  {
    id: "86B3F770-3768-4B41-A689-3357E92BDF85",
    cellSpecs: `
.######.
#......#
#.#..#.#
#..##..#
#......#
.######.
`,
    palette: {
      ".": FillEmpty,
      "#": "#444",
    },
    difficulty: 2.1,
  },
  {
    id: "F9578BBE-C9FC-44EE-8B96-CF6FEFDAE188",
    cellSpecs: `
.........##........
........#..........
.....#######.......
....#.......#......
...#..#...#..#.....
...#.#B#.#B#.#.....
...#..#...#..#.....
....#...#...#......
##...###R###.......
##....#RRR#........
.##..#.###.#.......
..###.......##.#...
..#.....#.....#.##.
.#..GG..#..YY..#.#.
.#.GGG..#..YYY.#.##
.#.GG.......YY.#.##
.#.............#...
..#############....
.......#.#.........
......#..#.........
....##...##........
`,
    palette: {
      ".": FillEmpty,
      "#": "#555",
      R: "#C20",
      G: "#2C0",
      Y: "#CC2",
    },
    difficulty: 5,
  },
];
