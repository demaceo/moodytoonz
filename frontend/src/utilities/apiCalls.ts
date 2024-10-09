const createUrl = (valence: string, arousal: string, decade: string) => {
  //with API key
  // return `https://pure-hollows-05817.herokuapp.com/http://musicovery.com/api/V6/playlist.php?&&fct=getfrommood&popularitymax=100&popularitymin=80&starttrackid=&trackvalence=${valence}&trackarousal=${arousal}&listenercountry=us&${decade}=true&resultsnumber=25&apikey=fpa8g361`;

  return `https://pure-hollows-05817.herokuapp.com/https://git.heroku.com/serene-tor-02353.git/http://musicovery.com/api/V6/playlist.php?&&fct=getfrommood&popularitymax=100&popularitymin=80&starttrackid=&trackvalence=${valence}&trackarousal=${arousal}&listenercountry=us&${decade}=true&resultsnumber=25`;

  // return `https://git.heroku.com/serene-tor-02353.git/http://musicovery.com/api/V6/playlist.php?&&fct=getfrommood&popularitymax=100&popularitymin=80&starttrackid=&trackvalence=${valence}&trackarousal=${arousal}&listenercountry=us&${decade}=true&resultsnumber=25&apikey=fpa8g361`

  //postman request
  // return 'https://pure-hollows-05817.herokuapp.com/http://musicovery.com/api/V6/playlist.php?fct=getfromtrack&id=131113&resultsnumber=30&popularitymax=100&popularitymin=0&listenercountry=it&similaritytype=0'

  // without API key
  // return `https://git.heroku.com/serene-tor-02353.git/http://musicovery.com/api/V5/playlist.php?&&fct=getfrommood&popularitymax=100&popularitymin=80&starttrackid=&trackvalence=${valence}&trackarousal=${arousal}&listenercountry=us&${decade}=true&resultsnumber=25`;

  //original
  // return `https://pure-hollows-05817.herokuapp.com/http://musicovery.com/api/V6/playlist.php?&fct=getfrommood&popularitymax=100&popularitymin=80&starttrackid=&trackvalence=${valence}&trackarousal=${arousal}&listenercountry=us&${decade}=true&resultsnumber=25&apikey=fpa8g361`;
};
//&apikey=fpa8g361

// const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

const proxyUrl = 'https://thingproxy.freeboard.io/fetch/'

export const getTracksByMoodAPI = async (
  valence: string,
  arousal: string,
  decade: string
) => {
  // console.log(valence)
  // console.log(arousal)
  // console.log(decade)
  // const response = await fetch( proxyUrl + createUrl(valence, arousal, decade));

  const response = await fetch(createUrl(valence, arousal, decade));


  // http://musicovery.com/api/V6/playlist.php?&fct=getfrommood&popularitymax=100&popularitymin=50&starttrackid=&date70=true&trackvalence=900000&trackarousal=100000&resultsnumber=15&listenercountry=es

  // const response = await fetch(proxyUrl + 'http://musicovery.com/api/V5/playlist.php?&fct=getfrommood&popularitymax=100&popularitymin=50&starttrackid=&date70=true&trackvalence=900000&trackarousal=100000&resultsnumber=15&listenercountry=es&apikey=fpa8g361');

  //WITH PROXYURL and params preset
  // const response = await fetch(proxyUrl + "https://git.heroku.com/serene-tor-02353.git/http://musicovery.com/api/V6/playlist.php?fct=getfromtrack&id=131113&resultsnumber=30&popularitymax=100&popularitymin=0&listenercountry=it&similaritytype=0");

  // without proxyUrl and params preset
  // const response = await fetch("https://git.heroku.com/serene-tor-02353.git/http://musicovery.com/api/V6/playlist.php?fct=getfromtrack&id=131113&resultsnumber=30&popularitymax=100&popularitymin=0&listenercountry=it&similaritytype=0");

  console.log('response', response)
  if (response.status >= 200 && response.status <= 299) {
    const jsonResponse = await response.json();
    console.log('jsonResponse', jsonResponse);
    console.log('jsonResponse.tracks.track', jsonResponse.tracks.track)
    return jsonResponse.tracks.track;
  } else {
    console.log(`Error! Code: ${response.status}`)
    // console.log("There seems to be a problem with the server. Please refresh the page.");
    return response.status;
  }
};

// test endpoint for 500 errors @ ("https://httpstat.us/500");
// https://thingproxy.freeboard.io/fetch/
// https://cors-anywhere.herokuapp.com/
