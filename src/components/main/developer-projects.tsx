import React from "react";
import ShellWrapper from "../layouts/shell-wrapper";
import {
  ExpandableSection,
  ExpandableSectionDescription,
  ExpandableSectionHeader,
  ExpandableSectionTitle,
  ExpendableSectionLabel,
} from "../ui/extended/expandable-section";

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
      </ExpandableSection>
    </ShellWrapper>
  );
};

export default DeveloperProjects;
