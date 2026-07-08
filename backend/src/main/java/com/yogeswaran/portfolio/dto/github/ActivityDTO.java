package com.yogeswaran.portfolio.dto.github;

import java.time.Instant;

public record ActivityDTO(
    String id,
    String type,
    String repoName,
    Instant createdAt
) {}
