import { useEffect } from 'react';

function ScrollWithin({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="overflow-y-scroll sm:overflow-y-auto h-[500px]  sm:pb-0 sm:h-full">
      <style>{`
        /* Hide scrollbar for WebKit browsers */
        ::-webkit-scrollbar {
          width: 0;
        }

        /* Optional: Style the track and handle if needed */
        ::-webkit-scrollbar-track {
          background-color: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background-color: transparent;
        }
      `}</style>
      {children}
    </div>
  );
}

export default ScrollWithin;
