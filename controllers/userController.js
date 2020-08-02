const bcrypt = require('bcryptjs');
const db = require('../database');

exports.getUserDetails = async (req, res) => {
  res.send(req.user);
};

/**
 * Updates a user personal info. Must be logged in to send request
 *
 * @param user From credentials (Required)
 * @param firstName Body (Optional)
 * @param lastName Body (Optional)
 * @param email Body (Optional)
 * @param password Body (Optional)
 *
 */
exports.editUserDetails = async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  try {
    const userInfo = req.user[0];
    if (!firstName && !lastName && !email && !password) throw new Error('Nothing to update');
    if (!userInfo.userName) throw new Error('No username set');

    const passwordEncrypt = password ? await bcrypt.hash(password, 10) : null;

    let query = 'UPDATE User SET ';

    // TODO: Sanitize user inputs
    query += firstName ? `firstName = '${firstName}', ` : '';
    query += lastName ? `lastName = '${lastName}', ` : '';
    query += email ? `email = '${email}', ` : '';
    query += passwordEncrypt ? `password = '${passwordEncrypt}', ` : '';

    query = `${query.substring(0, query.lastIndexOf(','))} WHERE username='${userInfo.userName}'`;

    await db.query(query);

    res.status(200).send({
      message: 'User updated successfully',
    });
  } catch (error) {
    return res.status(400).send({
      error: 'Cannot update user',
    });
  }
};

/**
 * Deactivates user account. Currently sets the active status to 0.
 */
exports.deleteUser = async (req, res) => {
  try {
    const userInfo = req.user[0];
    if (!userInfo.userName) throw new Error('No username set');

    // Assuming we have ON DELETE CASCADE for all creditCardNumber and userName FK
    await db.query(`
    DELETE FROM CreditCard WHERE creditCardNumber IN 
      (SELECT P.creditCardNumber
      FROM (SELECT * FROM CreditCard) as DC , PaymentMethod AS P
      WHERE DC.creditCardnumber = P.creditCardNumber AND P.userName = '?');

    DELETE FROM User WHERE username='?';
    `, { replacements: [userInfo.userName, userInfo.userName] });

    res.status(200).send({
      message: 'Account deleted',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error: 'Cannot delete user',
    });
  }
};
