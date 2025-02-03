import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/theme-context";
import { AuthenticationContextProvider } from "../context/authentication-context";
import { NavBar } from "../components/client/navbar/navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Proxima Consulting",
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
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <AuthenticationContextProvider>
                        <header>
                            <NavBar />
                        </header>
                        <main>{children}</main>
                        <footer></footer>
                    </AuthenticationContextProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
