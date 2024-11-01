import React from "react";
import { Sidebar } from "../Sidebar";
import { PostCard } from "../PostCard";
import { Stack } from "@mui/material";

const MainPageComponent = () => {
  return (
    <Stack direction="row">
      <Sidebar />
      <PostCard />
    </Stack>
  );
};

export default MainPageComponent;
