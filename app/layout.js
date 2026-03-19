import "./globals.css";

export const metadata = {
  title: "ATHAR — Pokémon FireRed Portfolio",
  description: "A Pokémon FireRed themed developer portfolio. Navigate the pause menu to explore skills, projects, toolkit, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="flash-overlay" id="flash-overlay"></div>
      </body>
    </html>
  );
}
