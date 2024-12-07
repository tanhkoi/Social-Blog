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

    // Tạo mảng snowflake
    for (let i = 0; i < 20; i++) {
      snowflakes.push({
        x: Math.random() * width, // Vị trí ngang ngẫu nhiên
        y: Math.random() * height, // Vị trí dọc ngẫu nhiên
        size: Math.random() * 15 + 10, // Kích thước hoa tuyết nhỏ lại
        speedY: Math.random() * 1 + 0.5, // Tốc độ rơi
        speedX: Math.random() * 0.5 - 0.25, // Tốc độ gió
      });
    }

    const snowflakeImage = new Image();
    snowflakeImage.src = "src/assets/snowflake.svg"; // Đảm bảo đường dẫn đúng tới ảnh PNG với nền trong suốt

    snowflakeImage.onload = () => {
      const animate = () => {
        // Xóa canvas
        ctx.clearRect(0, 0, width, height);

        // Vẽ từng bông tuyết
        snowflakes.forEach((snowflake) => {
          ctx.drawImage(
            snowflakeImage,
            snowflake.x - snowflake.size / 2, // Căn chỉnh bông tuyết
            snowflake.y - snowflake.size / 2, // Căn chỉnh bông tuyết
            snowflake.size, // Điều chỉnh kích thước bông tuyết
            snowflake.size // Điều chỉnh kích thước bông tuyết
          );

          // Cập nhật vị trí
          snowflake.y += snowflake.speedY;
          snowflake.x += snowflake.speedX;

          // Khi hoa tuyết ra khỏi màn hình, đặt lại vị trí
          if (snowflake.y > height) snowflake.y = -snowflake.size;
          if (snowflake.x > width) snowflake.x = -snowflake.size;
          if (snowflake.x < -snowflake.size) snowflake.x = width + snowflake.size;
        });

        requestAnimationFrame(animate); // Lặp lại animation
      };

      animate();
    };

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
