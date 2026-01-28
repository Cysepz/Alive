package com.cysepz.alive.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @Value("${app.version}")
    private String appVersion;

    @GetMapping("/api")
    public Map<String, Object> sayHello() {
        System.out.println("LOG: Received request at /api");

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Hello, ALIVE project is running!");
        response.put("version", appVersion);
        response.put("timestamp", System.currentTimeMillis()); // 增加動態資訊
        return response;
    }
}