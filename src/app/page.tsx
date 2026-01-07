import PageShellWrapper from "@/components/layouts/page-shell";
import DeveloperIntro from "@/components/main/developer-intro";
import DeveloperProjects from "@/components/main/developer-projects";

const page = () => {
  return (
    <PageShellWrapper>
      <DeveloperIntro />
      <DeveloperProjects />
    </PageShellWrapper>
  );
};

export default page;
