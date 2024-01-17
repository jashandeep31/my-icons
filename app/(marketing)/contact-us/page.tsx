import Link from "next/link"
import React from "react"

export default function page() {
  return (
    <div className="container mt-6 md:mt-12">
      <h1 className="text-lg font-bold">Contact Us</h1>
      <p className="mt-3 text-foreground/60">
        Should you encounter any issues or have inquiries regarding the project,
        please do not hesitate to reach out to us via email at{" "}
        <Link
          className="text-foreground underline"
          href="mailto:jashandeep1659@gmail.com"
        >
          jashandeep1659@gmail.com
        </Link>
        . Although the project is open source, you are welcome to explore the
        source code on{" "}
        <Link
          href="https://github.com/jashandeep31/my-icons"
          className="text-foreground underline"
        >
          GitHub
        </Link>
        .
      </p>
    </div>
  )
}
