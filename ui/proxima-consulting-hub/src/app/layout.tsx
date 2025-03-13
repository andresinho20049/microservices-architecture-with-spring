import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavBar } from "../components/client/navbar/navbar";
import { FooterComponent } from "../components/server/footer/footer";
import StoreProvider from "../context/store-provider";
import { ThemeProvider } from "../context/theme-context";
import "./globals.css";
import { SessionContextProvider } from "../context/session-context";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Andresinho20049",
        template: "%s | Andresinho20049"
    },
    description: "Managing Success, One Project at a Time",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh flex flex-col`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <StoreProvider>
                        <SessionContextProvider>
                            <header>
                                <NavBar />
                            </header>
                            <section className="flex-1">{children}</section>
                            <footer>
                                <FooterComponent />
                            </footer>
                        </SessionContextProvider>
                    </StoreProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
