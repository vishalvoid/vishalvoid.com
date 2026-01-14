import React from "react";
import ShellWrapper from "../layouts/shell-wrapper";
import {
  ExpandableSection,
  ExpandableSectionContent,
  ExpandableSectionDescription,
  ExpandableSectionHeader,
  ExpandableSectionItem,
  ExpandableSectionList,
  ExpandableSectionTitle,
  ExpandableSectionTrigger,
  ExpendableSectionLabel,
} from "../ui/extended/expandable-section";
import { ProjectsData } from "@/dev-constants/projects";
import Image from "next/image";
import { DotIcon, Globe, ArrowUpRight, Github } from "lucide-react";
import { Button } from "../ui/button";
import ThemedIcon from "../ui/extended/themed-icon";
import StackBadge from "../ui/extended/stack-badge";
import Link from "next/link";

const DeveloperProjects = () => {
  return (
    <ShellWrapper>
      <ExpandableSection>
        <ExpandableSectionHeader>
          <ExpendableSectionLabel>My Work</ExpendableSectionLabel>
          <ExpandableSectionTitle>
            Projects I&apos;m proud of
          </ExpandableSectionTitle>
          <ExpandableSectionDescription>
            A snapshot of product-focused experiments and client work where I
            handled everything from UX flow to production deployment.
          </ExpandableSectionDescription>
        </ExpandableSectionHeader>

        <ExpandableSectionList>
          {ProjectsData.map((project) => (
            <ExpandableSectionItem key={project.title}>
              <ExpandableSectionTrigger>
                <div className="flex space-x-2">
                  <div>
                    <Image
                      src={project.icon}
                      alt={project.title}
                      width={100}
                      height={100}
                      className="h-8 w-8 mt-1 rounded object-contain"
                    />
                  </div>
                  <div className="space-y-1 pl-3">
                    <h3 className="text-lg font-medium text-foreground md:text-xl">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.tagline}
                    </p>
                  </div>
                </div>
              </ExpandableSectionTrigger>

              <ExpandableSectionContent>
                <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description.map((line) => (
                    <li key={line} className="flex">
                      <DotIcon />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                {project.techStack && (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <StackBadge
                        key={tech.name}
                        name={tech.name}
                        icon={tech.icon}
                        hasDarkIcon={tech.hasDarkIcon}
                      />
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={`/projects/${project.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      aria-label={`View details about ${project.title}`}
                    >
                      <ArrowUpRight className="size-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                  {project.liveLink && (
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Open live site for ${project.title}`}
                      >
                        <Globe className="size-4 mr-2" />
                        Live Link
                      </Link>
                    </Button>
                  )}
                  {project.repo && (
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`View repository for ${project.title}`}
                      >
                        <Github className="size-4 mr-2" />
                        GitHub Repo
                      </Link>
                    </Button>
                  )}
                </div>
              </ExpandableSectionContent>
            </ExpandableSectionItem>
          ))}
        </ExpandableSectionList>
      </ExpandableSection>
    </ShellWrapper>
  );
};

export default DeveloperProjects;
