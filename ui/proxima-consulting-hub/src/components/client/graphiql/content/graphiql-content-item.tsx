import { SvgArrowToggle } from "@/hub/components/server/svg/svg-arrow-toggle";
import { GraphiQlContentItemCard } from "./graphiql-content-item-card";
import { GraphiQlContentItemShow } from "./graphiql-content-item-show";


export type GraphiQlContentItemProps<T> = {
    title: string;
    content: T | T[];
}

export const GraphiQlContentItem = <T extends {name?: string}>({
    title,
    content
}:GraphiQlContentItemProps<T>) => {

    if (!content)
        return;

    return (
        <section className="w-full h-full flex flex-wrap gap-4 justify-center items-center">
            <details className="w-10/12 group/gqlitem py-1.5 border-b border-gray-300">
                <summary className="[&>svg]:group-open/gqlitem:rotate-90 outline-none list-none py-2 text-lg font-bold cursor-pointer relative flex justify-between rounded-lg select-none hover:after:opacity-75 focus-visible:ring-4 focus-visible:ring-gray-100 after:content-[''] after:absolute after:right-0 after:top-6 after:h-6 after:w-6 after:opacity-40 after:transition-transform after:duration-150 after:ease">
                    {title}
                    <SvgArrowToggle />
                </summary>
                <article className="animate-slide-in flex flex-wrap gap-4 py-4 justify-start items-start">
                    {
                        Array.isArray(content) ? (
                            content.map((item, idx) => (
                                <GraphiQlContentItemCard key={idx} title={item?.name || title} content={item} />
                            ))
                        ) : (
                            <GraphiQlContentItemShow title={content.name || title} content={content} />
                        )
                    }
                </article>
            </details>
        </section>
    )
}