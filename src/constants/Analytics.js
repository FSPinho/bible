export const Events = {
    /**
     * Screen navigation
     * */
    OpenHome: 'bi_navigate_to_home',
    OpenDaily: 'bi_navigate_to_daily',
    OpenBible: 'bi_navigate_to_bible',
    OpenBibleBook: 'bi_navigate_to_bible_book',

    /**
     * Auth and sessions
     * */
    SessionStart: 'bi_session_start',
    SessionEnd: 'bi_session_end',
    SignIn: 'bi_sign_in',
    SignOut: 'bi_sign_out',

    /**
     * Content
     * */
    ThemeEnableLight: 'bi_theme_enable_light',
    ThemeEnableDark: 'bi_theme_enable_dark',
    GeneralBannerLoaded: 'bi_general_banner_loaded',
    GeneralBannerError: 'bi_general_banner_error',
    GeneralBannerClicked: 'bi_general_banner_clicked',
    PlayChapter: 'bi_play_chapter',
    PlayDaily: 'bi_play_daily',
}