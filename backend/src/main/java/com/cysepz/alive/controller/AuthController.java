package com.cysepz.alive.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cysepz.alive.model.dto.request.RegisterRequest;
import com.cysepz.alive.model.dto.response.ApiResponse;
import com.cysepz.alive.model.dto.response.LoginResponse;
import com.cysepz.alive.service.AuthService;
import com.cysepz.alive.service.AuthService.AuthResult;
import com.cysepz.alive.service.AuthService.LoginSuccess;
import com.cysepz.alive.service.AuthService.RegisterPending;
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
                LoginResponse responseData = new LoginResponse(
                        login.account(),
                        login.username(),
                        login.birthday(),
                        login.bitmap(),
                        login.role());
                yield new ApiResponse<>(200, "登入成功", responseData);
            }
            case RegisterPending pending -> {
                CookieUtils.addSecureCookie(response, "registerToken", pending.token());
                System.out.println("===== register token parse result =====");
                System.out.println(jwtUtils.parseRegisterToken(pending.token()));
                yield new ApiResponse<>(202, "請前往註冊", Map.of("suggestedUsername", pending.suggestedUsername()));
            }
        };
        // if (result != null) {
        // LoginResponse responseData = new LoginResponse(
        // result.account(),
        // result.username(),
        // result.birthday(),
        // result.bitmap(),
        // result.role());
        // CookieUtils.addSecureCookie(response, "token", result.token());
        // return new ApiResponse<>(200, "登入成功", responseData);
        // } else {
        // authService.
        // CookieUtils.addSecureCookie(response, "registerToken", result.token());
        // return new ApiResponse<>(202, "請前往註冊",
        // Map.of("provider", provider, "providerId", providerId, "username",
        // username));
        // }
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
