'use client';

import Image from "next/image";
import { useState } from "react";
import { GraphiQlDrawerContent } from "./graphiql-drawer-content";

export const GraphiQlDrawer = () => {
    const [open, setOpen] = useState<boolean>(true);

    const ToggleComponent = () => (
        <div className="w-full flex flex-col justify-start items-center">
            <button onClick={() => setOpen(!open)}>
                <Image 
                    alt="Close"
                    src={open ? "/icons/close.svg" : "/icons/menu-toggle.svg"}
                    width={24}
                    height={24}
                />
            </button>
            <div className={`${open ? "hidden" : "flex flex-col mt-24"}`}>
                {
                    "GRAPHIQL"
                        .split("")
                        .map((letter, index) => <p key={index}>{letter}</p>)
                }
            </div>
        </div>
    )

    return (
        <aside className={`
                ${open ? "px-4 w-full" : "px-2"}
                flex h-full md:max-w-sm py-8
                rounded-xl shadow-lg shadow-gray-950 dark:shadow-neutral-700 bg-second-light dark:bg-second-dark [&_h2]:text-gray-500 [&_h3]:text-stone-300 [&_h3]:dark:text-stone-500 
            `}>
                <div className={`${open ? "" : "hidden"} w-full`}>
                    <GraphiQlDrawerContent />
                </div>
                <div className={`max-md:hidden w-4`}>
                    <ToggleComponent />
                </div>
        </aside>
    )
}