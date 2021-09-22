require('dotenv').config()
const express = require('express')

const app = express()
const methodOverride = require('method-override')
const session = require('express-session')

const PORT = process.env.PORT