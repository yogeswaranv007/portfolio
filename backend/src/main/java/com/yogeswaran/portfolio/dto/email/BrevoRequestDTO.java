package com.yogeswaran.portfolio.dto.email;

import java.util.List;

public record BrevoRequestDTO(
    Sender sender,
    List<Recipient> to,
    String subject,
    String htmlContent
) {
    public record Sender(String name, String email) {}
    public record Recipient(String email) {} // Name is optional for Recipient, let's just pass email
}
