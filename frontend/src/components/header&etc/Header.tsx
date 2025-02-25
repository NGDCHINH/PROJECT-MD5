import React, { useEffect, useState, useRef } from "react";
import Logo1 from "../../assets/quiz1.png";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface User {
  avatar: string;
  name: string;
  email: string;
}

export const Header = ({ sibarToggle, setSibarToggle }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const Nav = useNavigate();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const checkJWT = () => {
    const jwt = Cookies.get("token");

    setIsLoggedIn(!!jwt);
    if (!!jwt) {
      fetchUserInfo(jwt);
    }
  };

  const fetchUserInfo = (jwt: string) => {
    axios
      .get("http://localhost:8080/user/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };

  useEffect(() => {
    checkJWT();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800">
      <div className="pr-20 pl-20">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex-shrink-0 flex items-center gap-5">
            <img className="h-14 w-14 cursor-pointer" src={Logo1} alt="Quiz" />
            <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <FaBars
                className="text-white w-10 h-10"
                onClick={() => setSibarToggle(!sibarToggle)}
              />
            </button>
          </div>

          <div className="absolute inset-y-0 mr-24 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                </button>
                <div className="ml-3 relative" ref={dropdownRef}>
                  <img
                    id="avatarButton"
                    className="h-8 w-8 rounded-full cursor-pointer"
                    src={
                      user?.avatar ||
                      "https://i.pngimg.me/thumb/f/720/comdlpng6957537.jpg"
                    }
                    alt=""
                    onClick={toggleMenu}
                  />
                  {isMenuOpen && (
                    <div className="z-10 absolute left-0 mt-2  w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="avatarButton"
                      >
                        <div className="w-full px-4 py-3 text-sm text-gray-900">
                          <div>{user?.name}</div>
                          <div className="font-medium truncate">
                            {user?.email}
                          </div>
                        </div>
                        <ul className="py-2 text-sm text-gray-700">
                          <li>
                            <button
                              className="block w-full px-4 py-2 hover:bg-gray-100"
                              onClick={() => Nav("/app/profile")}
                            >
                              Thông tin
                            </button>
                          </li>
                          <li>
                            <button
                              className="block w-full px-4 py-2 hover:bg-gray-100"
                              onClick={handleSignOut}
                            >
                              Đăng xuất
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => Nav("/signin")}
                className="py-2.5 px-5 mt-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
