package com.cysepz.alive.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cysepz.alive.exception.InvalidTokenException;
import com.cysepz.alive.model.dto.request.RegisterRequest;
import com.cysepz.alive.model.dto.response.ApiResponse;
import com.cysepz.alive.model.dto.response.AuthResult;
import com.cysepz.alive.model.dto.response.AuthResult.*;
import com.cysepz.alive.service.AuthService;
import com.cysepz.alive.service.UserService;
import com.cysepz.alive.util.CookieUtils;
import com.cysepz.alive.util.JwtUtils;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private JwtUtils jwtUtils;
    private AuthService authService;
    private UserService userService;

    public AuthController(JwtUtils jwtUtils, AuthService authService, UserService userService) {
        this.jwtUtils = jwtUtils;
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping("/callback/{provider}")
    public ApiResponse<?> handleCallback(@PathVariable String provider, @RequestParam String code,
            HttpServletResponse response) {
        // TODO: replace with actual OAuth exchange logic
        // String providerId = authService.processOAuthLogin(provider, code);
        String providerId = "line_id_123";
        String username = "新來的測試員";
        String useremail = "test@gmail.com";
        AuthResult result = authService.isUserExist(provider, providerId, username, useremail);

        return switch (result) {
            case LoginSuccess login -> {
                CookieUtils.addSecureCookie(response, "token", login.token());
                yield new ApiResponse<>(200, "登入成功", login);
            }
            case RegisterPending pending -> {
                CookieUtils.addSecureCookie(response, "registerToken", pending.token());
                yield new ApiResponse<>(202, "請前往註冊", pending);
            }
        };
    }

    @PostMapping("/register")
    public ApiResponse<?> register(@RequestHeader(value = "Authorization", required = true) String registerToken,
            @RequestBody RegisterRequest request,
            HttpServletResponse response) {
        var claims = jwtUtils.parseRegisterToken(registerToken);
        String provider = claims.get("provider", String.class);
        String providerId = claims.get("providerId", String.class);
        String username = claims.get("username", String.class);
        String useremail = claims.get("useremail", String.class);
        if (provider == null || providerId == null || useremail == null) {
            throw new InvalidTokenException("Register token is missing required identity claims.");
        }

        AuthResult result = userService.createUser(
                provider,
                providerId,
                request.getAccount(),
                request.getUsername(),
                request.getBirthday(),
                request.getAddress(),
                request.getSituation(),
                useremail,
                request.getPhone());

        if (result instanceof AuthResult.LoginSuccess login) {
            CookieUtils.addSecureCookie(response, "token", login.token());
            // 註冊成功後，清除舊的註冊用 Cookie
            CookieUtils.deleteCookie(response, "registerToken");
        }

        return new ApiResponse<>(200, "註冊並登入成功", result);
    }

}
