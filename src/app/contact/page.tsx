export default function ContactPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Get in touch with me for collaborations or inquiries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send me a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                placeholder="Your message..."
                rows={5}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
              Send Message
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Connect With Me</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">
                contact@vishalvoid.com
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-gray-600 dark:text-gray-400">India</p>
            </div>
            <div>
              <h3 className="font-semibold">Social Links</h3>
              <div className="flex gap-4 mt-2">
                <a href="#" className="text-primary hover:underline">
                  GitHub
                </a>
                <a href="#" className="text-primary hover:underline">
                  LinkedIn
                </a>
                <a href="#" className="text-primary hover:underline">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
