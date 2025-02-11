package com.andresinho20049.authorization_server.repository.client;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andresinho20049.authorization_server.model.client.Client;

@Repository
@Qualifier("client-repository")
public interface ClientRepository extends JpaRepository<Client, Long> {
	Optional<Client> findByClientId(String clientId);
}