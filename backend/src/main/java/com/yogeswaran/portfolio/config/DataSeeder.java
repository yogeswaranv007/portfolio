package com.yogeswaran.portfolio.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yogeswaran.portfolio.entity.*;
import com.yogeswaran.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    private void seedProfile() {
        try {
            Path path = Paths.get("../frontend/src/data/profile.json");
            if (Files.exists(path)) {
                ObjectMapper mapper = new ObjectMapper();
                Profile profile = mapper.readValue(path.toFile(), Profile.class);
                profile.setId("prof-1");
                profileRepository.save(profile);
                log.info("Seeded profile data from frontend JSON");
            }
        } catch (Exception e) {
            log.error("Failed to seed profile: {}", e.getMessage());
        }
    }

    private void seedProjects() {
        try {
            Path path = Paths.get("../frontend/src/data/projects.json");
            if (Files.exists(path)) {
                ObjectMapper mapper = new ObjectMapper();
                List<Project> projects = mapper.readValue(path.toFile(), new TypeReference<List<Project>>() {});
                int order = 0;
                for (Project p : projects) {
                    p.setDisplayOrder(order++);
                    projectRepository.save(p);
                }
                log.info("Seeded projects data from frontend JSON");
            }
        } catch (Exception e) {
            log.error("Failed to seed projects: {}", e.getMessage());
        }
    }

    private void seedSkills() {
        try {
            Path path = Paths.get("../frontend/src/data/skills.json");
            if (Files.exists(path)) {
                ObjectMapper mapper = new ObjectMapper();
                List<Skill> skills = mapper.readValue(path.toFile(), new TypeReference<List<Skill>>() {});
                int order = 0;
                for (Skill s : skills) {
                    s.setDisplayOrder(order++);
                    skillRepository.save(s);
                }
                log.info("Seeded skills data from frontend JSON");
            }
        } catch (Exception e) {
            log.error("Failed to seed skills: {}", e.getMessage());
        }
    }

    private void seedAchievements() {
        try {
            Path path = Paths.get("../frontend/src/data/achievements.json");
            if (Files.exists(path)) {
                ObjectMapper mapper = new ObjectMapper();
                List<Achievement> achievements = mapper.readValue(path.toFile(), new TypeReference<List<Achievement>>() {});
                int order = 0;
                for (Achievement a : achievements) {
                    a.setDisplayOrder(order++);
                    achievementRepository.save(a);
                }
                log.info("Seeded achievements data from frontend JSON");
            }
        } catch (Exception e) {
            log.error("Failed to seed achievements: {}", e.getMessage());
        }
    }
}
