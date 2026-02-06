package com.cysepz.alive.service.component;

import org.springframework.stereotype.Component;

import com.cysepz.alive.model.dto.response.AuthResult;
import com.cysepz.alive.model.dto.response.AuthResult.*;
import com.cysepz.alive.model.entity.User;
import com.cysepz.alive.util.JwtUtils;

@Component
public class AuthResultFactory {

    private final JwtUtils jwtUtils;

    public AuthResultFactory(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    public AuthResult toLoginSuccess(User user) {
        String token = jwtUtils.generateToken(user.getUserId());
        return new LoginSuccess(
                token,
                user.getAccount(),
                user.getUsername(),
                user.getBirthday(),
                user.getMonthlyBitmap(),
                user.getRole().toString());
    }

    public AuthResult toRegisterPending(String provider, String providerId, String username, String useremail) {
        String regToken = jwtUtils.generateRegisterToken(provider, providerId, username, useremail);
        return new RegisterPending(regToken, username);
    }
}
