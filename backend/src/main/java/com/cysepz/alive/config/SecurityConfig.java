package com.cysepz.alive.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.cysepz.alive.model.dto.response.CustomOAuth2UserResponse;
import com.cysepz.alive.service.CustomOAuth2UserService;
import com.cysepz.alive.util.CookieUtils;
import com.cysepz.alive.util.JwtUtils;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Value("${app.frontend.success-url}")
    private String successUrl;

    @Value("${app.frontend.register-url}")
    private String registerUrl;

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;
    private JwtUtils jwtUtils;

    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService, JwtUtils jwtUtils) {
        this.customOAuth2UserService = customOAuth2UserService;
        this.jwtUtils = jwtUtils;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(org.springframework.security.config.Customizer.withDefaults())
                .csrf(csrf -> csrf
                        // 1. H2 必須禁用 CSRF
                        .ignoringRequestMatchers("/h2-console/**")
                        .disable())
                .headers(headers -> headers
                        // 2. 允許 H2 使用 Frame
                        .frameOptions(frame -> frame.sameOrigin()))
                .authorizeHttpRequests(auth -> auth
                        // 3. 允許公開訪問的路徑
                        .requestMatchers("/api/**", "/", "/login/**", "/error", "/h2-console/**").permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(oauth2 -> oauth2
                        // 掛載了查詢 user 是否存在的 Service
                        .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
                        .successHandler((request, response, authentication) -> {
                            // 取得 Google 回傳的使用者資訊
                            CustomOAuth2UserResponse customUser = (CustomOAuth2UserResponse) authentication
                                    .getPrincipal();

                            if (customUser.isNewUser()) {
                                // 是新朋友：設定 Cookie 並 redir 前端去註冊頁
                                String regToken = jwtUtils.generateRegisterToken(
                                        customUser.getProvider(),
                                        customUser.getName(), // providerId (sub)
                                        customUser.getUsername(),
                                        customUser.getAttribute("email"));
                                CookieUtils.addSecureCookie(response, "registerToken", regToken);
                                response.sendRedirect(registerUrl);
                            } else {
                                String token = jwtUtils.generateToken(customUser.getUserId());
                                CookieUtils.addSecureCookie(response, "token", token);
                                response.sendRedirect(successUrl);
                            }
                        }));
        return http.build();
    }
}
