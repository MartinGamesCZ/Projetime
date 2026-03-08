"use client";

import { API } from "@/api/api";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    API.getHealth().then((res) => console.log(res));
  }, []);

  return <div>Hello World</div>;
}
