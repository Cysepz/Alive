package com.cysepz.alive.controller;

import org.springframework.web.bind.annotation.RestController;

import com.cysepz.alive.exception.InvalidTokenException;
import com.cysepz.alive.model.dto.request.RegisterRequest;
import com.cysepz.alive.model.dto.response.ApiResponse;
import com.cysepz.alive.model.dto.response.AuthResult;
import com.cysepz.alive.model.dto.response.CheckInResponse;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
            CookieUtils.deleteCookie(response, "registerToken");
        }

        return new ApiResponse<>(200, "註冊並登入成功", result);
    }

    @PutMapping("/check-in")
    public ApiResponse<?> checkIn(@CookieValue(value = "token", required = true) String token,
            HttpServletResponse response) {
        Long userId = jwtUtils.getUserIdFromToken(token);
        boolean checkedIn = userService.checkIn(userId);
        CheckInResponse checkInResponse = userService.getRecord(userId);
        return new ApiResponse<>(200, "打卡成功", checkInResponse);
    }

}
