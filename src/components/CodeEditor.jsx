// CodeEditor.jsx
import React from 'react';
import { FaHtml5, FaCss3, FaJs, FaChevronDown } from 'react-icons/fa6';
import { FcSettings } from 'react-icons/fc';
import CodeMirror from '@uiw/react-codemirror';
import { motion } from 'framer-motion';

const CodeEditor = ({ language, icon, value, onChange }) => (
  <div className="w-full h-full flex flex-col items-start justify-start">
    <div className="w-full flex items-center justify-between">
      <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
        {icon === 'html' && <FaHtml5 className="text-xl text-red-500" />}
        {icon === 'css' && <FaCss3 className="text-xl text-sky-500" />}
        {icon === 'js' && <FaJs className="text-xl text-yellow-500" />}
        <p className="text-primaryText font-semibold">{language}</p>
      </div>
      <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
        <FcSettings className="text-xl text-primaryText" />
        <FaChevronDown className="text-xl text-primaryText" />
      </div>
    </div>
    <div className="w-full px-2">
      <CodeMirror
        value={value}
        height="600px"
        theme="dark"
        extensions={[javascript({ jsx: true })]}
        onChange={(value, viewUpdate) => onChange(value)}
      />
    </div>
  </div>
);

export default CodeEditor;
