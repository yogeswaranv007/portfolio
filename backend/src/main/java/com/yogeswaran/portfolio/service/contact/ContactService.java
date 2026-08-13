package com.yogeswaran.portfolio.service.contact;

import com.yogeswaran.portfolio.dto.contact.ContactRequestDTO;
import com.yogeswaran.portfolio.entity.ContactMessage;
import com.yogeswaran.portfolio.repository.ContactMessageRepository;
import com.yogeswaran.portfolio.service.email.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ContactService {

    private final ContactMessageRepository repository;
    private final EmailService emailService;

    public ContactService(ContactMessageRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    public void saveMessage(ContactRequestDTO request) {
        log.info("Received new contact message from: {}", request.email());

        ContactMessage message = ContactMessage.builder()
                .name(request.name())
                .email(request.email())
                .subject(request.subject())
                .message(request.message())
                .build();

        repository.save(message);
        
        log.info("Successfully saved contact message with ID: {}", message.getId());

        // Trigger async email notifications
        emailService.sendAdminNotification(message);
        emailService.sendAutoReply(message);
    }

    public java.util.List<ContactMessage> getAllMessages() {
        return repository.findAll(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "createdAt"));
    }

    public void markAsRead(java.util.UUID id) {
        repository.findById(id).ifPresent(message -> {
            message.setStatus(ContactMessage.Status.READ);
            repository.save(message);
        });
    }

    public void deleteMessage(java.util.UUID id) {
        repository.deleteById(id);
    }
}
