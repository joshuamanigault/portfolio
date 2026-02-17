import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted prose-p:leading-[30px] prose-li:text-muted prose-strong:text-muted-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-th:text-foreground prose-td:text-muted max-w-none">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
