const request = require('request');

const geocode = (address, callback) =>{
    //pk.eyJ1IjoiYW1hbnJpc2h1OTgiLCJhIjoiY2tkZ2EyNDRpMDVpYjJxb2I3Y2VkaXdxdSJ9.8bPSGr3vs2b-9yqqF359Qw
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYW1hbnJpc2h1OTgiLCJhIjoiY2tkZ2EyNDRpMDVpYjJxb2I3Y2VkaXdxdSJ9.8bPSGr3vs2b-9yqqF359Qw';
    request({url,json: true}, (error, response)=>{
        if(error){
            callback('service not available!',undefined);
        }else if(response.body.features.length === 0 ){
            callback('Unable to find location. Please try anohter search',undefined)
        }else {
            callback(undefined, {
            latitude: response.body.features[0].center[0],
            longitude: response.body.features[0].center[1],
            location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;