"use client";

import {
  Box,
  Button,
  Chip,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { groupsNames, statuses } from "@/app/__mocks__/groups";
import {
  GroupInterface,
  PostInterface,
  Status,
} from "@/app/__mocks__/groups-types";
import { getAllPosts } from "@/app/api/routes";

const Sidebar = () => {
  const [currentGroup, setCurrentGroup] = useState<GroupInterface | null>(null);
  const [currentStatus, setCurrentStatus] = useState<Status>("");

  const handleChangeGroup = (e: SelectChangeEvent): void => {
    setCurrentGroup(e.target);
  };
  const handleChangeStatus = (e: SelectChangeEvent): void => {
    setCurrentStatus(e.target.value as Status);
  };

  const handleGetPosts = () => {
    getAllPosts("1").then((res) => {
      console.log(res);
    });
  };

  return (
    <Box sx={{ height: "100dvh" }}>
      <Box
        sx={{
          minWidth: "30%",
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
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {groupsNames.map((group) => {
              return (
                <MenuItem value={group.name} key={group.name}>
                  {group.name}
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
        <Stack spacing={1}>
          <Typography>Посты</Typography>
          <Stack spacing={2}>
            {groupsNames[0].posts?.map((post: PostInterface) => {
              return (
                <Stack key={post.id} spacing={2}>
                  <Chip
                    sx={{ maxWidth: "80%" }}
                    label={`ID: ${post.id} Заголовок: ${post.title}`}
                  />
                  <Divider />
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Sidebar;
