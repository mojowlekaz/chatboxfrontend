"use client";
import React, { useState, useEffect } from "react";
import ChatPage from "./ChatPage";

const Register = () => {
  const [matricNo, setMatricNo] = useState("");
  const [foundMember, setFoundMember] = useState("");
  const [image, setImage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("uploadedImage") || null;
    }
    return null;
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        localStorage.setItem("uploadedImage", imageData);
        setImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMatricNo = (event) => {
    setMatricNo(event.target.value);
  };

  const membersData = {
    members: [
      {
        matricNo: 222830,
        name: "Anointing",
        img: "/An.png",
      },
      {
        matricNo: 222839,
        name: "Kweku",
        img: "/kweku.png",
      },
      {
        matricNo: 222824,
        name: "Aj",
        img: "/Aj.png",
      },
      {
        matricNo: 231229,
        name: "Jewel",
        img: "/seun.png",
      },
      {
        matricNo: 231201,
        name: "Jomiloju",
      },
    ],
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const member = membersData.members.find(
      (member) => member.matricNo === parseInt(matricNo, 10)
    );

    if (member) {
      localStorage.setItem("registeredMember", JSON.stringify(member));
      setFoundMember(member);
    } else {
      // Handle case when matric number is not found
      setFoundMember(null);
    }
  };

  return (
    <>
      {foundMember?.name ? (
        <ChatPage image={foundMember?.img} name={foundMember?.name} />
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col px-2 items-center w-full h-[300px] gap-20 rounded-[20px] bg-white">
            <h1
              style={{ color: "#28a5ff" }}
              className="font-bold text-[20px] uppercase"
            >
              Register
            </h1>
            <div className="flex flex-col  items-center h-screen gap-3">
              <label className="font-bold text-[15px] leading-3">
                Matric No:
              </label>
              <input
                style={{
                  border: "1px solid #28a5ff",
                }}
                className="w-[250px] h-[35px] focus:border-none focus:outline-none border-none bg-transparent rounded-[5px]"
                type="text"
                value={matricNo}
                onChange={handleMatricNo}
                placeholder="Enter your matric Number"
              />

              <button
                className="w-full h-[50px]"
                style={{ background: "#28a5ff" }}
                type="submit"
              >
                Submit
              </button>

              {foundMember && (
                <>
                  <div>
                    <p style={{ color: "green" }}>Name: {foundMember.name}</p>
                    {foundMember.img && (
                      <img
                        src={foundMember.img}
                        alt={foundMember.name}
                        className="rounded-full w-[50px] h-[50px]"
                      />
                    )}
                  </div>
                </>
              )}
              {foundMember === null ? (
                <p style={{ color: "red" }}>Matric number not found</p>
              ) : (
                // <p style={{ color: "green" }}>Matric number found</p>
                ""
              )}
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Register;
