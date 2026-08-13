package com.yogeswaran.portfolio.controller;

import com.yogeswaran.portfolio.entity.CodingProfile;
import com.yogeswaran.portfolio.repository.CodingProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CodingProfileController {

    private final CodingProfileRepository repository;

    @GetMapping("/api/portfolio/coding-profiles")
    public ResponseEntity<List<CodingProfile>> getPublicCodingProfiles() {
        return ResponseEntity.ok(repository.findByEnabledTrueOrderByDisplayOrderAsc());
    }

    @GetMapping("/api/admin/portfolio/coding-profiles")
    public ResponseEntity<List<CodingProfile>> getAllCodingProfiles() {
        return ResponseEntity.ok(repository.findAllByOrderByDisplayOrderAsc());
    }

    @PostMapping("/api/admin/portfolio/coding-profiles")
    public ResponseEntity<CodingProfile> createCodingProfile(@RequestBody CodingProfile profile) {
        return ResponseEntity.ok(repository.save(profile));
    }

    @PutMapping("/api/admin/portfolio/coding-profiles/{id}")
    public ResponseEntity<CodingProfile> updateCodingProfile(@PathVariable Long id, @RequestBody CodingProfile profile) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setPlatform(profile.getPlatform());
                    existing.setUsername(profile.getUsername());
                    existing.setUrl(profile.getUrl());
                    existing.setIcon(profile.getIcon());
                    existing.setEnabled(profile.isEnabled());
                    existing.setDisplayOrder(profile.getDisplayOrder());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/api/admin/portfolio/coding-profiles/{id}")
    public ResponseEntity<Void> deleteCodingProfile(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
