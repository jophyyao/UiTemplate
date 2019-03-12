import app from './app.js'
import website from './website.js'
import env from './env.js'

const config = Object.assign(
    app,
    website,
    env
)

export default config;
