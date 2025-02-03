
export default function Home() {

  return (
    <div className="w-screen h-screen flex justify-center items-center  ">
      <div>
      <form action="http://localhost:8000/oauth2/authorization/bff-client">
        <button type="submit">Login</button>
      </form>
      </div>
    </div>
  );
}
