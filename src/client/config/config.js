import algoliasearch from 'algoliasearch';

const applicationID = 'KB49CN2OW6';
const apiKey = '317e355efcefde8e8d89e45440201ab4';

const client = algoliasearch(applicationID, apiKey, { protocol: 'https:' });
const index = client.initIndex('products');


export default index;
