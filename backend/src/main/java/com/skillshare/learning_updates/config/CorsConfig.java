package com.skillshare.learning_updates.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Configure allowed origins (for production, specify exact domains)
        config.setAllowedOriginPatterns(List.of(
                "http://localhost:3000",        // Local development
                "http://127.0.0.1:3000",       // Alternative localhost
                "https://your-production-domain.com" // Production domain
        ));

        // Configure allowed methods
        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"
        ));

        // Configure allowed headers
        config.setAllowedHeaders(List.of(
                "Authorization", "Content-Type", "Accept", "X-Requested-With",
                "Cache-Control", "Origin", "Access-Control-Request-Method",
                "Access-Control-Request-Headers"
        ));

        // Configure exposed headers (if needed)
        config.setExposedHeaders(List.of(
                "Authorization", "Content-Type", "Content-Disposition",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"
        ));

        // Enable credentials support
        config.setAllowCredentials(true);

        // Set max age (in seconds) for CORS preflight caching
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}