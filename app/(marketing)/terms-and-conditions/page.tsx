import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="container mt-6 md:mt-12">
      <h1 className="text-lg font-bold">Terms and conditions </h1>
      <div className="mt-6 flex flex-col gap-6">
        <p className="text-sm text-foreground/60 ">
          Welcome to MyIcons.tech! Our sophisticated website is designed to
          empower users to effortlessly customize folder icons on both Mac OS
          and Windows platforms with a single click. We believe in providing you
          with the tools to tailor the visual representation of icons on your
          computer, giving you control over your computing environment.
        </p>
        <div>
          <h6 className="font-bold text-base ">User Registration:</h6>
          <p className="text-sm text-foreground/60 ml-2 mt-2">
            To access our services, basic registration via Google or GitHub
            profiles is required. We store your email, password, and profile
            link securely in our database.
          </p>
        </div>
        <div>
          <h6 className="font-bold text-base ">User Content:</h6>
          <p className="text-sm text-foreground/60 ml-2 mt-2">
            Users are prohibited from adding unnecessary or inappropriate icons
            that violate our rules, including but not limited to nudity,
            violations, or any other content deemed inappropriate. Icons
            violating these rules may be removed without prior notice.
          </p>
        </div>
        <div>
          <h6 className="font-bold text-base ">Ownership and Maintenance:</h6>
          <p className="text-sm text-foreground/60 ml-2 mt-2">
            MyIcons.tech is an open-source project created by Jashandeep and
            maintained by the community. There is no singular owner, emphasizing
            the collaborative nature of our platform.
          </p>
        </div>
        <div>
          <h6 className="font-bold text-base ">Disclaimer:</h6>
          <p className="text-sm text-foreground/60 ml-2 mt-2">
            Users are prohibited from adding unnecessary or inappropriate icons
            that violate our rules, including but not limited to nudity,
            violations, or any other content deemed inappropriate. Icons
            violating these rules may be removed without prior notice.
          </p>
        </div>
        <div>
          <p className="text-sm text-foreground/60 ml-2 mt-2">
            By using MyIcons.tech, you agree to abide by these terms and
            conditions. We reserve the right to modify or update these terms at
            any time, and it is your responsibility to stay informed about any
            changes. If you have any questions or concerns, please contact us at
            <Link
              className="underline text-foreground"
              href="mailto:jashandeep1659@gmail.com"
            >
              jashandeep1659@gmail.com
            </Link>
            . Thank you for being a part of the MyIcons.tech community!
          </p>
        </div>
      </div>
    </div>
  );
}
