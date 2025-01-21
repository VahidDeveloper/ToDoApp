import React from "react";
import { Metadata } from "next";

import ECommerce from "./Dashboard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Demo",
  description: "Demo dashboard"
};

function Home() {
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}

export default Home;