
const basicInfo = require('./basicInfo');
const components = require('./components');
const servers = require('./servers');
const tags = require('./tags');
const paths = require('./paths');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...paths
};