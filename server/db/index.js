const { Client } = require ('pg');
const express = require ('express');

const client = new Client('postgres://localhost:5731/34d_juicebox')

module.exports = client; 
