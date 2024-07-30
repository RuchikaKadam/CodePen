import React, { useEffect, useState, Component } from "react";
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import SplitPane  from "split-pane-react";
import "split-pane-react/esm/themes/default.css"; // Ensure to import the CSS for split-pane-react
import CodeMirror from '@uiw/react-codemirror';
// import { basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
// import { html as htmlLang } from '@codemirror/lang-html';
// import { css as cssLang } from '@codemirror/lang-css';
import { Link } from "react-router-dom";
import { Logo } from '../assets';
import { motion, AnimatePresence } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { UserProfileDetails, Alert} from ".";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import 'split-pane-react/esm/themes/default.css';
import { getAiResponse } from './aiHelper';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="bg-slate-600 text-white">Error occurred in this section.</div>;
    }
    return this.props.children;
  }
}

function NewProject() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [isTitle, setIsTitle] = useState(false);
  const [title, setTitle] = useState("Untitled");
  const user = useSelector((state) => state.user?.user);
  const [alert, setAlert] = useState(false);
  const [sizes, setSizes] = useState([50, 50]);
  const [topPaneSizes, setTopPaneSizes] = useState([33, 33, 34]);
  const [aiResponse, setAiResponse] = useState('✨🧑‍💻✨');


  const handleAiAssist = async () => {
    const prompt = `Help with coding a project:
    HTML: ${html}
    CSS: ${css}
    JS: ${js}`;
    const response = await getAiResponse(prompt);
    setAiResponse(response);
  };

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const updateOutput = () => {
    const combinedOutput = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
    setOutput(combinedOutput);
  };

  const saveProgramme = async () => {
    const id = `${Date.now()}`;
    const _doc = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,
    };
    await setDoc(doc(db, "Projects", id), _doc)
      .then((res) => {
        setAlert(true);
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  return (
    <ErrorBoundary>
      <div>
        <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
          {/* alert section */}
          <AnimatePresence>
            {alert && <Alert status={"Success"} alertMsg={"Project saved successfully!"} />}
          </AnimatePresence>

          {/* heading section */}
          <header className="w-full flex items-center justify-between px-12 py-4">
            <div className="flex items-center justify-center gap-6">
              <Link to={"/home/projects"}>
                <img src={Logo} alt="logo" className="w-32 h-auto object-contain" />
              </Link>
              <div className="flex flex-col items-start justify-start">
                {/* title */}
                <div className="flex items-center justify-center gap-3 ">
                  <AnimatePresence>
                    {isTitle ? (
                      <>
                        <motion.input className="px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
                          key={"TitleInput"} type="text" placeholder="enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                      </>) : (<>
                        <motion.p className="px-3 py-2 text-white text-lg" key={"titleLabel"}>{title}</motion.p>
                      </>)}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isTitle ? (
                      <>
                        <motion.div key={"MdCheck"} whileTap={{ scale: 0.9 }} className="cursor-pointer" onClick={() => setIsTitle(false)}>
                          <MdCheck className="text-2xl text-emerald-500" />
                        </motion.div>
                      </>) : (<>
                        <motion.div key={"MdEdit"} whileTap={{ scale: 0.9 }} className="cursor-pointer" onClick={() => setIsTitle(true)}>
                          <MdEdit className="text-2xl text-primaryText" />
                        </motion.div>
                      </>)}
                  </AnimatePresence>
                </div>
                {/* follow */}
                <div className="flex items-center justify-center px-3 -mt-2 gap-2">
                  <p className="text-sm text-primaryText">{
                    user?.displayName ? user?.displayName : `${user?.email.split("@")[0]}`
                  }</p>
                  <motion.p whileTap={{ scale: 0.9 }} className="bg-emerald-500 rounded-sm px-2 py-[1px] text-[10px] text-primary font-semibold cursor-pointer">+ Follow</motion.p>
                </div>
              </div>
            </div>

            {/* user-section */}
            {user && (
              <div className="flex items-center justify-center gap-4">
                <motion.button whileTap={{ scale: 0.9 }} className="px-6 py-4 bg-primaryText cursor-pointer text-primary text-base font-semibold rounded-md"
                  onClick={saveProgramme}
                >Save</motion.button>
                {/* userDetails */}
                <UserProfileDetails />
{/* ai help button */}
                <motion.button whileTap={{ scale: 0.9 }} className="px-6 py-4 bg-primaryText cursor-pointer text-primary text-base font-semibold rounded-md"
                  onClick={handleAiAssist}
                >Get AI Assistance</motion.button>
              </div>
            )}
          </header>
          <div className="mb-4 p-2 bg-slate-500 text-black rounded-md">
        {aiResponse}
      </div>

          {/* react split/ coding section */}
          <div className="flex-1 flex bg-slate-200">
      {/* horizontal - top coding section + bottom result section */}
      <SplitPane
        split="horizontal"
        sizes={sizes}
        onChange={setSizes}
      >
        {/* top */}
        <SplitPane
          split="vertical"
          sizes={topPaneSizes}
          onChange={setTopPaneSizes}
        >
          {/* html */}
          <div className="w-full h-full flex flex-col items-start justify-start">
            <div className="w-full flex items-center justify-between">
              <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                <FaHtml5 className="text-xl text-red-500" />
                <p className="text-primaryText font-semibold">HTML</p>
              </div>
              {/* icons */}
              <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                <FcSettings className="text-xl text-primaryText" />
                <FaChevronDown className="text-xl text-primaryText" />
              </div>
            </div>
            <div className="w-full px-2">
              <CodeMirror
                value={html}
                height="600px"
                theme={"dark"}
                extensions={[javascript({ jsx: true })]}
                onChange={(value, viewUpdate) => { setHtml(value); }}
              />
            </div>
          </div>
          {/* css */}
          <div className="w-full h-full flex flex-col items-start justify-start">
            <div className="w-full flex items-center justify-between">
              <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                <FaCss3 className="text-xl text-sky-500" />
                <p className="text-primaryText font-semibold">CSS</p>
              </div>
              {/* icons */}
              <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                <FcSettings className="text-xl text-primaryText" />
                <FaChevronDown className="text-xl text-primaryText" />
              </div>
            </div>
            <div className="w-full px-2">
              <CodeMirror
                value={css}
                height="600px"
                theme={"dark"}
                extensions={[javascript({ jsx: true })]}
                onChange={(value, viewUpdate) => { setCss(value); }}
              />
            </div>
          </div>
          {/* js */}
          <div className="w-full h-full flex flex-col items-start justify-start">
            <div className="w-full flex items-center justify-between">
              <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                <FaJs className="text-xl text-yellow-500" />
                <p className="text-primaryText font-semibold">JS</p>
              </div>
              {/* icons */}
              <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                <FcSettings className="text-xl text-primaryText" />
                <FaChevronDown className="text-xl text-primaryText" />
              </div>
            </div>
            <div className="w-full px-2">
              <CodeMirror
                value={js}
                height="600px"
                theme={"dark"}
                extensions={[javascript({ jsx: true })]}
                onChange={(value, viewUpdate) => { setJs(value); }}
              />
            </div>
          </div>
        </SplitPane>
        
        {/* bottom */}
        <div className="bg-white w-full h-full mt-14 mx-2">
          <iframe
            srcDoc={output}
            title="Output"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
            className="w-full h-full"
          />
        </div>
      </SplitPane>
    </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default NewProject;