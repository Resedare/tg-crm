"use client";

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
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  generatePostData,
  generatePostDescriptionData,
  generatePostImgData,
  savePostData,
  selectCurrentPost,
  updateCurrentPost,
  updateCurrentPostDescription,
  updateCurrentPostImg,
} from "@/store/slices/postSlice";

export const PostCard = () => {
  const currentPost = useAppSelector(selectCurrentPost);
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
          <Stack spacing={1}>
            <Typography fontWeight="bold">Мини-задание:</Typography>
            <Typography>{currentPost?.title}</Typography>
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
