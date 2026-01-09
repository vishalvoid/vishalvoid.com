import PageShellWrapper from "@/components/layouts/page-shell";
import DeveloperExperience from "@/components/main/develoepr-experience";
import DeveloperIntro from "@/components/main/developer-intro";
import DeveloperProjects from "@/components/main/developer-projects";

const page = () => {
  return (
    <PageShellWrapper>
      <DeveloperIntro />
      <DeveloperProjects />
      <DeveloperExperience/>
    </PageShellWrapper>
  );
};

export default page;
