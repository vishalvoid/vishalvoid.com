import pageShellWrapper from "@/components/layouts/page-shell";

const page = () => {
  return <div>{pageShellWrapper({ children: <div>page</div> })}</div>;
};

export default page;
