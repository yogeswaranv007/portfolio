package com.yogeswaran.portfolio.service.email;

import com.yogeswaran.portfolio.entity.ContactMessage;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@Slf4j
public class GmailEmailService implements EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    
    @Value("${spring.mail.username:}")
    private String adminEmail;

    public GmailEmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Async("emailTaskExecutor")
    @Override
    public void sendAdminNotification(ContactMessage message) {
        if (adminEmail == null || adminEmail.isBlank()) {
            log.warn("Admin email not configured. Skipping admin notification.");
            return;
        }
        
        log.info("Starting email task: Sending admin notification for message ID: {}", message.getId());
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            Context context = new Context();
            context.setVariable("name", message.getName());
            context.setVariable("email", message.getEmail());
            context.setVariable("subject", message.getSubject());
            context.setVariable("messageContent", message.getMessage());
            context.setVariable("timestamp", message.getCreatedAt());

            String htmlContent = templateEngine.process("email/admin-notification", context);

            helper.setTo(adminEmail);
            helper.setSubject("New Portfolio Contact: " + (message.getSubject() != null ? message.getSubject() : "No Subject"));
            helper.setText(htmlContent, true);
            helper.setFrom(adminEmail);
            helper.setReplyTo(message.getEmail());

            mailSender.send(mimeMessage);
            log.info("Successfully sent admin notification for message ID: {}", message.getId());

        } catch (MessagingException | MailException e) {
            log.error("Email delivery failed for admin notification (Message ID: {}): {}", message.getId(), e.getMessage());
        }
    }

    @Async("emailTaskExecutor")
    @Override
    public void sendAutoReply(ContactMessage message) {
        if (adminEmail == null || adminEmail.isBlank()) {
            log.warn("Admin email not configured. Skipping auto-reply.");
            return;
        }

        log.info("Starting email task: Sending auto-reply to {}", message.getEmail());
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            Context context = new Context();
            context.setVariable("name", message.getName());

            String htmlContent = templateEngine.process("email/contact-confirmation", context);

            helper.setTo(message.getEmail());
            helper.setSubject("Thank you for reaching out!");
            helper.setText(htmlContent, true);
            helper.setFrom(adminEmail);

            mailSender.send(mimeMessage);
            log.info("Successfully sent auto-reply to {}", message.getEmail());

        } catch (MessagingException | MailException e) {
            log.error("Email delivery failed for auto-reply to {}: {}", message.getEmail(), e.getMessage());
        }
    }
}
