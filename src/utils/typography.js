import Typography from "typography"
import theme from "../../config/theme"
import fonts from "../styles/fonts.css"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: [
    "Aktiv Grotesque",
    "Avenir Next",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif"
  ],
  bodyFontFamily: ["Industry", "Georgia", "serif"]
})

export default typography
