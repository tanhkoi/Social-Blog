import { useEffect, useRef } from "react";

const SnowfallEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const snowflakes = [];
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Tạo một mảng snowflake
    for (let i = 0; i < 100; i++) {
      snowflakes.push({
        x: Math.random() * width, // Vị trí ngang ngẫu nhiên
        y: Math.random() * height, // Vị trí dọc ngẫu nhiên
        radius: Math.random() * 4 + 1, // Kích thước bông tuyết
        speedY: Math.random() * 1 + 0.5, // Tốc độ rơi
        speedX: Math.random() * 0.5 - 0.25, // Tốc độ gió
      });
    }

    const animate = () => {
      // Xóa canvas
      ctx.clearRect(0, 0, width, height);

      // Vẽ từng bông tuyết
      snowflakes.forEach((snowflake) => {
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        // Cập nhật vị trí
        snowflake.y += snowflake.speedY;
        snowflake.x += snowflake.speedX;

        // Khi bông tuyết ra khỏi màn hình, đặt lại vị trí
        if (snowflake.y > height) snowflake.y = -snowflake.radius;
        if (snowflake.x > width) snowflake.x = -snowflake.radius;
        if (snowflake.x < -snowflake.radius) snowflake.x = width + snowflake.radius;
      });

      requestAnimationFrame(animate); // Lặp lại animation
    };

    animate();

    // Dọn dẹp khi component bị unmount
    return () => {
      ctx.clearRect(0, 0, width, height);
    };
  }, []);

  return <canvas ref={canvasRef} style={styles.canvas}></canvas>;
};

const styles = {
  canvas: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 9999, // Đưa canvas lên trên
    pointerEvents: "none", // Không ảnh hưởng tương tác
    backgroundColor: "transparent", // Nền trong suốt
  },
};

export default SnowfallEffect;
