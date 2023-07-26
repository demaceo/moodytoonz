const createUrl = (valence: string, arousal: string, decade: string) => {
  return `https://git.heroku.com/serene-tor-02353.git/http://musicovery.com/api/V6/playlist.php?&fct=getfrommood&popularitymax=100&popularitymin=80&starttrackid=&trackvalence=${valence}&trackarousal=${arousal}&listenercountry=us&${decade}=true&resultsnumber=25`;
};

export const getTracksByMoodAPI = async (
  valence: string,
  arousal: string,
  decade: string
) => {
  const response = await fetch(createUrl(valence, arousal, decade));
  if (response.status >= 200 && response.status <= 299) {
    const jsonResponse = await response.json();
    return jsonResponse.tracks.track;
  } else {
    console.log(`Error! Code: ${response}`)
    console.log("There seems to be a problem with the server. Please refresh the page.");
    return response.status;
  }
};

// test endpoint for 500 errors @ ("https://httpstat.us/500");
// https://thingproxy.freeboard.io/fetch/
// https://cors-anywhere.herokuapp.com/
