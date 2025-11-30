# Media Downloader API

A REST API for downloading media from various social media platforms including TikTok, YouTube, Twitter, Instagram, Facebook, and more.

## Features

- Download media from multiple platforms
- Simple REST API interface
- Docker support for easy deployment
- Platform-specific or universal downloader

## Supported Platforms

- TikTok (`tt`, `tikdown`)
- YouTube (`yt`, `ytdown`)
- Twitter (`twt`, `twitter`, `twitterdown`)
- Facebook (`fb`, `ndown`)
- Instagram (`ig`, `ndown`)
- Google Drive (`gdrive`, `GDLink`)
- Pinterest (`pt`, `pintarest`)
- CapCut (`cp`, `capcut`)
- Likee (`lk`, `likee`)
- Threads (`th`, `threads`)
- Spotify (`sp`, `spotifyDl`)
- SoundCloud (`sc`, `soundcloud`)
- Terabox (`tb`, `terabox`)

## Installation

### Using Docker (Recommended)

1. Build and run with Docker Compose:
```bash
docker-compose up -d
```

2. Or build and run manually:
```bash
docker build -t media-downloader-api .
docker run -p 41101:41101 media-downloader-api
```

### Manual Installation

1. Install dependencies:
```bash
npm install
```

2. Run the server:
```bash
npm run unyah
```

## API Usage

### Endpoint

```
POST /api/download/:platform
```

### Parameters

- `platform` (path parameter): Platform identifier (e.g., `tt`, `yt`, `fb`, `ig`, or `alldown` for universal)
- `url` (body parameter): The media URL to download

### Example Request

```bash
curl -X POST http://localhost:41101/api/download/tt \
  -H "Content-Type: application/json" \
  -d '{"url": "https://tiktok.com/@user/video/123456789"}'
```

### Example Response

```json
{
  "status": "success",
  "data": {
    "title": "Video Title",
    "downloadUrl": "https://...",
    "thumbnail": "https://..."
  }
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Error description"
}
```

## Configuration

The API runs on port `41101` by default. You can modify this in `server.js`:

```javascript
const PORT = 41101;
```

## License

GPL-3.0

## Author

AryaKun
