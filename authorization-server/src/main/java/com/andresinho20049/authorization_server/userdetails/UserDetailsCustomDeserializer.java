package com.andresinho20049.authorization_server.userdetails;

import java.io.IOException;

import com.andresinho20049.authorization_server.model.user.User;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.MissingNode;

public class UserDetailsCustomDeserializer extends JsonDeserializer<UserDetailsCustom> {
	
	@Override
    public UserDetailsCustom deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        ObjectMapper mapper = (ObjectMapper) jsonParser.getCodec();
        JsonNode jsonNode = mapper.readTree(jsonParser);

        boolean enabled = readJsonNode(jsonNode, "enabled").asBoolean();
        String username = readJsonNode(jsonNode, "username").asText();
        boolean updatePassword = readJsonNode(jsonNode, "updatePassword").asBoolean();

        User user = new User()
                .withUsername(username)
                .withUpdatePassword(updatePassword)
                .withEnabled(enabled)
                .build();

        return new UserDetailsCustom(user);
    }

    private JsonNode readJsonNode(JsonNode jsonNode, String field) {
        if (jsonNode.has(field)) {
            return jsonNode.get(field);
        }
        return MissingNode.getInstance();
    }
    
}