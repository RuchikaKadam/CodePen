import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../assets';
import { AnimatePresence, motion } from 'framer-motion';
import { MdCheck, MdEdit } from 'react-icons/md';
import UserProfileDetails from './UserProfileDetails';

const Header = ({ title, setTitle, isTitle, setIsTitle, user, saveProgramme, handleAiAssist }) => (
  <header className="w-full flex items-center justify-between px-12 py-4">
    <div className="flex items-center justify-center gap-6">
      <Link to={"/home/projects"}>
        <img src={Logo} alt="logo" className="w-32 h-auto object-contain" />
      </Link>
      <div className="flex flex-col items-start justify-start">
        <div className="flex items-center justify-center gap-3">
          <AnimatePresence>
            {isTitle ? (
              <>
                <motion.input
                  className="px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
                  key={"TitleInput"}
                  type="text"
                  placeholder="enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </>) : (<>
                <motion.p
                  className="px-3 py-2 text-white text-lg"
                  key={"titleLabel"}
                >{title}</motion.p>
              </>)}
          </AnimatePresence>

          <AnimatePresence>
            {isTitle ? (
              <>
                <motion.div
                  key={"MdCheck"}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer"
                  onClick={() => setIsTitle(false)}
                >
                  <MdCheck className="text-2xl text-emerald-500" />
                </motion.div>
              </>) : (<>
                <motion.div
                  key={"MdEdit"}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer"
                  onClick={() => setIsTitle(true)}
                >
                  <MdEdit className="text-2xl text-primaryText" />
                </motion.div>
              </>)}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center px-3 -mt-2 gap-2">
          <p className="text-sm text-primaryText">{
            user?.displayName ? user?.displayName : `${user?.email.split("@")[0]}`
          }</p>
          <motion.p
            whileTap={{ scale: 0.9 }}
            className="bg-emerald-500 rounded-sm px-2 py-[1px] text-[10px] text-primary font-semibold cursor-pointer"
          >+ Follow</motion.p>
        </div>
      </div>
    </div>

    {user && (
      <div className="flex items-center justify-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="px-6 py-4 bg-primaryText cursor-pointer text-primary text-base font-semibold rounded-md"
          onClick={saveProgramme}
        >Save</motion.button>
        <UserProfileDetails />
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="px-6 py-4 bg-primaryText cursor-pointer text-primary text-base font-semibold rounded-md"
          onClick={handleAiAssist}
        >Get AI Assistance</motion.button>
      </div>
    )}
  </header>
);

export default Header;
