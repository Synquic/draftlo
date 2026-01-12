# Draftlo Docker Deployment Guide

This guide will help you deploy the Draftlo application using Docker for easy panel deployment.

## Prerequisites

- Docker installed on your system ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (comes with Docker Desktop)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Synquic/draftlo.git
cd draftlo
```

### 2. Build and Run with Docker Compose

```bash
docker-compose up -d
```

This single command will:
- Build the Docker image
- Start the container
- Expose the application on port 3000

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Manual Docker Commands

If you prefer to use Docker directly without Docker Compose:

### Build the Image

```bash
docker build -t draftlo-app .
```

### Run the Container

```bash
docker run -d \
  --name draftlo \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  --restart unless-stopped \
  draftlo-app
```

## Management Commands

### View Logs

```bash
docker-compose logs -f
```

Or with Docker:
```bash
docker logs -f draftlo
```

### Stop the Application

```bash
docker-compose down
```

Or with Docker:
```bash
docker stop draftlo
```

### Restart the Application

```bash
docker-compose restart
```

Or with Docker:
```bash
docker restart draftlo
```

### Update the Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up -d --build
```

## Environment Variables

You can customize the deployment by setting environment variables in the `docker-compose.yml` file:

```yaml
environment:
  - NODE_ENV=production
  - NEXT_TELEMETRY_DISABLED=1
  # Add your custom environment variables here
```

## Production Deployment

### Using Different Ports

To run on a different port (e.g., 8080):

```yaml
ports:
  - "8080:3000"
```

### Using with Reverse Proxy (Nginx/Caddy)

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Using with SSL/HTTPS

Update `docker-compose.yml` to use a reverse proxy like Traefik or add SSL certificates directly.

## Troubleshooting

### Container Won't Start

Check logs:
```bash
docker-compose logs
```

### Port Already in Use

Change the port in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Rebuild from Scratch

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Remove Everything

```bash
docker-compose down -v
docker system prune -a
```

## Resource Requirements

- **Minimum**: 512MB RAM, 1 CPU
- **Recommended**: 1GB RAM, 2 CPUs

## Security Considerations

1. **Never commit `.env` files** with sensitive data
2. Use **environment variables** for secrets
3. Run containers as **non-root user** (already configured)
4. Keep Docker images **updated**
5. Use **SSL/TLS** in production

## Support

For issues or questions:
- GitHub Issues: https://github.com/Synquic/draftlo/issues
- Email: support@draftlo.com

## License

[Your License Here]
