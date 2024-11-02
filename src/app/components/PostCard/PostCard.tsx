"use client";

import {
  IconButton,
  Card,
  Container,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import {
  ArrowBack,
  ArrowForward,
  Delete,
  CheckBox,
  Repeat,
  Save,
  Add,
  CheckBoxOutlined,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deletePostData,
  generatePostData,
  generatePostDescriptionData,
  generatePostImgData,
  savePostData,
  selectCurrentPost,
  updateCurrentPost,
  updateCurrentPostDescription,
  updateCurrentPostImg,
  updateCurrentPostStatus,
} from "@/store/slices/postSlice";
import Image from "next/image";

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

  console.log(currentPost?.img);
  return (
    <Container
      sx={{
        width: "40%",
        height: "100vh",
      }}
    >
      <Stack direction="column" spacing={2} textAlign={"center"} p={2}>
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
            height: "450px",
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
          <Stack
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontWeight="bold">Изображение</Typography>
            {currentPost?.img && (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "55%",
                }}
              >
                <Image
                  src={`/images/${currentPost?.img}`}
                  alt="Post image"
                  layout="responsive"
                  width={100}
                  height={300}
                />
              </Box>
            )}
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
          <IconButton onClick={handleDeletePostData}>
            <Delete sx={{ fontSize: "32px" }} />
          </IconButton>
          <IconButton onClick={handleGeneratePost}>
            <Add sx={{ fontSize: "32px" }} />
          </IconButton>

          <IconButton onClick={handleUpdateStatus}>
            {currentPost?.status === "1" ? (
              <CheckBox sx={{ fontSize: "32px" }} />
            ) : (
              <CheckBoxOutlined sx={{ fontSize: "32px" }} />
            )}
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
