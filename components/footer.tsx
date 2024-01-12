import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="py-4 border-t pb-24">
      <div className="container flex items-center gap-6 flex-wrap justify-between">
        <p className="text-sm text-foreground/60">
          Built by{" "}
          <Link
            href="https://twitter.com/Jashandeep31"
            className="font-medium underline"
          >
            jashandeep31
          </Link>{" "}
          maintained by{" "}
          <Link
            href="https://github.com/jashandeep31/my-icons"
            className="font-medium underline"
          >
            community
          </Link>
        </p>
        <div className="flex gap-4 flex-wrap text-sm">
          <Link
            className="underline text-foreground/60 hover:text-foreground  duration-300"
            href={"terms-and-conditions"}
          >
            Terms and Conditions
          </Link>
          <Link
            className="underline text-foreground/60 hover:text-foreground  duration-300"
            href={"privacy-policy"}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
