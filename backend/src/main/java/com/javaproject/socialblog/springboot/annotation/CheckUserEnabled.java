package com.javaproject.socialblog.springboot.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD) // Annotation is for methods
@Retention(RetentionPolicy.RUNTIME) // Available at runtime
public @interface CheckUserEnabled {

}
