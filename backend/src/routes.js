const express = require('express');

const routes = express.Router();

routes.post( '/users', (request, response) => {
    const body = request.body;
    
    return response.json({
        evento: 'Trabalho APS',
        aluno: 'Thamires Vasconcelos'
    });
});

module.exports = routes;