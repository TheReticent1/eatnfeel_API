const table = require("../models/tableModel");
const _ = require("lodash");

exports.addTable = (req, res) => {
  table.findOne({ tableNo: req.body.tableNo })
    .exec()
    .then(result => {
      if (result) {
        res.json("Table already present")
      } else {
        const Table = new table(req.body);
        Table
          .save()
          .then(result => {
            res.json(result);
          })
          .catch(error => {
            res.json(error);
          })
      }
    })
    .catch(error => {
      res.json(error);
    })
}

exports.getTable = (req, res) => {
  table
    .find()
    .select("_id tableNo totalSeat status userId name mobile bookSeat")
    .exec()
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      res.json(error);
    })
}

exports.tableById = (req, res, next, id) => {
  table.findById(id).exec((err, table) => {
    if (err || !table) {
      res.status(400).json({
        error: "Sorry try after some time"
      })
    }
    req.tables = table;
    next();
  });
};

exports.bookTable = (req, res) => {
  let table = req.tables;
  table = _.extend(table, req.body);
  table.save(err => {
    if (err) {
      res.status(400).json({
        error: "sorry error in booking table"
      });
    }
    res.json(table);
  });
};

exports.deleteTable = (req, res) => {
  let table = req.tables;
  table.remove((err, result) => {
    if (err || !result) {
      res.status(400).json({
        error: err
      });
    }
    res.json("Table deleted successfully");
  });
};

exports.resetTable = (req, res) => {
  let table = req.tables;
  table = _.extend(table,
    {
      name: null,
      status: null,
      mobile: null,
      bookSeat: null,
      userId: null,
      allocateTime: null
    });
  table.save(err => {
    if (err) {
      res.status(400).json({
        error: "sorry error in reset table"
      });
    }
    res.json(table);
  });
};