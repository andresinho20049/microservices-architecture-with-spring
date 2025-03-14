import Image from "next/image";
import { ReactNode, isValidElement } from "react";
import { LinkAppearanceButton } from "@/hub/components/server/link/link-appearance-button";

export interface IFullHeroSectionProps {
    title: string | ReactNode;
    msg: string | ReactNode;
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

    const msgShow = isValidElement(msg) ? (
        msg
    ) : (
        <p className="text-md lg:text-xl mb-5 lg:mb-16 text-">{msg}</p>
    );

    return (
        <section
            className={`flex flex-wrap h-screen max-w-screen-2xl mx-auto ${imgSide === "Right" ? "[&_h2]:text-end [&_p]:text-end" : "[&_h2]:text-start [&_p]:text-start"}`}
        >
            <section
                className={`px-4 flex items-center w-full h-full lg:w-7/12 lg:mt-0`}
            >
                <div
                    className={`flex flex-col w-full ${imgSide === "Right" ? "items-end" : "items-start"}`}
                >
                    {titleShow}
                    <div className="w-36 h-2 bg-primary my-4"></div>
                    {msgShow}
                    <div className="w-56">
                        {urlLink && (
                            <LinkAppearanceButton
                                label={textLink}
                                href={urlLink}
                            />
                        )}
                    </div>
                </div>
            </section>
            <section
                className={`hidden lg:flex h-full w-5/12 px-2 items-center ${imgSide === "Right" ? "order-first" : "order-last"}`}
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
