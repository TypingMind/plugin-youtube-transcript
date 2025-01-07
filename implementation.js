async function fetchPageContent(videoId, pluginServer) {
  const response = await fetch(
    `${pluginServer}/youtube-transcript/get-transcript?query=${encodeURIComponent(
      videoId
    )}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch youtube transcript: ${response.status} - ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.responseObject;
}

async function get_youtube_transcript(params, userSettings) {
  const { videoId } = params;
  const { pluginServer } = userSettings;

  if (!pluginServer) {
    throw new Error(
      "Missing plugin server URL. Please set it in the plugin settings."
    );
  }

  const cleanPluginServer = pluginServer.replace(/\/$/, "");

  try {
    const response = await fetchPageContent(videoId, cleanPluginServer);
    return response.textOnly;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return "Error: Unable to generate Youtube transcript. Please try again later.";
  }
}
