import PageShellWrapper from "@/components/layouts/page-shell";
import DeveloperExperience from "@/components/main/develoepr-experience";
import DeveloperEducation from "@/components/main/developer-education";
import DeveloperIntro from "@/components/main/developer-intro";
import DeveloperProjects from "@/components/main/developer-projects";

const page = () => {
  return (
    <PageShellWrapper>
      <DeveloperIntro />
      <DeveloperProjects />
      <DeveloperExperience />
      <DeveloperEducation />
    </PageShellWrapper>
  );
};

export default page;
