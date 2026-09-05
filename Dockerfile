FROM mcr.microsoft.com/playwright:v1.62.1-jammy

ENV CI=true

WORKDIR /app

COPY package*.json ./

# Clean install dependencies
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"] 