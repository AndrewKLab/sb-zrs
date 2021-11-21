import { isMobile, browserName } from 'react-device-detect';
import axios from 'axios'

export const getDeviceInfo = async (token, user_id) => {
    const res = await axios.get('https://geolocation-db.com/json/')
    const deviceInfo = {
        platform: isMobile ? 'Mobile' : 'PC',
        client: browserName,
        mac: res.data.IPv4,
        token: '',
        user_id: user_id,
    }
    return deviceInfo
  }

