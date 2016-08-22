import algoliasearch from 'algoliasearch';

const applicationID = 'KB49CN2OW6';
const apiKey = '317e355efcefde8e8d89e45440201ab4';

const client = algoliasearch(applicationID, apiKey, { protocol: 'https:' });
const index = client.initIndex('products');
// index.setSettings({
//   attributesToIndex: ['brand', 'name', 'categories', 'unordered(description)'],
//   customRanking: ['desc(popularity)'],
//   slaves: ['instant_search_price_asc', 'instant_search_price_desc'],
//   attributesForFaceting: ['brand', 'type', 'categories', 'price'],
// }, (err, content) => {
//   if (err) {
//     throw err;
//   }
// });

export default index;
