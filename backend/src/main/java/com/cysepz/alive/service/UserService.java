package com.cysepz.alive.service;

import java.time.LocalDate;
import org.springframework.stereotype.Service;
import com.cysepz.alive.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 確認今日是否已經打卡
    // FIXME：留著給前端用（檢查 cookie 以決定顯示畫面）
    // public boolean hasCheckedInToday(int bitmap) {
    // int day = LocalDate.now().getDayOfMonth();
    // return (bitmap & (1 << (day - 1))) != 0;
    // }

    // 今日打卡
    @Transactional
    public int checkIn(Long userId) {
        System.out.printf("----- userId = %d -----\n", userId);
        int day = LocalDate.now().getDayOfMonth();
        int originalBitmap = getMonthlyBitmap(userId);
        int newBitmap = originalBitmap | (1 << (day - 1));
        userRepository.checkInByUserId(userId, newBitmap);

        return getMonthlyBitmap(userId);
    }

    public int getMonthlyBitmap(Long userId) {
        return userRepository.findMonthlyBitmapByUserId(userId);
    }
}
