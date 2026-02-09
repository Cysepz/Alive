package com.cysepz.alive.model.dto.request;

import java.time.LocalDate;

import com.cysepz.alive.model.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "帳號不能為空")
    @Size(min = 1, max = 20, message = "帳號需介於 1~20 個字元")
    private String account;

    @Size(min = 1, max = 10, message = "稱謂需介於 1~10 個字元")
    private String username;

    @NotBlank(message = "生日不能為空")
    @Past(message = "生日必須是過去的日期")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birthday;

    @NotBlank(message = "地址不能為空")
    @Pattern(regexp = "^[\\u4e00-\\u9fa5]{2,5}(市|縣)[\\u4e00-\\u9fa5]{2,5}(區|鎮|鎮|鄉|市)[\\u4e00-\\u9fa5\\d\\u00b7].*$", message = "請輸入有效的台灣地址格式")
    private String address;

    @NotBlank(message = "狀態不能為空")
    private User.LivingSituation situation;

    @NotBlank(message = "電話不能為空")
    @Pattern(regexp = "09\\d{2}-\\d{3}-\\d{3}", message = "Invalid Phone number Format")
    private String phone;
}
// DO NOT allow user to change the email provided from oauth provider
