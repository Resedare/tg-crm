"use client";

import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { GroupInterface, PostInterface, Status } from "@/app/utils/types";
import { getAllPosts } from "@/app/api/routes";
import { statuses } from "@/app/__mocks__/groups";
import { fetchPostInfo } from "@/store/slices/postSlice";
import { useAppDispatch } from "@/store/hooks";

const Sidebar = () => {
  const [currentGroup, setCurrentGroup] = useState<GroupInterface | null>(null);
  const dispatch = useAppDispatch();
  const [currentStatus, setCurrentStatus] = useState<Status>("");
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const handleChangeGroup = (e: SelectChangeEvent): void => {
    setCurrentGroup(e.target);
  };

  const handleChangeStatus = (e: SelectChangeEvent): void => {
    setCurrentStatus(e.target.value as Status);
  };

  const handleGetPosts = () => {
    getAllPosts(currentStatus ? currentStatus : null).then((res) => {
      setPosts(res);
    });
  };

  const handleChosePost = (hash: string) => {
    dispatch(fetchPostInfo(hash))
      .unwrap()
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <Box sx={{ height: "100dvh" }}>
      <Box
        sx={{
          width: "500px",
          maxWidth: "500px",
          height: "100%",
          backgroundColor: "lightblue",
          padding: "20px",
        }}
      >
        <Stack spacing={2}>
          <Typography>Текущая группа</Typography>
          <Select
            value={currentGroup?.name}
            defaultValue=""
            onChange={handleChangeGroup}
            sx={{ backgroundColor: "white" }}
            displayEmpty
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
          </Select>
        </Stack>
        <Stack spacing={2}>
          <Typography>Статус обработки</Typography>
          <Select
            value={currentStatus}
            onChange={handleChangeStatus}
            sx={{ backgroundColor: "white" }}
            displayEmpty
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {statuses.map((status) => {
              return (
                <MenuItem value={status} key={status}>
                  {status}
                </MenuItem>
              );
            })}
          </Select>
          <Button variant="contained" onClick={handleGetPosts}>
            Применить
          </Button>
        </Stack>
        <Stack spacing={1} sx={{ marginTop: "20px" }}>
          <Typography>Посты</Typography>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <Button
                key={post.hash}
                onClick={() => handleChosePost(post.hash)}
                sx={{
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  userSelect: "none",
                  "&:hover": {
                    backgroundColor: "#f1f1f1",
                  },
                  "&:active": {
                    backgroundColor: "#c2c2c2",
                  },
                }}
              >
                <Typography>
                  {index + 1}. {post.title}
                </Typography>
              </Button>
            ))
          ) : (
            <Typography>Нет постов для отображения</Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Sidebar;
