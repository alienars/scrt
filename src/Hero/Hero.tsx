import { useEffect, useState } from "react";
import Modals from "../Modals/Modals";
import Aes from "crypto-js/aes";
import Base64 from "crypto-js/enc-base64";
import Pbkdf2 from "crypto-js/pbkdf2";
import Utf8 from "crypto-js/enc-utf8";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const [passBtnEl, setPassBtnEl] = useState<HTMLElement | null>(null);
  const [keyEl, setKeyEl] = useState<HTMLInputElement | null>(null);
  const [submitBtnEl, setSubmitBtnEl] = useState<HTMLElement | null>(null);
  const [otvBtnEl, setOtvBtnEl] = useState<HTMLElement | null>(null);
  const [onetimeModalEl, setOnetimeModalEl] = useState<HTMLElement | null>(null);
  const [urlLengthPanelEl, setUrlLengthPanelEl] = useState<HTMLElement | null>(null);
  const [urlLengthPanelBtnEl, setUrlLengthPanelBtnEl] = useState<HTMLElement | null>(null);
  const [errorTitleEl, setErrorTitleEl] = useState<HTMLElement | null>(null);
  const [errorDescEl, setErrorDescEl] = useState<HTMLElement | null>(null);
  const [errorModalEl, setErrorModalEl] = useState<HTMLElement | null>(null);
  const [textEl, setTextEl] = useState<HTMLInputElement | null>(null);
  const [loadingSvgEl, setLoadingSvgEl] = useState<HTMLElement | null>(null);
  const [saveSvgEl, setSaveSvgEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPassBtnEl(document.getElementById("pass_btn"));
    setKeyEl(document.getElementById("key") as any);
    setSubmitBtnEl(document.getElementById("submit_btn"));
    setOtvBtnEl(document.getElementById("otv_btn"));
    setOnetimeModalEl(document.getElementById("onetime_modal"));
    setUrlLengthPanelEl(document.getElementById("url_length_panel"));
    setUrlLengthPanelBtnEl(document.getElementById("urll_btn"));
    setErrorTitleEl(document.getElementById("error_title"));
    setErrorDescEl(document.getElementById("error_desc"));
    setErrorModalEl(document.getElementById("error_modal"));
    setTextEl(document.getElementById("text") as any);
    setLoadingSvgEl(document.getElementById("loading_svg"));
    setSaveSvgEl(document.getElementById("save_svg"));

    if (url.includes("?")) {
      let questchari = url.indexOf("?");
      if (url.substr(questchari, 3) == "?u=") {
        setStatus("getPass");
        setMyCUrl(url.slice(questchari + 3, url.length));
      }
    }
  }, []);

  type Status = "getMessage" | "showUrl" | "getPass" | "showMessage";
  type CopyText = "Copy" | "Copied";
  const [responseUrl, setResponseUrl] = useState("");
  const [responseText, setResponseText] = useState("");
  const [status, setStatus] = useState<Status>("getMessage");
  const [copyText, setCopyText] = useState<CopyText>("Copy");
  const [myCUrl, setMyCUrl] = useState("");

  const [showPassInput, setShowPassInput] = useState("");
  const handleShowPassInput = (event: any) => {
    setShowPassInput(event.target.value);
  };

  const [curlOption, setCurlOption] = useState("8");
  const handleCurlOption = (event: any) => {
    setCurlOption(event.target.value);
  };

  const myUrl = "/";
  // let apiUrl = "api/index.php";
  let apiUrl = "../../../sec/api/index.php";
  let url = window.location.href;
  let testDuration: number = 100;

  function pass_btn() {
    if (passBtnEl && passBtnEl.getAttribute("value") == "true") {
      passBtnEl.style.color = "#1f2937";
      keyEl.disabled = true;
      keyEl.style.opacity = "0";
      keyEl.value = "";
      submitBtnEl.style.width = "100px";
      passBtnEl.setAttribute("value", "false");
    } else {
      passBtnEl.style.color = "#be2edd";
      keyEl.disabled = false;
      keyEl.style.opacity = "1";
      submitBtnEl.style.width = "40px";
      passBtnEl.setAttribute("value", "true");
    }
  }
  function otv_btn() {
    if (otvBtnEl.getAttribute("value") == "true") {
      otvBtnEl.style.color = "#1f2937";
      otvBtnEl.setAttribute("value", "false");
      onetimeModalEl.style.display = "block";
    } else {
      otvBtnEl.style.color = "#f39c12";
      otvBtnEl.setAttribute("value", "true");
      onetimeModalEl.style.display = "none";
    }
  }
  function urllength_panel_of() {
    if (urlLengthPanelEl && urlLengthPanelEl.style.marginTop == "-59px") {
      urlLengthPanelEl.style.opacity = "1";
      urlLengthPanelEl.style.marginTop = "0.5rem";
    } else {
      urlLengthPanelEl.style.opacity = "0";
      urlLengthPanelEl.style.marginTop = "-59px";
    }
  }
  function urll_btn() {
    if (urlLengthPanelBtnEl && urlLengthPanelBtnEl.style.color == "rgb(58, 129, 245)") {
      urlLengthPanelBtnEl.style.color = "#1f2937";
    } else {
      urlLengthPanelBtnEl.style.color = "#3a81f5";
    }
  }
  function urlLength() {
    urllength_panel_of();
    urll_btn();
  }
  function show_error(title: string, desc = " ") {
    errorTitleEl.innerText = title;
    errorDescEl.innerText = desc;
    errorModalEl.style.display = "block";

    const get_secret_unlock_svg_el = document.getElementById("get_secret_unlock_svg");
    const get_secret_loading_svg_el = document.getElementById("get_secret_loading_svg");
    saveSvgEl.style.display = "block";
    loadingSvgEl.style.display = "none";
    if (status == "getPass") {
      get_secret_unlock_svg_el.style.display = "inline";
      get_secret_loading_svg_el.style.display = "none";
    }
  }
  function textarea_check(tx:string) {
    let text = tx;
    if (text.indexOf("\n") == -1) {
    } else {
      text = text.replace(/&#10;/g, "\n");
    }
    let length = text.length;
    if (length <= 3000 && textEl.getAttribute("maxlength") == "3000") {
      return text;
    } else {
      text = text.substr(0, 3000);
      return text;
    }
  }
  function randStr(length: number) {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  function mythen(response: any) {
    if (typeof response.data == "object") {
      if (response.data.status == "success") {
        setTimeout(t, testDuration);
        function t() {
          setStatus("showUrl");
          setResponseUrl(response.data.url);
        }
      } else {
        const save_svg_el = document.getElementById("save_svg");
        const loading_svg_el = document.getElementById("loading_svg");
        save_svg_el.style.display = "block";
        loading_svg_el.style.display = "none";
        textEl.disabled = false;
        if (passBtnEl.getAttribute("value") == "true") {
          keyEl.disabled = false;
        }
        show_error(response.data.text);
      }
    } else {
      show_error("Response Error", "The response received from the server is invalid");
    }
  }

  const schemaWriteEntity = yup.object().shape({
    oneText: yup
      .string()
      .max(3000, "The minimum number of characters allowed for the text is 3000")
      .required("Enter Your Secret"),
    onePass: yup.string().max(3000, "The minimum number of characters allowed for the password is 150"),
  });

  const {
    register: registerWriteEntity,
    handleSubmit: handleWriteEntity,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaWriteEntity) });

  function writeEntity(types: string, password: boolean) {
    if (errors.oneText === undefined) {
    } else {
      show_error(errors.oneText?.message);
    }

    const onHandleWriteEntity = (values: any) => {
      runWriteEntity(values.oneText, values.onePass);
    };

    handleWriteEntity(onHandleWriteEntity)();

    function runWriteEntity(text: string, key: string) {
      if (key === undefined) {
        key = "";
      } else {
      }
      const save_svg_el = document.getElementById("save_svg");
      const loading_svg_el = document.getElementById("loading_svg");
      save_svg_el.style.display = "none";
      loading_svg_el.style.display = "block";
      if (text == null || text == "" || text == undefined) {
        show_error("Enter Your Secret!");
      } else {
        if (passBtnEl.getAttribute("value") == "true" && (key == null || key == "" || key == undefined)) {
          show_error("Enter Your Password!");
        } else {
          if (types == "secret") {
            if (password == false) {
            }
            if (password == true) {
              text = textarea_check(text);
              let oneTime = otvBtnEl.getAttribute("value");
              let encryptedText = Aes.encrypt(text, key).toString();
              let curl: any;
              switch (curlOption) {
                case "8":
                  curl = randStr(8);
                  break;
                case "16":
                  curl = randStr(16);
                  break;
                case "24":
                  curl = randStr(24);
                  break;
                case "32":
                  curl = randStr(32);
                  break;
              }
              let keyHash: any = Pbkdf2(key, curl, {
                keySize: 256 / 32,
              });
              keyHash = keyHash.toString(Base64);

              axios
                .post(apiUrl, {
                  action: "save_secret",
                  oneTime: oneTime,
                  key: keyHash,
                  text: encryptedText,
                  curl: curl,
                })
                .then(function (response) {
                  mythen(response);
                })
                .catch(function () {
                  show_error("Request Error", "Server connection problem !");
                });
            }
          }
        }
      }
    }
  }

  function url_clipboard_secret() {
    navigator.clipboard.writeText(responseText);
    setCopyText("Copied");
    setTimeout(copyTextToDefault, 500);
  }

  function delete_text() {
    axios
      .post(apiUrl, {
        action: "delete_secret",
        g_curl: myCUrl,
      })
      .then(function () {})
      .catch(function () {
        show_error("Request Error", "Server connection problem !");
      });

    let deleteText = document.getElementById("delete_text");
    if (!deleteText.classList.contains("delete")) {
      deleteText.classList.add("delete");
      setTimeout(() => deleteText.classList.remove("delete"), 3200);
    }

    const copy_btn1_el = document.getElementById("copy_btn1");
    copy_btn1_el.style.display = "none";
    const secret_input_el = document.getElementById("secret_input");
    secret_input_el.style.background = "#5C86FF";
    secret_input_el.style.width = "2px";
    secret_input_el.style.overflow = "hidden";
    secret_input_el.style.borderRadius = "2px";
    secret_input_el.style.border = "0";
    secret_input_el.style.height = "24px";
    secret_input_el.style.transform = "translateY(15px) scale(0.5)";
    setTimeout(tttt, 300);
    function tttt() {
      secret_input_el.style.opacity = "0";
      setTimeout(ttttt, 2800);
      function ttttt() {
        window.location.replace(myUrl);
      }
    }
  }
  function show_secret(response: any) {
    if (typeof response.data == "object") {
      if (response.data.status == "success") {
        setTimeout(ttt, testDuration);
        function ttt() {
          setStatus("showMessage");
          let encryptedText: any = Aes.decrypt(response.data.text, showPassInput);
          encryptedText = encryptedText.toString(Utf8);
          setResponseText(encryptedText);
        }
      } else {
        show_error(response.data.text);
      }
    } else {
      show_error("Response Error", "The response received from the server is invalid");
    }
  }
  function get_secret() {
    const get_secret_unlock_svg_el = document.getElementById("get_secret_unlock_svg");
    const get_secret_loading_svg_el = document.getElementById("get_secret_loading_svg");

    get_secret_unlock_svg_el.style.display = "none";
    get_secret_loading_svg_el.style.display = "inline";

    setTimeout(runGet_secret, testDuration);

    function runGet_secret() {
      let keyHash: any = Pbkdf2(showPassInput, myCUrl, {
        keySize: 256 / 32,
      });

      keyHash = keyHash.toString(Base64);

      axios
        .post(apiUrl, {
          action: "get_secret",
          g_curl: myCUrl,
          key: keyHash,
        })
        .then(function (response) {
          show_secret(response);
        })
        .catch(function () {
          show_error("Request Error", "Server connection problem !");
        });
    }
  }
  function copyTextToDefault() {
    setCopyText("Copy");
  }
  function url_clipboard() {
    navigator.clipboard.writeText(responseUrl);
    setCopyText("Copied");
    setTimeout(copyTextToDefault, 500);
  }
  function new_secret() {
    window.location.replace(myUrl);
  }

  function submit_btn_click() {
    writeEntity("secret", true);
  }

  return (
    <>
      {status == "getMessage" && (
        <div id="m_header">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Share your secret{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              securely.
            </span>
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Share your secret or text with a link
          </p>
        </div>
      )}
      <div id="m_dynamic" className="container">
        {status == "getMessage" && (
          <section id="m_dynamic_secret">
            <textarea
              id="text"
              rows={4}
              maxLength={3000}
              className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 max-w-3xl"
              placeholder="Your secret ..."
              {...registerWriteEntity("oneText")}
            ></textarea>
            <div
              className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700 max-w-3xl m-auto border border-gray-300 dark:border-gray-600"
              style={{ zIndex: "10", position: "relative" }}
            >
              <button
                type="button"
                id="pass_btn"
                className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                style={{ color: "#1f2937" }}
                onClick={pass_btn}
                value="false"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                id="otv_btn"
                className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                style={{ color: "#f39c12" }}
                onClick={otv_btn}
                value="true"
              >
                <svg
                  className="w-6 h-6"
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
              </button>
              <button
                type="button"
                id="urll_btn"
                className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                style={{ color: "#3a81f5" }}
                onClick={urlLength}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  ></path>
                </svg>
              </button>
              <input
                id="key"
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                style={{ opacity: "0", transition: "0.5s !important" }}
                placeholder="Password..."
                {...registerWriteEntity("onePass")}
                disabled
              />
              <div
                id="submit_btn"
                className="inline-flex justify-center p-2 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600 dark:bg-gray-800"
                style={{ transition: "0.5s !important", width: "100px" }}
                onClick={submit_btn_click}
              >
                <svg
                  id="save_svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>

                <svg
                  id="loading_svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "none" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
              </div>
            </div>

            <div
              id="url_length_panel"
              className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700 max-w-3xl m-auto border border-gray-300 dark:border-gray-600"
              style={{ marginTop: "-59px" }}
            >
              <label
                id="url_length_label"
                htmlFor="minmax-range"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Url Length :{" "}
              </label>

              <div className="radios">
                <input
                  id="radio-1"
                  name="urlradio"
                  type="radio"
                  value="8"
                  checked={curlOption === "8"}
                  onChange={handleCurlOption}
                />
                <label htmlFor="radio-1" className="radio-label">
                  8
                </label>
              </div>

              <div className="radios">
                <input
                  id="radio-2"
                  name="urlradio"
                  type="radio"
                  value="16"
                  checked={curlOption === "16"}
                  onChange={handleCurlOption}
                />
                <label htmlFor="radio-2" className="radio-label">
                  16
                </label>
              </div>

              <div className="radios">
                <input
                  id="radio-3"
                  name="urlradio"
                  type="radio"
                  value="24"
                  checked={curlOption === "24"}
                  onChange={handleCurlOption}
                />
                <label htmlFor="radio-3" className="radio-label">
                  24
                </label>
              </div>

              <div className="radios">
                <input
                  id="radio-4"
                  name="urlradio"
                  type="radio"
                  value="32"
                  checked={curlOption === "32"}
                  onChange={handleCurlOption}
                />
                <label htmlFor="radio-4" className="radio-label">
                  32
                </label>
              </div>
            </div>
          </section>
        )}
        {status == "showMessage" && (
          <section id="m_show_secret">
            <button
              id="copy_btn1"
              className="px-5 py-2 text-lg font-semibold rounded bg-[#050708] hover:bg-[#050708]/90 mb-3"
              onClick={url_clipboard_secret}
              style={{ color: "white" }}
            >
              <svg
                className="mr-2 -ml-1 w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "inline" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              {copyText}
            </button>
            <textarea
              id="secret_input"
              rows={4}
              maxLength={3000}
              className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
              style={{ transition: "0.5s" }}
              disabled
            >
              {responseText}
            </textarea>
            <button id="delete_text" className="button" style={{ margin: "auto" }} onClick={delete_text}>
              <div className="trash">
                <div className="top">
                  <div className="paper"></div>
                </div>
                <div className="box"></div>
                <div className="check">
                  <svg viewBox="0 0 8 6">
                    <polyline points="1 3.4 2.71428571 5 7 1"></polyline>
                  </svg>
                </div>
              </div>
              <span>Delete Item</span>
            </button>
          </section>
        )}
        {status == "getPass" && (
          <section id="m_get_secret" className="py-6 dark:bg-gray-800 dark:text-gray-50">
            <div className="container mx-auto flex flex-col items-center justify-center space-y-8 md:p-10 md:px-24 xl:px-48">
              <div
                id="alert-border-5"
                className="flex p-4 bg-gray-100 border-t-4 border-gray-500 dark:bg-gray-700 max-w-3x"
                role="alert"
                style={{ borderRadius: "10px" }}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Do not Forget that you can only view the text once, then the text will be deleted!
                </div>
              </div>
              <div className="relative mb-0 w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    ></path>
                  </svg>
                </div>
                <input
                  type="password"
                  id="pass_input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter password ..."
                  value={showPassInput}
                  onChange={handleShowPassInput}
                />
              </div>
              <div className="space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
                <button
                  id="get_secret"
                  className="px-5 py-2 text-lg font-semibold rounded bg-[#4285F4] hover:bg-[#4285F4]/90"
                  onClick={get_secret}
                  style={{ paddingBottom: "11px" }}
                >
                  <svg
                    id="get_secret_unlock_svg"
                    className="mr-2 -ml-1 w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "inline" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <svg
                    id="get_secret_loading_svg"
                    className="mr-2 -ml-1 w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "none" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                  Open
                </button>
              </div>
            </div>
          </section>
        )}
        {status == "showUrl" && (
          <section id="m_dynamic_url" className="py-6 dark:bg-gray-800 dark:text-gray-50">
            <div className="container mx-auto flex flex-col items-center justify-center space-y-8 md:p-10 md:px-24 xl:px-48">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div id="qrcode">
                      <QRCodeSVG value={responseUrl} />
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="flip-card-logo"></div>
                  </div>
                </div>
              </div>
              <div className="relative mb-0 w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="url_input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={responseUrl}
                  disabled
                  readOnly
                />
              </div>
              <div className="space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
                <button
                  id="copy_btn"
                  className="px-5 py-2 text-lg font-semibold rounded bg-[#050708] hover:bg-[#050708]/90"
                  onClick={url_clipboard}
                >
                  <svg
                    className="mr-2 -ml-1 w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "inline" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {copyText}
                </button>
                <button
                  id="new_secret"
                  className="px-5 py-2 text-lg font-semibold rounded bg-[#4285F4] hover:bg-[#4285F4]/90"
                  onClick={new_secret}
                >
                  <svg
                    className="mr-2 -ml-1 w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "inline" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                  New
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
      <Modals />
    </>
  );
};

export default Hero;
