import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="headerContainer">
      <Link href="/" className="logo">
        <Image
          src={"/favicon.svg"}
          alt={"AI interviewer logo"}
          height={50}
          width={50}
        />
      </Link>
      <div className="linkItemContainer">
        <Link href="documentation" className="linkItems">
          Documentation
        </Link>

        <Link href="support" className="linkItems">
          Support
        </Link>
      </div>
    </div>
  );
};

export default Header;
