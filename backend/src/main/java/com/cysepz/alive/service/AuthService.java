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

    public record LoginResult(String account, String username, LocalDate birthday, Integer bitmap, String role,
            String token) {
    }

    public LoginResult isUserExist(String providerStr, String providerId) {
        User.AuthProvider authProvider = User.AuthProvider.valueOf(providerStr.toUpperCase());
        return userRepository.findByProviderAndProviderId(authProvider, providerId)
                .map(user -> {
                    String account = user.getAccount();
                    String username = user.getUsername();
                    LocalDate birthday = user.getBirthday();
                    int bitmap = user.getMonthlyBitmap();
                    String role = user.getRole().toString();
                    String token = jwtUtils.generateToken(user.getUserId());
                    return new LoginResult(account, username, birthday, bitmap, role, token);
                })
                .orElse(null);
    }

}
