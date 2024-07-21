import { useEffect } from 'react';

const usePreventScreenshot = () => {
    useEffect( () => {
        const handleVisibilityChange = () => {
            if ( document.hidden ) {
                document.body.classList.add( 'background-hidden' );
            } else {
                document.body.classList.remove( 'background-hidden' );
            }
        };

        const handleScreenshot = () => {
            document.body.classList.add( 'no-screenshot' );
        };

        const removeScreenshotProtection = () => {
            document.body.classList.remove( 'no-screenshot' );
        };

        // document.addEventListener( 'visibilitychange', handleVisibilityChange );
        // window.addEventListener( 'blur', handleScreenshot );
        // window.addEventListener( 'focus', removeScreenshotProtection );
        document.addEventListener( 'contextmenu', ( event ) => event.preventDefault() );
        document.addEventListener( 'keydown', ( event ) => {
            if ( event.key === 'F12' || ( event.ctrlKey && event.shiftKey && event.key === 'I' ) ) {
                event.preventDefault();
            }
        } );

        return () => {
            document.removeEventListener( 'visibilitychange', handleVisibilityChange );
            window.removeEventListener( 'blur', handleScreenshot );
            window.removeEventListener( 'focus', removeScreenshotProtection );
            document.removeEventListener( 'contextmenu', ( event ) => event.preventDefault() );
            document.removeEventListener( 'keydown', ( event ) => {
                if ( event.key === 'F12' || ( event.ctrlKey && event.shiftKey && event.key === 'I' ) ) {
                    event.preventDefault();
                }
            } );
        };
    }, [] );
};

export default usePreventScreenshot;
