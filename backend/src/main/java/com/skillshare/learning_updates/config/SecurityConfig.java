package com.skillshare.learning_updates.config;

import com.skillshare.learning_updates.security.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)  // More modern syntax
                .cors(cors -> cors.configure(http))    // Proper CORS configuration
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/profiles/search/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/learning-progress/**").permitAll()

                        // Travel Guides permissions
                        .requestMatchers(HttpMethod.GET, "/api/travel-guides/**").permitAll()  // Read access for all
                        .requestMatchers(HttpMethod.POST, "/api/travel-guides").authenticated() // Create requires auth
                        .requestMatchers(HttpMethod.PUT, "/api/travel-guides/**").authenticated() // Update requires auth
                        .requestMatchers(HttpMethod.DELETE, "/api/travel-guides/**").authenticated() // Delete requires auth

                        // Profile permissions
                        .requestMatchers(HttpMethod.GET, "/api/profiles/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/profiles/**").authenticated()

                        // All other requests require authentication
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(authProvider);
    }
}