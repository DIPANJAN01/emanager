package com.dipanjan.emanager.validation;

import java.time.LocalDate;
import java.time.Period;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AgeAbove18Validator implements ConstraintValidator<AgeAbove18, LocalDate> {

    @Override
    public boolean isValid(LocalDate dob, ConstraintValidatorContext context) {
        LocalDate currentDate = LocalDate.now();
        Period period = Period.between(dob, currentDate);
        return period.getYears() >= 18;
    }

}
