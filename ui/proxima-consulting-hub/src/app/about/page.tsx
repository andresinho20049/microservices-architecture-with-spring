import { FullHeroSection } from "@/hub/components/server/section/full-hero-section";
import {
    TagCloud,
    TagCloudType,
} from "@/hub/components/server/section/tag-cloud";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About"
}

export default function About() {
    const tags: TagCloudType[] = [
        {
            label: "Authorization Server",
            link: "https://github.com/andresinho20049/microservices-architecture-with-spring/tree/main/authorization-server",
        },
        {
            label: "Spring Cloud Gateway",
            link: "https://github.com/andresinho20049/microservices-architecture-with-spring/tree/main/oauth2-client-gateway",
        },
        {
            label: "Discovery Service",
            link: "https://github.com/andresinho20049/microservices-architecture-with-spring/tree/main/discovery-service",
        },
        {
            label: "Resource Server",
            link: "https://github.com/andresinho20049/microservices-architecture-with-spring/tree/main/resource",
        },
        {
            label: "UI (Micro-Frontend)",
            link: "https://github.com/andresinho20049/microservices-architecture-with-spring/tree/main/ui",
        },
        {
            label: "Next.js (SSR, SSG and CSR)",
            link: "https://github.com/andresinho20049/microservices-architecture-with-spring/tree/main/ui/proxima-consulting-hub",
        },
        {
            label: "PL/SQL (Postgresql)",
            link: "https://github.com/andresinho20049/microservices-architecture-with-spring/tree/main/resource/database",
        },
        {
            label: "Spring GraphQL",
            link: "https://github.com/andresinho20049/microservices-architecture-with-spring/tree/main/resource/spring-graphql",
        },
        {
            label: "Docker",
            link: "https://github.com/andresinho20049/microservices-architecture-with-spring/blob/main/docker-compose.yaml",
        },
        {
            label: "GIT",
            link: "https://github.com/andresinho20049/microservices-architecture-with-spring/blob/main/commit-guidelines.md",
        },
    ];

    return (
        <section>
            <FullHeroSection
                title={aboutHeader}
                msg={aboutDescription}
                imgSrc="/imgs/microservices-architecture-with-spring-Page-2.drawio.svg"
                imgSide="Left"
            />
            <Image
                className="w-10/12 mx-auto my-2"
                alt="Diagram Architecture"
                src="/imgs/microservices-architecture-with-spring-Page-1.drawio.svg"
                width={1841}
                height={1024}
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
    <div className="[&_strong]:text-second [&_h3]:underline">
      <h2>About Proxima Consulting</h2>
      <p>
        Proxima Consulting is a <strong>fictitious consulting</strong> company. 
        Our business case is to manage our clients' projects, in order to bring valuable insights such as employee hours per project, 
        value allocated to projects and many others. With our <strong>dynamic query service</strong>, 
        we can consult different types of data and present them in a simple and intuitive way.
      </p>
      <h3>Our Architecture</h3>
        Proxima Consulting's website utilizes a microservices architecture
        powered by 
        <ul className="[&_strong]:text-gray-500">
          <li>
            <strong>Spring Authorization Server</strong>
          </li>
          <li>
            <strong>Spring Cloud Gateway</strong>
          </li>
          <li>
            <strong>Spring Eureka Server</strong>
          </li>
          <li>
            <strong>Spring Resource Server</strong>
          </li>
        </ul>
        This architecture provides robust security, scalability, and flexibility.
      <h3>Front-end Development</h3>
      <p>
        The front-end of our website is built using Next.js, a popular
        React-based framework. We utilize secure routing and validation
        mechanisms to ensure access to protected pages is restricted to authorized
        users based on their roles.
      </p>
      <h3>Authentication</h3>
      <p>
        Our website employs the BFF (Backend for Frontend) authentication
        flow to ensure seamless and secure login experiences for users.
      </p>
    </div>
);
