import { DeveloperDetails } from "@/dev-constants/details";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const SiteFooter = () => {
  return (
    <footer className="w-full">
      <div className="flex h-24 px-8 md:px-0 max-w-2xl mx-auto items-center justify-between">
        <div className="flex flex-col items-center justify-center w-full space-y-1">
          <p className="font-medium text-lg text-center">vishalvoid</p>
          <p className="text-sm text-muted-foreground text-center">
            Built by{" "}
            <Link
              href={DeveloperDetails.socialLinks[1].url}
              className="hover:underline underline-offset-2 hover:text-primary transition-colors duration-300"
              title={`Developer ${DeveloperDetails.socialLinks[1].name} account`}
            >
              Vishal Kumar Singh
              <ArrowUpRight size={15} className="inline-block" />
            </Link>{" "}
            at{" "}
            <Link
              href="https://capebyte.com"
              className="hover:underline underline-offset-2 hover:text-amber-400 transition-colors duration-300"
              title="Capebyte website"
              target="_blank"
              rel="noopener noreferrer"
            >
              capebyte
              <ArrowUpRight size={15} className="inline-block" />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
