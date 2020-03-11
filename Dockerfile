FROM labshare/docker-base-web

# Set the source folder
ARG SOURCE_FOLDER="./"

# Create app directory
WORKDIR /var/www/app

# Bundle app source
COPY ${SOURCE_FOLDER} .
