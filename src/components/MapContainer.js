import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [
        { latitude: 15.9129, longitude: 79.7400, name: 'Andhra Pradesh' }, //andhra pradesh
        { latitude: 28.2180, longitude: 94.7278, name: 'Arunachal Pradesh' }, //arunachal pradesh
        { latitude: 26.2006, longitude: 92.9376, name: 'Assam' }, //assam
        { latitude: 25.0961, longitude: 85.3131, name: 'Bihar' }, //bihar
        { latitude: 30.7333, longitude: 76.7794, name: 'Chandigarh' }, //Chandigarh
        { latitude: 21.2787, longitude: 85.3131, name: 'Chhattisgarh' }, //chattisgarh
        { latitude: 20.4283, longitude: 72.8397, name: 'Daman and Diu' }, //Daman and Diu
        { latitude: 28.7041, longitude: 77.1025, name: 'Delhi' }, //Delhi
        { latitude: 15.2993, longitude: 74.1240, name: 'Goa' }, //goa
        { latitude: 22.2587, longitude: 71.1924, name: 'Gujarat' }, //gujarat
        { latitude: 29.0588, longitude: 76.0856, name: 'Haryana' }, //haryana
        { latitude: 31.1048, longitude: 77.1734, name: 'Himachal Pradesh' }, //himachal pradesh
        { latitude: 33.7782, longitude: 76.5762, name: 'Jammu and Kashmir' }, //Jammu and Kashmir
        { latitude: 23.6102, longitude: 85.2799, name: 'Jharkhand' }, //jharkhand
        { latitude: 10.8505, longitude: 76.2711, name: 'Kerala' }, //kerala
        { latitude: 15.3173, longitude: 75.7139, name: 'Karnataka' }, //karnatak
        { latitude: 13.7000, longitude: 72.1833, name: 'Lakshadweep' }, //Lakshadweep
        { latitude: 22.9734, longitude: 78.6569, name: 'Madhya Pradesh' }, //madhya pradesh
        { latitude: 19.7515, longitude: 75.7139, name: 'Maharashtra' }, //maharashrta
        { latitude: 24.6637, longitude: 93.9063, name: 'Manipur' }, //manipur
        { latitude: 25.4670, longitude: 91.3662, name: 'Meghalaya' }, //meghalaya
        { latitude: 23.1645, longitude: 92.9376, name: 'Mizoram' }, //mizoram
        { latitude: 26.1584, longitude: 94.5624, name: 'Nagaland' }, //nagaland
        { latitude: 20.9517, longitude: 85.0985, name: 'Odisha' }, //odisha
        { latitude: 11.9416, longitude: 79.8083, name: 'Puducherry' }, //Puducherry
        { latitude: 31.1471, longitude: 75.3412, name: 'Punjab' }, //punjab
        { latitude: 27.0238, longitude: 74.2179, name: 'Rajasthan' }, //rajasthan
        { latitude: 27.5330, longitude: 88.5122, name: 'Sikkim' }, //sikkim
        { latitude: 11.1271, longitude: 78.6569, name: 'Tamil Nadu' }, //tamil nadu
        { latitude: 18.1124, longitude: 79.0193, name: 'Telangana' }, //telangana
        { latitude: 23.9408, longitude: 91.9882, name: 'Tripura' }, //tripura
        { latitude: 26.8467, longitude: 80.9462, name: 'Uttar Pradesh' }, //uttar pradesh
        { latitude: 30.0668, longitude: 79.0193, name: 'Uttarakhand' }, //uttarakhand
        { latitude: 22.9868, longitude: 87.8550, name: 'West Bengal' }, //wb
      ],
      sentimentNameEmoji: {
        'anger': '😡',
        'fear': '😨',
        'joy': '😀',
        'sadness': '😢',
        'analytical': '🤔',
        'confident': '😎',
        'tentative': '🤨',
        'disgust': '😤',
      }
    }
  }

  getMaxOfObject = obj => {
    if (obj) {
      var maxIndex = Object.keys(obj)[0];
      for (var i in obj) {
        if (obj[maxIndex] < obj[i]) {
          maxIndex = i;
        }
      }
      return maxIndex;
    }
  };

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.latitude,
        lng: store.longitude
      }}
        label={this.state.sentimentNameEmoji[this.getMaxOfObject(this.props.statewiseSentiments[store.name])]}
        title={this.getMaxOfObject(this.props.statewiseSentiments[store.name])}
        onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={this.props.style}
        initialCenter={{ lat: 20.5937, lng: 78.9629 }}
      >
        {this.displayMarkers()}
      </Map>
    );
  };
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);