"use client";

import { Button } from "@/components/ui/button";
import ThemedIcon from "@/components/ui/extended/themed-icon";
import { DeveloperDetails } from "@/dev-constants/details";

export const GitHubButtons = () => {
  const handleClick = () => {
    window.open(DeveloperDetails.socialLinks[1].url, "_blank");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={handleClick}
      aria-label="View GitHub profile"
      title="GitHub"
    >
      <ThemedIcon
        src="/social/github.svg"
        alt="GitHub"
        size={20}
        hasDarkVariant
        className="h-5 w-5"
      />
    </Button>
  );
};

export const LinkedInButton = () => {
  const handleClick = () => {
    window.open(DeveloperDetails.socialLinks[0].url, "_blank");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={handleClick}
      aria-label="View LinkedIn profile"
      title="LinkedIn"
    >
      <ThemedIcon
        src={DeveloperDetails.socialLinks[0].icon}
        alt={DeveloperDetails.socialLinks[0].name}
        size={20}
        hasDarkVariant={DeveloperDetails.socialLinks[0].hasDarkIcon}
        className="h-5 w-5"
      />
    </Button>
  );
};

export const TwitterButton = () => {
  const handleClick = () => {
    window.open(DeveloperDetails.socialLinks[2].url, "_blank");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={handleClick}
      aria-label="View Twitter profile"
      title="X"
    >
      <ThemedIcon
        src={DeveloperDetails.socialLinks[2].icon}
        alt={DeveloperDetails.socialLinks[2].name}
        size={20}
        hasDarkVariant={DeveloperDetails.socialLinks[2].hasDarkIcon}
        className="h-5 w-5"
      />
    </Button>
  );
};

export const MediumButton = () => {
  const handleClick = () => {
    window.open(DeveloperDetails.socialLinks[3].url, "_blank");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={handleClick}
      aria-label="View Medium profile"
      title="Medium"
    >
      <ThemedIcon
        src={DeveloperDetails.socialLinks[3].icon}
        alt={DeveloperDetails.socialLinks[3].name}
        size={20}
        hasDarkVariant={DeveloperDetails.socialLinks[3].hasDarkIcon}
        className="h-5 w-5"
      />
    </Button>
  );
};
