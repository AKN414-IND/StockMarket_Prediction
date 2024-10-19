import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext"; 
import { getDatabase, ref, get, set } from "firebase/database";
import firebase from "firebase/compat/app";

export default function Header() {
  const { logout, auth } = useAuth(); 
  const [state, setState] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showWhatsAppContact, setShowWhatsAppContact] = useState(false);
  const [currentWhatsAppNumber, setCurrentWhatsAppNumber] = useState("");

  useEffect(() => {
    const getPremiumStatus = async () => {
      const db = getDatabase();
      const uid = auth.currentUser?.uid;
      const premiumRef = ref(db, "users/" + uid + "/premium");
      if (uid) {
        const data = await get(premiumRef);
        setIsPremium(data.exists());
      }
    };

    getPremiumStatus();
  }, []);


  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  const handleNav = () => {
    window.location.href =
      "";
  };

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <a href="javascript:void(0)">
        <img src="/logo.png" width={120} height={50} alt="Float UI logo" />
      </a>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <header className="flex-grow">
        <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
          <Brand />
        </div>
        <nav
          className={`pb-5 md:text-sm ${
            state
              ? "absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:bg-transparent"
              : ""
          }`}
        >
          <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
            <Brand />
            <div
              className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
                state ? "block" : "hidden"
              }`}
            >
              <ul className="flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                <li>
                  <button
                    onClick={logout} // Logout button
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 duration-150 rounded-full md:inline-flex"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <section className="relative flex-grow">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
              Stock Market Prediction
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatibus qui aut ducimus vero voluptas autem quia assumenda
              sed laborum voluptates similique in dicta beatae aliquid quos,
              vitae facilis labore magnam?
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="justify-center items-center gap-x-3 sm:flex"
            >
              <button
                className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-lg sm:mt-0 sm:w-auto"
                onClick={handleNav}
              >
                Get started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div
          className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 100, 100, 0.5) 0%, rgba(255, 200, 100, 0.5) 50%, rgba(100, 200, 255, 0.5) 100%)",
          }}
        ></div>
      </section>
    </div>
  );
}
