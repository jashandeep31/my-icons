import React from "react"
import { allBlogs } from "contentlayer/generated"
import { Home } from "lucide-react"
import Image from "next/image"
import { format, parseISO } from "date-fns"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function page() {
  return (
    <div className="container mt-6 md:mt-12">
      <Link
        href={"/"}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "flex items-center gap-2"
        )}
      >
        <Home width={13} height={13} />
        Home
      </Link>

      <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-12">
        {allBlogs.map((blog, index: number) => (
          <Link
            href={blog._id}
            key={index}
            className="cursor-pointer overflow-hidden rounded-lg border duration-300 hover:bg-muted"
          >
            <div>
              <Image
                src={blog.image}
                alt={blog.title}
                width={640}
                height={390}
                className="w-full rounded-lg"
              />
            </div>
            <div className="p-2">
              <h2 className="my-2 text-lg font-bold">{blog.title}</h2>
              {blog.date && (
                <p className="text-sm text-muted-foreground">
                  {format(parseISO(blog.date), "LLLL d, yyyy")}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
