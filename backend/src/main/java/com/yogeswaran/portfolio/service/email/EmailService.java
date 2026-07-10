package com.yogeswaran.portfolio.service.email;

import com.yogeswaran.portfolio.entity.ContactMessage;

public interface EmailService {
    void sendAdminNotification(ContactMessage message);
    void sendAutoReply(ContactMessage message);
}
