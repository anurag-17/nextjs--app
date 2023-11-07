import { useEffect } from "react";
import { useRouter } from "next/router";
import AllProduct from "../components/UserModule/AllProduct";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <AllProduct />
    </>
  );
}
