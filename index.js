const core = require('@actions/core');
const github = require('@actions/github');
const { getContainerAPI, stopContainerAPI, renameContainerAPI, createContainerAPI, connectContainerToNetworkAPI, startContainerAPI, updateResouceControlsAPI, deleteContainerAPI } = require('./api');

const getContainerToCreateNewContainer = (container, name) => {
  return {
    ...container.Config,
    HostConfig: container.HostConfig,
    name,
    NetworkingConfig: {
      EndpointsConfig: {},
    },
  };
}

(async () => {
  try {
    const portainerUrl = core.getInput('portainer-url') || 'https://portainer.renaissancedigital.co.uk';
    const portainerEndpointId = core.getInput('portainer-endpoint-id') || 2;
    const portainerApiKey = core.getInput('portainer-api-key') || 'ptr_bQeZ9ljSgCEJ7tQPt+H7d59sNpujFKpD3J/2tGzgHGE=';
    const portainerContainerName = core.getInput('portainer-container-name') || 'renaissancedigital.co.uk';
    const portainerRegistryAuth = core.getInput('portainer-registry-auth') || 'eyJyZWdpc3RyeUlkIjoxfQ==';
    
    // Check if all the required inputs are valid
    const urlRegex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
    if (!portainerUrl || !urlRegex.test(portainerUrl)) {
      core.setFailed('portainer-url is required');
      return;
    }
    if (typeof portainerEndpointId !== 'number') {
      core.setFailed('portainer-endpoint-id is required and must be a number');
      return;
    }
    if (!portainerApiKey || portainerApiKey.trim().length === 0) {
      core.setFailed('portainer-api-key is required');
      return;
    }
    if (!portainerContainerName || portainerContainerName.trim().length === 0) {
      core.setFailed('portainer-container-name is required');
      return;
    }

    // [Step 1] Get the container information
    console.log('[Step 1] Get the container information')
    const containerResponse = await getContainerAPI({
      portainerUrl,
      portainerEndpointId,
      portainerContainerName,
      portainerApiKey,
    });
    const portainerContainerId = containerResponse.data.Id;

    // [Step 2] Stop the current container
    console.log('[Step 2] Stop the current container');
    await stopContainerAPI({
      portainerUrl,
      portainerEndpointId,
      portainerApiKey,
      portainerContainerId,
    })

    // [Step 3] Rename the current container
    console.log('[Step 3] Rename the current container');
    await renameContainerAPI({
      portainerUrl,
      portainerEndpointId,
      portainerApiKey,
      portainerContainerId,
      name: `${portainerContainerName}-old`,
    });

    // [Step 4] Create a new container
    console.log('[Step 4] Create a new container');
    const newContainerConfig = getContainerToCreateNewContainer(containerResponse.data, portainerContainerName);
    const newContainer = await createContainerAPI({
      portainerUrl,
      portainerEndpointId,
      portainerApiKey,
      name: portainerContainerName,
      oldConfig: newContainerConfig,
    });

    // [Step 5] Connect to networks
    console.log('[Step 5] Connect to networks');
    await Promise.all(
      Object.keys(containerResponse.data.NetworkSettings.Networks)
        .map(async (networkName) => {
          return connectContainerToNetworkAPI({
            portainerUrl,
            portainerEndpointId,
            portainerApiKey,
            portainerContainerId: newContainer.data.Id,
            networkName,
          })
        }
      )
    )

    // [Step 6] Start the new container
    console.log('[Step 6] Start the new container');
    await startContainerAPI({
      portainerUrl,
      portainerEndpointId,
      portainerApiKey,
      portainerContainerId: newContainer.data.Id,
    });

    // [Step 7] Update the resource controller
    console.log('[Step 7] Update the resource controller');
    const { ResourceControl } = containerResponse.data.Portainer;
    await updateResouceControlsAPI({
      portainerUrl,
      portainerApiKey,
      resourceControlId: ResourceControl.Id,
      data: {
        AdministratorsOnly: ResourceControl.AdministratorsOnly,
        Public: ResourceControl.Public,
        Users: ResourceControl.UserAccesses.map(({UserId}) => UserId),
        Teams: ResourceControl.TeamAccesses,
      }
    });

    // [Step 8] Delete the current container
    console.log('[Step 8] Delete the current container');
    await deleteContainerAPI({
      portainerUrl,
      portainerEndpointId,
      portainerApiKey,
      portainerContainerId,
    })

  } catch (error) {
    core.setFailed(error.message);
  }
})();