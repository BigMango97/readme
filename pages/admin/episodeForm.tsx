import React, { useState } from "react";
import { NextPageWithLayout } from "../_app";
import AdminLayout from "@/components/layouts/AdminLayout";
import EpisodeForm from "@/components/pages/admin/EpisodeForm";

const episodeForm: NextPageWithLayout = () => {
  return <EpisodeForm />;
};
episodeForm.getLayout = function getLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default episodeForm;
