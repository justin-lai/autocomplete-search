import algoliasearch from 'algoliasearch';

const applicationID = 'KB49CN2OW6';
const apiKey = '317e355efcefde8e8d89e45440201ab4';
// const productsJSON = require('../../data/data.json');

const client = algoliasearch(applicationID, apiKey, { protocol: 'https:' });
const index = client.initIndex('products');
// index.addObjects(productsJSON, (err, content) => {
//   if (err) {
//     console.error(err);
//   }
// });

export default index;
