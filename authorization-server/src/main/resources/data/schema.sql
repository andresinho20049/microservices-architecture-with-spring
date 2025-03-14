CREATE TABLE IF NOT EXISTS client (
    id BIGINT NOT NULL,
    client_id VARCHAR(255) NOT NULL,
    client_id_issued_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    client_secret VARCHAR(255) DEFAULT NULL,
    client_secret_expires_at timestamp DEFAULT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_authentication_methods VARCHAR(1000) NOT NULL,
    authorization_grant_types VARCHAR(1000) NOT NULL,
    redirect_uris VARCHAR(1000) DEFAULT NULL,
    post_logout_redirect_uris VARCHAR(1000) DEFAULT NULL,
    scopes VARCHAR(1000) NOT NULL,
    client_settings VARCHAR(2000) NOT NULL,
    token_settings VARCHAR(2000) NOT NULL,
    CONSTRAINT CLIENT_PK PRIMARY KEY (id),
    CONSTRAINT CLIENT_UNIQUE_CLIENT_ID UNIQUE (client_id)
);

CREATE SEQUENCE IF NOT EXISTS client_id_seq 
    INCREMENT BY 1 START WITH 1 
    MINVALUE -9223372036854775808 
    MAXVALUE 9223372036854775807
    OWNED BY client.id;

ALTER TABLE client ALTER COLUMN id SET DEFAULT nextval('client_id_seq');

CREATE TABLE IF NOT EXISTS authorization_consent (
    registered_client_id VARCHAR(255) NOT NULL,
    principal_name VARCHAR(255) NOT NULL,
    authorities VARCHAR(1000) NOT NULL,
    CONSTRAINT AUTH_CONSENT_PK PRIMARY KEY (registered_client_id, principal_name)
);

CREATE TABLE IF NOT EXISTS oauth2_auth (
    id VARCHAR(255) NOT NULL,
    registered_client_id VARCHAR(255) NOT NULL,
    principal_name VARCHAR(255) NOT NULL,
    authorization_grant_type VARCHAR(255) NOT NULL,
    authorized_scopes VARCHAR(1000) DEFAULT NULL,
    attributes VARCHAR(4000) DEFAULT NULL,
    state_name VARCHAR(500) DEFAULT NULL,
    authorization_code_value VARCHAR(4000) DEFAULT NULL,
    authorization_code_issued_at timestamp DEFAULT NULL,
    authorization_code_expires_at timestamp DEFAULT NULL,
    authorization_code_metadata VARCHAR(2000) DEFAULT NULL,
    access_token_value VARCHAR(4000) DEFAULT NULL,
    access_token_issued_at timestamp DEFAULT NULL,
    access_token_expires_at timestamp DEFAULT NULL,
    access_token_metadata VARCHAR(2000) DEFAULT NULL,
    access_token_type VARCHAR(255) DEFAULT NULL,
    access_token_scopes VARCHAR(1000) DEFAULT NULL,
    refresh_token_value VARCHAR(4000) DEFAULT NULL,
    refresh_token_issued_at timestamp DEFAULT NULL,
    refresh_token_expires_at timestamp DEFAULT NULL,
    refresh_token_metadata VARCHAR(2000) DEFAULT NULL,
    oidc_id_token_value VARCHAR(4000) DEFAULT NULL,
    oidc_id_token_issued_at timestamp DEFAULT NULL,
    oidc_id_token_expires_at timestamp DEFAULT NULL,
    oidc_id_token_metadata VARCHAR(2000) DEFAULT NULL,
    oidc_id_token_claims VARCHAR(2000) DEFAULT NULL,
    user_code_value VARCHAR(4000) DEFAULT NULL,
    user_code_issued_at timestamp DEFAULT NULL,
    user_code_expires_at timestamp DEFAULT NULL,
    user_code_metadata VARCHAR(2000) DEFAULT NULL,
    device_code_value VARCHAR(4000) DEFAULT NULL,
    device_code_issued_at timestamp DEFAULT NULL,
    device_code_expires_at timestamp DEFAULT NULL,
    device_code_metadata VARCHAR(2000) DEFAULT NULL,
    CONSTRAINT OAUTH2_AUTH_PK PRIMARY KEY (id)
);

--Users and Authorities
CREATE TABLE IF NOT EXISTS users (
	id BIGINT NOT NULL,
    username VARCHAR(50) NOT NULL,
	password VARCHAR(500) NOT NULL,
	enabled BOOLEAN NOT NULL DEFAULT false,
    update_password BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT USERS_PK PRIMARY KEY (id),
    CONSTRAINT USERS_UNIQUE_USERNAME UNIQUE (username)
);

CREATE SEQUENCE IF NOT EXISTS users_id_seq 
    INCREMENT BY 1 START WITH 1 
    MINVALUE -9223372036854775808 
    MAXVALUE 9223372036854775807
    OWNED BY users.id;

ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_id_seq');

CREATE TABLE IF NOT EXISTS roles (
    id BIGINT NOT NULL,
	name VARCHAR(50) NOT NULL,

    CONSTRAINT ROLES_PK PRIMARY KEY (id),
    CONSTRAINT ROLES_UNIQUE_NAME UNIQUE (name)
);

CREATE SEQUENCE IF NOT EXISTS roles_id_seq 
    INCREMENT BY 1 START WITH 1 
    MINVALUE -9223372036854775808 
    MAXVALUE 9223372036854775807
    OWNED BY roles.id;

ALTER TABLE roles ALTER COLUMN id SET DEFAULT nextval('roles_id_seq');

CREATE TABLE IF NOT EXISTS users_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,

    CONSTRAINT USERS_ROLES_PK PRIMARY KEY (user_id, role_id),
    CONSTRAINT USERS_ROLES_FK_USER FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT USERS_ROLES_FK_ROLE FOREIGN KEY (role_id) REFERENCES roles(id)
);