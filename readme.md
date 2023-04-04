# Portainer Pull Image Recreate Action - Alpha release
This action will pull the latest docker image and then recreate the container

## Inputs

### `portainer-url`

**Required** The url of your portainer

### `portainer-endpoint-id`

**Required** The number of the endpoint id

### `portainer-api-key`

**Required** The api key from Portainer

### `portainer-container-name`

**Required** The container name you want to update

### `portainer-registry-auth`

**Optional** Only required if you are using a private registry `eyJyZWdpc3RyeUlkIjoxfQ==`

## Example usage

```yaml
uses: actions/portainer-pull-image-restart-action@v1
with:
  portainer-url: 'https://portainer.domain.com'
  portainer-api-key: 'ptr_dQeZ7ljSgcEJ7tQPt+H7d59sNpujkKpD3J/2tGzghGE='
  portainer-endpoint-id: 2
  portainer-container-name: 'my-container-name'
  portainer-registry-auth: 'eyJyZWdpc3RyeUlkIjoxfQ=='
```