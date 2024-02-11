package com.dipanjan.emanager.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AgeAbove18Validator.class)
public @interface AgeAbove18 {
    String message() default "Age must be at least 18";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
