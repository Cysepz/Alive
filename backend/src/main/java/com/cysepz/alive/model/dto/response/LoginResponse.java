package com.cysepz.alive.model.dto.response;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public record LoginResponse(
        String account,
        String username,
        @JsonFormat(pattern = "yyyy-MM-dd") LocalDate birthday,
        String role) {

}
