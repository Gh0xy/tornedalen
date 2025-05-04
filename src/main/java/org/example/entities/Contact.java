package org.example.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
@Entity
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String förnamn;
    @NotBlank
    private String efternamn;
    private String telefon;
    @NotBlank
    @Email
    private String epost;

    @NotBlank
    @Size(min = 5, max = 1000)
    private String meddelande;
}
