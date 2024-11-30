package com.javaproject.socialblog.springboot.exceptions;

import com.javaproject.socialblog.springboot.common.ApiResponse;
import com.javaproject.socialblog.springboot.common.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import io.jsonwebtoken.ExpiredJwtException;

import java.security.SignatureException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        String message = "Validation failed";
        return ResponseUtil.error(HttpStatus.BAD_REQUEST, message, errors);
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ApiResponse<Object>> handleCustomExceptions(CustomException ex) {
        return ResponseUtil.error(ex.getStatus(), ex.getMessage(), (Object) null);
    }

    @ExceptionHandler(NoSuchElementFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleNoSuchElementFoundException(NoSuchElementFoundException ex) {
        return ResponseUtil.error(HttpStatus.NOT_FOUND, ex.getMessage(), (Object) null);
    }

    @ExceptionHandler(UserNotEnabledException.class)
    public ResponseEntity<ApiResponse<Object>> handleUserNotEnabledException(UserNotEnabledException ex) {
        return ResponseUtil.error(HttpStatus.UNAUTHORIZED, ex.getMessage(), (Object) null);
    }

    @ExceptionHandler({
            BadCredentialsException.class,
            AccountStatusException.class,
            AccessDeniedException.class,
            SignatureException.class,
            ExpiredJwtException.class
    })
    public ResponseEntity<ApiResponse<Object>> handleSecurityException(Exception exception) {
        HttpStatus status;
        String message;

        switch (exception) {
            case BadCredentialsException badCredentialsException -> {
                status = HttpStatus.FORBIDDEN;
                message = "Authentication failed";
            }
            case AccountStatusException accountStatusException -> {
                status = HttpStatus.FORBIDDEN;
                message = "Account issue";
            }
            case AccessDeniedException accessDeniedException -> {
                status = HttpStatus.UNAUTHORIZED;
                message = "Access denied";
            }
            case SignatureException signatureException -> {
                status = HttpStatus.UNAUTHORIZED;
                message = "Invalid token";
            }
            case ExpiredJwtException expiredJwtException -> {
                status = HttpStatus.UNAUTHORIZED;
                message = "Token expired";
            }
            case null, default -> {
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                message = "Internal server error";
            }
        }

        return ResponseUtil.error(status, message, (Object) null);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleAllExceptions(Exception ex) {
        return ResponseUtil.error(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred", (Object) null);
    }
}
