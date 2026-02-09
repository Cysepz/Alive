package com.cysepz.alive.exception;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String message) {
        super(message);
    }

    // 也可以增加一個建構子來包裝原始的 JWT 異常（如 ExpiredJwtException）
    public InvalidTokenException(String message, Throwable cause) {
        super(message, cause);
    }
}
