import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./../styles/start.module.css";

const Start: NextPage = () => {
  // Current style watcher for page background
  const [currentStyle, setCurrentStyle] = useState(
    "background-color: #fff;background: linear-gradient(239.26deg, #ddeeed 63.17%, #fdf1e0 94.92%);"
  );

  // Message watcher to watch for message changes
  const [msg, setMsg] = useState([""]);
  // Message watcher to watch for message changes (If message is sent by user or system)
  const [from, setFrom] = useState([""]);
  // Count of number of messages shown to user.
  const [count, setCount] = useState(0);

  // UseEffect to check if a user is logged in.
  // Runs only once
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      window.location.href = "/";
    }
  }, []);

  // UseEffect to check if localstorage has msg and from values. ,if not, get them from server and set to msg, from
  useEffect(() => {
    const msgl = localStorage.getItem("msg");
    const froml = localStorage.getItem("from");
    if (msgl && froml) {
      // parse msg and from
      setMsg(JSON.parse(msgl));
      setFrom(JSON.parse(froml));
    } else {
      (async () => {
        const res = await fetch("/api/initialMsg");
        const data = await res.json();
        setMsg(await data.msg);
        setFrom(await data.from);
        localStorage.setItem("msg", JSON.stringify(await data.msg));
        localStorage.setItem("from", JSON.stringify(await data.from));
      })();
    }
  }, []);

  // Use effect to filter out, insert and display messages , every time msg & from changes
  useEffect(() => {
    const element = document.getElementById("msg_holder") as HTMLElement;

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    let temp = count;
    for (let index: number = temp - 1; index < msg.length; index++) {
      const msg_holder = document.getElementById("msg_holder") as HTMLElement;
      const msg_div = document.createElement("div");
      msg_div.className = styles.msg;
      msg_div.className =
        "bg-white rounded-xl w-fit max-w-[50%] h-fit p-4 " +
        (from[index] === "sys" ? "" : "ml-auto");
      msg_div.innerHTML = msg[index];
      msg_holder.appendChild(msg_div);
      setCount(count + 1);
    }

    // Scroll to bottom of chat window
    const chat_window = document.getElementById("msg_holder") as HTMLElement;
    chat_window.scrollTop = chat_window.scrollHeight;
  }, [msg]);

  // Use effect to check if style is changed, if so, set current style to new style
  useEffect(() => {
    const style = localStorage.getItem("style");
    if (style) {
      setCurrentStyle(style);
    }
  }, []);

  // Useeffect to update styles
  useEffect(() => {
    const doc = document.getElementById("doc") as HTMLDivElement;
    doc.style.cssText = currentStyle;
  }, [currentStyle]);

  const newStyle = () => {
    (async () => {
      const res = await fetch("/api/styles");
      const data = await res.json();
      setCurrentStyle(await data.style);
      localStorage.setItem("style", await data.style);
    })();
  };

  const lol = () => {
    // add lol to msg, set msg to new msg
    const newMsg = [...msg];
    newMsg.push("lol");
    setMsg(newMsg);
    // add lol to from, set from to new from
    const newFrom = [...from];
    newFrom.push("usr");
    setFrom(newFrom);

    localStorage.setItem("msg", JSON.stringify(newMsg));
    localStorage.setItem("from", JSON.stringify(newFrom));
  };
  return (
    <div id="doc" className={"  h-[100vh] w-[100vw]"}>
      <Head>
        <title>Wysa - Home </title>
        <meta
          name="description"
          content="Wysa Mini Project by Surya Teja Reddy "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-[15%] flex flex-col justify-center px-6">
        <button
          onClick={newStyle}
          className="w-fit ml-auto "
          aria-label="reload color theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path d="M24 22h-24l2.876-4.793 1.738.99-1.082 1.803h16.936l-2.036-3.393-2.613 1.518.82-6.549 6.096 2.531-2.573 1.495 3.838 6.398zm-19.326-5.83l6.096-2.531-2.537-1.474 3.767-6.278 2.824 4.682 1.738-.991-4.562-7.578-5.496 9.161-2.65-1.54.82 6.549z" />
          </svg>
        </button>
      </div>
      <div className="w-full h-[80%] flex justify-center px-6  ">
        <div className="w-[50%] h-full justify-between flex flex-col">
          <div
            id="msg_holder"
            className={
              styles.scroll +
              " w-full h-[85%] overflow-y-scroll flex flex-col gap-4"
            }
          ></div>
          <div id="input_section" className="w-full  h-[10%] ">
            <div className="w-[90%]  h-full flex gap-4 justify-evenly mb-2">
              <input
                id="test_ip"
                className="w-full h-full outline-none px-4  py-1 rounded-lg mb-2"
                type="text"
                placeholder="Type a message"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    const newMsg = [...msg];
                    newMsg.push(e.target.value);
                    setMsg(newMsg);
                    const newFrom = [...from];
                    newFrom.push("usr");
                    setFrom(newFrom);
                    localStorage.setItem("msg", JSON.stringify(newMsg));
                    localStorage.setItem("from", JSON.stringify(newFrom));
                    e.target.value = "";
                  }
                }}
              />
              <div
                className=""
                role={"button"}
                onClick={() => {
                  let e = document.getElementById(
                    "test_ip"
                  ) as HTMLInputElement;
                  const newMsg = [...msg];
                  newMsg.push(e.value);
                  setMsg(newMsg);
                  const newFrom = [...from];
                  newFrom.push("usr");
                  setFrom(newFrom);
                  localStorage.setItem("msg", JSON.stringify(newMsg));
                  localStorage.setItem("from", JSON.stringify(newFrom));
                  e.value = "";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
