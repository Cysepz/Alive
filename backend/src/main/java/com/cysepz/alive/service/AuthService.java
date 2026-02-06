package com.cysepz.alive.service;

import org.springframework.stereotype.Service;

import com.cysepz.alive.model.dto.response.AuthResult;
import com.cysepz.alive.model.entity.User;
import com.cysepz.alive.repository.UserRepository;
import com.cysepz.alive.service.component.AuthResultFactory;

@Service
public class AuthService {
    private UserRepository userRepository;
    private AuthResultFactory authResultFactory;

    public AuthService(UserRepository userRepository, AuthResultFactory authResultFactory) {
        this.userRepository = userRepository;
        this.authResultFactory = authResultFactory;
    }

    public AuthResult isUserExist(String providerStr, String providerId, String username, String useremail) {
        User.AuthProvider authProvider = User.AuthProvider.valueOf(providerStr.toUpperCase());

        return userRepository.findByProviderAndProviderId(authProvider, providerId)
                .map(authResultFactory::toLoginSuccess)
                .orElseGet(() -> authResultFactory.toRegisterPending(providerStr, providerId, username, useremail));
    }

}
