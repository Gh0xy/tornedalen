package org.example.controllers;

import org.example.entities.Contact;
import org.example.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kontakt")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping
    public Contact skapaMeddelande(@RequestBody Contact kontakt) {
        return contactRepository.save(kontakt);
    }

    @GetMapping
    public List<Contact> hämtaAlla() {
        return contactRepository.findAll();
    }
}
