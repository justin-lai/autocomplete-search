import algoliasearch from 'algoliasearch';

const applicationID = 'KB49CN2OW6';
const apiKey = '317e355efcefde8e8d89e45440201ab4';

const client = algoliasearch(applicationID, apiKey, { protocol: 'https:' });
export const INDEX_RELEVANCE = client.initIndex('products');
export const INDEX_PRICE_ASC = client.initIndex('products_price_asc');
export const INDEX_PRICE_DESC = client.initIndex('products_price_desc');
