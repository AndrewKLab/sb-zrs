import { isMobile, browserName } from 'react-device-detect';
import browserSignature from 'browser-signature';

export const getDeviceInfo = async (user_id) => {
    //const res = await axios.get('https://geolocation-db.com/json/')
    const deviceInfo = {
        dvc_user_id: user_id,
        dvc_platform: isMobile ? 'Mobile' : 'PC',
        dvc_client: browserName,
        dvc_signature: browserSignature(),
        dvc_fbc_token: localStorage.getItem('FBCtoken'),
        dvc_active: 1
    }
    return deviceInfo
  }

