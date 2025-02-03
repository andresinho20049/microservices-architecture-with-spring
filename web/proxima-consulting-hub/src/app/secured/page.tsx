'use client'

import { useAuthenticationContext } from "@/hub/context/authentication-context";

export default function Secured() {
  const {isAuthenticated, userInfo} = useAuthenticationContext();

  return (
    <div className="w-screen h-screen flex justify-center items-center  ">
      <div>

      <h1>{`Usuário Autenticado: ${isAuthenticated ? "Sim" : "Não"}`}</h1>
      <h2>{JSON.stringify(userInfo)}</h2>
      </div>
    </div>
  );
}
