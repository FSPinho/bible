import DefaultTheme from "./DefaultTheme";
import Palette from "./Palette";

export default {
    ...DefaultTheme,
    palette: {
        ...DefaultTheme.palette,
        
        backgroundPrimary: Palette.Gray800,
        backgroundPrimaryText: Palette.Gray800Text,
        backgroundPrimaryTextPrimary: Palette.Gray800TextPrimary,
        backgroundPrimaryTextSecondary: Palette.Gray800TextSecondary,
        backgroundPrimaryTextDisabled: Palette.Gray800TextDisabled,

        backgroundSecondary: Palette.Gray900,
        backgroundSecondaryText: Palette.Gray900Text,
        backgroundSecondaryTextPrimary: Palette.Gray900TextPrimary,
        backgroundSecondaryTextSecondary: Palette.Gray900TextSecondary,
        backgroundSecondaryTextDisabled: Palette.Gray900TextDisabled,

        statusBar: Palette.Gray900,
        statusBarStyle: 'light-content',
    },
}