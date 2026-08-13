package com.yogeswaran.portfolio.controller.portfolio;

import com.yogeswaran.portfolio.entity.*;
import com.yogeswaran.portfolio.service.portfolio.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/portfolio")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminPortfolioController {

    private final PortfolioService portfolioService;

    // Profile Admin Endpoints
    @PutMapping("/profile")
    public ResponseEntity<Profile> updateProfile(@RequestBody Profile profile) {
        return ResponseEntity.ok(portfolioService.saveProfile(profile));
    }

    // Projects Admin Endpoints
    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        return ResponseEntity.ok(portfolioService.saveProject(project));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable String id, @RequestBody Project project) {
        project.setId(id);
        return ResponseEntity.ok(portfolioService.saveProject(project));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable String id) {
        portfolioService.deleteProject(id);
        return ResponseEntity.ok().build();
    }

    // Skills Admin Endpoints
    @PostMapping("/skills")
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        return ResponseEntity.ok(portfolioService.saveSkill(skill));
    }

    @PutMapping("/skills/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @RequestBody Skill skill) {
        skill.setId(id);
        return ResponseEntity.ok(portfolioService.saveSkill(skill));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        portfolioService.deleteSkill(id);
        return ResponseEntity.ok().build();
    }

    // Achievements Admin Endpoints
    @PostMapping("/achievements")
    public ResponseEntity<Achievement> createAchievement(@RequestBody Achievement achievement) {
        return ResponseEntity.ok(portfolioService.saveAchievement(achievement));
    }

    @PutMapping("/achievements/{id}")
    public ResponseEntity<Achievement> updateAchievement(@PathVariable Long id, @RequestBody Achievement achievement) {
        achievement.setId(id);
        return ResponseEntity.ok(portfolioService.saveAchievement(achievement));
    }

    @DeleteMapping("/achievements/{id}")
    public ResponseEntity<?> deleteAchievement(@PathVariable Long id) {
        portfolioService.deleteAchievement(id);
        return ResponseEntity.ok().build();
    }
}
