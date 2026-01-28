package com.cysepz.alive.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 允許所有路徑
                .allowedOrigins(allowedOrigins) // 動態讀取環境變數
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 允許的 HTTP 方法
                .allowedHeaders("*") // 允許所有 Header
                .allowCredentials(true); // 允許傳送 Cookie
    }
}