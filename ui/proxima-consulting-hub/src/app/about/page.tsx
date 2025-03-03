import { FullHeroSection } from "@/hub/components/server/section/full-hero-section";
import {
    TagCloud,
    TagCloudType,
} from "@/hub/components/server/section/tag-cloud";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About"
}

export default function About() {
    const tags: TagCloudType[] = [
        {
            label: "String",
            link: "https://github.com/andresinho20049/Generic-Dao",
        },
        "NextJs",
        "Authorization Server",
        "Guideline Git",
        "Middleware",
        "Gateway",
        "Oauth2",
        "SSR/CSR/SSG",
        { label: "Resource Server", link: "/" },
        "Ngnix",
        "Docker",
        "Context",
        "Abstract Components",
    ];

    return (
        <section>
            <FullHeroSection
                title={aboutHeader}
                msg={aboutDescription}
                imgSrc="/imgs/Logo.png"
                imgSide="Left"
            />
            <div className="w-full flex justify-center">
                <TagCloud tags={tags} />
            </div>
        </section>
    );
}

const aboutHeader = (
    <h2 className="text-start text-black dark:text-stone-50 text-3xl lg:text-5xl">
        A fictitious consultancy for the presentation of a <br />
        <strong className="text-3xl lg:text-5xl">project</strong>{" "}
    </h2>
);

const aboutDescription = (
    <div className="[&_strong]:text-second [&_p]:font-semibold">
        <h3>The system consists of four main components:</h3>
        <ol>
            <li>
                <strong>Spring Authorization Server</strong>
                <p>Manages user authentication and authorization</p>
                <ul className="ps-5">
                    <li>
                        Built with: Spring Security and
                        oauth2-authorization-server
                    </li>
                    <li>
                        Integrates with the Client Server for authentication and
                        authorization checks
                    </li>
                </ul>
            </li>
            <li>
                <strong>Resource Server</strong>
                <p>
                    Handles business logic and provides data access to clients
                </p>
                <ul className="ps-5">
                    <li>
                        Built with: Spring Web, oauth2-resource-server and
                        oauth2-jose
                    </li>
                    <li>
                        i.e.: Exposes GraphQL endpoints for data retrieval and
                        manipulation
                    </li>
                </ul>
            </li>
            <li>
                <strong>Client Server</strong>
                <p>
                    Acts as an entry point for clients, routing incoming
                    requests to the Resource Server
                </p>
                <ul className="ps-5">
                    <li>Built with: Spring Web and oauth2-client</li>
                    <li>
                        i.e.: Spring Gateway being a client of our authorization
                        server
                    </li>
                </ul>
            </li>
            <li>
                <strong>Frontend (Next.js)</strong>
                <p>
                    A web portal with good UX/UI practices developed with
                    Next.Js
                </p>
                <ul className="ps-5">
                    <li>
                        Handles frontend logic, interacting with the BFF
                        (Backend For Frontend) through the Gateway Server.
                    </li>
                    <li>
                        The portal has middleware, authentication context and
                        cookie validation on the server side for secure
                        browsing.
                    </li>
                </ul>
            </li>
        </ol>
    </div>
);
