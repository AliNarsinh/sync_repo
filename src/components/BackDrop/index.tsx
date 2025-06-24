import React from 'react';

interface BlurBackdropProps {
  isBottomSheetOpen: boolean;
  handleClick?: () => void;
}

const BlurBackdrop: React.FC<BlurBackdropProps> = ({ isBottomSheetOpen, handleClick }) => {
  if (!isBottomSheetOpen) {
    return null;
  }
  return (
    isBottomSheetOpen && (
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-300 opacity-50`}
        style={{ backdropFilter: `blur(5px)` }}
        onClick={handleClick}
      ></div>
    )
  );
};

export default BlurBackdrop;
