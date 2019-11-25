import Axios from 'axios'

const instance = Axios.create({
  baseURL: 'https://localhost:44346/api/user/'
});

export default instance