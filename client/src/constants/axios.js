import axios from 'axios'
import {serverURL} from './constant'

axios.create({baseURL:serverURL})