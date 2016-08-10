FROM ubuntu:latest
MAINTAINER Ricardo M. Correia <rcorreia@wizy.org>
RUN apt-get update
RUN apt-get -y dist-upgrade
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
RUN apt-get -y install rsync
RUN apt-get -y install ruby ruby-dev rubygems build-essential libz-dev libcurl4-openssl-dev
RUN gem install html-proofer
RUN apt-get -y install default-jre-headless
RUN apt-get -y install npm nodejs nodejs-legacy
RUN npm install -g grunt-cli
WORKDIR /tmp/project
RUN npm init -f
RUN npm install grunt --save-dev
RUN npm install grunt-html --save-dev
RUN npm install grunt-bootlint --save-dev
RUN npm install grunt-contrib-csslint --save-dev
RUN npm install grunt-eslint --save-dev