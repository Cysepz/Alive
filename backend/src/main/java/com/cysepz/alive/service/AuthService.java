package com.cysepz.alive.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cysepz.alive.model.entity.User;
import com.cysepz.alive.repository.UserRepository;
import com.cysepz.alive.util.JwtUtils;

@Service
public class AuthService {
    private JwtUtils jwtUtils;
    private UserService userService;
    private UserRepository userRepository;

    public AuthService(JwtUtils jwtUtils, UserService userService, UserRepository userRepository) {
        this.jwtUtils = jwtUtils;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public sealed interface AuthResult permits LoginSuccess, RegisterPending {
    }

    public record LoginSuccess(String token, String account, String username, LocalDate birthday,
            Integer bitmap, String role) implements AuthResult {
    }

    public record RegisterPending(String token, String suggestedUsername) implements AuthResult {
    }

    public AuthResult isUserExist(String providerStr, String providerId, String username, String useremail) {
        User.AuthProvider authProvider = User.AuthProvider.valueOf(providerStr.toUpperCase());

        return userRepository.findByProviderAndProviderId(authProvider, providerId)
                .<AuthResult>map(user -> {
                    String token = jwtUtils.generateToken(user.getUserId());
                    return new LoginSuccess(
                            token,
                            user.getAccount(),
                            user.getUsername(),
                            user.getBirthday(),
                            user.getMonthlyBitmap(),
                            user.getRole().toString());
                })
                .orElseGet(() -> {
                    String regToken = jwtUtils.generateRegisterToken(providerStr, providerId, username, useremail);
                    return new RegisterPending(regToken, username); // 新建一個小 record
                });
    }

}
