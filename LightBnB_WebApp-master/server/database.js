const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const pool = new Pool({user: 'vagrant', password: '123', host: 'localhost', database: 'lightbnb'});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */


const getUserWithEmail = function(emailAddress) {
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1`
  return pool.query(queryString, [emailAddress])
  .then(res => {
    if (!res.rows.length) {
      return null
    } else {
      return res.rows[0];
    }
  })
  .catch(e => {
    console.error(e)
  });
};

exports.getUserWithEmail = getUserWithEmail;


const getUserWithId = function(id) {
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1`
  return pool.query(queryString, [id])
  .then(res => {
    if (!res.rows.length) {
      return null
    } else {
      return res.rows[0];
    }
  })
  .catch(e => {
    console.error(e)
  });
};


exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */


const addUser = function(userObj) {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3);
  `;
  return pool.query(queryString, [userObj.name, userObj.email, userObj.password]);
};


exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
/*
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
*/
const getAllReservations = function (guestId, limit=10) {

  const queryString = `
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `

  return pool.query(queryString, [guestId, limit])
  .then(res => res.rows)
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
  
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT OUTER JOIN property_reviews ON properties.id = property_id
  WHERE TRUE 
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city ILIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(Number(options.owner_id));
    queryString += `AND properties.owner_id = $${queryParams.length}
    `
  }



  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night, options.maximum_price_per_night);
    queryString += `AND properties.cost_per_night  < $${queryParams.length} AND properties.cost_per_night > $${queryParams.length - 1}
    `
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `AND property_reviews.rating  >= $${queryParams.length}
    `
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(propertyObj) {
  const queryString =  `
  INSERT INTO properties (owner_id, 
    title,
    description,
    thumbnail_photo_url, 
    cover_photo_url, 
    cost_per_night, 
    street, 
    city, 
    province, 
    post_code, 
    country, 
    parking_spaces, 
    number_of_bathrooms, 
    number_of_bedrooms
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`;

  const queryParams = [propertyObj.owner_id, 
    propertyObj.title, 
    propertyObj.description, 
    propertyObj.thumbnail_photo_url, 
    propertyObj.cover_photo_url, 
    propertyObj.cost_per_night, 
    propertyObj.street, 
    propertyObj.city, 
    propertyObj.province,
    propertyObj.post_code, 
    propertyObj.country, 
    propertyObj.parking_spaces, 
    propertyObj.number_of_bathrooms, 
    propertyObj.number_of_bedrooms];

  return pool.query(queryString, queryParams).then((res) => {console.log(res)});
}


exports.addProperty = addProperty;
