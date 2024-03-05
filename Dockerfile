FROM node:lts-slim AS node-builder

COPY . /piScanUI
WORKDIR /piScanUI

RUN npm i
RUN npm run build

FROM nginx:stable

COPY --from=node-builder /piScanUI/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=node-builder /piScanUI/dist /usr/share/nginx/html