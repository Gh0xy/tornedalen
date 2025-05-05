package org.example.controllers;

import org.example.entities.Discussion;
import org.example.repositories.DiscussionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diskussion")
public class DiscussionController {

    @Autowired
    private DiscussionRepository discussionRepository;

    @PostMapping
    public Discussion skapaInlägg(@RequestBody Discussion inlägg) {
        return discussionRepository.save(inlägg);
    }

    @GetMapping
    public List<Discussion> hämtaAlla() {
        return discussionRepository.findAll();
    }
}
