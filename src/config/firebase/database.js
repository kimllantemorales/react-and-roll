import { database } from './firebase';

/*
 * All User table transactions
 */
export const doReadUserData = async (uid = '') => {
	let users = {};

	await database.ref(`users/${uid}`).once('value', function(snapshot) {
		users = snapshot.val();
	});

  return users;
}

export const doUpdateUserData = async (uid, name, email, role) => 
	await database.ref(`users/${uid}`).set({ name, email, role});

export const doUpdateUserStores = async (userId, storeId) => 
	await database.ref(`users/${userId}/stores/${storeId}`).set( true );

/*
 * All Store related table transactions
 */
export const doReadStoreData = async (storeId = '') => {
	let stores = {};

	await database.ref(`stores/${storeId}`).once('value', function(snapshot) {
		stores = snapshot.val();
	});

  return stores;
}

export const doAddStoreData = async (name, contact, tag_line) => 
	await database.ref('stores/').push({ name, contact, tag_line });

export const doUpdateStoreData = async (storeId, name, contact, tag_line) => 
	await database.ref(`stores/${storeId}`).set({ name, contact, tag_line });

export const doReadStoreProductData = async (storeId = '') => {
	let storeProduct = {};

	await database.ref(`store_products/${storeId}`).once('value', function(snapshot) {
		storeProduct = snapshot.val();
	});

  return storeProduct;
}

export const doAddStoreProductData = async (storeId, products = {}) => 
	await database.ref(`store_products/${storeId}`).set({ products });


/*
 * All Order table transactions
 */
export const doReadOrdersData = async (orderId = '') => {
	let orders = {};

	await database.ref(`orders/${orderId}`).once('value', function(snapshot) {
		orders = snapshot.val();
	});

  return orders;
}

export const doAddOrderData = async (items = {}, total = 0, timestap = 0, status = 'pending') => 
	await database.ref('store_orders/').push({
		items,
		total, 
		timestap, 
		status
	});

export const doUpdateOrderData = async (oderId, items = {}, total = 0, timestap = 0, status = 'pending') => 
	await database.ref(`store_orders/${oderId}`).set({
		items,
		total, 
		timestap, 
		status
	});

export const doAddStoreOrderData = async (storeId, orderIds = {}) => 
	await database.ref(`store_orders/${storeId}`).set({ orderIds });

/*
 * All Fish table transactions
 */
//get fish data 
export const doReadFishData = async (key = '') => {
	let fishes = {};

	await database.ref(`fishes/${key}`).once('value', function(snapshot) {
		fishes = snapshot.val();
	});

  return fishes;
}

// Add new fish data
export const doAddFishData = async ({ name = '', price = 0, desc = '', image = '', status = 'unavailable'} = {}) => {
	let fishData = null;

	await database.ref('fishes/').push({
	  name,
	  price,
	  desc,
	  image,
	  status
	}).then((data)=>{
	    //success callback
			fishData = data;

	    console.log('data ' , data)
	}).catch((error)=>{
	    //error callback
	    console.log('error ' , error)
	});

	return fishData;
}

// Update fish data
export const doUpdateFishData = async (key, { name = '', price = 0, desc = '', image = '', status = 'unavailable'} = {}) => {
	let fishData = null;

	await database.ref(`fishes/${key}`).update({
	  name,
	  price,
	  desc,
	  image,
	  status
	}).then((data)=>{
	    //success callback
			fishData = data;

	    console.log('data ' , data)
	}).catch((error)=>{
	    //error callback
	    console.log('error ' , error)
	});

	return fishData;
}

// delete fish data
export const doRemoveFishData = async (key) => {
	await database.ref(`fishes/${key}`).remove();
}
