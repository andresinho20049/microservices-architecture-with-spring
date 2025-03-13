import { GraphiQlContentItemShow } from "./graphiql-content-item-show";


export type GraphiQlContentItemCardProps = {
    title: string;
    content: {[key: string]: any}
}

export const GraphiQlContentItemCard = ({
    title,
    content
}:GraphiQlContentItemCardProps) => {

    return (
        <div className={`
                w-full md:w-96 min-h-36 px-2 py-4
                flex flex-col gap-4 justify-center items-center 
                rounded-2xl shadow-gray-950 dark:shadow-neutral-700 bg-second-light dark:bg-second-dark [&_h2]:text-gray-500 [&_h3]:text-stone-300 [&_h3]:dark:text-stone-500
            `}>
            <GraphiQlContentItemShow title={title} content={content} />
        </div>
    )
}