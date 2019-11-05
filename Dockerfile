FROM node:12.13.0

COPY . /root

ENV TZ=Asia/Shanghai

EXPOSE 3000

CMD ["/root/wait-for-it.sh", "$MONGO_HOST:$MONGO_PORT", "--", "node", "/root/dist/main.js"]
