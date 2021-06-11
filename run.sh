#!/bin/sh

docker run -it \
  --env-file .env \
  --net host \
  -v $(pwd)/user_modules:/user_modules \
  -v $(pwd)/node_modules:/node_modules \
  ric-web