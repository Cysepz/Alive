package com.cysepz.alive.controller;

import org.springframework.web.bind.annotation.RestController;

import com.cysepz.alive.exception.InvalidTokenException;
import com.cysepz.alive.model.dto.request.RegisterRequest;
import com.cysepz.alive.model.dto.response.ApiResponse;
import com.cysepz.alive.model.dto.response.AuthResult;
import com.cysepz.alive.service.UserService;
import com.cysepz.alive.util.CookieUtils;
import com.cysepz.alive.util.JwtUtils;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/user") // controller 的共同 prefix
public class UserController {
    private UserService userService;
    private JwtUtils jwtUtils;

    public UserController(JwtUtils jwtUtils, UserService userService) {
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ApiResponse<?> register(@RequestBody RegisterRequest request,
            @CookieValue(value = "registerToken") String registerToken,
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

    @PutMapping("/check-in")
    public ApiResponse<String> checkIn(@RequestHeader(value = "Authorization", required = false) String token,
            HttpServletResponse response) {
        Long userId = (token == null) ? (long) 1 : jwtUtils.getUserIdFromToken(token.replace("Bearer ", ""));
        int updatedBitmap = userService.checkIn(userId);
        System.out.println(updatedBitmap);

        CookieUtils.addClientCookie(response, "bitmap", String.valueOf(updatedBitmap));
        return new ApiResponse<>(200, "打卡成功", null);
    }
}
