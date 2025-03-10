import Image from "next/image"
import Link from "next/link";
import { ReactNode } from "react";
import { SvgArrowToggle } from "@/hub/components/server/svg/svg-arrow-toggle";

type DropdownSubItemList = {
    imageUrl?: string;
    title: string;
    action: string | ReactNode;
}

export type DropdownItemListProps = {
    imageUrl: string;
    title: string;
    subItems: DropdownSubItemList[];
}

export const DropdownItemList = ({
    imageUrl,
    title,
    subItems
}:DropdownItemListProps) => {
    
    return (
        <li>
            <details className="group/dropdown">

                <summary
                    className="flex [&>svg]:group-open/dropdown:rotate-90 items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">

                    <div className="flex gap-2">
                        <Image 
                            className="w-6 h-6 rounded-lg dark:invert"
                            src={imageUrl}
                            alt={title}
                            height={48}
                            width={48}
                        />

                        <span>
                            {title}
                        </span>
                    </div>
                    <SvgArrowToggle />
                </summary>

                <article className="px-4 pb-4">

                    <ul className="flex flex-col gap-2 pl-2 mt-4">

                        {subItems.map((item,idx) => (
                            <li key={item.title === "" ? idx : item.title} className="flex gap-2">
                                { item.imageUrl &&
                                    <Image
                                        className="w-6 h-6 rounded-lg"
                                        alt={item.title}
                                        src={item.imageUrl}
                                        width={36}
                                        height={36}
                                    />
                                }
                                { typeof item.action === "string" ? 
                                    <Link href={item.action}>{item.title}</Link> :
                                    <div>
                                        <p>
                                            {item.title}
                                        </p>
                                        {item.action}
                                    </div>
                                }
                            </li>
                        ))}
                    </ul>

                </article>

            </details>
        </li>
    )
}