const db = require('../database');

/**
 * Updates the active status on a user
 * @param userName (Body)
 * @param status (Body)
 */
exports.updateUserActiveStatus = async (req, res) => {
  try {
    const userInfo = req.user[0];
    const { userName, status } = req.body;

    if (!userInfo || userInfo.role !== 'admin') return res.sendStatus(401);
    if (!userName || !(status || status === 0)) throw new Error('Username or status not set.');

    await db.query('UPDATE User SET active=? WHERE userName=?', { replacements: [status, userName] });

    res.status(200).send({
      message: 'Updated user status successfully',
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// TODO
exports.getSystemActivity = async (req, res) => {
  try {
    const userInfo = req.user[0];

    if (!userInfo || userInfo.role !== 'admin') return res.sendStatus(401);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
};
