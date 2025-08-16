import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getSession } from "~/libs";

interface LayoutProps {
    children: ReactNode;
}

export default async function layout({ children }: LayoutProps) {
    const session = await getSession();
    if (session.isLoggedIn) redirect("/");

    return children;
}
