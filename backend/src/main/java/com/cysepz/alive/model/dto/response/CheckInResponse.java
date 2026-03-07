package com.cysepz.alive.model.dto.response;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class CheckInResponse {
    private LocalDateTime lastCheckInTime;
    private int monthlyBitmap;
}
