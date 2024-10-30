import { Stack } from "@mui/material";
import { PostCard, Sidebar } from "./components";

export default function Home() {
  return (
    <Stack direction="row">
      <Sidebar />
      <PostCard />
    </Stack>
  );
}
