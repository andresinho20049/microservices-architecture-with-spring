import { FullHeroSection } from "@/hub/components/server/section/full-hero-section";

export default function Home() {
    return (
        <section>
            <FullHeroSection
                title="Proxima Consulting"
                msg="Managing Success, One Project at a Time"
                imgSrc="/imgs/Logo.png"
                imgSide="Right"
                urlLink="/about"
            />
        </section>
    );
}
