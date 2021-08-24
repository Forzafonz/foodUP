const pool = require('./db_connect');


/**
 * Check if a user exists in the database
 * @param  {Integer} email a user email address
 * @return {Promise<{}>} A promise to the user.
 */
const checkUserExists = function(login) {

  const email = String(login);
  const queryString = `SELECT count(*) FROM users WHERE email LIKE $1`;
  return pool.query(queryString, [email])
    .then(result => result.rows[0])
    .catch(error => console.log(error.message));

};

exports.checkUserExists = checkUserExists;

/**
 * Returns password for a user in database
 * @param  {Integer} email a user email address
 * @return {Promise<{}>} A promise to the user with password for specified email
 */
const getUserPassword = function(login) {
  const email = String(login);
  const queryString = `SELECT password FROM users WHERE email LIKE $1`;
  return pool.query(queryString, [email])
    .then(result => result.rows[0])
    .catch(error => console.log(error.message));
}

exports.getUserPassword = getUserPassword;

/**
 * Returns user ID
 * @param  {Integer} email a user email address
 * @return {Promise<{}>} A promise to the user with password for specified email
 */
 const getUserID = function(login) {
  const email = String(login);
  const queryString = `SELECT id FROM users WHERE email LIKE $1`;
  return pool.query(queryString, [email])
    .then(result => result.rows[0])
    .catch(error => console.log(error.message));
}

exports.getUserID  = getUserID ;


/**
 * Returns user ID
 * @param  {string} email a user email address
 *  @param  {hashed string} password a user email address
 * @return {Promise<{}>} A promise to the user with password for specified email
 */
 const addUser = function(login, password) {
  const vals = [];
  vals.push(String(login));
  vals.push(String(password));
  const queryString = `INSERT INTO users(name, email, password, phone_number, customer, province,  city, country, street, post_code)
                          VALUES('placeholder', $1, $2, 'placeholder', TRUE, 'placeholder', 'placeholder', 'placeholder', 'placeholder', 'placeholder')
                          RETURNING *`;
  return pool.query(queryString, vals)
    .then(result => {console.log(result.rows)})
    .catch(error => console.log(error.message));
}

exports.addUser  = addUser;
