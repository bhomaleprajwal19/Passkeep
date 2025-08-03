import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordarray, setpasswordarray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordarray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!", { theme: "dark" });
  };

  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 1 && form.password.length > 2) {
      const newEntry = { ...form, id: uuidv4() };
      const updatedArray = [...passwordarray, newEntry];
      setpasswordarray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
      setform({ site: "", username: "", password: "" });
      toast("Password Saved!", { theme: "dark" });
    } else {
      toast("Error: Password not saved!", { theme: "dark" });
    }
  };

  const deletePassword = (id) => {
    if (confirm("Do you want to delete this password?")) {
      const updatedArray = passwordarray.filter((item) => item.id !== id);
      setpasswordarray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
      toast("Password Deleted!", { theme: "dark" });
    }
  };

  const edit = (id) => {
    const itemToEdit = passwordarray.find((i) => i.id === id);
    setform(itemToEdit);
    setpasswordarray(passwordarray.filter((item) => item.id !== id));
  };

  const showPassword = () => {
    if (ref.current.src.includes("eyecross.png")) {
      ref.current.src = "/icons/eye.png";
      passwordref.current.type = "password";
    } else {
      ref.current.src = "/icons/eyecross.png";
      passwordref.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="relative min-h-screen bg-slate-200 px-4 sm:px-8 md:px-16 py-8">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-300 opacity-20 blur-[100px]"></div>
        </div>

        {/* Header */}
        <h1 className="font-bold text-center mb-6">
          <div className="text-3xl sm:text-4xl">
            <span className="text-green-700">&lt;/</span>
            <span>Pass</span>
            <span className="text-green-700">Keep/&gt;</span>
          </div>
          <p className="text-lg">Manage your Passwords</p>
        </h1>

        {/* Form */}
        <div className="flex flex-col items-center gap-5 mb-8">
          <input
            name="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            type="text"
            className="rounded-full w-full max-w-xl border border-green-400 py-2 px-4 text-black"
          />

          <div className="flex flex-col md:flex-row w-full max-w-xl gap-4">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              className="rounded-full w-full border border-green-400 py-2 px-4 text-black"
            />
            <div className="relative w-full">
              <input
                ref={passwordref}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                type="password"
                className="rounded-full w-full border border-green-400 py-2 px-4 text-black"
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} src="/icons/eye.png" alt="eye" width={22} />
              </span>
            </div>
          </div>

          <button
            className="flex items-center gap-2 bg-green-500 hover:bg-green-800 border-2 border-green-900 rounded-full px-6 py-2 text-white font-semibold"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              style={{ width: "30px", height: "30px" }}
              
            ></lord-icon>
            Save Password
          </button>
        </div>

        {/* Passwords Table */}
        <div className="overflow-x-auto">
          <h2 className="font-bold text-2xl pb-4">Your Passwords</h2>
          {passwordarray.length === 0 ? (
            <div className="text-center text-gray-600">No passwords available.</div>
          ) : (
            <table className="table-auto w-full min-w-[600px] border-collapse text-sm md:text-base">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2 px-3 text-left">Site</th>
                  <th className="py-2 px-3 text-left">Username</th>
                  <th className="py-2 px-3 text-left">Password</th>
                  <th className="py-2 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-50">
                {passwordarray.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    {/* Site */}
                    <td className="py-2 px-3">
                      <div className="flex justify-between items-center">
                        <a href={item.site} target="_blank" rel="noreferrer" className="truncate">
                          {item.site}
                        </a>
                        <div onClick={() => copyText(item.site)} className="cursor-pointer ml-2">
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            className="w-4 h-4"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>

                    {/* Username */}
                    <td className="py-2 px-3">
                      <div className="flex justify-between items-center">
                        <span>{item.username}</span>
                        <div onClick={() => copyText(item.username)} className="cursor-pointer ml-2">
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            className="w-4 h-4"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>

                    {/* Password */}
                    <td className="py-2 px-3">
                      <div className="flex justify-between items-center">
                        <span>{item.password}</span>
                        <div onClick={() => copyText(item.password)} className="cursor-pointer ml-2">
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            className="w-4 h-4"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-2 px-3 text-center">
                      <div className="flex justify-center gap-4">
                        <span onClick={() => edit(item.id)} className="cursor-pointer">
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "24px", height: "24px" }}
                          ></lord-icon>
                        </span>
                        <span onClick={() => deletePassword(item.id)} className="cursor-pointer">
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "24px", height: "24px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Manager;
