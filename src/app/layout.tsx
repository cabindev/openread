import "./globals.css";
import Navbar from "~/components/Navbar";
import Toast from "~/components/Toast";
import { ReactNode } from "react";
import { seppuri } from "~/fonts";
import { getSession } from "~/libs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s | SSN OpenRead",
        default: "SSN OpenRead",
    },
    description: "ศูนย์รวมหนังสือดิจิทัลคุณภาพสูง - SSN OpenRead",
    icons: {
        icon: '/favicon.ico',
    },
};

interface LayoutProps {
    children: ReactNode;
}

export default async function layout({ children }: LayoutProps) {
    const session = await getSession();

    return (
        <html lang="en" className={seppuri.variable}>
            <body className="font-seppuri text-sm bg-secondary-50 text-secondary-900">
                <Toast />
                <Navbar session={JSON.parse(JSON.stringify(session))} />
                {children}
            </body>
        </html>
    );
}
