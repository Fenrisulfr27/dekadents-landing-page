import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  headings: {
    fontFamily: '"Cinzel", "Cormorant Garamond", Georgia, serif',
  },
  components: {
    Text: {
      defaultProps: {
        ff: '"Cormorant Garamond", Georgia, serif',
      },
    },
    Title: {
      defaultProps: {
        ff: '"Cinzel", "Cormorant Garamond", Georgia, serif',
      },
    },
    Button: {
      defaultProps: {
        ff: '"Cinzel", "Cormorant Garamond", Georgia, serif',
      },
    },
  },
});
