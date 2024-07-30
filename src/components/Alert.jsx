import React from 'react';
import { motion } from 'framer-motion';
import { slideUp } from '../animations';

const Alert = ({ status, alertMsg }) => {
  let alertStyle = '';
  let shadowStyle = '';

  switch (status) {
    case 'Success':
      alertStyle = 'bg-emerald-400';
      shadowStyle = 'shadow-emerald-500';
      break;
    case 'Warning':
      alertStyle = 'bg-yellow-400';
      shadowStyle = 'shadow-yellow-500';
      break;
    case 'Danger':
      alertStyle = 'bg-red-400';
      shadowStyle = 'shadow-red-500';
      break;
    default:
      alertStyle = 'bg-gray-400'; // default style
      shadowStyle = 'shadow-gray-500'; // default shadow
  }

  return (
    <motion.div {...slideUp} className="fixed top-20 right-10 z-10">
      <div className={`px-4 py-2 rounded-md ${alertStyle} ${shadowStyle}`}>
        <p className="text-lg text-primary">{alertMsg}</p>
      </div>
    </motion.div>
  );
};

export default Alert;
