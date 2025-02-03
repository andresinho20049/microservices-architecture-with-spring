import { ReactNode } from "react";

type PageType = {
    href: string;
    label: string | ReactNode;
    requireLogged: boolean;
};

export const pages: PageType[] = [
    {
        label: "Home",
        href: "/",
        requireLogged: false,
    },
    {
        label: "Customers",
        href: "secured/customers",
        requireLogged: true,
    },
];
