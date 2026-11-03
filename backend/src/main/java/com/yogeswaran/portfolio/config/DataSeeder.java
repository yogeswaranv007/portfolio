package com.yogeswaran.portfolio.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yogeswaran.portfolio.entity.*;
import com.yogeswaran.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final AchievementRepository achievementRepository;
    private final CodingProfileRepository codingProfileRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:${ADMIN_EMAIL:admin@yogeswaran.dev}}")
    private String adminEmail;

    @Value("${app.admin.password:${ADMIN_PASSWORD:}}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();
        syncProfile();
        syncSkills();
        syncProjects();
        syncAchievements();
        syncCodingProfiles();
    }

    private void seedAdminUser() {
        if (adminPassword == null || adminPassword.isBlank()) {
            if (adminUserRepository.count() == 0) {
                log.warn("ADMIN_PASSWORD environment variable is not configured. Admin account creation deferred until set.");
            }
            return;
        }

        var existingAdmin = adminUserRepository.findByEmail(adminEmail);
        if (existingAdmin.isPresent()) {
            AdminUser admin = existingAdmin.get();
            admin.setPasswordHash(passwordEncoder.encode(adminPassword));
            admin.setEnabled(true);
            admin.setRole("ADMIN");
            adminUserRepository.save(admin);
            log.info("Synchronized administrator credentials for email: {}", adminEmail);
        } else {
            AdminUser admin = AdminUser.builder()
                    .email(adminEmail)
                    .passwordHash(passwordEncoder.encode(adminPassword))
                    .role("ADMIN")
                    .enabled(true)
                    .build();
            adminUserRepository.save(admin);
            log.info("Initialized administrator account for email: {}", adminEmail);
        }
    }

    private String readResource(String path) throws Exception {
        ClassPathResource resource = new ClassPathResource(path);
        if (!resource.exists()) {
            log.warn("Resource not found: {}", path);
            return null;
        }
        try (Reader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)) {
            return FileCopyUtils.copyToString(reader);
        }
    }

    private ObjectMapper createMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return mapper;
    }

    private void syncProfile() {
        try {
            String json = readResource("data/profile.json");
            if (json != null) {
                ObjectMapper mapper = createMapper();
                Profile incoming = mapper.readValue(json, Profile.class);
                incoming.setId("prof-1");
                // Ensure no phone number is ever persisted
                incoming.setPhone("");
                profileRepository.save(incoming);
                log.info("Synchronized profile data from classpath JSON");
            }
        } catch (Exception e) {
            log.error("Failed to synchronize profile: {}", e.getMessage());
        }
    }

    private void syncProjects() {
        try {
            String json = readResource("data/projects.json");
            if (json != null) {
                ObjectMapper mapper = createMapper();
                List<Project> validProjects = mapper.readValue(json, new TypeReference<List<Project>>() {});
                Set<String> validIds = validProjects.stream().map(Project::getId).collect(Collectors.toSet());

                // Purge unauthorized/legacy projects from database (e.g. e-tutor, cloud-tracker)
                List<Project> existing = projectRepository.findAll();
                for (Project p : existing) {
                    if (!validIds.contains(p.getId())) {
                        projectRepository.delete(p);
                        log.info("Purged unauthorized/legacy project from database: {}", p.getId());
                    }
                }

                // Upsert verified projects in specified display order
                int order = 0;
                for (Project p : validProjects) {
                    p.setDisplayOrder(order++);
                    projectRepository.save(p);
                }
                log.info("Synchronized {} verified projects into database", validProjects.size());
            }
        } catch (Exception e) {
            log.error("Failed to synchronize projects: {}", e.getMessage());
        }
    }

    private void syncSkills() {
        try {
            String json = readResource("data/skills.json");
            if (json != null) {
                ObjectMapper mapper = createMapper();
                List<Skill> validSkills = mapper.readValue(json, new TypeReference<List<Skill>>() {});
                Set<String> validSkillNames = validSkills.stream().map(Skill::getName).collect(Collectors.toSet());

                // Purge non-permitted skills from database (e.g. AWS, C++, OAuth, ML training)
                List<Skill> existingSkills = skillRepository.findAll();
                for (Skill s : existingSkills) {
                    if (!validSkillNames.contains(s.getName())) {
                        skillRepository.delete(s);
                        log.info("Purged non-permitted skill from database: {}", s.getName());
                    }
                }

                // Upsert permitted skills in order
                int order = 0;
                for (Skill s : validSkills) {
                    var existingOpt = skillRepository.findByName(s.getName());
                    if (existingOpt.isPresent()) {
                        Skill existing = existingOpt.get();
                        existing.setCategory(s.getCategory());
                        existing.setDisplayOrder(order++);
                        existing.setEnabled(s.isEnabled());
                        skillRepository.save(existing);
                    } else {
                        if (s.getIcon() == null || s.getIcon().isEmpty()) {
                            s.setIcon("FaCode");
                        }
                        s.setDisplayOrder(order++);
                        skillRepository.save(s);
                    }
                }
                log.info("Synchronized total {} permitted skills into database", validSkills.size());
            }
        } catch (Exception e) {
            log.error("Failed to synchronize skills: {}", e.getMessage());
        }
    }

    private void syncAchievements() {
        try {
            String json = readResource("data/achievements.json");
            if (json != null) {
                ObjectMapper mapper = createMapper();
                List<Achievement> achievements = mapper.readValue(json, new TypeReference<List<Achievement>>() {});
                achievementRepository.deleteAll();
                int order = 0;
                for (Achievement a : achievements) {
                    a.setDisplayOrder(order++);
                    achievementRepository.save(a);
                }
                log.info("Synchronized {} verified achievements into database", achievements.size());
            }
        } catch (Exception e) {
            log.error("Failed to synchronize achievements: {}", e.getMessage());
        }
    }

    private void syncCodingProfiles() {
        try {
            String json = readResource("data/codingProfiles.json");
            if (json != null) {
                ObjectMapper mapper = createMapper();
                List<CodingProfile> profiles = mapper.readValue(json, new TypeReference<List<CodingProfile>>() {});
                codingProfileRepository.deleteAll();
                int order = 0;
                for (CodingProfile cp : profiles) {
                    cp.setDisplayOrder(order++);
                    codingProfileRepository.save(cp);
                }
                log.info("Synchronized {} coding profiles into database", profiles.size());
            }
        } catch (Exception e) {
            log.error("Failed to synchronize coding profiles: {}", e.getMessage());
        }
    }
}
