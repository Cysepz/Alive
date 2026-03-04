package com.cysepz.alive.model.dto.response;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.cysepz.alive.model.entity.User;

import java.util.Collection;
import java.util.Map;

// 務必確認實作了 OAuth2User 介面
public record CustomOAuth2UserResponse(
        OAuth2User oAuth2User,
        boolean isNewUser,
        User.AuthProvider provider,
        Long userId,
        String username,
        User.Role role) implements OAuth2User {

    @Override
    public Map<String, Object> getAttributes() {
        return oAuth2User.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return oAuth2User.getAuthorities();
    }

    public String getProvider() {
        return provider.toString();
    }

    public boolean isNewUser() {
        return isNewUser;
    }

    @Override
    // 通常回傳 Google 的唯一識別碼 (sub)，即 providerId
    public String getName() {
        return oAuth2User.getName();
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public User.Role getRole() {
        return role;
    }
}