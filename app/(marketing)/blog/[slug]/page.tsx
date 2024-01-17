import React from "react"

import { allBlogs } from "@/.contentlayer/generated"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { format, parseISO } from "date-fns"
import { Mdx } from "./components/mdxComponents"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Metadata, ResolvingMetadata } from "next"
import { siteConfig } from "@/config/siteConfig"

async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const blog = await getBlogFromParams(params)
  if (!blog) {
    return {}
  }
  return {
    title: blog.title,
    description: blog.description,
    keywords: [
      "Custom Folder Icons",
      "Windows Desktop Icons",
      "MacOS Icon Personalization",
      "Desktop Icon Customization",
      "Personalized Desktop Experience",
    ],
    authors: [
      {
        name: "jashandeep",
        url: "https://twitter.com/jashandeep31",
      },
    ],
    creator: "Jashandeep Singh",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url + `/blog/${blog._id}`,
      title: blog.title,
      description: blog.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [`${blog.image}`],
      creator: "@jashandeep31",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
  }
}

async function getBlogFromParams({ slug }: { slug: string }) {
  const blog = allBlogs.find((blog) => blog._id === `blog/${slug}`)
  if (!blog) {
    return null
  }
  return blog
}

async function page({ params }: { params: { slug: string } }) {
  const blog = await getBlogFromParams(params)
  if (!blog) {
    notFound()
  }
  return (
    <div className="container mt-6 md:mt-12">
      <div>
        <Link
          href={"/blog"}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "inline-flex items-center gap-2"
          )}
        >
          <ArrowLeft width={15} height={15} /> Back
        </Link>
      </div>

      <article className="mx-auto max-w-3xl py-6 ">
        <time
          dateTime={blog.date}
          className="block text-sm text-muted-foreground"
        >
          Published on {format(parseISO(blog.date), "LLLL d, yyyy")}
        </time>
        <h1 className="mb-6 mt-2 inline-block text-4xl font-bold leading-tight lg:text-5xl">
          {blog.title}
        </h1>
        <div>
          <Image
            className="w-full rounded-lg"
            src={blog.image}
            alt={blog.title}
            width={1280}
            height={720}
          />
        </div>
        <div className="mt-12 text-muted-foreground">
          <Mdx code={blog.body.code} />
        </div>
      </article>
    </div>
  )
}

export default page
