type IColorValue = string;

// color1

type IColor1Names = "black" | "white";
type IColor1 = IColorValue;
type IColors1 = { [name in IColor1Names]: IColor1 };

// color2

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
type IColor2Names = "blueGrey" | "brown" | "grey";
type IColor2 = { [shade in IColor2Shades]: IColorValue };
type IColors2 = { [name in IColor2Names]: IColor2 };

// color3

type IColor3Shades = IColor2Shades | "a100" | "a200" | "a400" | "a100";
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
type IColor3 = { [shade in IColor3Shades]: IColorValue };
type IColors3 = { [name in IColor3Names]: IColor3 };

// icon

type IIconShades = "active" | "inactive";
type IIconNames = "darkIcons" | "lightIcons";
type IIcon = { [shade in IIconShades]: IColorValue };
type IIcons = { [name in IIconNames]: IIcon };

// text

type ITextShades = "disabled" | "dividers" | "primary" | "secondary";
type ITextNames = "darkText" | "lightText";
type IText = { [shade in ITextShades]: IColorValue };
type ITexts = { [name in ITextNames]: IText };

//

type IMaterialColors = IColors1 & IColors2 & IColors3 & IIcons & ITexts;
declare var materialColors: IMaterialColors;
export default materialColors;
