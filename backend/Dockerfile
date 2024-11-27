# Build stage
FROM maven:3.9.4-eclipse-temurin-22 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:22-jre
WORKDIR /app
COPY --from=build /app/target/social-blog.jar social-blog.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "social-blog.jar"]
