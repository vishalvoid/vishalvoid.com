import ShellWrapper from "../layouts/shell-wrapper";
import { GitHubCalendar } from "react-github-calendar";
import { DeveloperDetails } from "@/dev-constants/details";

const DeveloperContributionGraph = () => {
  const username = DeveloperDetails.github;
  return (
    <ShellWrapper>
      <div className="m-2">
        <GitHubCalendar username={username} />
      </div>
    </ShellWrapper>
  );
};

export default DeveloperContributionGraph;
