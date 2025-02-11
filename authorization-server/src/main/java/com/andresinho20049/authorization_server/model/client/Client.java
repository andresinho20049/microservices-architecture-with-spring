package com.andresinho20049.authorization_server.model.client;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "client")
public class Client {
	
	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "client_id", nullable = false, updatable = false, unique = true)
	private String clientId;
	
	@CreationTimestamp
	@Column(name = "client_id_issued_at")
	private Instant clientIdIssuedAt;

	@Column(name = "client_secret")
	private String clientSecret;

	@Column(name = "client_secret_expires_at")
	private Instant clientSecretExpiresAt;

	@Column(name = "client_name")
	private String clientName;
	
	@Column(name = "client_authentication_methods", length = 1000)
	private String clientAuthenticationMethods;
	
	@Column(name = "authorization_grant_types", length = 1000)
	private String authorizationGrantTypes;
	
	@Column(name = "redirect_uris", length = 1000)
	private String redirectUris;
	
	@Column(name = "post_logout_redirect_uris", length = 1000)
	private String postLogoutRedirectUris;
	
	@Column(name = "scopes", length = 1000)
	private String scopes;
	
	@Column(name = "client_settings", length = 2000)
	private String clientSettings;
	
	@Column(name = "token_settings", length = 2000)
	private String tokenSettings;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public Instant getClientIdIssuedAt() {
		return clientIdIssuedAt;
	}

	public void setClientIdIssuedAt(Instant clientIdIssuedAt) {
		this.clientIdIssuedAt = clientIdIssuedAt;
	}

	public String getClientSecret() {
		return clientSecret;
	}

	public void setClientSecret(String clientSecret) {
		this.clientSecret = clientSecret;
	}

	public Instant getClientSecretExpiresAt() {
		return clientSecretExpiresAt;
	}

	public void setClientSecretExpiresAt(Instant clientSecretExpiresAt) {
		this.clientSecretExpiresAt = clientSecretExpiresAt;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getClientAuthenticationMethods() {
		return clientAuthenticationMethods;
	}

	public void setClientAuthenticationMethods(String clientAuthenticationMethods) {
		this.clientAuthenticationMethods = clientAuthenticationMethods;
	}

	public String getAuthorizationGrantTypes() {
		return authorizationGrantTypes;
	}

	public void setAuthorizationGrantTypes(String authorizationGrantTypes) {
		this.authorizationGrantTypes = authorizationGrantTypes;
	}

	public String getRedirectUris() {
		return redirectUris;
	}

	public void setRedirectUris(String redirectUris) {
		this.redirectUris = redirectUris;
	}

	public String getPostLogoutRedirectUris() {
		return this.postLogoutRedirectUris;
	}

	public void setPostLogoutRedirectUris(String postLogoutRedirectUris) {
		this.postLogoutRedirectUris = postLogoutRedirectUris;
	}

	public String getScopes() {
		return scopes;
	}

	public void setScopes(String scopes) {
		this.scopes = scopes;
	}

	public String getClientSettings() {
		return clientSettings;
	}

	public void setClientSettings(String clientSettings) {
		this.clientSettings = clientSettings;
	}

	public String getTokenSettings() {
		return tokenSettings;
	}

	public void setTokenSettings(String tokenSettings) {
		this.tokenSettings = tokenSettings;
	}
}