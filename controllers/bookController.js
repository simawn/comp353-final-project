const db = require('../database');

exports.getAllBooks = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Book', { type: db.QueryTypes.SELECT });

    res.status(200).send(result);
  } catch (error) {
    console.log('bookController::getAllBooks: ', error);
    res.status(400).send('Error');
  }
};

exports.getBookFromISBN = async (req, res) => {
  try {
    const { ISBN } = req.params;
    const result = await db.query(`SELECT * FROM Book WHERE Book.ISBN='${ISBN}'`, { type: db.QueryTypes.SELECT });

    res.status(200).send(result);
  } catch (error) {
    console.log('getBookFromISBN: ', error);
    res.status(400).send('Error');
  }
};

exports.getBookPrice = async (req, res) => {
  try {
    const { type } = req.body;
    const price = Number(req.body.price);
    const { operator } = req.body;

    const validOperators = ['=', '>', '<', '>=', '<='];
    if (!validOperators.includes(operator)) return res.status(400).send('Invalid operator provided');

    const validTypes = ['costPrice', 'sellingPrice'];
    if (!validTypes.includes(type)) return res.status(400).send('Invalid type provided');

    if (isNaN(price)) return res.status(400).send('Invalud price');

    const query = `
            SELECT *
            FROM Book
            WHERE ${type} ${operator} ${price}
        `;

    const result = await db.query(query, { type: db.QueryTypes.SELECT });

    res.status(200).send(result);
  } catch (error) {
    console.log('getBookPrice: ', error);
    res.status(400).send('Error');
  }
};
