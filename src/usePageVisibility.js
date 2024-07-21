import { useEffect } from "react";

const usePageVisibility = () => {
    // useEffect( () => {
    //     const handleVisibilityChange = () => {
    //         if ( document.hidden && /Mobi|Android/i.test( navigator.userAgent ) ) {
    //             document.body.classList.add( "background-hidden" );
    //         } else {
    //             document.body.classList.remove( "background-hidden" );
    //         }
    //     };

    //     document.addEventListener( "visibilitychange", handleVisibilityChange );

    //     // Cleanup event listener on unmount
    //     return () => {
    //         document.removeEventListener( "visibilitychange", handleVisibilityChange );
    //     };
    // }, [] );
};

export default usePageVisibility;
