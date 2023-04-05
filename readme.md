# Portainer Pull Image Recreate Action - Alpha release
This action will pull the latest docker image and then recreate the container

## Considerations
1. The state of this project is in Alpha, as I have only tested it against my own deployments, I feel maybe on a more complex portainer it may have some issues related to resource control.
2. This action will recreate a container with portainer because of this you shouldn't run more than 1 action of this at once that is calling the same inputs: `portainer-url`, `portainer-endpint-id` and `portainer-container-name`. 

For now the action serves the purpose of what I created it for, but if you see any issues using this action with your setup do let me know and I'll try and fix it for you.

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
uses: actions/portainer-pull-image-restart-action@v1.2
with:
  portainer-url: 'https://portainer.domain.com'
  portainer-api-key: 'ptr_dQeZ7ljSgcEJ7tQPt+H7d59sNpujkKpD3J/2tGzghGE='
  portainer-endpoint-id: 2
  portainer-container-name: 'my-container-name'
  portainer-registry-auth: 'eyJyZWdpc3RyeUlkIjoxfQ=='
```