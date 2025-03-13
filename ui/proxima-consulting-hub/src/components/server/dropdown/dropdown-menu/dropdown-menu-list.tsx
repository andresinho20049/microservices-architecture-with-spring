import { DropdownItemList, DropdownItemListProps } from "./dropdown-item-list"

export type DropdownMenuListProps = {
    items: DropdownItemListProps[]
}

export const DropdownMenuList = ({
    items
}:DropdownMenuListProps) => {

    return (
        <ul className="flex flex-col gap-2 w-full mx-auto [&_li]:list-none">
            {
                items.map(item => (
                    <DropdownItemList key={item.title}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        subItems={item.subItems}
                    />
                ))
            }
        </ul>
    )
}

