import React, { useState, useEffect } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiConnectors";
import { categories } from "../../services/apis";
import { MdKeyboardArrowDown } from "react-icons/md";

const subLinks = [
  {
    title: "python",
    link: "/category/python",
  },
  {
    title: "web dev",
    link: "/category/web-development",
  },
];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItem } = useSelector((state) => state.cart);

  const [ssubLinks, setSsubLinks] = useState([]);

  const fetchSsubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing sublinks result::::", result);
      setSsubLinks(result);
    } catch (error) {
      console.log("Cannot fetch the category list");
    }
  };

  useEffect(() => {
    fetchSsubLinks();
  }, []);

  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" width={160} height={32} loading="lazy" />
        </Link>

        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <MdKeyboardArrowDown />

                    <div className="invisible absolute left-[45%] translate-x-[-50%] translate-y-[80%] flex flex-col rounded-md p-4 bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-[1000]">
                      <div className="absolute left-[50%] top-0 translate-x-0 translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"></div>
                      {subLinks.length ? (
                        subLinks.map((sublink, index) => (
                          <Link to={`${sublink.link}`} key={index}>
                            <p>{sublink.title}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-x-4 items-center">
          {user && user?.accountType != "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
              {totalItem > 0 && <span>{totalItem}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}
          {token === null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
