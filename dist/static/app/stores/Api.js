import axios from 'axios';



const CLIENT_ID = '0f772b56f1c253cd98077e0be6340016a7e96916f9826aef4fb3b59a56442d50';
const CLIENT_SECRET = '0fa98ec578b41e9731faf4f080c4ddc36ae9664d4c08f10f6de209d216853255';
const ACCESS_TOKEN = '04e0cabe39b68eba31d3d107faf3dc259d45448242bd4af0716fa042a4e2d072';

const API_URL = 'https://api.dribbble.com/v1/';
const API_AUTH =  'https://api.dribbble.com/v1/user?access_token='+ACCESS_TOKEN;
const API_USER =  'https://dribbble.com/oauth/token';

class Api {

  constructor () {
    this.baseURL = API_URL;
    this.baseAuth = API_AUTH;
    this.baseUser = API_USER;
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

  // getUser(){
  //   return this.execute('post', 'https://dribbble.com/oauth/token');
  // }

  auth() {
      return this.execute('POST',this.baseAuth);
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
