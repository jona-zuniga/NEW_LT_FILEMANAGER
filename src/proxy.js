import {stackMiddlewares} from '@/helpers/utils/stackMiddleWares'

import {authUser} from '@/middlewares/authUser'

const middleWares = [authUser]
const proxy = stackMiddlewares(middleWares)
export default proxy
