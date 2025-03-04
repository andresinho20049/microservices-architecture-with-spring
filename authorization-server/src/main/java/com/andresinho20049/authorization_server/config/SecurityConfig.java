package com.andresinho20049.authorization_server.config;

import static org.springframework.security.config.Customizer.withDefaults;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.security.oauth2.server.resource.web.authentication.BearerTokenAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.MediaTypeRequestMatcher;

import com.andresinho20049.authorization_server.repository.user.UserRepository;
import com.andresinho20049.authorization_server.userdetails.UserDetailsServiceCustom;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

@Configuration
@EnableReactiveMethodSecurity
public class SecurityConfig {

	private UserRepository userRepository;
	
	public SecurityConfig(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@SuppressWarnings("removal")
	@Bean
	@Order(1)
	SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
		OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);
		
		http.getConfigurer(OAuth2AuthorizationServerConfigurer.class).oidc(withDefaults());
		http.exceptionHandling((exceptions) -> exceptions
				.defaultAuthenticationEntryPointFor(
						new LoginUrlAuthenticationEntryPoint("/login"), 
						new MediaTypeRequestMatcher(MediaType.TEXT_HTML)))
			.oauth2ResourceServer((resourceServer) -> resourceServer.jwt(withDefaults()));

		return http.build();
	}

	@Bean
	@Order(2)
	SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
		
		http
			.csrf(AbstractHttpConfigurer::disable)
			.addFilterAfter(new CustomCorsFilter(), BearerTokenAuthenticationFilter.class)
			.authorizeHttpRequests((authorize) -> authorize
				.requestMatchers(HttpMethod.OPTIONS).permitAll()
				.requestMatchers("/actuator/health", "/favicon.ico", "/error").permitAll()
				.anyRequest().authenticated())
			.formLogin(formLogin -> formLogin.loginPage("/login").permitAll());

		return http.build();
	}
	
	@Bean
    WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.debug(false)
                .ignoring()
                .requestMatchers("/webjars/**", "/images/**", "/css/**", "/assets/**", "/favicon.ico");
    }
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	UserDetailsService userDetailsService() {
		return new UserDetailsServiceCustom(userRepository);
	}

	 @Bean
	 DaoAuthenticationProvider daoAuthenticationProvider() {
	 	DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
	 	provider.setUserDetailsService(userDetailsService());
	 	provider.setPasswordEncoder(passwordEncoder());
	 	return provider;
	 }

	 @Bean
	 AuthenticationManager authenticationManager() {
	 	return new ProviderManager(daoAuthenticationProvider());
	 }
	 
	@Bean
	JWKSource<SecurityContext> jwkSource() {
		KeyPair keyPair = generateRsaKey();
		RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
		RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
		RSAKey rsaKey = new RSAKey
				.Builder(publicKey)
				.privateKey(privateKey)
				.keyID(UUID.randomUUID().toString())
				.build();
		
		JWKSet jwkSet = new JWKSet(rsaKey);
		return new ImmutableJWKSet<>(jwkSet);
	}

	private static KeyPair generateRsaKey() {
		KeyPair keyPair;
		try {
			KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
			keyPairGenerator.initialize(2048);
			keyPair = keyPairGenerator.generateKeyPair();
		} catch (Exception ex) {
			throw new IllegalStateException(ex);
		}
		return keyPair;
	}

	@Bean
	JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
		return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
	}
	
	@Bean
	OAuth2TokenCustomizer<JwtEncodingContext> jwtTokenCustomizer() { 
		return (context) -> {
			context.getClaims().claims((claims) -> { 
				userRepository.findByUsername(context.getPrincipal().getName()).ifPresent(user -> {
					Set<String> roles = user.getRoles()
							.stream()
							.filter(r -> r != null)
							.map(r -> r.getAuthority().replace("ROLE_", ""))
							.collect(Collectors.toSet());
					claims.put("roles", roles); 
				});
			});
		};
	}
	
	@Bean
	AuthorizationServerSettings authorizationServerSettings() {
		return AuthorizationServerSettings.builder().build();
	}
}
