import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="py-4 border-t">
      <div className="container">
        <p className="text-sm text-foreground/60">
          Built by{" "}
          <Link href="/" className="font-medium underline">
            jashandeep31
          </Link>{" "}
          mainted by{" "}
          <Link href="/" className="font-medium underline">
            community
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Footer;
