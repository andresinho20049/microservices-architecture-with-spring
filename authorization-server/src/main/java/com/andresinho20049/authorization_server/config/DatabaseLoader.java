package com.andresinho20049.authorization_server.config;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.stereotype.Component;

import com.andresinho20049.authorization_server.service.JpaRegisteredClientRepository;

import jakarta.annotation.PostConstruct;

@Component
public class DatabaseLoader {

    @Value("${RESOURCE_CLIENT_ID:resourceClient}")
	private String resourceClient;

	@Value("${RESOURCE_SECRET_ID:resourceSecret}")
	private String resourceSecret;

	@Value("${BFF_CLIENT_ID:bffClient}")
	private String bffClient;

	@Value("${BFF_SECRET_ID:bffSecret}")
	private String bffSecret;
	
	@Value("${GATEWAY_HOST:http://localhost:8000}")
	private String gatewayHost;
	
	@Value("${WEB_HOST:http://localhost:3000}")
	private String webHost;

    private final PasswordEncoder passwordEncoder;
    private final JpaRegisteredClientRepository jpaRegisteredClientRepository;

    public DatabaseLoader(PasswordEncoder passwordEncoder, JpaRegisteredClientRepository jpaRegisteredClientRepository) {
        this.passwordEncoder = passwordEncoder;
        this.jpaRegisteredClientRepository = jpaRegisteredClientRepository;
    }

    @PostConstruct
    private void initDatabase() {
        this.saveClientIfNotExists();
    }

    private void saveClientIfNotExists() {
        if (jpaRegisteredClientRepository.findByClientId(resourceClient) == null) {
            jpaRegisteredClientRepository.save(buildResourceClient());
        }
        if (jpaRegisteredClientRepository.findByClientId(bffClient) == null) {
            jpaRegisteredClientRepository.save(buildBffClient());
        }
    }

    private RegisteredClient buildResourceClient() { 
        return RegisteredClient
				.withId(UUID.randomUUID().toString())
				.clientId(resourceClient)
				.clientSecret(passwordEncoder.encode(resourceSecret))
                .clientName("Resource Client")
				.clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
				.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
				.authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
				.authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
				.redirectUri("%s/login/oauth2/code/oidc-client".formatted(gatewayHost))
				.postLogoutRedirectUri(gatewayHost)
				.scope(OidcScopes.OPENID)
				.scope(OidcScopes.PROFILE)
				.clientSettings(ClientSettings.builder().requireAuthorizationConsent(false).build())
				.build();
    }

    private RegisteredClient buildBffClient() {
        return RegisteredClient
        .withId(UUID.randomUUID().toString())
        .clientId(bffClient)
        .clientSecret(passwordEncoder.encode(bffSecret))
        .clientName("BFF Client")
        .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
        .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
        .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
        .redirectUri("%s/callback".formatted(webHost))
        .postLogoutRedirectUri(webHost)
        .scope(OidcScopes.OPENID)
        .scope(OidcScopes.PROFILE)
        .clientSettings(ClientSettings.builder().requireAuthorizationConsent(false).build())
        .build();
    }

}
