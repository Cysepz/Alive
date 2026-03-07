package com.cysepz.alive.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.cysepz.alive.exception.BusinessException;
import com.cysepz.alive.model.dto.response.AuthResult;
import com.cysepz.alive.model.dto.response.CheckInResponse;
import com.cysepz.alive.model.entity.User;
import com.cysepz.alive.repository.UserRepository;
import com.cysepz.alive.service.component.AuthResultFactory;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    private UserRepository userRepository;
    private AuthResultFactory authResultFactory;

    public UserService(UserRepository userRepository, AuthResultFactory authResultFactory) {
        this.userRepository = userRepository;
        this.authResultFactory = authResultFactory;
    }

    /* 註冊用戶 */
    public AuthResult createUser(String providerStr, String providerId, String account, String username,
            LocalDate birthday, String address, User.LivingSituation situation, String email, String phone) {
        User.AuthProvider provider = User.AuthProvider.valueOf(providerStr.toUpperCase());

        // 檢查此帳號是否已經註冊過
        if (userRepository.findByProviderAndProviderId(provider, providerId).isPresent()) {
            throw new BusinessException("此社交帳號已綁定過，請直接登入");
        }

        // 檢查所有 Unique 欄位
        if (userRepository.existsByAccount(account)) {
            throw new BusinessException("帳號已存在，請換一個");
        }
        if (userRepository.existsByEmail(email)) {
            throw new BusinessException("此信箱已經註冊過，請換一個");
        }

        User newUser = new User();
        newUser.setProvider(provider);
        newUser.setProviderId(providerId);
        newUser.setAccount(account);
        newUser.setUsername(username);
        newUser.setBirthday(birthday);
        newUser.setAddress(address);
        newUser.setSituation(situation);
        newUser.setEmail(email);
        newUser.setPhone(phone);
        newUser.setRole(User.Role.MEMBER);
        newUser.setMonthlyBitmap(0);

        User savedUser = userRepository.save(newUser);
        System.out.println(savedUser);
        return authResultFactory.toLoginSuccess(savedUser);
    }

    // 確認今日是否已經打卡
    // FIXME：留著給前端用（檢查 cookie 以決定顯示畫面）
    // public boolean hasCheckedInToday(int bitmap) {
    // int day = LocalDate.now().getDayOfMonth();
    // return (bitmap & (1 << (day - 1))) != 0;
    // }

    // 今日打卡
    @Transactional
    public boolean checkIn(Long userId) {
        int day = LocalDate.now().getDayOfMonth();
        int originalBitmap = userRepository.findMonthlyBitmapByUserId(userId);
        int newBitmap = originalBitmap | (1 << (day - 1));
        userRepository.checkInByUserId(userId, newBitmap);

        return true;
    }

    public CheckInResponse getRecord(Long userId) {
        int bitmap = userRepository.findMonthlyBitmapByUserId(userId);
        LocalDateTime lastCheckInTime = userRepository.findLastCheckInTimeByUserId(userId);
        CheckInResponse result = new CheckInResponse();
        result.setLastCheckInTime(lastCheckInTime);
        result.setMonthlyBitmap(bitmap);
        return result;
    }

    // public LocalDateTime getLastCheckInTime(Long userId) {
    // return userRepository.findLastCheckInTimeByUserId(userId);
    // }
}
