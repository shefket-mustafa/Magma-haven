import jsonwebtoken from 'jsonwebtoken';
import util from 'util';

export const verify = util.promisify(jsonwebtoken.verify);
export const sign = util.promisify(jsonwebtoken.sign);

const jwt = {
    verify,
    sign
}

export default jwt;