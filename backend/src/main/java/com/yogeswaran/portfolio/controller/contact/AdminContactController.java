package com.yogeswaran.portfolio.controller.contact;

import com.yogeswaran.portfolio.entity.ContactMessage;
import com.yogeswaran.portfolio.service.contact.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/messages")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminContactController {

    private final ContactService contactService;

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        // We will need to add a method in ContactService
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable java.util.UUID id) {
        contactService.markAsRead(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable java.util.UUID id) {
        contactService.deleteMessage(id);
        return ResponseEntity.ok().build();
    }
}
