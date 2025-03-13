import { GraphQlRequestType } from "../store/features/graphql/graphql-types";

const generateGraphQlBody = (operation: "query" | "mutation", request: GraphQlRequestType | GraphQlRequestType[]) => {

    const query: string[] = [`${operation} {`];
    
    const req:GraphQlRequestType[] = Array.isArray(request) ? request : [request]; 
    for(const r of req) {
        const { name, parameters, result } = r;
        const parameterStr = propertiesToString(parameters);
        const resultStr = bodyToString(result);
        
        query.push(`${name}(${parameterStr}) {`, resultStr, "}");
    }
    query.push("}");


    return query.join(" ");

}

const propertiesToString = (data: {[key:string]:any}) => {

    if(!data) return "";

    const joinStr = ", "

    const fields = [];
    const properties = Object.keys(data);

    for (const property of properties) {
        if (Array.isArray(data[property])) {
            fields.push(`${property}: [${data[property].map((item) => `${item}`).join(joinStr)}]`);
        } else {
            fields.push(`${property}: ${data[property]}`);
        }
    } 
    
    return fields.join(joinStr);
}

const bodyToString = (data: {[key:string]:any}):string => {

    if(!data) return "";

    const joinStr = " "

    const fields = [];
    const properties = Object.keys(data);

    for (const property of properties) {
        if (typeof data[property] === "object" && Object.keys(data[property]).length > 0) {
            if(checkIfHasAttr(data[property]))
                fields.push(`${property} { ${bodyToString(data[property])} }`);
        } else if (typeof data[property] !== "object" && !!data[property]) {
            fields.push(property);
        }
    } 
    
    return fields.join(joinStr);
}

const checkIfHasAttr = (data: {[key:string]:any}):boolean => {
    const properties = Object.keys(data);
    for (const property of properties) {
        if (typeof data[property] === "object" && Object.keys(data[property]).length > 0) {
            return checkIfHasAttr(data[property]);
        } else if (typeof data[property] !== "object" && !!data[property]) {
            return true;
        }
    }
    return false;
}

export const useGraphQL = () => ({
    generateGraphQlBody
})