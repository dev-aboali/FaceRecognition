import React, { Component } from 'react';
import Particles from 'react-particles-js';
import  Navigation  from './components/Navigation/Navigation';
import  FaceRecognition  from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import  ImageLinkForm  from './components/ImageLinkForm/ImageLinkForm';
import  Signin  from './components/Signin/Signin';
import  Register  from './components/Register/Register';
import  Rank  from './components/Rank/Rank';


const particlesOptions = {
  particles: {
    
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
   'interactivity': {
      'detect_on': 'window',
      'events': {
        'onhover': {
          'enable':true,
          'mode': 'grab'
        },
        'onclick':{
          'enable':true,
          'mode':'push'
        }
      }

    }
};

const initialState = {
  input: '',
  imageUrl: '',
  box:{},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ 
      user : {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  componentDidMount() {
    fetch('https://awesome-face-recognition-app.herokuapp.com/')
      .then(res => res.json())
      .then(console.log);
  }
  calculateFaceLocation = (data) => {
    const clarififace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const imageId = document.getElementById('imageInput');
    const width = Number( imageId.width );
    const height = Number( imageId.height );
    return {
      leftCol:  clarififace.left_col * width ,
      topRow: clarififace.top_row * height,
      rightCol: width - ( clarififace.right_col  * width) ,
      bottomRow: height - (clarififace.bottom_row * height) 
    }
  }
  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState);
    } else if(route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({ route: route });
  }
  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://awesome-face-recognition-app.herokuapp.com/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then( response => {
      if(response) {
        fetch('https://awesome-face-recognition-app.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(res => res.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          this.displayFaceBox(this.calculateFaceLocation(response));
      }
    })
    .catch(error => console.log(error));
  }
  render() {
    let {route, isSignedIn, imageUrl, box} = this.state;
    return (
      <div className="App">
        
        <Particles  className='particles'
                params={particlesOptions} 
        />
      <Navigation onRouteChange={ this.onRouteChange} isSignedIn={isSignedIn}/>  
      {  
        route === 'home' 
        ? 
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>  
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        :
        (
          route === 'signin' ? 
            <Signin onRouteChange={ this.onRouteChange} loadUser={this.loadUser}/> 
          :
            <Register loadUser={this.loadUser} onRouteChange={ this.onRouteChange}/>

        )
        
      }

      </div>
    );
  }
}

export default App;
