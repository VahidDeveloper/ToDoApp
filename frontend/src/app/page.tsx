import React from "react";
import { Metadata } from "next";

import ECommerce from "./Dashboard";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Vika",
  description: "Vika dashboard",
};

function Home() {
  return (
    <>
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
    </>
  );
}
export default Home;