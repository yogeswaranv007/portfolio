package com.yogeswaran.portfolio.dto.github;

import java.util.List;

public record StatsDTO(
    int totalRepositories,
    int totalStars,
    int totalForks,
    List<LanguageDTO> topLanguages
) {}
