const editUser = (req, res, next) => {
  const _id = req.params.id;
  console.log("edite user", _id);
};

module.exports = { editUser };
