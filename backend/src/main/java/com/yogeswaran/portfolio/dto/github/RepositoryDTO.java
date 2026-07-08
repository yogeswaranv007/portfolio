package com.yogeswaran.portfolio.dto.github;

import java.time.Instant;
import java.util.List;

public record RepositoryDTO(
    String id,
    String name,
    String description,
    String htmlUrl,
    String language,
    int stargazersCount,
    int forksCount,
    Instant updatedAt,
    List<String> topics
) {}
