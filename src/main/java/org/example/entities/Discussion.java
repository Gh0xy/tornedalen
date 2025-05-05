package org.example.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
@Entity
public class Discussion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String ämne;
    @NotBlank
    private String författare;
    @NotBlank
    @Email
    private String epost;

    @Size(min = 5, max = 2000)
    private String inlägg;
}
