import React, { useState } from "react";
import logo from "../assets/idoLogo.png";
import search from "../assets/Search.svg";
import add from "../assets/Add.svg";
import user from "../assets/Bitmap.png";
import userxl from "../assets/Bitmap@2x.png";
import remove from "../assets/RemoveQuote.svg";
import info from "../assets/ShowQuoteIcon.svg";
import logout from "../assets/log-out.svg";
import KanbanBoard from "../components/KanbanBoard";
import Popup from "../components/Popup";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import { addTask } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Home() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userid");
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(true);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimate, setEstimate] = useState("");
  const [importance, setImportance] = useState("");
  const [status, setStatus] = useState("todo");
  const [searchQuery, setSearchQuery] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addTask,
    onSuccess: async () => {
      toast.success("Task added successfully.");
      setOpen(false);
      await queryClient.invalidateQueries("tasks");
    },
    onError: () => {
      toast.error("Failed to add task.");
    },
  });

  const logOut = () => {
    localStorage.clear();
    Cookies.remove("user-token");
    setUserProfileOpen(false);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateAsync({
      title,
      category,
      dueDate,
      estimate,
      importance,
      status,
      userId,
    });
    setTitle("");
    setCategory("");
    setDueDate("");
    setEstimate("");
    setImportance("");
  };

  return (
    <div className="h-screen bg-[#F4F7FC] overflow-hidden">
      <header className="relative flex justify-between items-center bg-white px-8">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className="flex items-center gap-10">
          <div className="group flex justify-center items-center relative">
            <div className="absolute top-2 right-4">
              <img src={search} alt="search icon" />
            </div>
            <div>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="border-2 border-[#8556A4] p-2 px-4 rounded-3xl w-[400px] invisible group-hover:visible "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div
            onClick={() => setOpen(true)}
            className="flex items-center justify-center bg-[url('./assets/Circle.svg')] w-6 h-6 bg-center bg-no-repeat cursor-pointer"
          >
            <img src={add} alt="search icon" />
          </div>
          <div>
            <img
              src={user}
              alt="avatar"
              className="rounded-[50%] cursor-pointer"
              onClick={() =>
                userProfileOpen
                  ? setUserProfileOpen(false)
                  : setUserProfileOpen(true)
              }
            />
            {userProfileOpen && (
              <div className="flex items-center gap-8 absolute bottom-0 top-16 right-8 z-20 w-[348px] h-[126px] bg-white shadow-md border-2 border-[#6E4C85] p-4 rounded-[6px]">
                <div>
                  <img
                    src={userxl}
                    alt="avatar icon"
                    className="rounded-[50%]"
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-[#6E4C85] font-bold">{userEmail}</p>
                  <p
                    onClick={() => logOut()}
                    className="flex gap-2 cursor-pointer"
                  >
                    Log Out <img src={logout} alt="logout icon" />
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {quoteOpen ? (
        <div className="group flex justify-between items-center py-4 px-8 bg-bg-gradient">
          <p className="text-white italic font-thin">
            "Anything that can go wrong, will go wrong!"
          </p>
          <div
            onClick={() => setQuoteOpen(false)}
            className="cursor-pointer invisible group-hover:visible"
          >
            <div>
              <img src={remove} alt="x icon" />
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setQuoteOpen(true)}
          className="flex justify-end py-4 px-8 cursor-pointer"
        >
          <img src={info} alt="info icon" />
        </div>
      )}
      <section className="px-8 py-8">
        <KanbanBoard searchQuery={searchQuery} />
      </section>
      {open && (
        <Popup
          onClickOutsideClose={() => setOpen(false)}
          onClickClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        >
          <Input
            labelColor="text-black"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <Input
            labelColor="text-black"
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          {/* <Input
            placeholder="yyyy-mm-dd"
            labelColor="text-black"
            label="DueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          /> */}
          <label htmlFor="duedate" className="font-thin text-sm">
            DueDate
          </label>
          <input
            htmlFor="duedate"
            type="date"
            className="block w-full bg-gray-50 border-[1px] p-2 rounded-[6px] border-gray-200"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <br />
          <Input
            labelColor="text-black"
            label="Estimate"
            value={estimate}
            onChange={(e) => setEstimate(e.target.value)}
          />
          <br />

          <label htmlFor="importance" class="block text-sm text-black">
            importance
          </label>
          <select
            id="importance"
            className="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
            value={importance}
            onChange={(e) => {
              setImportance(e.target.value);
            }}
          >
            <option selected value="low">
              Low
            </option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <br />
          <MainButton
            type="submit"
            disabled={isPending}
            label={isPending ? "Adding task..." : "Add Task"}
          />
        </Popup>
      )}
    </div>
  );
}

export default Home;
