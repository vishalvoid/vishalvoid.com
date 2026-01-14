import PageShellWrapper from "@/components/layouts/page-shell";
import DeveloperExperience from "@/components/main/developerExperience";
import DeveloperEducation from "@/components/main/developerEducation";
import DeveloperContributionGraph from "@/components/main/developerGithubContribution";
import DeveloperIntro from "@/components/main/developerIntro";
import DeveloperProjects from "@/components/main/developerProjects";
import DeveloperStack from "@/components/main/developerStack";

const page = () => {
  return (
    <PageShellWrapper>
      <DeveloperIntro />
      <DeveloperProjects />
      <DeveloperExperience />
      <DeveloperEducation />
      <DeveloperContributionGraph/>
      <DeveloperStack/>
    </PageShellWrapper>
  );
};

export default page;
