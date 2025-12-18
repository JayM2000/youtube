# step 1
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

# step 2
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only the files needed to run the app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "start" ]
