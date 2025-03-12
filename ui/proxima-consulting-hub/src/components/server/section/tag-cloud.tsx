import { getRandomValue } from "@/hub/utils/math-utils";
import Link from "next/link";

const textColors = [
    "text-cyan-500",
    "text-blue-500",
    "text-green-500",
    "text-orange-500",
    "text-red-500",
    "text-gray-500",
] as const;

type textColorsType = (typeof textColors)[number];

const textSizes = [
    "text-xs",
    "text-lg",
    "text-2xl",
    "text-md",
    "text-sm",
    "text-4xl",
] as const;
type textSizesType = (typeof textSizes)[number];

export type TagCloudProps = {
    tags: TagCloudType[];
};

export type TagCloudType = string | TagCloudItemType;

type TagCloudItemType = {
    label: string;
    link: string;
};

export const TagCloud = ({ tags }: TagCloudProps) => {
    const textColorsLength = textColors.length;
    const textSizesLength = textSizes.length;

    return (
        <ul className="list-none flex justify-center flex-wrap max-w-xl align-center gap-4 leading-8">
            {tags.map((t) => (
                <TagCloudItem
                    key={typeof t === "string" ? t : t.label}
                    tag={t}
                    color={textColors[getRandomValue(textColorsLength)]}
                    size={textSizes[getRandomValue(textSizesLength)]}
                />
            ))}
        </ul>
    );
};

type TagCloudItemProps = {
    tag: TagCloudType;
    color: textColorsType;
    size: textSizesType;
};

const TagCloudItem = ({ tag, color, size }: TagCloudItemProps) =>
    typeof tag === "string" ? (
        <li className={`${color} ${size}`}>{tag}</li>
    ) : (
        <li>
            <Link href={tag.link} target={tag.link.startsWith("/") ? "" : "_blank"} className={`${color} ${size}`}>
                {tag.label}
            </Link>
        </li>
    );
