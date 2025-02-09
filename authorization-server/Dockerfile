########### Stage BUILD ###########
FROM maven:3.9.9-eclipse-temurin-17-alpine as builder
WORKDIR /opt/app

#Copy pom.xml to container
COPY pom.xml ./

RUN mvn dependency:go-offline

COPY ./src ./src

RUN mvn clean
RUN mvn install package

########### Stage RUN ###########
FROM eclipse-temurin:17.0.13_11-jre-alpine-3.21 as runner
SHELL ["/bin/sh", "-c"]

RUN mkdir -p /etc/skel/

RUN echo 'history -c \
/bin/rm -f /opt/remote/.mysql_history \
/bin/rm -f /opt/remote/.history \
/bin/rm -f /opt/remote/.bash_history' >> /etc/skel/.logout

RUN echo 'set autologout = 30 \
set prompt = "$ " \
set history = 0 \
set ignoreeof' >> /etc/skel/.cshrc

RUN cp /etc/skel/.cshrc /etc/skel/.profile

# dumb-init occupies PID 1 and takes care of all the responsibilities.
RUN apk add dumb-init

# Install curl to healthcheck
RUN apk add --no-cache curl

# Define Workdir
WORKDIR /opt/app

# Add user javauser based minumum privileges
RUN addgroup -S -g 1000 javagroup && \
    adduser -S -s /bin/false -G javagroup -u 999 javauser

RUN echo "javauser:secretPass" | chpasswd

# Copy target from build stage
COPY --from=builder /opt/app/target/authorization-server-*.jar ./authorization-server.jar

RUN chmod 0 /home \
    && chmod 0 /var \
    && chmod 0 /dev \
    && chmod 0 /mnt \
    && chmod go-rw /etc \
    && chmod 0 /etc/ssl \
    && chmod 0 /etc/skel \
    && chmod +x /usr/bin/curl \
    && chmod a+rwx /usr/bin/dumb-init

RUN chown -R javauser:javagroup /opt/app 
USER javauser

ENTRYPOINT ["dumb-init", "java", "-jar", "authorization-server.jar"]
