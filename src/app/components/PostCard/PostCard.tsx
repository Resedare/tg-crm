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
import { useAppSelector } from "@/store/hooks";
import { selectCurrentPost } from "@/store/slices";

export const PostCard = () => {
  const currentPost = useAppSelector(selectCurrentPost);

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
          <IconButton sx={{ position: "absolute", right: 8, top: 8 }}>
            <Repeat sx={{ fontSize: "28px" }} />
          </IconButton>
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
          <IconButton sx={{ position: "absolute", right: 8, top: 8 }}>
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
          <IconButton sx={{ position: "absolute", right: 8, top: 8 }}>
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
          <IconButton>
            <Add sx={{ fontSize: "32px" }} />
          </IconButton>
          <IconButton>
            <Save sx={{ fontSize: "32px" }} />
          </IconButton>
          <IconButton>
            <CheckBox sx={{ fontSize: "32px" }} />
          </IconButton>
          <IconButton>
            <ArrowForward sx={{ fontSize: "32px" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Container>
  );
};
