package com.cysepz.alive.controller;

import org.springframework.web.bind.annotation.RestController;

import com.cysepz.alive.model.dto.response.ApiResponse;
import com.cysepz.alive.model.dto.response.LoginResponse;
import com.cysepz.alive.service.AuthService;
import com.cysepz.alive.service.AuthService.LoginResult;
import com.cysepz.alive.service.UserService;
import com.cysepz.alive.util.CookieUtils;
import com.cysepz.alive.util.JwtUtils;

import jakarta.servlet.http.HttpServletResponse;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
        LoginResult result = authService.isUserExist(provider, providerId);
        if (result != null) {
            LoginResponse responseData = new LoginResponse(
                    result.account(),
                    result.username(),
                    result.birthday(),
                    result.bitmap(),
                    result.role());
            CookieUtils.addSecureCookie(response, "token", result.token());
            return new ApiResponse<>(200, "登入成功", responseData);
        } else {
            return new ApiResponse<>(202, "請前往註冊", Map.of("provider", provider, "providerId", providerId));
        }
    }

    // @PostMapping("/register")
    // public ApiResponse<?> register(@RequestBody RegisterRequest request,
    // HttpServletResponse response) {
    // User newUser = userService.createUser(request);
    // String token = jwtUtils.generateToken(newUser.getUserId());
    // CookieUtils.addClientCookie(response, "access_token", token);
    // return new ApiResponse<>(200, "註冊並登入成功", token);
    // }

}
