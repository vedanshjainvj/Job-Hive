import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../components/utils/constants";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { MdMenu, MdClose } from "react-icons/md";
import { Skeleton } from "../ui/skeleton";

// Navbar Component
const Navbar = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const { user } = useSelector((store) => store.auth);
  const { isLoading } = useSelector((store) => store.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handlePopOverChange = (open) => {
    if (open) {
      setTimeout(() => {
        setProfileShow(true);
      }, 500);
    } else {
      setProfileShow(false);
    }
  };
  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between fixed left-0 right-2 z-20 py-2 top-0 mx-auto  h-16 gap-4 bg-opacity-15 dark:border-gray-600 backdrop-blur-lg dark:opacity-70">
        <div className="mx-20">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Hive</span>
          </h1>
        </div>
        <div className="flex items-center gap-1 sm:gap-4 ">
          <ul className="hidden md:flex font-medium items-center gap-5 text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link> 
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/roadmaps">roadmaps</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
                <li>
                  <Link to="/admin">Post Job</Link>
                </li>
              </>
            )}{" "}
            {!user && (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" className="h-8">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] h-8">
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </ul>
          {/* mobile */}
          {menuOpened ? (
            <MdClose
              color="#000"
              onClick={() => toggleMenu(false)}
              className="visible md:invisible h-6 w-6 sm:h-8 sm:w-8"
            />
          ) : (
            <MdMenu
              color="#000"
              onClick={() => toggleMenu(true)}
              className="visible md:invisible h-6 w-6 sm:h-8 sm:w-8"
            />
          )}
          {menuOpened && (
            <ul className="flex flex-col items-start fixed top-16 right-8 p-6 bg-white font-medium shadow-md w-64 transition-all duration-300 rounded-3xl gap-5">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              )}
              {!user ? (
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="block">
                    <Button variant="outline" className="h-8 w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" className="block">
                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] h-8 w-full">
                      Signup
                    </Button>
                  </Link>
                </div>
              ) : (
                <Popover onOpenChange={handlePopOverChange}>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                      {isLoading ? (
                        <Skeleton className="w-10 h-10 rounded-full bg-gray-400" />
                      ) : (
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="@shadcn"
                        />
                      )}
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4 mr-5 shadow-lg rounded-xl bg-white">
                    <div className="flex items-center gap-4">
                      {profileShow ? (
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={
                              user?.profile?.profilePhoto ||
                              "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Free-PNG-Clip-Art.png"
                            }
                            alt="Profile Photo"
                          />
                        </Avatar>
                      ) : (
                        <Skeleton className="w-12 h-12 rounded-full bg-gray-300" />
                      )}
                      <div className="flex flex-col">
                        <h4 className="font-semibold text-lg">
                          {user?.fullname}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-300 my-3" />

                    <div className="flex flex-col gap-3 text-gray-700">
                      {user && user.role === "student" && (
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 hover:text-black transition"
                        >
                          <User2 className="w-5 h-5" />
                          <span>View Profile</span>
                        </Link>
                      )}
                      <button
                        onClick={logoutHandler}
                        className="flex items-center gap-2"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
