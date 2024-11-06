"use client";

import {
  IconButton,
  Card,
  Container,
  Stack,
  Typography,
  TextField,
  CircularProgress,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import {
  CheckBox,
  Repeat,
  Save,
  Add,
  Edit,
  Delete,
  FileCopy,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deletePostData,
  generatePostData,
  generatePostDescriptionData,
  generatePostImgData,
  getTextData,
  savePostData,
  selectCurrentPost,
  selectIsLoading,
  selectTitleEditing,
  updateCurrentPost,
  updateCurrentPostDescription,
  updateCurrentPostImg,
  updateCurrentPostStatus,
  updateCurrentPostTitle,
  updateTitleEditing,
} from "@/store/slices/postSlice";
import { statuses, statusLabels } from "@/app/utils/constants";

export const PostCard = () => {
  const currentPost = useAppSelector(selectCurrentPost);
  const isTitleEditing = useAppSelector(selectTitleEditing);
  const isLoading = useAppSelector(selectIsLoading);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [titleText, setTitleText] = useState<string>(currentPost?.title || "");
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();

  const handleGeneratePost = () => {
    if (currentPost) {
      dispatch(generatePostData(currentPost.category))
        .unwrap()
        .then((res) => dispatch(updateCurrentPost(res)));
    }
  };
  const handleGenerateDescription = () => {
    if (currentPost) {
      dispatch(
        generatePostDescriptionData({
          text: currentPost?.title,
          category: currentPost?.category,
        })
      )
        .unwrap()
        .then((res) => dispatch(updateCurrentPostDescription(res.text)));
    }
  };

  const handleGenerateImg = () => {
    if (currentPost) {
      dispatch(
        generatePostImgData({
          text: currentPost?.title,
          category: currentPost?.category,
        })
      )
        .unwrap()
        .then((res) => dispatch(updateCurrentPostImg(res.img)));
    }
  };

  const handleSavePostData = () => {
    if (currentPost) {
      dispatch(savePostData(currentPost));
    }
  };

  const handleUpdateStatus = (value: string) => {
    if (currentPost) {
      dispatch(updateCurrentPostStatus(value));
    }
  };

  const handleDeletePostData = () => {
    if (currentPost) {
      dispatch(deletePostData(currentPost.hash)).then((res) =>
        dispatch(updateCurrentPost(null))
      );
    }
  };

  const handleEditTitle = () => {
    dispatch(updateTitleEditing());
  };

  const handleSaveTitle = (value: string) => {
    if (currentPost) {
      dispatch(updateCurrentPostTitle(value));
      dispatch(updateTitleEditing());
    }
  };

  const handleGetText = () => {
    if (currentPost) {
      dispatch(getTextData(currentPost.hash))
        .unwrap()
        .then((res) => {
          setIsCopied(true);
          navigator.clipboard.writeText(res.text);

          if (copyTimeoutRef.current) {
            clearTimeout(copyTimeoutRef.current);
          }

          copyTimeoutRef.current = setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        })
        .catch((error) => console.error("Failed to copy text:", error));
    }
  };

  useEffect(() => {
    if (currentPost?.title) {
      setTitleText(currentPost.title);
    }
  }, [currentPost?.title]);

  useEffect(() => {
    setIsCopied(false);
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, [currentPost]);

  return (
    <Container
      sx={{
        width: "40%",
        height: "100vh",
      }}
    >
      <Stack direction="column" spacing={3} textAlign={"center"} p={2}>
        <Stack
          direction="row"
          justifyContent={"center"}
          alignItems="center"
          spacing={1}
        >
          <Typography
            sx={{
              color: "gray",
              fontWeight: "bold",
            }}
          >
            {currentPost?.hash}
          </Typography>
          <Typography>|</Typography>
          <Typography
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
              letterSpacing: "0.1em",
            }}
          >
            {currentPost?.category}
          </Typography>
        </Stack>

        <Card
          sx={{
            backgroundColor: "lightblue",
            padding: "16px",
            borderRadius: "4px",
            overflowY: "auto",
            position: "relative",
            boxShadow: 4,
          }}
        >
          {isTitleEditing ? (
            <IconButton
              sx={{ position: "absolute", left: 8, top: 8 }}
              onClick={() => handleSaveTitle(titleText)}
            >
              <Save />
            </IconButton>
          ) : (
            <IconButton
              sx={{ position: "absolute", left: 8, top: 8 }}
              onClick={handleEditTitle}
            >
              <Edit />
            </IconButton>
          )}
          <Stack spacing={1}>
            <Typography fontWeight="bold">Мини-задание:</Typography>
            {isTitleEditing ? (
              <TextField
                onChange={(e) => setTitleText(e.target.value)}
                value={titleText}
              />
            ) : (
              <Stack direction="row" justifyContent={"center"}>
                {isLoading.generatePostData ? (
                  <CircularProgress />
                ) : (
                  <Typography textAlign="justify">
                    {currentPost?.title}
                  </Typography>
                )}
              </Stack>
            )}
          </Stack>
        </Card>

        <Card
          sx={{
            backgroundColor: "lightblue",
            height: "600px",
            padding: "16px",
            borderRadius: "12px",
            overflowY: "auto",
            position: "relative",
            boxShadow: 8,
          }}
        >
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={handleGenerateImg}
          >
            <Repeat sx={{ fontSize: "28px" }} />
          </IconButton>
          <Stack spacing={1}>
            <Typography fontWeight="bold">Изображение</Typography>
            <Stack direction="row" justifyContent={"center"}>
              {isLoading.generatePostImgData || isLoading.generatePostData ? (
                <CircularProgress />
              ) : (
                <Typography textAlign="justify">{currentPost?.img}</Typography>
              )}
            </Stack>
          </Stack>
        </Card>

        <Card
          sx={{
            backgroundColor: "lightblue",
            padding: "16px",
            borderRadius: "4px",
            position: "relative",
            overflowY: "auto",
            boxShadow: 4,
          }}
        >
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={handleGenerateDescription}
          >
            <Repeat sx={{ fontSize: "28px" }} />
          </IconButton>
          <IconButton
            sx={{ position: "absolute", left: 8, top: 8 }}
            onClick={handleGenerateImg}
          >
            <Edit />
          </IconButton>
          <Stack spacing={1}>
            <Typography fontWeight="bold">Мини-задание:</Typography>
            <Stack direction="row" justifyContent={"center"}>
              {isLoading.generatePostDescriptionData ||
              isLoading.generatePostData ? (
                <CircularProgress />
              ) : (
                <Typography textAlign="justify">
                  {currentPost?.description}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Card>

        <Stack
          direction="row"
          width={"100%"}
          justifyContent={"space-between"}
          mt={2}
        >
          <IconButton onClick={handleDeletePostData}>
            <Delete sx={{ fontSize: "32px" }} />
          </IconButton>
          <IconButton onClick={handleGeneratePost}>
            <Add sx={{ fontSize: "32px" }} />
          </IconButton>
          <Select
            onChange={(e) => handleUpdateStatus(e.target.value)}
            value={currentPost?.status === undefined ? "" : currentPost.status}
          >
            {statuses.map((status) => {
              return (
                <MenuItem key={status} value={status}>
                  {statusLabels[parseInt(status)]}
                </MenuItem>
              );
            })}
          </Select>
          {isLoading.savePostData ? (
            <CircularProgress />
          ) : (
            <IconButton onClick={handleSavePostData}>
              <Save sx={{ fontSize: "40px" }} />
            </IconButton>
          )}
          <IconButton
            onClick={handleGetText}
            color={isCopied ? "success" : "default"}
          >
            <FileCopy sx={{ fontSize: "32px" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Container>
  );
};
