import autoprefixer from "autoprefixer";
import postcssNested from "postcss-nested";
import functions from "postcss-functions";

const BASE_FONT_SIZE = 16;
const PC_WIDTH = 1200;
const TABLET_WIDTH = 1024;
const MOBILE_WIDTH = 768;

const config = {
  plugins: [
    autoprefixer,
    postcssNested,
    functions({
      functions: {
        rem(num) {
          return `${num / BASE_FONT_SIZE}rem`;
        },
        liq(num) {
          return `${(num / PC_WIDTH) * 100}vw`;
        },
        tb(num) {
          return `${(num / TABLET_WIDTH) * 100}vw`;
        },
        vw(num) {
          return `${(num / MOBILE_WIDTH) * 100}vw`;
        },
      },
    }),
  ],
};

export default config;
