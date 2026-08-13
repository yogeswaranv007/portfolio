package com.yogeswaran.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Profile {

    @Id
    private String id; // Use the same string ID from frontend e.g., 'prof-1'

    private String name;
    private String title;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "profile_roles", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "role")
    @Builder.Default
    private List<String> roles = new ArrayList<>();
    
    @Column(columnDefinition = "TEXT")
    private String about;
    
    private String email;
    private String phone;
    private String location;
    private String resumeUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "profile_focus", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "focus")
    @Builder.Default
    private List<String> currentFocus = new ArrayList<>();
    
    @Column(columnDefinition = "TEXT")
    private String imageBase64;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private Instant updatedAt;
}
