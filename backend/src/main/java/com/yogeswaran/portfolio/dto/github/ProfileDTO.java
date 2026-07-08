package com.yogeswaran.portfolio.dto.github;

public record ProfileDTO(
    String login,
    String name,
    String avatarUrl,
    String htmlUrl,
    String bio,
    int publicRepos,
    int followers,
    int following,
    String location
) {}
