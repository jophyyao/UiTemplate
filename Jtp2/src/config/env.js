let host = location.hostname
let env = 'prod'

if (host === 'localhost') {
    env = 'dev'
} else {
    env = 'prod'
}

import dev from './dev.env.js'
import prod from './prod.env.js'

export default {
    env: env,
    envdata: env == 'dev' ? dev : prod
}
