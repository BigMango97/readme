import React, { useState } from "react";
import NovelForm from "@/components/pages/admin/NovelForm";
import { NextPageWithLayout } from "../_app";
import AdminLayout from "@/components/layouts/AdminLayout";

const novelForm: NextPageWithLayout = () => {
  return <NovelForm />;
};
novelForm.getLayout = function getLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default novelForm;
