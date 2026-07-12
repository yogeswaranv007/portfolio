package com.yogeswaran.portfolio.service.email;

import com.yogeswaran.portfolio.dto.email.BrevoRequestDTO;
import com.yogeswaran.portfolio.entity.ContactMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.List;

@Service
@ConditionalOnProperty(name = "email.provider", havingValue = "brevo", matchIfMissing = true)
@Slf4j
public class BrevoEmailService implements EmailService {

    private final WebClient brevoWebClient;
    private final TemplateEngine templateEngine;

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    @Value("${brevo.email.admin}")
    private String adminEmail;

    @Value("${brevo.email.from}")
    private String fromEmail;

    public BrevoEmailService(WebClient brevoWebClient, TemplateEngine templateEngine) {
        this.brevoWebClient = brevoWebClient;
        this.templateEngine = templateEngine;
    }

    @Async("emailTaskExecutor")
    @Override
    public void sendAdminNotification(ContactMessage message) {
        if (isNotConfigured()) return;

        log.info("Starting email task: Sending admin notification via Brevo for message ID: {}", message.getId());

        try {
            Context context = new Context();
            context.setVariable("name", message.getName());
            context.setVariable("email", message.getEmail());
            context.setVariable("subject", message.getSubject());
            context.setVariable("messageContent", message.getMessage());
            context.setVariable("timestamp", message.getCreatedAt());

            String htmlContent = templateEngine.process("email/admin-notification", context);
            String subject = "New Portfolio Contact: " + (message.getSubject() != null ? message.getSubject() : "No Subject");

            BrevoRequestDTO request = new BrevoRequestDTO(
                    new BrevoRequestDTO.Sender("Portfolio System", fromEmail),
                    List.of(new BrevoRequestDTO.Recipient(adminEmail)),
                    subject,
                    htmlContent
            );

            sendEmailViaBrevo(request, "Admin Notification");

        } catch (Exception e) {
            log.error("Failed to generate or send admin notification (Message ID: {}). Error: {}", message.getId(), e.getMessage());
        }
    }

    @Async("emailTaskExecutor")
    @Override
    public void sendAutoReply(ContactMessage message) {
        if (isNotConfigured()) return;

        log.info("Starting email task: Sending auto-reply via Brevo to {}", message.getEmail());

        try {
            Context context = new Context();
            context.setVariable("name", message.getName());

            String htmlContent = templateEngine.process("email/contact-confirmation", context);

            BrevoRequestDTO request = new BrevoRequestDTO(
                    new BrevoRequestDTO.Sender("Yogeswaran V", fromEmail),
                    List.of(new BrevoRequestDTO.Recipient(message.getEmail())),
                    "Thank you for reaching out!",
                    htmlContent
            );

            sendEmailViaBrevo(request, "Auto-reply");

        } catch (Exception e) {
            log.error("Failed to generate or send auto-reply to {}. Error: {}", message.getEmail(), e.getMessage());
        }
    }

    private void sendEmailViaBrevo(BrevoRequestDTO request, String type) {
        try {
            brevoWebClient.post()
                    .bodyValue(request)
                    .retrieve()
                    .toBodilessEntity()
                    .block(); // Blocking is fine here because we are already in an @Async background thread

            log.info("Successfully delivered {} via Brevo", type);

        } catch (WebClientResponseException e) {
            log.error("Brevo API error while sending {}: Status {}, Body: {}", type, e.getStatusCode(), e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("Network or unexpected error while sending {} via Brevo: {}", type, e.getMessage());
        }
    }

    private boolean isNotConfigured() {
        if (brevoApiKey == null || brevoApiKey.isBlank()) {
            log.warn("Brevo API Key is missing. Skipping email delivery.");
            return true;
        }
        if (adminEmail == null || adminEmail.isBlank() || fromEmail == null || fromEmail.isBlank()) {
            log.warn("Brevo emails (admin/from) are not configured. Skipping email delivery.");
            return true;
        }
        return false;
    }
}
