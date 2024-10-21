import { Stack } from "@mui/material";
import PostCard from "./components/PostCard/PostCard";
import Sidebar from "./components/Sidebar/Sidebar";

export default function Home() {
  return (
    <Stack direction="row">
      <Sidebar />
      <PostCard />
    </Stack>
  );
}
