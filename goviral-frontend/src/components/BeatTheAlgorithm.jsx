import { useEffect, useRef, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
} from "@mui/material";

const GAME_WIDTH = 700;
const GAME_HEIGHT = 360;

const PLAYER_SIZE = 30;
const ITEM_SIZE = 28;

const PLAYER_SPEED = 18;

const OBSTACLE_SPEED = 5;
const BOOST_SPEED = 4;

const SPAWN_INTERVAL = 900;
const GAME_LOOP_INTERVAL = 50;

export default function BeatTheAlgorithm({
  active = true,
}) {
  const [player, setPlayer] = useState({
    x: GAME_WIDTH / 2 - PLAYER_SIZE / 2,
    y: GAME_HEIGHT - 70,
  });

  const [obstacles, setObstacles] = useState(
    []
  );

  const [boosts, setBoosts] = useState([]);

  const [score, setScore] = useState(0);

  const [statusText, setStatusText] =
    useState("Collect boosts 🚀");

  const [hits, setHits] = useState(0);

  const gameLoopRef = useRef(null);
  const spawnLoopRef = useRef(null);

  const gameContainerRef = useRef(null);

  // ---------------------------------------
  // KEYBOARD MOVEMENT
  // ---------------------------------------

  useEffect(() => {
    gameContainerRef.current?.focus();
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!active) return;

      setPlayer((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        // LEFT
        if (
          e.key === "ArrowLeft" ||
          e.key === "a"
        ) {
          newX -= PLAYER_SPEED;
        }

        // RIGHT
        if (
          e.key === "ArrowRight" ||
          e.key === "d"
        ) {
          newX += PLAYER_SPEED;
        }

        // UP
        if (
          e.key === "ArrowUp" ||
          e.key === "w"
        ) {
          newY -= PLAYER_SPEED;
        }

        // DOWN
        if (
          e.key === "ArrowDown" ||
          e.key === "s"
        ) {
          newY += PLAYER_SPEED;
        }

        // BOUNDARIES
        newX = Math.max(
          0,
          Math.min(
            GAME_WIDTH - PLAYER_SIZE,
            newX
          )
        );

        newY = Math.max(
          0,
          Math.min(
            GAME_HEIGHT - PLAYER_SIZE,
            newY
          )
        );

        return {
          x: newX,
          y: newY,
        };
      });
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [active]);

  // ---------------------------------------
  // SPAWN ITEMS
  // ---------------------------------------

  useEffect(() => {
    if (!active) return;

    spawnLoopRef.current = setInterval(() => {
      const randomX =
        Math.random() *
        (GAME_WIDTH - ITEM_SIZE);

      const isBoost =
        Math.random() > 0.45;

      if (isBoost) {
        const boostTypes = [
          "🔥",
          "🚀",
          "❤️",
          "⚡",
        ];

        const randomBoost =
          boostTypes[
            Math.floor(
              Math.random() *
                boostTypes.length
            )
          ];

        setBoosts((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: randomX,
            y: -30,
            icon: randomBoost,
          },
        ]);
      } else {
        const obstacleTypes = [
          "🥱",
          "📉",
          "🚫",
          "😴",
        ];

        const randomObstacle =
          obstacleTypes[
            Math.floor(
              Math.random() *
                obstacleTypes.length
            )
          ];

        setObstacles((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: randomX,
            y: -30,
            icon: randomObstacle,
          },
        ]);
      }
    }, SPAWN_INTERVAL);

    return () => {
      clearInterval(spawnLoopRef.current);
    };
  }, [active]);

  // ---------------------------------------
  // COLLISION DETECTION
  // ---------------------------------------

  const isColliding = (a, b) => {
    return (
      a.x < b.x + ITEM_SIZE &&
      a.x + PLAYER_SIZE > b.x &&
      a.y < b.y + ITEM_SIZE &&
      a.y + PLAYER_SIZE > b.y
    );
  };

  // ---------------------------------------
  // GAME LOOP
  // ---------------------------------------

  useEffect(() => {
    if (!active) return;

    gameLoopRef.current = setInterval(() => {
      // MOVE OBSTACLES
      setObstacles((prev) =>
        prev
          .map((item) => ({
            ...item,
            y: item.y + OBSTACLE_SPEED,
          }))
          .filter(
            (item) =>
              item.y < GAME_HEIGHT + 50
          )
      );

      // MOVE BOOSTS
      setBoosts((prev) =>
        prev
          .map((item) => ({
            ...item,
            y: item.y + BOOST_SPEED,
          }))
          .filter(
            (item) =>
              item.y < GAME_HEIGHT + 50
          )
      );

      // HANDLE BOOST COLLISION
      setBoosts((prev) => {
        const remaining = [];

        prev.forEach((boost) => {
          if (
            isColliding(player, boost)
          ) {
            setScore(
              (prevScore) =>
                prevScore + 5
            );

            setStatusText(
              "Algorithm Boosted 🚀"
            );
          } else {
            remaining.push(boost);
          }
        });

        return remaining;
      });

      // HANDLE OBSTACLE COLLISION
      setObstacles((prev) => {
        const remaining = [];

        prev.forEach((obstacle) => {
          if (
            isColliding(
              player,
              obstacle
            )
          ) {
            setScore(
              (prevScore) =>
                Math.max(
                  0,
                  prevScore - 3
                )
            );

            setHits(
              (prevHits) =>
                prevHits + 1
            );

            setStatusText(
              "Low Retention Hit 📉"
            );
          } else {
            remaining.push(obstacle);
          }
        });

        return remaining;
      });
    }, GAME_LOOP_INTERVAL);

    return () => {
      clearInterval(gameLoopRef.current);
    };
  }, [player, active]);

  // ---------------------------------------
  // RESET STATUS MESSAGE
  // ---------------------------------------

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatusText(
        "Beat the Algorithm 🔥"
      );
    }, 1200);

    return () => clearTimeout(timeout);
  }, [statusText]);

  // ---------------------------------------
  // UI
  // ---------------------------------------

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 5,
        background:
          "linear-gradient(180deg, #111827 0%, #0f172a 100%)",
        border:
          "1px solid rgba(255,255,255,0.08)",
        color: "white",
      }}
    >
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
          >
            Beat the Algorithm
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.7,
              mt: 0.5,
            }}
          >
            Use Arrow Keys or WASD
            to move
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
        >
          <Chip
            label={`Score: ${score}`}
            color="success"
          />

          <Chip
            label={`Hits: ${hits}`}
            color="error"
          />
        </Stack>
      </Stack>

      {/* STATUS */}
      <Typography
        sx={{
          mb: 2,
          fontWeight: 600,
          color: "#93c5fd",
        }}
      >
        {statusText}
      </Typography>

      {/* GAME AREA */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: `${GAME_WIDTH}px`,
          height: `${GAME_HEIGHT}px`,
          overflow: "hidden",
          borderRadius: 4,
          mx: "auto",
          bgcolor: "#020617",
          border:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* PLAYER */}
        <Box
            // ref={gameContainerRef}
            // tabIndex={0}
          sx={{
            position: "absolute",
            left: player.x,
            top: player.y,
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            borderRadius: "10px",
            bgcolor: "#38bdf8",
            boxShadow:
              "0px 0px 18px rgba(56,189,248,0.8)",
            transition:
              "left 0.05s linear, top 0.05s linear",
            zIndex: 10,
          }}
        />

        {/* OBSTACLES */}
        {obstacles.map((item) => (
          <Box
            key={item.id}
            sx={{
              position: "absolute",
              left: item.x,
              top: item.y,
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            {item.icon}
          </Box>
        ))}

        {/* BOOSTS */}
        {boosts.map((item) => (
          <Box
            key={item.id}
            sx={{
              position: "absolute",
              left: item.x,
              top: item.y,
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            {item.icon}
          </Box>
        ))}
      </Box>

      {/* FOOTER */}
      <Typography
        align="center"
        sx={{
          mt: 2,
          opacity: 0.6,
          fontSize: "0.9rem",
        }}
      >
        AI is analyzing your content
        while you play...
      </Typography>
    </Paper>
  );
}