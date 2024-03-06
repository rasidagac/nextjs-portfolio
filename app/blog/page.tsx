import Link from 'next/link';
import {Suspense, useMemo} from 'react';
import ViewCounter from './view-counter';
import { getViewsCount } from 'app/db/queries';
import { getBlogPosts } from 'app/db/blog';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  const sortedBlogArr = useMemo(() => allBlogs
      .toSorted((a, b) =>
          new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
      ), []);

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my blog
      </h1>
      {sortedBlogArr
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={post.slug} />
              </Suspense>
            </div>
          </Link>
        ))}
    </section>
  );
}

async function Views({ slug }: Readonly<{ slug: string }>) {
  let views = await getViewsCount();

  return <ViewCounter allViews={views} slug={slug} />;
}
