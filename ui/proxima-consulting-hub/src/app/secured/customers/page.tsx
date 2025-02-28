'use client'

import { fetchGraphql } from "@/hub/services/graphql";
import { useEffect, useState } from "react";


export default function Graphiql() {
    
    const [state, setState] = useState<string>('');
    
    useEffect(() => {
        fetchGraphql({type: "query", content: "{companyById(id: 1) {id name}}", variables: null})
            .then(res=>setState(res))
    }, [])

    return (
        <div className="w-full h-full flex justify-center items-center">
            {state}
        </div>
    )
}