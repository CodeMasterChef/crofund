const routes = require('next-routes')();

routes
    .add('/projects/:address/requests', '/projects/requests/index')
    .add('/projects/:address/requests/new', '/projects/requests/new')
    .add('/projects/new', '/projects/new')
    .add('/projects/:address', 'projects/show');

module.exports = routes;