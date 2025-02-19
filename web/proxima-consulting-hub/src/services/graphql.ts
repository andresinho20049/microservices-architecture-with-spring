import { fetchGateway } from "../utils/gateway";

type fetchGraphqlType = {
    type: "query" | "mutation";
    content: string;
    variables: null | object;
}

export const fetchGraphql = async ({
    type,
    content,
    variables
}:fetchGraphqlType) => {

    const body = {
        [type]:content,
        variables
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: myHeaders,
        redirect: 'follow'
    };

    const data = await fetchGateway('/graphql', requestOptions)
    return await data.text();

}