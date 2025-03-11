import { DropdownItemListProps, DropdownSubItemList } from "@/hub/components/server/dropdown/dropdown-menu/dropdown-item-list";
import { DropdownMenuList } from "@/hub/components/server/dropdown/dropdown-menu/dropdown-menu-list";


type GraphiQlContentItemShowProps = {
    title?: string;
    content: {[key: string]: any}
}

export const GraphiQlContentItemShow = ({
    title,
    content
}:GraphiQlContentItemShowProps) => {

    if(!content) return;

    const keys = Object.keys(content);
    const dropdownActions: DropdownItemListProps[] = [];
    const paragraphs: {[key:string]:string}[] = [];

    keys.forEach((key) => {
        let currentValue = content[key];

        if(!!currentValue && typeof currentValue === "object") {
            if(Array.isArray(currentValue)) {
                const subItems:DropdownSubItemList[] = currentValue.map((cvItem, idx) => ({
                    title: "",
                    action: (
                        <div className={`w-11/12 mx-auto border-b ${idx % 2 == 0 ? "[&_strong]:text-accent" : "[&_strong]:text-second"}`}>
                            <GraphiQlContentItemShow key={cvItem?.["id"] || idx} content={cvItem} />
                        </div>
                    ) 
                }));
                dropdownActions.push({
                    title: key,
                    subItems: subItems,
                    imageUrl: "/icons/file.svg"
                });
            } else {
                const subItems:DropdownSubItemList[] = [{
                    title: "",
                    action: <GraphiQlContentItemShow key={key} content={currentValue} />
                }]
                dropdownActions.push({
                    title: key,
                    subItems: subItems,
                    imageUrl: "/icons/study.svg"
                });
            }
        } else {
            paragraphs.push({
                key, value: currentValue
            })
        }
    })

    return (
        <div className={`
                w-full flex flex-col gap-4 justify-center items-center
            `}>
            {title && (
                <h3 className="text-center">{title}</h3>
            )}
            {paragraphs.map((p, idx) => (
                <div key={p.key} className="w-full px-2 flex gap-2 justify-center items-center">
                    <div className="w-full flex justify-end">
                        <strong>{`${p.key}:`}</strong>
                    </div>
                    <div className="w-full flex justify-start">
                        <p className="text-start">{p.value}</p>
                    </div>
                </div>
            ))}
            {
                !!dropdownActions && dropdownActions.length > 0 && (
                    <DropdownMenuList items={dropdownActions} />
            )}
        </div>
    )
}