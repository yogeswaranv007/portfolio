package com.yogeswaran.portfolio.client.github;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class GithubClient {

    private final WebClient webClient;
    
    @Value("${github.api.username}")
    private String username;

    public GithubClient(WebClient githubWebClient) {
        this.webClient = githubWebClient;
    }

    public Mono<JsonNode> fetchProfile() {
        return webClient.get()
                .uri("/users/{username}", username)
                .retrieve()
                .bodyToMono(JsonNode.class);
    }

    public Mono<JsonNode> fetchRepositories() {
        return webClient.get()
                .uri("/users/{username}/repos?type=owner&sort=updated&per_page=100", username)
                .retrieve()
                .bodyToMono(JsonNode.class);
    }

    public Mono<JsonNode> fetchActivity() {
        return webClient.get()
                .uri("/users/{username}/events/public?per_page=30", username)
                .retrieve()
                .bodyToMono(JsonNode.class);
    }
}
