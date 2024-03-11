import { PreloadResources } from "./preload";
import { type HTMLProps, Suspense } from "react";
import ViewCounter from "./blog/view-counter";
import { getViewsCount } from "./db/queries";
import Image from "next/image";

function Badge(props: HTMLProps<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      target="_blank"
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
    />
  );
}

async function Views({ slug }: { slug: string }) {
  const views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BlogLink({ slug, name }) {
  return (
    <div className="group">
      <a
        href={`/blog/${slug}`}
        className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4 w-full"
      >
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <Suspense fallback={<p className="h-6" />}>
            <Views slug={slug} />
          </Suspense>
        </div>
        <div className="text-neutral-700 dark:text-neutral-300 transform transition-transform duration-300 group-hover:-rotate-12">
          <ArrowIcon />
        </div>
      </a>
    </div>
  );
}

export default function Page() {
  return (
    <section>
      <PreloadResources />
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        hey, I&apos;m rasidagac 👋
      </h1>
      <p className="prose prose-neutral dark:prose-invert">
        {
          "As a Frontend Engineer with a passion for community building and education, I bring a wealth of experience from my role at "
        }
        <span className="not-prose">
          <Badge href="https://getir.com/">
            <svg
              width="13"
              height="13"
              role="img"
              aria-label="Getir logo"
              className="inline-flex mr-1"
            >
              <use href="/sprite.svg#getir" />
            </svg>
            Getir
          </Badge>
        </span>
        {
          ", where I craft user-friendly and responsive web pages. My expertise lies in "
        }
        <Badge href="https://react.dev">
          <svg
            width="14"
            height="14"
            role="img"
            aria-label="React logo"
            className="!mr-1"
          >
            <use href="/sprite.svg#react" />
          </svg>
          React
        </Badge>
        {" and "}
        <Badge>
          <svg
            width="14"
            height="14"
            role="img"
            aria-label="Javascript logo"
            className="!mr-1"
          >
            <use href="/sprite.svg#javascript" />
          </svg>
          Javascript
        </Badge>
        {" community, an open-source web framework built with "}
        <Badge href="https://nextjs.org/">
          <Image
            alt="Next.js logomark"
            src="/next-logo.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          Next.js
        </Badge>
        .
      </p>
      <div className="columns-2 sm:columns-3 gap-4 my-8"></div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          On my portfolio, you’ll find a collection of educational content for
          developers, ranging from blog posts to videos and workshops, all aimed
          at teaching the intricacies of web development, JavaScript and
          TypeScript, and frameworks like React and Next.js. I believe in
          keeping things simple and sharing knowledge that can help others grow
          in their careers, just as I have in mine.
        </p>
      </div>
      <div className="my-8 flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 w-full"></div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Join me in exploring the art of web development, where I share my
          journey, the technologies that excite me, and the lessons learned
          along the way. Let’s build something amazing together. ¯\_(ツ)_/¯
        </p>
      </div>
      <div className="my-8 flex flex-col space-y-4 w-full">
        <BlogLink
          name="What Makes A Great Developer Experience?"
          slug="developer-experience-examples"
        />
        <BlogLink name="What is Developer Relations?" slug="devrel-at-vercel" />
        <BlogLink name="The Story of Heroku" slug="heroku" />
      </div>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://linkedin.com/rasidagac"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">reach me</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
