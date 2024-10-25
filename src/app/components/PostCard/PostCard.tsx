"use client";

import {
  IconButton,
  Card,
  Container,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import {
  ArrowBack,
  ArrowForward,
  Close,
  CheckBox,
  Repeat,
  Save,
} from "@mui/icons-material";

const PostCard = () => {
  return (
    <Container sx={{ width: "40%", height: "100dvh" }}>
      <Stack
        direction="column"
        spacing={3}
        textAlign={"center"}
        p={2}
        height={"100%"}
      >
        <Stack direction="row" justifyContent={"center"}>
          <Typography>Хэш поста </Typography>&nbsp;
          <Typography>(категория)</Typography>
        </Stack>
        <Card
          sx={{
            backgroundColor: "lightblue",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "center", position: "relative" }}
          >
            <Stack>
              <Typography>Мини-задание:</Typography>
              <Typography>"Название"</Typography>
            </Stack>
            <IconButton
              sx={{ position: "absolute", right: 0, top: 0, bottom: 0 }}
            >
              <Repeat sx={{ fontSize: "36px" }} />
            </IconButton>
          </Stack>
        </Card>
        <Card
          sx={{
            backgroundColor: "lightblue",
            height: "50%",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "center", position: "relative" }}
          >
            <Stack>
              <Typography>Изображение</Typography>
              <Typography>"Название"</Typography>
            </Stack>
            <IconButton
              sx={{ position: "absolute", right: 0, top: 0, bottom: 0 }}
            >
              <Repeat sx={{ fontSize: "36px" }} />
            </IconButton>
          </Stack>
        </Card>
        <Card
          sx={{
            backgroundColor: "lightblue",
            height: "20%",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "center", position: "relative" }}
          >
            <Stack>
              <Typography>Мини-задание:</Typography>
              <Typography>Текст</Typography>
            </Stack>
            <IconButton
              sx={{ position: "absolute", right: 0, top: 0, bottom: 0 }}
            >
              <Repeat sx={{ fontSize: "36px" }} />
            </IconButton>
          </Stack>
        </Card>
        <Stack direction="row" width={"100%"} justifyContent={"space-between"}>
          <IconButton>
            <ArrowBack sx={{ fontSize: "40px" }} />
          </IconButton>
          <IconButton>
            <Close sx={{ fontSize: "40px" }} />
          </IconButton>
          <IconButton>
            {/* some condition ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon /> */}
            {<CheckBox sx={{ fontSize: "40px" }} />}
          </IconButton>
          <IconButton>
            <Save sx={{ fontSize: "40px" }} />
          </IconButton>
          <IconButton>
            <ArrowForward sx={{ fontSize: "40px" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Container>
  );
};

export default PostCard;
