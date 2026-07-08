package com.yogeswaran.portfolio.controller.github;

import com.yogeswaran.portfolio.dto.github.*;
import com.yogeswaran.portfolio.service.github.GithubService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/github")
@Tag(name = "GitHub Dashboard API", description = "Endpoints for fetching cached GitHub data")
public class GithubController {

    private final GithubService githubService;

    public GithubController(GithubService githubService) {
        this.githubService = githubService;
    }

    @GetMapping("/profile")
    @Operation(summary = "Get GitHub profile summary")
    public ResponseEntity<ProfileDTO> getProfile() {
        return ResponseEntity.ok(githubService.getProfile());
    }

    @GetMapping("/repositories")
    @Operation(summary = "Get all public repositories")
    public ResponseEntity<List<RepositoryDTO>> getRepositories() {
        return ResponseEntity.ok(githubService.getRepositories());
    }

    @GetMapping("/pinned")
    @Operation(summary = "Get pinned/featured repositories")
    public ResponseEntity<List<PinnedRepoDTO>> getPinned() {
        return ResponseEntity.ok(githubService.getPinnedRepositories());
    }

    @GetMapping("/statistics")
    @Operation(summary = "Get aggregated GitHub statistics")
    public ResponseEntity<StatsDTO> getStatistics() {
        return ResponseEntity.ok(githubService.getStatistics());
    }

    @GetMapping("/languages")
    @Operation(summary = "Get top programming languages used")
    public ResponseEntity<List<LanguageDTO>> getLanguages() {
        return ResponseEntity.ok(githubService.getLanguages());
    }

    @GetMapping("/activity")
    @Operation(summary = "Get recent public GitHub activity")
    public ResponseEntity<List<ActivityDTO>> getActivity() {
        return ResponseEntity.ok(githubService.getActivity());
    }
}
