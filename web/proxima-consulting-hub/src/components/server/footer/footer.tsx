import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

const copyrightUrl = "https://github.com/andresinho20049";

export const FooterComponent = () => {
    return (
        <section className={`bg-transparent w-full`}>
            <div className="container mx-auto my-8">
                <div className="flex flex-col space-y-8 divide-y-2 divide-stone-800 md:divide-opacity-40">
                    {/* Site section */}
                    <div className="flex max-sm:flex-col justify-between divide-x divide-stone-800 divide-opacity-40"></div>

                    {/* Copyright section */}
                    <div className="flex max-sm:flex-col max-sm:space-y-10 justify-between items-center pt-8">
                        <div className="flex flex-col items-center gap-2">
                            <Link href={copyrightUrl}>
                                <Image
                                    src="/imgs/Logo.png"
                                    width={48}
                                    height={48}
                                    alt="Picture of the author"
                                />
                            </Link>
                            <CopyrightComponent />
                        </div>
                        <aside>
                            <nav className="flex items-end gap-8">
                                <LinkCopyright
                                    href={`${copyrightUrl}/microservices-architecture-with-spring/blob/main/SECURITY.md`}
                                >
                                    Privacy Policy
                                </LinkCopyright>
                                <LinkCopyright
                                    href={`${copyrightUrl}/microservices-architecture-with-spring/blob/main/LICENSE`}
                                >
                                    Terms & Conditions
                                </LinkCopyright>
                            </nav>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    );
};

type LinkCopyrightPropsType = LinkProps & {
    children: ReactNode;
};

const LinkCopyright = ({
    href,
    children,
    ...props
}: LinkCopyrightPropsType) => (
    <Link
        href={href}
        {...props}
        className="text-sm text-center text-black dark:text-white hover:text-cyan-700 no-underline hover:underline decoration-cyan-700"
    >
        {children}
    </Link>
);

const CopyrightComponent = () => {
    const currentYear = new Date().getFullYear();
    const copyrightDate = 2020 + (currentYear > 2020 ? `-${currentYear}` : "");

    const copyrightName = "Andresinho20049";

    return (
        <LinkCopyright href={copyrightUrl}>
            {`Developed by `}
            {copyrightName}
            <br />
            &copy; Copyright {copyrightDate}
        </LinkCopyright>
    );
};
