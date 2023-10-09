import { useEffect } from "react";
import Admindashboard from "./admin-dashboard";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();
  useEffect(() => {
    router.push("/login")
  })
  return (
    <>
      {/* <Admindashboard/> */}

    </>
  );
}
