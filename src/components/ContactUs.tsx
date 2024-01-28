"use client";
import React, { useEffect, useState } from "react";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";
import Button from "./Button";
import InputBorderBottom from "./InputBorderBottom";
import { ToastContainer, toast } from "react-toastify";
import { fetchApi } from "@/utility_functions/fetchApi";
import "react-toastify/dist/ReactToastify.css";
import Alert from "./Alert";
const ContactUs = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [show, setShow] = useState<boolean> (false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  send form data to server
    fetchApi("/api/contact/saveContact", "POST", { email, name, message }).then(
      (data) => {
        if (data.status === true) {
          setShow(true)
          setEmail("");
          setName("");
          setMessage("");
        } else {
          alert('some thing went wrong')
        }
      }
    );
  };
  return (
    <>
      <div className="flex flex-col items-center mt-10" id="contact">
        <h1 className="uppercase text-4xl font-bold mb-4">Get in touch</h1>
        <div className="container mx-auto  flex flex-col md:flex-row ">
          <div className="md:w-1/2 p-8 bg-white rounded  mb-4 md:mb-0 ">
            <p className="mb-4 flex items-center">
              <span className="me-2 bg-black p-4 text-white">
                <MdEmail />
              </span>{" "}
              <span>
                <Link href="mailto:abdulmalikshakir2001@gmail.com">
                  <span className="underline">
                    abdulmalikshakir2001@gmail.com
                  </span>
                </Link>
              </span>
            </p>
            <p className="mb-4 flex items-center">
              <span className="me-2 bg-black p-4 text-white">
                <MdLocationPin />
              </span>{" "}
              <span>Dalazak road peshawar KPK,Pakistan</span>
            </p>
            <p className="mb-4 flex items-center">
              <span className="me-2 bg-black p-4 text-white">
                <IoLogoWhatsapp />
              </span>{" "}
              <span>
                <Link href="https://wa.me/03089429794">
                  <span className="underline">0308 94 29 794</span>
                </Link>
              </span>
            </p>
          </div>

          <div className="md:w-1/2 rounded ">
            <form
              action="#"
              method="post"
              className="bg-black px-12 py-10  w-full  md:w-11/12 lg:w-3/4 "
              onSubmit={handleSubmit}
            >
              <div className="mb-6">
                <InputBorderBottom
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  input={name}
                  setInput={setName}
                />
              </div>
              <div className="mb-6">
                <InputBorderBottom
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  input={email}
                  setInput={setEmail}
                />
              </div>
              <div className="mb-6">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message*"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border-x-0 border-t-0 bg-transparent border-b-2  border-gray-500 focus:border-sky-400 focus:border-x-0   text-white  focus:ring-0"
                ></textarea>
              </div>
              <div className="">
                <Button text="Send"  />
                <div className="mt-4">
                 {

                show && <Alert message="your information has been sent" type="success"   show={show} setShow={setShow} />
                }
                  
                </div>
                
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
