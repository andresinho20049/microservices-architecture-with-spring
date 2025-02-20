#!/bin/sh

# Check if the headers are correct
if [ -z "${RESOURCE_CLIENT_ID}" ] || [ -z "${RESOURCE_SECRET_ID}" ]; then
  echo "As variáveis client_id e client_secret devem ser informadas"
  exit 1
fi

# Encode variables for basic authentication
AUTH_BASIC=$(echo -n "${RESOURCE_CLIENT_ID}:${RESOURCE_SECRET_ID}" | base64 | tr -d '\n' | tr -d ' ' )

CURL_RESPONSE=$(curl --silent ${AUTH_URI}/oauth2/token \
  --header "Authorization: Basic ${AUTH_BASIC}" \
  --header "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "grant_type=client_credentials" \
  --data-urlencode "scope=openid profile" | grep access_token || exit 1)

# Check if you have obtained an access token
ACCESS_TOKEN=$(echo $CURL_RESPONSE | tr -d '\n' | jq -r '.access_token')

# Healthcheck for `actuator/health` service on port ${GRAPHQL_PORT}
curl --fail --silent "http://localhost:${GRAPHQL_PORT}/actuator/health" \
  --header "Authorization: Bearer ${ACCESS_TOKEN}" | grep UP || exit 1