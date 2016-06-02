/*
 * index.css
 * 
 * This file is part of the Internet Explorers site.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 02. June 2016
 */
 
var express = require('express')
var app = express()
app.get('/', (req, res) => {res.end('Hello World!')})
//to set portnumber with terminal
app.listen(process.argv[2])