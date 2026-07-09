package com.yogeswaran.portfolio.service.contact;

import com.yogeswaran.portfolio.dto.contact.ContactRequestDTO;
import com.yogeswaran.portfolio.entity.ContactMessage;
import com.yogeswaran.portfolio.repository.ContactMessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ContactService {

    private final ContactMessageRepository repository;

    public ContactService(ContactMessageRepository repository) {
        this.repository = repository;
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
    }
}
