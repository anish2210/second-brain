import { Button } from "../components/Button";
import { BrainIcon } from "../icons/BrainIcon";

export function Page404() {
  return (
    <section className="flex items-center h-full min-h-[100vh] bg-green-600 dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-green-100 dark:text-primary-500">
            404 Not Found
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl dark:text-white">
            Whoops! That page doesn't exist.{" "}
          </p>

          <a
            href="/"
            className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            <Button
              variant="secondary"
              text="Back to Homepage"
              startIcon={<BrainIcon />}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
