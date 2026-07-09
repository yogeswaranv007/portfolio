package com.yogeswaran.portfolio.controller.contact;

import com.yogeswaran.portfolio.dto.contact.ContactRequestDTO;
import com.yogeswaran.portfolio.dto.contact.ContactResponseDTO;
import com.yogeswaran.portfolio.service.contact.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@Tag(name = "Contact API", description = "Endpoints for receiving contact form messages")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    @Operation(summary = "Submit a contact message")
    public ResponseEntity<ContactResponseDTO> submitMessage(@Valid @RequestBody ContactRequestDTO request) {
        contactService.saveMessage(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ContactResponseDTO(true, "Your message has been sent successfully."));
    }
}
