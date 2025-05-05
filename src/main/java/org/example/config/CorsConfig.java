package org.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    // Definierar en bean för CORS-filter. Denna bean hanterar CORS-förfrågningar.
    @Bean
    public CorsFilter corsFilter() {
        CorsConfigurationSource source = corsConfigurationSource(); // Hämtar CORS-konfigurationskällan
        return new CorsFilter(source); // Returnerar ett nytt CORS-filter med konfigurationen
    }

    // Definierar en bean för CORS-konfigurationskällan.
    // Denna bean tillhandahåller konfigurationen för att hantera CORS-förfrågningar.
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); // Skapar en konfigurationskälla baserat på URL-sökvägar
        CorsConfiguration config = new CorsConfiguration(); // Skapar ett nytt CORS-konfigurationsobjekt
        config.setAllowCredentials(true); // Tillåter cookies och autentiseringsuppgifter att inkluderas i CORS-förfrågningar
        config.addAllowedOrigin("http://localhost:4200"); // Tillåter förfrågningar från alla ursprung
        config.addAllowedHeader("*"); // Tillåter alla headers i CORS-förfrågningar
        config.addExposedHeader("Authorization"); // Tillåter auktorisering förbi Spring Security
        config.addAllowedMethod("*"); // Tillåter alla HTTP-metoder (GET, POST, etc.) i CORS-förfrågningar
        config.setMaxAge(3600L); // Tillåter caching på 1 timme
        source.registerCorsConfiguration("/**", config); // Registrerar konfigurationen för alla URL-sökvägar
        return source; // Returnerar konfigurationskällan
    }
}