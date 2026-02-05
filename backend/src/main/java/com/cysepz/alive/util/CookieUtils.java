package com.cysepz.alive.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtils {
    // 定義統一的預設效期與路徑
    private static final int DEFAULT_MAX_AGE = 24 * 60 * 60;
    private static final String DEFAULT_PATH = "/";

    /**
     * 建立一個可供前端讀取的 Cookie (HttpOnly = false)
     */
    public static void addClientCookie(HttpServletResponse response, String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath(DEFAULT_PATH);
        cookie.setHttpOnly(false); // 允許前端 JS 讀取
        cookie.setMaxAge(DEFAULT_MAX_AGE);
        response.addCookie(cookie);
    }

    /**
     * 刪除指定 Cookie
     */
    public static void deleteCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setPath(DEFAULT_PATH);
        cookie.setMaxAge(0); // 立即失效
        response.addCookie(cookie);
    }
}
