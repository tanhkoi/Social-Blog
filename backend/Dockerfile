# Build stage
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
COPY --from=build /app/target/social-blog.jar social-blog.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "social-blog.jar"]
