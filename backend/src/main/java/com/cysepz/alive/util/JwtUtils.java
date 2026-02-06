package com.cysepz.alive.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;

@Component
public class JwtUtils {
    private final long expirationTime;
    private final Key key;

    public JwtUtils(
            @Value("${jwt.secret}") String secretKey,
            @Value("${jwt.expirationTime}") long expirationTime) {
        if (secretKey == null || secretKey.length() < 32) {
            throw new IllegalArgumentException("JWT Secret Key 必須至少 32 個字元！目前長度: "
                    + (secretKey == null ? 0 : secretKey.length()));
        }
        this.expirationTime = expirationTime;
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * 生成 Token
     * 
     * @param userId 使用者 ID，通常放進 Subject
     */
    public String generateToken(Long userId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .setSubject(String.valueOf(userId)) // 放置使用者識別資訊
                .setIssuedAt(now) // 簽發時間
                .setExpiration(expiryDate) // 過期時間
                .signWith(key, SignatureAlgorithm.HS256) // 簽名算法
                .compact();
    }

    public String generateRegisterToken(String provider, String providerId, String username, String useremail) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("provider", provider);
        claims.put("providerId", providerId);
        claims.put("username", username);
        claims.put("useremail", useremail);
        claims.put("purpose", "REGISTRATION");

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 300000);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject("pending_user") // 主體設為待定用戶
                .setIssuedAt(now)
                .setExpiration(expiryDate) // 5 分鐘有效
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 從 Token 中獲取 User ID
     */
    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    /**
     * 從 Token 中獲取 Provider ID, Provider username, Provider usermail
     */
    public Claims parseRegisterToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // Security check: validate the token purpose
            if (!"REGISTRATION".equals(claims.get("purpose"))) {
                throw new RuntimeException("Invalid token purpose");
            }
            return claims;
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("註冊連結已過期，請重新從第三方登入");
        } catch (Exception e) {
            throw new RuntimeException("無效的註冊憑證");
        }
    }

    /**
     * 驗證 Token 是否有效
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // 這裡可以根據不同異常印出：過期、簽名錯誤、格式錯誤等
            return false;
        }
    }
}
