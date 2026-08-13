package com.yogeswaran.portfolio.controller.portfolio;

import com.yogeswaran.portfolio.entity.*;
import com.yogeswaran.portfolio.service.portfolio.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
public class PublicPortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/profile")
    public ResponseEntity<Profile> getProfile() {
        return portfolioService.getProfile()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects() {
        return ResponseEntity.ok(portfolioService.getAllProjects());
    }
    
    @GetMapping("/projects/{id}")
    public ResponseEntity<Project> getProject(@PathVariable String id) {
        return portfolioService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(portfolioService.getAllSkills());
    }

    @GetMapping("/achievements")
    public ResponseEntity<List<Achievement>> getAchievements() {
        return ResponseEntity.ok(portfolioService.getAllAchievements());
    }
}
