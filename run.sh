#!/bin/sh

docker run -it --net host \
  --env-file .env \
  -v $(pwd)/user_modules:/user_modules \
  -v $(pwd)/node_modules:/node_modules \
  ric-web