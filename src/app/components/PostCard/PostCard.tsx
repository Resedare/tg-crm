"use client";

import {
  IconButton,
  Card,
  Container,
  Stack,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IconButton, Card, Container, Stack, Typography } from "@mui/material";
import React from "react";
import {
  ArrowBack,
  ArrowForward,
  Close,
  CheckBox,
  Repeat,
  Save,
  Add,
  CheckBoxOutlined,
  Edit,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  generatePostData,
  generatePostDescriptionData,
  generatePostImgData,
  savePostData,
  selectCurrentPost,
  selectTitleEditing,
  updateCurrentPost,
  updateCurrentPostDescription,
  updateCurrentPostImg,
  updateCurrentPostStatus,
  updateCurrentPostTitle,
  updateTitleEditing,
} from "@/store/slices/postSlice";

export const PostCard = () => {
  const currentPost = useAppSelector(selectCurrentPost);
  const isTitleEditing = useAppSelector(selectTitleEditing);
  const [titleText, setTitleText] = useState<string>(currentPost?.title || "");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentPost?.title) {
      setTitleText(currentPost.title);
    }
  }, [currentPost?.title]);

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

  const handleUpdateStatus = () => {
    if (currentPost) {
      dispatch(updateCurrentPostStatus(currentPost.status === "0" ? "1" : "0"));
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

  console.log(currentPost);
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
              <Typography>{currentPost?.title}</Typography>
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
            <Typography>{currentPost?.img}</Typography>
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
            <Typography textAlign="justify">
              {currentPost?.description}
            </Typography>
          </Stack>
        </Card>

        <Stack
          direction="row"
          width={"100%"}
          justifyContent={"space-between"}
          mt={2}
        >
          <IconButton>
            <ArrowBack sx={{ fontSize: "32px" }} />
          </IconButton>
          <IconButton>
            <Close sx={{ fontSize: "32px" }} />
          </IconButton>
          <IconButton onClick={handleGeneratePost}>
            <Add sx={{ fontSize: "32px" }} />
          </IconButton>
          <IconButton>
            <CheckBox sx={{ fontSize: "32px" }} />
          </IconButton>
          <IconButton onClick={handleSavePostData}>
            <Save sx={{ fontSize: "40px" }} />
          </IconButton>
          <IconButton>
            <ArrowForward sx={{ fontSize: "32px" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Container>
  );
};
