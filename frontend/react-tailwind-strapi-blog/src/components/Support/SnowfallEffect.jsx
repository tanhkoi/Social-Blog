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
    for (let i = 0; i < 20; i++) {
      snowflakes.push({
        x: Math.random() * width, // Vị trí ngang ngẫu nhiên
        y: Math.random() * height, // Vị trí dọc ngẫu nhiên
        radius: Math.random() * 3 + 4, // Kích thước hoa tuyết
        speedY: Math.random() *  0.5, // Tốc độ rơi
        speedX: Math.random() * 0.5 - 0.25, // Tốc độ gió
      });
    }

    // Vẽ hoa tuyết với nhiều cánh
    const drawSnowflake = (x, y, radius) => {
      ctx.save();
      ctx.translate(x, y); // Dịch chuyển tâm để vẽ từ giữa bông hoa tuyết

      // Vẽ các cánh hoa tuyết
      ctx.strokeStyle = "#ADD8E6"; // Màu xanh nhạt
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) { // 6 cánh hoa tuyết
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -radius); // Vẽ một cánh hoa
        ctx.stroke();
        ctx.rotate(Math.PI / 3); // Xoay 60 độ để tạo thành cánh hoa
      }

      ctx.restore();
    };

    const animate = () => {
      // Xóa canvas
      ctx.clearRect(0, 0, width, height);

      // Vẽ từng bông hoa tuyết
      snowflakes.forEach((snowflake) => {
        drawSnowflake(snowflake.x, snowflake.y, snowflake.radius);

        // Cập nhật vị trí
        snowflake.y += snowflake.speedY;
        snowflake.x += snowflake.speedX;

        // Khi hoa tuyết ra khỏi màn hình, đặt lại vị trí
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
