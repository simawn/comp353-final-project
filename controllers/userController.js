exports.getUserDetails = async (req, res) => {
  res.send(req.user);
};
