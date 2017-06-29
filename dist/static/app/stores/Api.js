import axios from 'axios';

const API_URL = 'https://api.dribbble.com/v1/users/';
const API_AUTH =  'https://api.dribbble.com/v1/user?access_token=OAUTH_TOKEN';

class Api {

  constructor () {
    this.baseURL = API_URL;
    this.baseAuth = API_AUTH;
    this.auth = this.auth.bind(this);
  }

  execute(method, url, params){      
      let stringParams = '';
      // console.log(method, url, params);
      if(params){
          stringParams = '?';
          if (typeof params === 'string'){
              stringParams += params;
          } else if(typeof params === 'object'){
              for (let key in params)
                  stringParams += key + '=' + params[key] + '&';
          } else {
              console.error('APIError[',url,']: params must be string or object ');
              return;
          }
      }
      if(method == 'patch' || method == 'put' || method == 'post' && typeof params === 'object') {
        return axios[method](url, params)
      }
      return axios[method](url + stringParams)
  }

  getConfig(){
      return this.execute('get', this.baseURL+"simplebits",  "");
  }

  auth(data) {
      return this.execute('get',this.baseAuth, data);
  }

  // playback(data){
  //     return this.execute('post', this.baseURL + 'userexperience/playback/', data);
  // }

  // getPlayback(idVideo, userID){
  //     return this.execute('get', this.baseURL + 'userexperience/playback/'+idVideo+"/?token=" + userID);
  // }

  // getMulticamVideos() {
  //     return this.execute('get', this.baseURL + "live/broadcast/actives/")
  // }
}

export default Api;
