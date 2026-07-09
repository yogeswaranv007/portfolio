package com.yogeswaran.portfolio.dto.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequestDTO(
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(max = 150, message = "Email cannot exceed 150 characters")
    String email,

    @Size(max = 200, message = "Subject cannot exceed 200 characters")
    String subject,

    @NotBlank(message = "Message is required")
    @Size(max = 1000, message = "Message cannot exceed 1000 characters")
    String message
) {
    public ContactRequestDTO {
        // Trim inputs to reject blank spaces
        name = name != null ? name.trim() : null;
        email = email != null ? email.trim() : null;
        subject = subject != null ? subject.trim() : null;
        message = message != null ? message.trim() : null;
    }
}
