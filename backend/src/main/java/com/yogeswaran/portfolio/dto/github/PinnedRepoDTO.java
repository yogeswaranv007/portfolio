package com.yogeswaran.portfolio.dto.github;

public record PinnedRepoDTO(
    String name,
    String description,
    String htmlUrl,
    String language,
    int stargazersCount,
    int forksCount
) {}
