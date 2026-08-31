package com.yogeswaran.portfolio.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yogeswaran.portfolio.entity.*;
import com.yogeswaran.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.List;

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

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();
        seedSkills(); // Always sync latest skills catalog
        
        // Only seed if empty
        if (profileRepository.count() == 0) {
            seedProfile();
        }
        if (projectRepository.count() == 0) {
            seedProjects();
        }
        if (achievementRepository.count() == 0) {
            seedAchievements();
        }
        if (codingProfileRepository.count() == 0) {
            seedCodingProfiles();
        }
    }

    private void seedAdminUser() {
        var existingAdmin = adminUserRepository.findByEmail("admin@yogeswaran.dev");
        if (existingAdmin.isPresent()) {
            AdminUser admin = existingAdmin.get();
            admin.setPasswordHash(passwordEncoder.encode("yogesAdmin!"));
            admin.setEnabled(true);
            admin.setRole("ADMIN");
            adminUserRepository.save(admin);
            log.info("Updated admin user password to yogesAdmin! for: admin@yogeswaran.dev");
        } else {
            AdminUser admin = AdminUser.builder()
                    .email("admin@yogeswaran.dev")
                    .passwordHash(passwordEncoder.encode("yogesAdmin!"))
                    .role("ADMIN")
                    .enabled(true)
                    .build();
            adminUserRepository.save(admin);
            log.info("Seeded default admin user: admin@yogeswaran.dev");
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

    private void seedProfile() {
        try {
            String json = readResource("data/profile.json");
            if (json != null) {
                ObjectMapper mapper = createMapper();
                Profile profile = mapper.readValue(json, Profile.class);
                profile.setId("prof-1");
                profileRepository.save(profile);
                log.info("Seeded profile data from classpath JSON");
            }
        } catch (Exception e) {
            log.error("Failed to seed profile: {}", e.getMessage());
        }
    }

    private void seedProjects() {
        try {
            String json = readResource("data/projects.json");
            if (json != null) {
                ObjectMapper mapper = createMapper();
                List<Project> projects = mapper.readValue(json, new TypeReference<List<Project>>() {});
                int order = 0;
                for (Project p : projects) {
                    p.setDisplayOrder(order++);
                    projectRepository.save(p);
                }
                log.info("Seeded projects data from classpath JSON");
            }
        } catch (Exception e) {
            log.error("Failed to seed projects: {}", e.getMessage());
        }
    }

    private void seedSkills() {
        try {
            String json = readResource("data/skills.json");
            if (json != null) {
                ObjectMapper mapper = createMapper();
                List<Skill> skills = mapper.readValue(json, new TypeReference<List<Skill>>() {});
                int order = 0;
                for (Skill s : skills) {
                    var existingOpt = skillRepository.findByName(s.getName());
                    if (existingOpt.isPresent()) {
                        Skill existing = existingOpt.get();
                        existing.setCategory(s.getCategory());
                        existing.setDisplayOrder(order++);
                        if (s.getIcon() != null && !s.getIcon().isEmpty()) {
                            existing.setIcon(s.getIcon());
                        }
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
                log.info("Synced and seeded total {} skills into database from classpath JSON", skills.size());
            }
        } catch (Exception e) {
            log.error("Failed to seed skills: {}", e.getMessage());
        }
    }

    private void seedAchievements() {
        try {
            String json = readResource("data/achievements.json");
            if (json != null) {
                ObjectMapper mapper = createMapper();
                List<Achievement> achievements = mapper.readValue(json, new TypeReference<List<Achievement>>() {});
                int order = 0;
                for (Achievement a : achievements) {
                    a.setDisplayOrder(order++);
                    achievementRepository.save(a);
                }
                log.info("Seeded achievements data from classpath JSON");
            }
        } catch (Exception e) {
            log.error("Failed to seed achievements: {}", e.getMessage());
        }
    }

    private void seedCodingProfiles() {
        try {
            String json = readResource("data/codingProfiles.json");
            if (json != null) {
                ObjectMapper mapper = createMapper();
                List<CodingProfile> profiles = mapper.readValue(json, new TypeReference<List<CodingProfile>>() {});
                int order = 0;
                for (CodingProfile cp : profiles) {
                    cp.setDisplayOrder(order++);
                    codingProfileRepository.save(cp);
                }
                log.info("Seeded coding profiles data from classpath JSON");
            }
        } catch (Exception e) {
            log.error("Failed to seed coding profiles: {}", e.getMessage());
        }
    }
}
