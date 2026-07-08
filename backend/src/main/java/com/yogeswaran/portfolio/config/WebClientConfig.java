package com.yogeswaran.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.HttpHeaders;

@Configuration
public class WebClientConfig {

    @Value("${github.api.token}")
    private String githubToken;

    @Value("${github.api.base-url}")
    private String githubBaseUrl;

    @Bean
    public WebClient githubWebClient() {
        WebClient.Builder builder = WebClient.builder()
                .baseUrl(githubBaseUrl)
                .defaultHeader(HttpHeaders.ACCEPT, "application/vnd.github.v3+json");

        if (githubToken != null && !githubToken.isEmpty()) {
            builder.defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + githubToken);
        }

        return builder.build();
    }
}
