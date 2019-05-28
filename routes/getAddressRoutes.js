const getAddressRoutes = (req, res, address) => {
  address.find({
    userId:req.body.userId
  })
    .exec()
    .then(result => {
      if (result) {
        console.log(result);
        res.status(200).json(result)
      } else {
        res.status(404).json("no record found");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = { getAddressRoutes };