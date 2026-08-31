package com.yogeswaran.portfolio.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-ms}")
    private int jwtExpirationMs;

    private SecretKey getSigningKey() {
        try {
            String secret = (jwtSecret != null && !jwtSecret.isBlank()) 
                    ? jwtSecret 
                    : "8f2f84090b4d45548682057d62055627eb18d6a8f152d5b62b19280d908d0c2e36466f27b9c922a6bbec4b4c7317e08929e71e9a3b6f001f3724c08479e390c5";
            byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
            if (keyBytes.length < 64) {
                java.security.MessageDigest md = java.security.MessageDigest.getInstance("SHA-512");
                keyBytes = md.digest(keyBytes);
            }
            return Keys.hmacShaKeyFor(keyBytes);
        } catch (Exception e) {
            logger.error("Error generating JWT signing key: {}", e.getMessage());
            return Keys.hmacShaKeyFor("8f2f84090b4d45548682057d62055627eb18d6a8f152d5b62b19280d908d0c2e36466f27b9c922a6bbec4b4c7317e08929e71e9a3b6f001f3724c08479e390c5".getBytes(StandardCharsets.UTF_8));
        }
    }

    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (SecurityException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
