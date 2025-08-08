# ---- build frontend ----
FROM node:18-alpine AS web-build
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci
COPY frontend ./frontend
RUN cd frontend && npm run build

# ---- run backend + serve frontend build ----
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# install backend deps (prod only)
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev

# copy backend source
COPY backend ./backend

# copy built frontend to ../frontend/build so your app.js path works:
# path.join(__dirname, "../frontend/build") -> /app/frontend/build
COPY --from=web-build /app/frontend/build ./frontend/build

EXPOSE 5000
CMD ["node", "backend/app.js"]
