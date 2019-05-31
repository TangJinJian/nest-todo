FROM node:10.16.0

WORKDIR /nest-todo

COPY . /nest-todo

ENV TZ=Asia/Shanghai

EXPOSE 3000

# CMD ["node", "/nest-todo/dist/main.js"]

# 构建镜像
# cd /nest-todo && docker rmi tangjinjian/nest-todo:1.0.0 ; docker build --rm -f "Dockerfile" -t tangjinjian/nest-todo:1.0.0 .

# 删档测试
# docker run --rm -it -p 3000:3000 tangjinjian/nest-todo:1.0.0 bash

# 单独测试
# docker run --name nest-todo -d -p 3000:3000 tangjinjian/nest-todo:1.0.0
