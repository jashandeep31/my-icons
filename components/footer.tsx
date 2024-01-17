import Link from "next/link"
import React from "react"

function Footer() {
  return (
    <div className="border-t py-4">
      <div className="container flex flex-wrap items-center justify-between gap-6 pb-24">
        <p className="flex flex-col gap-2 text-sm text-foreground/60 md:flex-row">
          <span>
            Built by{" "}
            <Link
              href="https://twitter.com/Jashandeep31"
              className="font-medium underline"
            >
              jashandeep31
            </Link>{" "}
          </span>
          <span>
            maintained by{" "}
            <Link
              href="https://github.com/jashandeep31/my-icons"
              className="font-medium underline"
            >
              community
            </Link>
          </span>
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            className="text-foreground/60 underline duration-300  hover:text-foreground"
            href={"terms-and-conditions"}
          >
            Terms and Conditions
          </Link>
          <Link
            className="text-foreground/60 underline duration-300  hover:text-foreground"
            href={"privacy-policy"}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
