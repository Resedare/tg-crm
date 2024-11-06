"use client";

import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { getAllPosts } from "@/app/api";
import { GroupInterface, PostInterface, Status } from "@/app/utils/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPostInfo,
  selectCurrentPost,
  selectIsLoading,
  updateCurrentPost,
} from "@/store/slices";
import { categories, statuses, statusLabels } from "@/app/utils/constants";

export const Sidebar = () => {
  const [currentGroup, setCurrentGroup] = useState<GroupInterface | null>(null);
  const [currentStatus, setCurrentStatus] = useState<Status>("");
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const currentPost = useAppSelector(selectCurrentPost);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleGetPosts();
  }, [currentPost]);

  const handleChangeGroup = (e: SelectChangeEvent): void => {
    setCurrentGroup(e.target);
  };

  const handleChangeStatus = (e: SelectChangeEvent): void => {
    setCurrentStatus(e.target.value as Status);
  };

  const handleGetPosts = useCallback(() => {
    getAllPosts(currentStatus ? currentStatus : null).then((res) => {
      if (currentGroup?.value) {
        const filteredPosts = res.filter(
          (post: PostInterface) => post.category == currentGroup.value
        );
        setPosts(filteredPosts);
      } else {
        setPosts(res);
      }
    });
  }, [currentStatus, currentGroup]);

  const handleChosePost = (hash: string) => {
    dispatch(fetchPostInfo(hash))
      .unwrap()
      .then((post) => {
        dispatch(updateCurrentPost(post));
      })
      .catch((error) => {
        console.error("Ошибка при выборе поста:", error);
      });
  };

  return (
    <Box sx={{ height: "100dvh", position: "relative" }}>
      {isLoading.fetchPostInfo && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "500px",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box
        sx={{
          width: "500px",
          maxWidth: "500px",
          height: "100%",
          backgroundColor: "lightblue",
          padding: "20px",
          overflow: "auto",
        }}
      >
        <Stack spacing={2}>
          <Typography>Текущая группа</Typography>
          <Select
            value={currentGroup?.value}
            defaultValue=""
            onChange={handleChangeGroup}
            sx={{ backgroundColor: "white" }}
            displayEmpty
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {categories.map((category) => {
              return (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              );
            })}
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
                  {statusLabels[parseFloat(status)]}
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
                  width: "100%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  "&:hover": {
                    width: "100%",
                    backgroundColor: "#f1f1f1",
                  },
                  "&:active": {
                    backgroundColor: "#c2c2c2",
                  },
                }}
              >
                <Box
                  sx={{
                    textAlign: "left",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "gray",
                      display: "inline",
                      whiteSpace: "nowrap",
                      textTransform: "none",
                    }}
                  >
                    {index + 1} | {post.hash} |
                  </Typography>
                  <Typography
                    sx={{
                      textTransform: "none",
                      marginLeft: "8px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flexShrink: 1,
                    }}
                  >
                    {post.title}
                  </Typography>
                </Box>
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
