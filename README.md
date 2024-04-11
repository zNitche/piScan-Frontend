## piScanUI

Web UI for [piScan](https://github.com/zNitche/piScan) system. 

---

### Technologies
- React 18.2
- Vite 5.1.4
- Typescript 5.2.2
- wouter 3.0.1
- nginx

### Features
- Scanning devices (scanners / pronters) management
- Inifinite scroll for files preview + search support
- Starting + monitoring scanning processes
- Intefgrated with eslint and prettier

### Setup
#### Dev
1. Create `.env` file
```
cp .env.template .env
```
2. Set `VITE_API_URL` to API url, for example
```
http://127.0.0.1:8000/api
```
3. Install dependencies
```
npm i
```
4. Start dev server
```
npm run dev
```
#### Prod
1. Create `.env` file
```
cp .env.template .env
```
2. Set `VITE_API_URL` to API url, for example
```
http://127.0.0.1:8000/api
```
3. Build docker image
```
docker compose build
```
4. Serve app via nginx
```
docker compose up -d
```