
const basicInfo = require('./basicInfo');
const components = require('./components');
const servers = require('./servers');
const tags = require('./tags');
const synonyms = require('./synonyms');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...synonyms
};