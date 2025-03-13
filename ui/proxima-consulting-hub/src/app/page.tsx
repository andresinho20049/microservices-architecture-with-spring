import { FullHeroSection } from "@/hub/components/server/section/full-hero-section";

export default function Home() {

    const msg: string = `
        At Proxima Consulting, we understand that effective project management is the key to delivering exceptional results. 
        That's why we offer a comprehensive suite of solutions designed to streamline the project management process and drive success for our clients.
    `;

    return (
        <section>
            <FullHeroSection
                title="Proxima Consulting"
                msg={msg}
                imgSrc="/imgs/Logo.png"
                imgSide="Right"
                urlLink="/about"
            />
        </section>
    );
}
