// import Image from "next/image";

//import GirisSayfasi from "./services/example";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-accent text-deep-dark p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to Indie Tester!</h1>
      <div className="flex gap-4">
        <Link href="/login">
          <button className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-dark text-white px-6 py-2 rounded hover:bg-deep-dark transition">
            Register
          </button>
        </Link>
      </div>
      {/*<GirisSayfasi/>*/}
    </div>
  );
}
