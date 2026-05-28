import { useCallback, useState } from "react";
import { useMapglContext } from './MapglContext.tsx';

const PINK_THEME_ID = '6ab1c10e-1101-4e58-9bc7-11ecd7d4e3e6';
const DARK_THEME_ID = '190d75e0-4747-4634-8721-7880566d0b8d';

function ButtonChangeTheme() {
    const { mapglInstance } = useMapglContext();
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const onClick = useCallback(() => {
        if (!mapglInstance) return;

        const newThemeId = isDarkTheme ? PINK_THEME_ID : DARK_THEME_ID;
        mapglInstance.setStyleById(newThemeId);
        setIsDarkTheme(!isDarkTheme);
    }, [mapglInstance, isDarkTheme]);

    return (
        <button onClick={onClick}>
            {isDarkTheme ? "Светлая тема" : "Темная тема"}
        </button>
    )
}

export default ButtonChangeTheme;