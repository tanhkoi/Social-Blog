FROM eclipse-temurin:17
WORKDIR app
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} social-blog.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","social-blog.jar"]