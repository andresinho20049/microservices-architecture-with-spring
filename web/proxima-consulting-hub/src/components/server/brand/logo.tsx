import Image from "next/image";
import Link from "next/link";

export const LogoComponent = () => {
    return (
        <div className="flex items-center justify-center gap-1 w-24">
            <Link href={"/"}>
                <Image
                    alt="Logo"
                    src={"/Logo.png"}
                    width={471}
                    height={720}
                    className="w-12"
                />
            </Link>
        </div>
    );
};
