import { ReactNode } from "react";
import { SvgArrowToggle } from "@/hub/components/server/svg/svg-arrow-toggle";

export type AccordionItemType = {
    title: string;
    content: ReactNode;
}

export type AccordionProps = {
    items: AccordionItemType[];
}

export const Accordion = ({
    items
}:AccordionProps) => {
    return (
        <section className="p-2 rounded-2xl w-full">

            {
                items.map((item, idx) => (
                    <details key={idx} className="group/accordion py-1.5 border-b border-gray-300">
                        <summary className="[&>svg]:group-open/accordion:rotate-90 outline-none list-none py-2 text-lg font-bold cursor-pointer relative flex justify-between rounded-lg select-none hover:after:opacity-75 focus-visible:ring-4 focus-visible:ring-gray-100 after:content-[''] after:absolute after:right-0 after:top-6 after:h-6 after:w-6 after:opacity-40 after:transition-transform after:duration-150 after:ease">
                            {item.title}
                            <SvgArrowToggle />
                        </summary>
                        <article className="animate-slide-in">
                            {item.content}
                        </article>
                    </details>
                ))    
            }

        </section>
    )
}