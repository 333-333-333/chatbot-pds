## Build the Docker image

```shell
sudo docker rmi -f chatbot_pds_api || true
sudo docker build -t chatbot_pds_api .
```

## Run the Docker image

```shell
sudo docker run -it --rm -p 5000:5000 chatbot_pds_api
```
