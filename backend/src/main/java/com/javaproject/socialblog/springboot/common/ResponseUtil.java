package com.javaproject.socialblog.springboot.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Map;

public class ResponseUtil {

    public static <T> ResponseEntity<ApiResponse<T>> success(T data) {
        return success(HttpStatus.OK, "Success", data);
    }

    public static <T> ResponseEntity<ApiResponse<T>> success(HttpStatus status, String message, T data) {
        ApiResponse<T> response = new ApiResponse<>(
                status.value(),
                message,
                LocalDateTime.now(),
                data
        );
        return new ResponseEntity<>(response, status);
    }

    public static <T> ResponseEntity<ApiResponse<T>> error(HttpStatus status, String message, Map<String, String> errors) {
        ApiResponse<T> response = new ApiResponse<>(
                status.value(),
                message,
                LocalDateTime.now(),
                (T) errors
        );
        return new ResponseEntity<>(response, status);
    }

    public static <T> ResponseEntity<ApiResponse<T>> error(HttpStatus status, String message, T data) {
        ApiResponse<T> response = new ApiResponse<>(
                status.value(),
                message,
                LocalDateTime.now(),
                data
        );
        return new ResponseEntity<>(response, status);
    }

    public static <T> ResponseEntity<ApiResponse<T>> error(HttpStatus status, String message) {
        ApiResponse<T> response = new ApiResponse<>(
                status.value(),
                message,
                LocalDateTime.now(),
                null
        );
        return new ResponseEntity<>(response, status);
    }

}
