package com.dipanjan.emanager.entities;

import java.time.LocalDate;
import com.dipanjan.emanager.utils.Gender;
import com.dipanjan.emanager.validation.AgeAbove18;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "You must enter a name for the admin")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "You must enter an email for the admin")
    @Email(message = "Please enter a valid email")
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull(message = "Please select a gender of the admin")
    @Column(nullable = false)
    private Gender gender;

    @NotNull(message = "Please enter date of birth (dob) of the admin")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    // @DateTimeFormat(pattern = "dd-MM-yyyy")
    @Past(message = "Date of birth must be in the past!")
    @AgeAbove18(message = "Admin must be above 18 years old!")
    @Column(nullable = false)
    private LocalDate dob;

}
