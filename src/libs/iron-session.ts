"use server";

import prisma from "../../prisma";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { SessionData, sessionOptions, defaultSession } from "~/constants";

export async function getSession() {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(
        cookieStore,
        sessionOptions,
    );

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    if (session.isLoggedIn) {
        const member = await prisma.member.findUnique({
            where: { id: session.id },
        });
        if (member) {
            session.id = member.id;
            session.name = member.name;
            session.email = member.email;
            session.isManager = member.role == "Manager" ? true : false;
        }
    }

    return session;
}

export async function logout() {
    const session = await getSession();
    session.destroy();

    revalidatePath("/");
}
