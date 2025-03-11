import { GraphiQlContent } from "@/hub/components/client/graphiql/content/graphiql-content";
import { GraphiQlDrawer } from "@/hub/components/client/graphiql/sidebar/graphiql-drawer";

export default function Graphiql() {

    return (
        <section className="flex gap-2 w-full h-full max-md:flex-col py-4">
            <GraphiQlDrawer />
            <GraphiQlContent />
        </section>
    )
}