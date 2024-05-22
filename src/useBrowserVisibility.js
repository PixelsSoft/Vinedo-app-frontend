// useBrowserFocus.js
import { useEffect, useState } from 'react';

const useBrowserFocus = () => {
    const [isFocused, setIsFocused] = useState( true );

    useEffect( () => {
        const handleFocus = () => {
            setIsFocused( true );
        };

        const handleBlur = () => {
            setIsFocused( false );
        };

        window.addEventListener( 'focus', handleFocus );
        window.addEventListener( 'blur', handleBlur );

        return () => {
            window.removeEventListener( 'focus', handleFocus );
            window.removeEventListener( 'blur', handleBlur );
        };
    }, [] );

    return isFocused;
};

export default useBrowserFocus;
