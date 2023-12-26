import React, { useEffect, useState } from "react";

interface ModalsProps {}

const Modals: React.FC<ModalsProps> = () => {
  const [onetime_modal_el, setOneTimeModalEl] = useState<HTMLElement | null>(null);
  const [error_modal_el, setErrorModalEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setOneTimeModalEl(document.getElementById("onetime_modal") as any);
    setErrorModalEl(document.getElementById("error_modal") as any);
  }, []);

//   function onetime_modal_show() {
//     onetime_modal_el.style.display = "block";
//   }

  function onetime_modal_hide() {
    onetime_modal_el.style.display = "none";
  }

  function error_modal_hide() {
    error_modal_el.style.display = "none";
  }

  return (
    <div id="m_modals">
      <div
        id="onetime_modal"
        x-show="isOpen"
        x-transition:enter="transition duration-300 ease-out"
        x-transition:enter-start="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        x-transition:enter-end="translate-y-0 opacity-100 sm:scale-100"
        x-transition:leave="transition duration-150 ease-in"
        x-transition:leave-start="translate-y-0 opacity-100 sm:scale-100"
        x-transition:leave-end="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        className="fixed inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        style={{ display: "none", transition: "1s", overflow: "hidden", zIndex: "99" }}
      >
        <div
          className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
          style={{ paddingBottom: "11rem" }}
        >
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div className="flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                  ></path>
                </svg>
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                  One Time View
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This is beta version. Please avoid long-term storage of sensitive data.
                </p>
              </div>
            </div>
            <div className="mt-5 sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:items-center " style={{ margin: "auto" }}>
                <button
                  className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  onClick={onetime_modal_hide}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="error_modal"
        x-show="isOpen"
        x-transition:enter="transition duration-300 ease-out"
        x-transition:enter-start="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        x-transition:enter-end="translate-y-0 opacity-100 sm:scale-100"
        x-transition:leave="transition duration-150 ease-in"
        x-transition:leave-start="translate-y-0 opacity-100 sm:scale-100"
        x-transition:leave-end="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        className="fixed inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        style={{ display: "none", transition: "1s", overflow: "hidden", zIndex: "99" }}
      >
        <div
          className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
          style={{ paddingBottom: "11rem" }}
        >
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div className="flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
              </div>
              <div className="mt-2 text-center">
                <h3
                  id="error_title"
                  className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                  // id="modal-title"
                ></h3>
                <p id="error_desc" className="mt-2 text-sm text-gray-500 dark:text-gray-400"></p>
              </div>
            </div>
            <div className="mt-5 sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:items-center " style={{ margin: "auto" }}>
                <button
                  className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  onClick={error_modal_hide}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modals;
