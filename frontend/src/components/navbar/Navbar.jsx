import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { delay, motion } from "framer-motion";

import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropDownMenuState, setDropDownMenuState] = useState(false);
  const dropDownMenuElementRef = useRef(null);
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const clickOutsideBusinessSolutionsHandler = (event) => {
    if (
      event.target.id !== "dropdown-menu-button" &&
      event.target.id !== "dropdown-menu-item"
    ) {
      setDropDownMenuState(false);
    }
  };

  const clickOutsideOptionsHandler = (event) => {
    if (
      event.target.id !== "options-menu-button" &&
      event.target.id !== "options-menu-container" &&
      event.target.id !== "options-menu-item"
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    window.addEventListener("click", clickOutsideBusinessSolutionsHandler);
    window.addEventListener("click", clickOutsideOptionsHandler);
    return () => {
      window.removeEventListener("click", clickOutsideBusinessSolutionsHandler);
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = {
    id: 1,
    username: "John Doe",
    isSeller: true,
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span
            id="dropdown-menu-button"
            className={
              dropDownMenuState
                ? "business-solutions drop-down-menu"
                : "business-solutions up-menu"
            }
            onClick={() => setDropDownMenuState(!dropDownMenuState)}
          >
            Business Solutions
            <svg width="16" height="16" viewBox="0 0 14 9">
              <path d="M.19 1.272.81.653a.375.375 0 0 1 .53 0L7 6.3 12.66.653a.375.375 0 0 1 .53 0l.62.62a.375.375 0 0 1 0 .53L7.264 8.346a.375.375 0 0 1-.53 0L.19 1.802a.375.375 0 0 1 0-.53Z"></path>
            </svg>
          </span>
          {dropDownMenuState && (
            <motion.div
              className="business-solutions-menu"
              ref={dropDownMenuElementRef}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.span
                id="dropdown-menu-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="title" id="dropdown-menu-item">
                  Fiverr Pro
                </div>
                <div className="content" id="dropdown-menu-item">
                  Top freelancers and professional business tools for any
                  project
                </div>
              </motion.span>
              <motion.span
                id="dropdown-menu-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="title" id="dropdown-menu-item">
                  Fiverr Certified
                </div>
                <div className="content" id="dropdown-menu-item">
                  Your own branded marketplace of certified experts
                </div>
              </motion.span>
              <motion.span
                id="dropdown-menu-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="title" id="dropdown-menu-item">
                  Fiverr Enterprise
                </div>
                <div className="content" id="dropdown-menu-item">
                  SaaS to manage your freelance workforce and onboard additional
                  talent
                </div>
              </motion.span>
            </motion.div>
          )}
          <span>Explore</span>

          <span>
            <svg width="18" height="18">
              <path d="M9 1C4.58875 1 1 4.58875 1 9C1 13.4113 4.58875 17 9 17C13.4113 17 17 13.4113 17 9C17 4.58875 13.4113 1 9 1ZM8.53125 4.92676C7.81812 4.89612 7.11218 4.7959 6.43811 4.63293C6.54578 4.37781 6.6626 4.13281 6.78857 3.90063C7.30542 2.94824 7.93994 2.27991 8.53125 2.03784V4.92676ZM8.53125 5.86499V8.53125H5.60339C5.64465 7.4906 5.82202 6.45752 6.11536 5.51782C6.8927 5.71362 7.70874 5.83215 8.53125 5.86499ZM8.53125 9.46875V12.135C7.70874 12.1678 6.8927 12.2864 6.11536 12.4822C5.82202 11.5425 5.64465 10.5094 5.60339 9.46875H8.53125ZM8.53125 13.0732V15.9622C7.93994 15.7201 7.30542 15.0518 6.78857 14.0994C6.6626 13.8672 6.54578 13.6222 6.43811 13.3671C7.11218 13.2041 7.81799 13.1039 8.53125 13.0732ZM9.46875 13.0732C10.1819 13.1039 10.8878 13.2041 11.5619 13.3671C11.4542 13.6222 11.3374 13.8672 11.2114 14.0994C10.6946 15.0518 10.0601 15.7201 9.46875 15.9622V13.0732ZM9.46875 12.135V9.46875H12.3966C12.3553 10.5094 12.178 11.5425 11.8846 12.4822C11.1073 12.2864 10.2913 12.1678 9.46875 12.135ZM9.46875 8.53125V5.86499C10.2913 5.83215 11.1073 5.71362 11.8846 5.51782C12.178 6.45752 12.3553 7.4906 12.3966 8.53125H9.46875ZM9.46875 4.92676V2.03784C10.0601 2.27991 10.6946 2.94824 11.2114 3.90063C11.3374 4.13281 11.4542 4.37781 11.5619 4.63293C10.8878 4.7959 10.1819 4.89612 9.46875 4.92676ZM12.0354 3.45349C11.8007 3.02087 11.5457 2.63953 11.2769 2.31421C12.2141 2.63428 13.0631 3.14636 13.7771 3.8031C13.3699 4.02124 12.931 4.21069 12.4694 4.36902C12.3384 4.0509 12.1936 3.74487 12.0354 3.45349ZM5.9646 3.45349C5.8064 3.74487 5.66162 4.0509 5.53064 4.36902C5.06897 4.21069 4.63013 4.02112 4.2229 3.8031C4.93689 3.14636 5.78589 2.63428 6.72314 2.31421C6.45435 2.63953 6.19946 3.02075 5.9646 3.45349ZM5.2135 5.25012C4.89355 6.27368 4.70544 7.38953 4.66492 8.53125H1.95349C2.05383 7.00769 2.63892 5.61438 3.5564 4.50525C4.06555 4.79724 4.62317 5.047 5.2135 5.25012ZM4.66492 9.46875C4.70544 10.6106 4.89355 11.7263 5.2135 12.7499C4.62317 12.953 4.06555 13.2028 3.5564 13.4948C2.63892 12.3856 2.05383 10.9923 1.95349 9.46875H4.66492ZM5.53064 13.631C5.66162 13.9491 5.8064 14.2551 5.9646 14.5465C6.19946 14.9791 6.45435 15.3605 6.72314 15.6858C5.78589 15.3657 4.93689 14.8536 4.22302 14.1969C4.63 13.9789 5.06897 13.7893 5.53064 13.631ZM12.0354 14.5465C12.1936 14.2551 12.3384 13.9491 12.4694 13.631C12.931 13.7893 13.3699 13.9789 13.7771 14.1969C13.0631 14.8536 12.2141 15.3657 11.2769 15.6858C11.5457 15.3605 11.8005 14.9792 12.0354 14.5465ZM12.7865 12.7499C13.1064 11.7263 13.2946 10.6105 13.3351 9.46875H16.0465C15.9462 10.9923 15.3611 12.3856 14.4436 13.4948C13.9344 13.2028 13.3768 12.953 12.7865 12.7499ZM13.3351 8.53125C13.2946 7.3894 13.1064 6.27368 12.7865 5.25012C13.3768 5.047 13.9344 4.79724 14.4436 4.50525C15.3611 5.61438 15.9462 7.00769 16.0465 8.53125H13.3351Z"></path>
            </svg>
            English
          </span>

          {!currentUser && <span>Sign in</span>}
          {!currentUser?.isSeller && <span>Become A Seller</span>}
          {!currentUser && <button>Join</button>}
          {/* User Info*/}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
              <span id="options-menu-button">{currentUser?.username}</span>
              {open && (
                <div className="options" id="options-menu-container">
                  {currentUser?.isSeller && (
                    <>
                      <Link
                        id="options-menu-item"
                        className="link"
                        to="/mygigs"
                      >
                        <motion.span
                          initial={{ opacity: 0, x: -100 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          Gigs
                        </motion.span>
                      </Link>
                      <Link id="options-menu-item" className="link" to="/add">
                        <motion.span
                          initial={{ opacity: 0, x: -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          Add New Gig
                        </motion.span>
                      </Link>
                    </>
                  )}
                  <Link id="options-menu-item" className="link" to="/orders">
                    <motion.span
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Orders
                    </motion.span>
                  </Link>
                  <Link id="options-menu-item" className="link" to="/messages">
                    <motion.span
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Messages
                    </motion.span>
                  </Link>
                  <Link id="options-menu-item" className="link" to="/">
                    <motion.span
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Logout
                    </motion.span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <div className="menu">
            <Link to="/" className="link">
              <span>Graphics & Design</span>
            </Link>
            <Link to="/" className="link">
              <span>Videos & Animation</span>
            </Link>
            <Link to="/" className="link">
              {" "}
              <span>All Services</span>
            </Link>
            <Link to="/" className="link">
              {" "}
              <span>Digital Marketing</span>
            </Link>
            <Link to="/" className="link">
              {" "}
              <span>Music & Audio</span>
            </Link>
            <Link to="/" className="link">
              {" "}
              <span>Programming & Tech</span>
            </Link>
            <Link to="/" className="link">
              {" "}
              <span>Business</span>
            </Link>
            <Link to="/" className="link">
              <span>Lifestyle</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
