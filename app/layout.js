import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { GlobalStyles } from "@mui/material";
import { grey } from "@mui/material/colors";

export const metadata = {
  title: "Academic Tools",
  description: "A collection of tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GlobalStyles
          styles={{
            body: {
              height: "100%",
              margin: 0,
              padding: 0,
              backgroundColor: grey[200],
              boxSizing: "border-box",
            },
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
