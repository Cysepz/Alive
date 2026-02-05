package com.cysepz.alive.controller;

import org.springframework.web.bind.annotation.RestController;

import com.cysepz.alive.model.dto.response.ApiResponse;
import com.cysepz.alive.service.UserService;
import com.cysepz.alive.util.CookieUtils;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/user") // controller 的共同 prefix
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/check-in")
    public ApiResponse<String> checkIn(/* @RequestHeader("Authorization") String authHeader, */
            HttpServletResponse response) {
        // TODO: extract userId from token
        // String token = authHeader.substring(7);
        // Long userId = jwtUtils.getUserIdFromToken(token);
        Long userId = (long) 1;

        int updatedBitmap = userService.checkIn(userId);
        System.out.println(updatedBitmap);

        CookieUtils.addClientCookie(response, "bitmap", String.valueOf(updatedBitmap));
        return new ApiResponse<>(200, "打卡成功", null);
    }
}
