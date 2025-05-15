package com.skillshare.learning_updates.config;

import com.skillshare.learning_updates.security.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.Customizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
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
            .csrf().disable()
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests()
                .requestMatchers("/uploads/**").permitAll()   // Allow access to uploaded images
                .requestMatchers("/api/auth/**").permitAll()  // Allow access to auth endpoints
                .requestMatchers(HttpMethod.GET, "/api/profiles/search/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/learning-progress/**").permitAll()  // Allow public access to learning progress
                .requestMatchers(HttpMethod.GET, "/api/travel-guides/**").permitAll()      // Allow public access to travel guides
                .requestMatchers(HttpMethod.GET, "/api/profiles/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/profiles/**").authenticated()
                .anyRequest().authenticated()
            .and()
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
