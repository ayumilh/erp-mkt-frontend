import "./globals.css";
import { Poppins } from "next/font/google";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { AuthContextProvider } from "@/contexts/AuthContext";
import ModalVerificationLogout from "@/components/Config/ModalVerificationLogout";
import { ThemeProvider } from "@/contexts/ThemeContext"; // Seu Theme Context
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'; // Material-UI

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

const metadata = {
    title: "SIMK",
    description: "Sistema de gerenciamento de vendas e estoque",
};

export default function RootLayout({ children }) {
    // Defina o tema do Material-UI com base no tema do seu contexto global
    const theme = createTheme({
        palette: {
            mode: 'light', // Ajuste isso dinamicamente com base no seu contexto global de tema
        },
    });

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
                        <ThemeProvider> {/* Seu contexto de tema */}
                            <MuiThemeProvider theme={theme}> {/* Material-UI usando o mesmo tema */}
                                {children}
                                <ModalVerificationLogout />
                            </MuiThemeProvider>
                        </ThemeProvider>
                    </AuthContextProvider>
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}