import Image from "next/image";
import { ReactNode, isValidElement } from "react";
import { LinkAppearanceButton } from "@/hub/components/server/link/link-appearance-button";

export interface IFullHeroSectionProps {
    title: string | ReactNode;
    msg: string;
    urlLink?: string;
    textLink?: string;
    imgSrc: string;
    imgSide?: "Right" | "Left";
}

export const FullHeroSection = ({
    title,
    msg,
    urlLink,
    textLink = "Learn more",
    imgSrc,
    imgSide = "Left",
}: IFullHeroSectionProps) => {
    const titleShow = isValidElement(title) ? (
        title
    ) : (
        <h2 className="text-black dark:text-stone-50 text-3xl lg:text-5xl">
            {title}
        </h2>
    );

    return (
        <section
            className={`flex flex-wrap h-screen max-w-screen-2xl mx-auto ${imgSide === "Right" ? "text-end" : "text-start"}`}
        >
            <section
                className={`px-4 flex items-center w-full h-full lg:w-8/12 lg:mt-0`}
            >
                <div
                    className={`flex flex-col w-full ${imgSide === "Right" ? "items-end" : "items-start"}`}
                >
                    {titleShow}
                    <div className="w-36 h-2 bg-primary my-4"></div>
                    <p className="text-md lg:text-xl mb-5 lg:mb-16 text-">
                        {msg}
                    </p>
                    <div className="w-56">
                        {urlLink && (
                            <LinkAppearanceButton href={urlLink}>
                                <span className="sr-only">{textLink}</span>
                                {textLink}
                            </LinkAppearanceButton>
                        )}
                    </div>
                </div>
            </section>
            <section
                className={`hidden lg:flex h-full w-4/12 px-2 items-center ${imgSide === "Right" ? "order-first" : "order-last"}`}
            >
                <Image
                    width={960}
                    height={1280}
                    src={imgSrc}
                    alt="Ilustrate Image"
                    className="object-contain object-center h-5/6"
                />
            </section>
        </section>
    );
};
