import { isMobile, browserName } from 'react-device-detect';
import  Fingerprint  from '@fingerprintjs/fingerprintjs';


export const getDeviceInfo = async (user_id) => {
   
    const fingerprint = await Fingerprint.load()
    const fp = await fingerprint.get()
    const fingerprint_visitor_id = fp.visitorId

    const fbc_token = localStorage.getItem('FBCtoken');

    const deviceInfo = {
        dvc_user_id: user_id,
        dvc_platform: isMobile ? 'Mobile' : 'PC',
        dvc_client: browserName,
        dvc_signature: fingerprint_visitor_id,
        dvc_fbc_token: fbc_token,
        dvc_active: 1
    }
    return deviceInfo
}

