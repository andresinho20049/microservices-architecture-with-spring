import { ReactNode } from "react";
import { AuthStateType } from "@/hub/store/features/auth/auth-types";

type PageType = {
    href: string;
    label: string | ReactNode;
    requireAuthenticated: boolean ;
    requireRole?: string[];
}

const allPages: PageType[] = [
    {href: "/", label: "Home", requireAuthenticated: false},
    {href: "/secured", label: "Sec", requireAuthenticated: true},
    {href: "/secured/customers", label: "Customers", requireAuthenticated: true, requireRole: ["ADMIN"]},
    {href: "/about", label: "About", requireAuthenticated: false}
]

export const getPages = (authState: AuthStateType) => {
    const pages = allPages.filter(p => {
        if(!p.requireAuthenticated) return true;

        if(authState.isAuthenticated) {
            if(!p.requireRole || (!!p.requireRole && p.requireRole.length == 0)) return true;

            if(!!authState.user && (!!p.requireRole && p.requireRole.length > 0)) {
                return authState.user.roles.some(r => p.requireRole?.includes(r));
            };
        }

        return false;
    });

    return pages;
}