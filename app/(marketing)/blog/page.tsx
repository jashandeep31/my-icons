import React from "react";
import { allBlogs } from "contentlayer/generated";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import Link from "next/link";

export default function page() {
  return (
    <div className="container md:mt-12 mt-6">
      <Button variant={"ghost"} size="sm" className="flex items-center gap-2">
        <Home width={13} height={13} />
        Home
      </Button>

      <div className="grid grid-cols-2 gap-12 mt-6">
        {allBlogs.map((blog, index: number) => (
          <Link
            href={blog._id}
            key={index}
            className="border rounded-lg overflow-hidden cursor-pointer hover:bg-muted duration-300"
          >
            <div>
              <Image
                src={blog.image}
                alt={blog.title}
                width={640}
                height={390}
                className="rounded-lg w-full"
              />
            </div>
            <div className="p-2">
              <h2 className="text-lg font-bold my-2">{blog.title}</h2>
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
  );
}
