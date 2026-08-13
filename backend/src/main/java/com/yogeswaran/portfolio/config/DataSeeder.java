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
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();
        
        // Only seed if empty
        if (profileRepository.count() == 0) {
            seedProfile();
        }
        if (projectRepository.count() == 0) {
            seedProjects();
        }
        if (skillRepository.count() == 0) {
            seedSkills();
        }
        if (achievementRepository.count() == 0) {
            seedAchievements();
        }
    }

    private void seedAdminUser() {
        if (adminUserRepository.findByEmail("admin@yogeswaran.dev").isEmpty()) {
            AdminUser admin = AdminUser.builder()
                    .email("admin@yogeswaran.dev")
                    .passwordHash(passwordEncoder.encode("SecureAdminPassword!")) // Default password for initial setup
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

    private void seedProfile() {
        try {
            String json = readResource("data/profile.json");
            if (json != null) {
                ObjectMapper mapper = new ObjectMapper();
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
                ObjectMapper mapper = new ObjectMapper();
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
                ObjectMapper mapper = new ObjectMapper();
                List<Skill> skills = mapper.readValue(json, new TypeReference<List<Skill>>() {});
                int order = 0;
                for (Skill s : skills) {
                    s.setDisplayOrder(order++);
                    skillRepository.save(s);
                }
                log.info("Seeded skills data from classpath JSON");
            }
        } catch (Exception e) {
            log.error("Failed to seed skills: {}", e.getMessage());
        }
    }

    private void seedAchievements() {
        try {
            String json = readResource("data/achievements.json");
            if (json != null) {
                ObjectMapper mapper = new ObjectMapper();
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
}
