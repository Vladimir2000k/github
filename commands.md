```shell
cd aidisraeli-backend/ &&
docker build -t ghcr.io/thewhiteunicorn/disraeli-backend:staging . -f Dockerfile &&
docker push ghcr.io/thewhiteunicorn/disraeli-backend:staging
```

```shell
cd client/ &&
docker build -t ghcr.io/thewhiteunicorn/disraeli-frontend:staging . -f Dockerfile.prod &&
docker push ghcr.io/thewhiteunicorn/disraeli-frontend:staging
```
