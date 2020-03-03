
export const theme = (opacity = 1) => {

    const primary = `rgba(52, 56, 144, ${opacity})`;
    const secondary = `rgba(129, 241, 178, ${opacity})`;
    const text = `rgba(66, 66, 66, ${opacity})`;
    const info = `rgba(43, 166, 255, ${opacity})`;
    const danger = `rgba(205, 92, 92, ${opacity})`;
    const success = `rgba(106, 186, 31, ${opacity})`;
    const dark = `rgba(0, 0, 0, ${opacity})`;
    const light = `rgba(255, 255, 255, ${opacity})`;

    return {
        primary,
        secondary,
        text,
        info,
        danger,
        success,
        dark,
        light
    }
}