'use client'
import {Inter} from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/context/AuthContext";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <title>AppScrip Task Shahanwaz</title>
            <link rel="icon" href="/favicon.ico"/>
        </head>
        <body className={inter.className}>
        <AuthProvider>
            <NavBar/>
            {children}
            <Footer />
        </AuthProvider>
        </body>
        </html>
    );
}
