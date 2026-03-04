package com.cysepz.alive.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.cysepz.alive.model.dto.response.CustomOAuth2UserResponse;
import com.cysepz.alive.model.entity.User;
import com.cysepz.alive.repository.UserRepository;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // 1. 取得 provider 名稱 (例如 "google" 或 "facebook")
        String providerStr = userRequest.getClientRegistration().getRegistrationId();
        User.AuthProvider provider = User.AuthProvider.valueOf(providerStr.toUpperCase());

        // 2. 讓 Spring 自動去 Google 換取 UserInfo
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String providerId = oAuth2User.getName(); // Google 'sub' ID
        String username = oAuth2User.getAttribute("name");

        // 3. 檢查資料庫是否存在該用戶
        Optional<User> userOpt = userRepository.findByProviderAndProviderId(provider, providerId);
        boolean isNewUser = userOpt.isEmpty();
        Long userId = null;
        User.Role role = null;

        if (!isNewUser) {
            // 如果不是新用戶，把資料庫裡的關鍵資訊拿出來
            User user = userOpt.get();
            userId = user.getUserId();
            username = user.getUsername();
            role = user.getRole(); // 假設你的 User 實體有 role 欄位
        } else {
            System.out.printf("====== %s Access Token: %s ======\n", providerStr, providerId);
            System.out.println("Attributes: " + oAuth2User.getAttributes());
        }

        OAuth2User result = new CustomOAuth2UserResponse(oAuth2User, isNewUser, provider, userId, username, role);
        return result;
    }
}
