import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoReorderThree } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { TbAntennaBars5 } from "react-icons/tb";
import { RiDraftFill } from "react-icons/ri";

export default function Aside() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activelink, setActivelink] = useState("/");

  const handleMenuToggle = () => {
    setClicked(!clicked);
  };

  const handleLinkClick = (link) => {
    setActivelink(link);
    setClicked(false);
  };

  useEffect(() => {
    // Update active link when page reloaded
    setActivelink(router.pathname);
  }, [router.pathname]);

  return (
    <>
      <div className="menu-toggle" onClick={handleMenuToggle}>
        <IoReorderThree />
      </div>
      <div className={`aside ${clicked ? "show" : ""}`}>
        <div className="logo flex">
          <TbAntennaBars5 />
          <Link href="/">
            <h1>Stocks</h1>
          </Link>
        </div>
        <ul className="mt-2">
          <Link
            href="/"
            className={activelink === "/" ? "active" : ""}
            onClick={() => handleLinkClick("/")}
          >
            <li>
              <div>
                <IoHomeSharp />
              </div>
              <span>Dashboard</span>
            </li>
          </Link>
          <Link
            href="/addstock"
            className={activelink === "/addstock" ? "active" : ""}
            onClick={() => handleLinkClick("/addstock")}
          >
            <li>
              <div>
                <MdOutlinePlaylistAdd />
              </div>
              <span>Add Stock</span>
            </li>
          </Link>
          <Link
            href="/draft"
            className={activelink === "/draft" ? "active" : ""}
            onClick={() => handleLinkClick("/draft")}
          >
            <li>
              <div>
                <RiDraftFill />
              </div>
              <span>Integration</span>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}
