const { default: axios } = require('axios');

const { buildContainerUrl, buildContainerStopUrl, buildContainerRenameUrl, buildContainerCreateUrl, buildNetworkConnectUrl, buildContainerStartUrl, buildResourceControlsUrl, buildContainerDeleteUrl } = require('./urls');

const getContainerAPI = async ({
  portainerUrl,
  portainerEndpointId,
  portainerContainerName,
  portainerApiKey,
}) => {
  try {
    const response = await axios({
      url: buildContainerUrl(portainerUrl, portainerEndpointId, portainerContainerName),
      headers: {
        'X-API-Key': portainerApiKey,
      }
    })
    return response;
  } catch (error) {
    console.error('ERROR - getContainerAPI():', error);
    throw error;
  }
}

const stopContainerAPI = async ({
  portainerUrl,
  portainerEndpointId,
  portainerApiKey,
  portainerContainerId,
}) => {
  try {
    const response = await axios({
      method: 'POST',
      url: buildContainerStopUrl(portainerUrl, portainerEndpointId, portainerContainerId),
      headers: {
        'X-API-Key': portainerApiKey,
      },
    });
    return response;
  } catch (error) {
    console.error('ERROR - stopContainerAPI():', error);
    throw error;
  }
}

const startContainerAPI = async ({
  portainerUrl,
  portainerEndpointId,
  portainerApiKey,
  portainerContainerId,
}) => {
  try {
    const response = await axios({
      method: 'POST',
      url: buildContainerStartUrl(portainerUrl, portainerEndpointId, portainerContainerId),
      headers: {
        'X-API-Key': portainerApiKey,
      },
    });
    return response;
  } catch (error) {
    console.error('ERROR - startContainerAPI():', error);
    throw error;
  }
}

const renameContainerAPI = async ({
  portainerUrl,
  portainerEndpointId,
  portainerApiKey,
  portainerContainerId,
  name,
}) => {
  try {
    const response = await axios({
      method: 'POST',
      url: buildContainerRenameUrl(portainerUrl, portainerEndpointId, portainerContainerId, name),
      headers: {
        'X-API-Key': portainerApiKey,
      },
    });
    return response;
  } catch (error) {
    console.error('ERROR - renameContainerAPI():', error);
    throw error;
  }
}

const createContainerAPI = async ({
  portainerUrl,
  portainerEndpointId,
  portainerApiKey,
  name,
  oldConfig,
}) => {
  try {
    const response = await axios({
      method: 'POST',
      url: buildContainerCreateUrl(portainerUrl, portainerEndpointId, name),
      headers: {
        'X-API-Key': portainerApiKey,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(oldConfig),
    });
    return response;
  } catch (error) {
    console.error('ERROR - createContainerAPI():', error);
    throw error;
  }
}

const connectContainerToNetworkAPI = async ({
  portainerUrl,
  portainerEndpointId,
  portainerApiKey,
  portainerContainerId,
  networkName,
}) => {
  try {
    const response = await axios({
      method: 'POST',
      url: buildNetworkConnectUrl(portainerUrl, portainerEndpointId, networkName),
      headers: {
        'X-API-Key': portainerApiKey,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        Container: portainerContainerId,
      }),
    });
    return response;
  } catch (error) {
    console.error('ERROR - connectContainerToNetworkAPI():', error);
    throw error;
  }
}

const updateResouceControlsAPI = async ({
  portainerUrl,
  portainerApiKey,
  resourceControlId,
  data,
}) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: buildResourceControlsUrl(portainerUrl, resourceControlId),
      headers: {
        'X-API-Key': portainerApiKey,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error('ERROR - updateResouceControlsAPI():', error);
    throw error;
  }
}

const deleteContainerAPI = async ({
  portainerUrl,
  portainerEndpointId,
  portainerApiKey,
  portainerContainerId,
}) => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: buildContainerDeleteUrl(portainerUrl, portainerEndpointId, portainerContainerId),
      headers: {
        'X-API-Key': portainerApiKey,
      },
    });
    return response;
  } catch (error) {
    console.error('ERROR - deleteContainerAPI():', error);
    throw error;
  }
}

module.exports = {
  getContainerAPI,
  stopContainerAPI,
  startContainerAPI,
  renameContainerAPI,
  createContainerAPI,
  connectContainerToNetworkAPI,
  updateResouceControlsAPI,
  deleteContainerAPI,
};