"use client";

import { DeveloperDetails } from "@/dev-constants/details";
import Image from "next/image";
import ShellWrapper from "../layouts/shell-wrapper";
import RandomBanner from "@/components/ui/extended/random-banner";

const DeveloperIntro = () => {
  const { name, designation, bio, avatar, socialLinks, email } = DeveloperDetails;

  return (
    <ShellWrapper>
      {/* <div className="relative p-2 bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]">
        <div className=" flex flex-col md:flex-row md:justify-between md:space-x-3 space-y-3 md:space-y-0 ">
          <Image
            src={avatar}
            alt={name}
            width={1000}
            height={1000}
            className="h-28 w-28 md:h-32 md:w-32 md:mt-2.5 shrink-0 rounded border object-cover shadow-md overflow-hidden"
          />
          <div className="space-y-2">
            <div className="space-y-1">
              <h1 className="mt-1 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                {name}
              </h1>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {designation}
              </p>
            </div>
            <p className="text-base leading-relaxed text-justify text-muted-foreground">
              {bio}
            </p>
          </div>
        </div>
      </div> */}

      <div className="bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]">
        <RandomBanner className="w-full rounded overflow-hidden " />

        <div className="flex flex-col sm:flex-row sm:justify-between items-center px-4 pt-4 pb-0">
          {/* left name/designation — hidden on very small screens */}
          <div className="space-y-2 hidden sm:block">
            <div className="space-y-1">
              <h1 className="mt-1 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                {name}
              </h1>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {designation}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center sm:justify-end sm:w-auto mx-auto sm:mx-0">
            <Image
              src={avatar}
              alt={name}
              width={1000}
              height={1000}
              className="h-28 w-28 md:h-32 md:w-32 shrink-0  object-cover shadow-md overflow-hidden -mt-10 sm:-mt-10 md:-mt-16 relative z-30 border-4 border-white"
            />
          </div>
        </div>

        {/* small-screen centered name/designation below photo */}
        <div className="sm:hidden text-center mt-3">
          <h2 className="text-3xl font-medium">{name}</h2>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {designation}
          </p>
        </div>

        <p className="text-base p-4 leading-relaxed text-justify text-muted-foreground  mb-0">
         <span> {bio}</span>
         <span> <span className="mt-3 text-sm text-muted-foreground">
          I build on {" "}
          <a
            href={socialLinks[1].url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open GitHub profile"
            className="wavy-inline cursor-pointer hover:text-white"

          >
            GitHub
          </a>
          , post thoughts on {" "}
          <a
            href={socialLinks[2].url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open X profile"
            className="wavy-inline cursor-pointer hover:text-white"
          >
            X
          </a>
          , and you can always drop me at {" "}
          <a
            href={`mailto:${email}`}
            title="Send me an email"
            className="wavy-inline cursor-pointer hover:text-white"
          >
            hi@vishalvoid.com
          </a>
          .
        </span></span>
        </p>
      
      </div>
    </ShellWrapper>
  );
};

export default DeveloperIntro;
