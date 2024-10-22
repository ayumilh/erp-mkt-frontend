'use client'
import "./globals.css";
import { Poppins } from "next/font/google";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { AuthContextProvider } from "@/contexts/AuthContext";
import ModalVerificationLogout from "@/components/Config/ModalVerificationLogout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeProvider as ThemeMuiProvider } from "@/contexts/ThemeMuiContext";

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

const metadata = {
    title: "SIMK",
    description: "Sistema de gerenciamento de vendas e estoque",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br">
            <head>
                <title>{metadata.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>

            <body className={`${poppins.className} max-w-full h-screen`}>
                <NextAuthSessionProvider>
                    <AuthContextProvider>
<<<<<<< HEAD
                        <ThemeProvider initialTheme="light">
                            {children}
                            <ModalVerificationLogout />
=======
                        <ThemeProvider>
                            <ThemeMuiProvider>
                                {children}
                                <ModalVerificationLogout />
                            </ThemeMuiProvider>
>>>>>>> 446a5041b26b578363be27eb3641d09d8fb62a95
                        </ThemeProvider>
                    </AuthContextProvider>
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}