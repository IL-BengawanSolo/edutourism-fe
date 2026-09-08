import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | EduSolo</title>
      </Helmet>
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <h1 className="text-pr-blue-800 text-6xl font-bold">404</h1>
        <h2 className="text-neutral-black mt-4 text-2xl font-semibold">
          Page Not Found
        </h2>
        <p className="text-neutral-dark-grey mt-2 max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-pr-blue-800 text-pr-blue-50 mt-6 rounded-lg px-6 py-3 font-medium hover:bg-blue-900"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
}
