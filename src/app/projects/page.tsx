export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          A showcase of my recent work and side projects.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 border rounded-lg dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-2">Project One</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A full-stack application built with modern technologies.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 text-xs rounded">
              React
            </span>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 text-xs rounded">
              Node.js
            </span>
          </div>
        </div>

        <div className="p-6 border rounded-lg dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-2">Project Two</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            An innovative solution for a complex problem.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 text-xs rounded">
              Next.js
            </span>
            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 text-xs rounded">
              PostgreSQL
            </span>
          </div>
        </div>

        <div className="p-6 border rounded-lg dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-2">Project Three</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A scalable platform serving thousands of users.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 text-xs rounded">
              TypeScript
            </span>
            <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 text-xs rounded">
              Docker
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
