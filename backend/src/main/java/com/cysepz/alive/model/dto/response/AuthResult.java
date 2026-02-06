package com.cysepz.alive.model.dto.response;

import java.time.LocalDate;

public sealed interface AuthResult {
        record LoginSuccess(
                        @com.fasterxml.jackson.annotation.JsonIgnore String token,
                        String account,
                        String username,
                        LocalDate birthday,
                        Integer bitmap,
                        String role) implements AuthResult {
        }

        record RegisterPending(
                        @com.fasterxml.jackson.annotation.JsonIgnore String token,
                        String suggestedUsername) implements AuthResult {
        }
}