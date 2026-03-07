package com.cysepz.alive.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletResponse;

@Component
public class CookieUtils {
    // 定義統一的預設效期與路徑
    private static final int DEFAULT_MAX_AGE = 24 * 60 * 60;
    private static final String DEFAULT_PATH = "/";

    private static boolean isProd;

    @Value("${app.is-prod}")
    public void setIsProd(boolean isProd) {
        CookieUtils.isProd = isProd;
    }

    /**
     * 建立一個安全的 HttpOnly Cookie (專門放 Token)
     * 在雲端環境必須設定 SameSite=None 且 Secure=true
     */
    public static void addSecureCookie(HttpServletResponse response, String name, String value) {
        ResponseCookie cookie = ResponseCookie.from(name, value)
                .path(DEFAULT_PATH)
                .httpOnly(true) // 防止前端 JS 存取 (XSS 防護)
                .secure(isProd)
                .sameSite(isProd ? "None" : "Lax") // 跨網域必須為 None，且 None 必須搭配 Secure=true
                .maxAge(DEFAULT_MAX_AGE)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    /**
     * 建立一個可供前端讀取的 Cookie (例如存放使用者名稱、偏好設定)
     */
    public static void addClientCookie(HttpServletResponse response, String name, String value) {
        ResponseCookie cookie = ResponseCookie.from(name, value)
                .path(DEFAULT_PATH)
                .httpOnly(false) // 允許前端 JS 讀取
                .secure(isProd)
                .sameSite(isProd ? "None" : "Lax")
                .maxAge(DEFAULT_MAX_AGE)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    /**
     * 刪除指定 Cookie
     */
    public static void deleteCookie(HttpServletResponse response, String name) {
        // 刪除 Cookie 時，SameSite 屬性最好也保持一致，否則部分瀏覽器可能刪除失敗
        ResponseCookie cookie = ResponseCookie.from(name, "")
                .path(DEFAULT_PATH)
                .maxAge(0) // 立即失效
                .httpOnly(true)
                .secure(isProd)
                .sameSite(isProd ? "None" : "Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}
