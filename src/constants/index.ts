import { SessionOptions } from "iron-session";

export interface SessionData {
    id?: string;
    name?: string;
    email?: string;
    isManager?: boolean;
    isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
    password: "complex_password_at_least_32_characters_long",
    cookieName: "sdn-ebook",
    cookieOptions: {
        secure: true,
    },
};
