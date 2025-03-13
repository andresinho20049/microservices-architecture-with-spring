"use client";

import { useAppSelector } from "@/hub/store/hooks";

export default function Secured() {
    const { isAuthenticated, user } = useAppSelector(state => state.auth)

    return (
        <div className="h-screen flex justify-center items-center  ">
            <div>
                <h1>{`Usuário Autenticado: ${isAuthenticated ? "Sim" : "Não"}`}</h1>
                <h2>{JSON.stringify(user)}</h2>
            </div>
        </div>
    );
}
