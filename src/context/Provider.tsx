"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function Provider({ children, session }: SessionProviderProps) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
