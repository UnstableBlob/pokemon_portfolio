import "./globals.css";

export const metadata = {
  title: "ATHARVA | Portfolio",
  description: "A highly interactive, Pokémon FireRed themed developer portfolio. Navigate the GBA-inspired pause menu to explore my skills, projects, and internet journey.",
  keywords: [
    "Atharva",
    "Portfolio",
    "Pokémon",
    "FireRed",
    "Game Boy Advance",
    "GBA",
    "Developer",
    "Web Development",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Atharva" }],
  creator: "Atharva",
  openGraph: {
    title: "ATHARVA | Portfolio",
    description: "A highly interactive, Pokémon FireRed themed developer portfolio.",
    siteName: "Atharva's Portfolio",
    images: [
      {
        url: "/sprites/startscreen.png",
        width: 800,
        height: 600,
        alt: "Pokémon FireRed Portfolio Start Screen",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATHARVA | Pokémon FireRed Portfolio",
    description: "A highly interactive, Pokémon FireRed themed developer portfolio.",
    images: ["/sprites/startscreen.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
