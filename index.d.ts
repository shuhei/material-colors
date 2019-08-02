type IColorValue = string;

// color1

type IColor1Names =
  | "black"
  | "white";

type IColor1 = IColorValue;
type IColors1 = Record<IColor1Names, IColor1>;

// color2

type IColor2Names =
  | "blueGrey"
  | "brown"
  | "grey";

type IColor2Shades =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

type IColor2 = Record<IColor2Shades, IColorValue>;
type IColors2 = Record<IColor2Names, IColor2>;

// color3

type IColor3Names =
  | "amber"
  | "blue"
  | "cyan"
  | "deepOrange"
  | "deepPurple"
  | "green"
  | "indigo"
  | "lightBlue"
  | "lightGreen"
  | "lime"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "teal"
  | "yellow";

type IColor3Shades =
  | IColor2Shades
  | "a100"
  | "a200"
  | "a400"
  | "a700";

type IColor3 = Record<IColor3Shades, IColorValue>;
type IColors3 = Record<IColor3Names, IColor3>;

// icon

type IIconNames =
  | "darkIcons"
  | "lightIcons";

type IIconShades =
  | "active"
  | "inactive";

type IIcon = Record<IIconShades, IColorValue>;
type IIcons = Record<IIconNames, IIcon>;

// text

type ITextNames =
  | "darkText"
  | "lightText";

type ITextShades =
  | "disabled"
  | "dividers"
  | "primary"
  | "secondary";

type IText = Record<ITextShades, IColorValue>;
type ITexts = Record<ITextNames, IText>;

//

type IMaterialColors = IColors1 & IColors2 & IColors3 & IIcons & ITexts;
declare var materialColors: IMaterialColors;
export default materialColors;
