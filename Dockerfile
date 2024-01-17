FROM artifactory.wma.chs.usgs.gov/docker-official-mirror/debian:stable

LABEL maintainer="gw-w_vizlab@usgs.gov"

# Run updates and install curl
RUN apt-get update && \
      apt-get install -y ca-certificates curl gnupg && \
      mkdir -p /etc/apt/keyrings

# Enable the NodeSource repository and install the latest nodejs
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
      NODE_MAJOR=20 && \
      echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
      apt-get update && \
      apt-get install nodejs -y

# Create temp directory for building viz app
ARG VITE_APP_TITLE="project"
RUN mkdir -p /tmp/$VITE_APP_TITLE

# Copy source code
WORKDIR /tmp/$VITE_APP_TITLE
COPY . .
# Set environment variables for build target and tile source and then run config.sh
ARG BUILD_DEST="test"
ARG VUE_BUILD_MODE="test"
ENV E_BUILD_DEST=$BUILD_DEST
ENV E_VUE_BUILD_MODE=$VUE_BUILD_MODE

# Build the Vue app.
RUN npm install
RUN chmod +x ./build.sh && ./build.sh

