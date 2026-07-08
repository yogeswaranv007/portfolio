package com.yogeswaran.portfolio.service.github;

import com.fasterxml.jackson.databind.JsonNode;
import com.yogeswaran.portfolio.client.github.GithubClient;
import com.yogeswaran.portfolio.dto.github.*;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class GithubService {

    private final GithubClient githubClient;

    public GithubService(GithubClient githubClient) {
        this.githubClient = githubClient;
    }

    @Cacheable(value = "githubProfile", key = "'profile'")
    public ProfileDTO getProfile() {
        JsonNode node = githubClient.fetchProfile().block();
        if (node == null) return null;

        return new ProfileDTO(
                node.path("login").asText(""),
                node.path("name").asText(""),
                node.path("avatar_url").asText(""),
                node.path("html_url").asText(""),
                node.path("bio").asText(""),
                node.path("public_repos").asInt(0),
                node.path("followers").asInt(0),
                node.path("following").asInt(0),
                node.path("location").asText("")
        );
    }

    @Cacheable(value = "githubRepositories", key = "'repos'")
    public List<RepositoryDTO> getRepositories() {
        JsonNode array = githubClient.fetchRepositories().block();
        if (array == null || !array.isArray()) return List.of();

        return StreamSupport.stream(array.spliterator(), false)
                .map(node -> {
                    List<String> topics = new ArrayList<>();
                    node.path("topics").forEach(t -> topics.add(t.asText()));
                    return new RepositoryDTO(
                            node.path("id").asText(),
                            node.path("name").asText(),
                            node.path("description").asText(""),
                            node.path("html_url").asText(),
                            node.path("language").asText("Unknown"),
                            node.path("stargazers_count").asInt(0),
                            node.path("forks_count").asInt(0),
                            Instant.parse(node.path("updated_at").asText()),
                            topics
                    );
                })
                .collect(Collectors.toList());
    }

    @Cacheable(value = "githubPinned", key = "'pinned'")
    public List<PinnedRepoDTO> getPinnedRepositories() {
        // Pinned repos aren't directly available via standard REST API without GraphQL.
        // As a fallback, we filter featured repos from standard repositories.
        Set<String> featuredNames = Set.of(
            "ai-powered-smart-survey-tool",
            "battery-vehicle-booking",
            "multi-cloud-usage-tracker",
            "e-tutor-platform",
            "ai-driven-course-path-optimizer"
        );
        
        return getRepositories().stream()
                .filter(repo -> featuredNames.contains(repo.name().toLowerCase()))
                .map(repo -> new PinnedRepoDTO(
                        repo.name(),
                        repo.description(),
                        repo.htmlUrl(),
                        repo.language(),
                        repo.stargazersCount(),
                        repo.forksCount()
                ))
                .collect(Collectors.toList());
    }

    @Cacheable(value = "githubStatistics", key = "'stats'")
    public StatsDTO getStatistics() {
        List<RepositoryDTO> repos = getRepositories();
        
        int totalStars = repos.stream().mapToInt(RepositoryDTO::stargazersCount).sum();
        int totalForks = repos.stream().mapToInt(RepositoryDTO::forksCount).sum();
        
        Map<String, Long> languageCounts = repos.stream()
                .map(RepositoryDTO::language)
                .filter(lang -> !lang.equals("Unknown") && lang != null)
                .collect(Collectors.groupingBy(l -> l, Collectors.counting()));
                
        List<LanguageDTO> topLanguages = languageCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .map(e -> new LanguageDTO(e.getKey(), e.getValue())) // Treating count as "bytes"/weight for simple stats
                .collect(Collectors.toList());

        return new StatsDTO(repos.size(), totalStars, totalForks, topLanguages);
    }
    
    @Cacheable(value = "githubLanguages", key = "'languages'")
    public List<LanguageDTO> getLanguages() {
        return getStatistics().topLanguages();
    }

    @Cacheable(value = "githubActivity", key = "'activity'")
    public List<ActivityDTO> getActivity() {
        JsonNode array = githubClient.fetchActivity().block();
        if (array == null || !array.isArray()) return List.of();

        return StreamSupport.stream(array.spliterator(), false)
                .limit(10) // Get top 10 recent activities
                .map(node -> new ActivityDTO(
                        node.path("id").asText(),
                        node.path("type").asText(),
                        node.path("repo").path("name").asText(),
                        Instant.parse(node.path("created_at").asText())
                ))
                .collect(Collectors.toList());
    }
}
