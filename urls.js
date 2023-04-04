
const buildContainerUrl = (portainerUrl, portainerEndpointId, portainerContainerName) => {
  return `${portainerUrl}/api/endpoints/${portainerEndpointId}/docker/containers/${portainerContainerName}/json`
}

const buildContainerStopUrl = (portainerUrl, portainerEndpointId, portainerContainerId) => {
  return `${portainerUrl}/api/endpoints/${portainerEndpointId}/docker/containers/${portainerContainerId}/stop`
}

const buildContainerStartUrl = (portainerUrl, portainerEndpointId, portainerContainerId) => {
  return `${portainerUrl}/api/endpoints/${portainerEndpointId}/docker/containers/${portainerContainerId}/start`
}

const buildContainerRenameUrl = (portainerUrl, portainerEndpointId, portainerContainerId, name) => {
  return `${portainerUrl}/api/endpoints/${portainerEndpointId}/docker/containers/${portainerContainerId}/rename?name=${name}`
}

const buildContainerCreateUrl = (portainerUrl, portainerEndpointId, name) => {
  return `${portainerUrl}/api/endpoints/${portainerEndpointId}/docker/containers/create?name=${name}`;
}

const buildNetworkConnectUrl = (portainerUrl, portainerEndpointId, networkName) => {
  return `${portainerUrl}/api/endpoints/${portainerEndpointId}/docker/networks/${networkName}/connect`;
}

const buildResourceControlsUrl = (portainerUrl, resourceControlId) => {
  return `${portainerUrl}/api/resource_controls/${resourceControlId}`;
}

const buildContainerDeleteUrl = (portainerUrl, portainerEndpointId, portainerContainerId) => {
  return `${portainerUrl}/api/endpoints/${portainerEndpointId}/docker/containers/${portainerContainerId}?v=1&force=true`;
}

const buildImagePullUrl = (portainerUrl, portainerEndpointId, image) => {
  return `${portainerUrl}/api/endpoints/${portainerEndpointId}/docker/images/create?fromImage=${image}`;
}

module.exports = {
  buildContainerUrl,
  buildContainerStopUrl,
  buildContainerStartUrl,
  buildContainerRenameUrl,
  buildContainerCreateUrl,
  buildNetworkConnectUrl,
  buildResourceControlsUrl,
  buildContainerDeleteUrl,
  buildImagePullUrl,
};
