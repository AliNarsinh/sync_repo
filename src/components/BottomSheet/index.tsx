import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BottomSheet = ({ controls, isBottomSheetOpen, closeBottomSheet, children }: any) => {
  return (
    <>
      {isBottomSheetOpen && (
        <AnimatePresence>
          <motion.div
            className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 transition duration-75 fixed bottom-0 left-0 right-0 bg-white h-5/6"
            drag="y"
            initial="hidden"
            variants={{
              visible: { y: 104 },
              hidden: { y: '70%' },
              closed: { y: '100%' },
            }}
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            animate={controls}
            onDragEnd={(event, info) => {
              if (info.velocity.y > 200) {
                closeBottomSheet();
              } else {
                controls.start({ y: 0 });
              }
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 40, duration: 0.5 }}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
            exit={{ y: '100%' }}
            style={{
              width: '100%',
              height: 'auto',
              border: '1px solid #E0E0E0',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.06), 0px 2px 13px rgba(0, 0, 0, 0.12)',
              borderRadius: '6px',
              zIndex: 1000,
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default BottomSheet;
