package org.example.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonIgnore
    private Discussion parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Discussion> replies;
}
