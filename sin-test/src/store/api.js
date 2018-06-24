import axios from 'axios';

const API = {
  get: ({url, callback, params={}}) => {
    return axios.get(url, params)
      .then((response) => {
        if (!response.data.errorCode) {
          callback(response);
        } else {
          alert('error')
        }
      })
        .catch((error) => {
          console.error(error)
        })
  }
}

export default API
