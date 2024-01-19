export const metadata = {
  title: "Academic Tools",
  description: "A collection of tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
