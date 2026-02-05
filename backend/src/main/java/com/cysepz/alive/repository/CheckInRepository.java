package com.cysepz.alive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cysepz.alive.model.entity.User;

@Repository
public interface CheckInRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u.monthlyBitmap FROM User u WHERE u.userId = :userId")
    Integer findMonthlyBitmapByUserId(long userId);

    @Modifying
    @Query("UPDATE User u SET u.lastCheckInTime = CURRENT_TIMESTAMP, u.monthlyBitmap = :monthlyBitmap WHERE u.userId = :userId")
    void checkInByUserId(@Param("userId") long userId, @Param("monthlyBitmap") int monthlyBitmap);
}
