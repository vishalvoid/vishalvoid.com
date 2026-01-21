export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">About Me</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Learn more about my background, experience, and journey.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p>
          I'm a full-stack developer passionate about building beautiful,
          functional web applications. With expertise in modern web
          technologies, I focus on creating seamless user experiences.
        </p>

        <h2>My Background</h2>
        <p>
          I started my development journey with a passion for problem-solving
          and creating elegant solutions. Over the years, I've worked on various
          projects ranging from small startups to enterprise applications.
        </p>

        <h2>Skills & Expertise</h2>
        <ul>
          <li>Frontend: React, Next.js, TypeScript, Tailwind CSS</li>
          <li>Backend: Node.js, Express, NestJS, Python</li>
          <li>Databases: PostgreSQL, MongoDB, Redis</li>
          <li>DevOps: Docker, AWS, Cloud Run</li>
        </ul>

        <h2>Philosophy</h2>
        <p>
          I believe in writing clean, maintainable code and continuously
          learning new technologies. Collaboration and communication are key to
          successful projects.
        </p>
      </div>
    </div>
  );
}
