export const gatewayHost = process.env.GATEWAY_HOST || "http://localhost:8000";

type inputGatewayType = string | URL;

export const fetchGateway = (
    input: inputGatewayType,
    init?: RequestInit
): Promise<Response> => {
    const url = new URL(input, gatewayHost);
    const setup: RequestInit = {
        credentials: "include",
        ...init,
    };

    return fetch(url, setup);
};
