const { request, response } = require("express");
const { path } = require("../routes/kamar-route");
const { findTipekamar } = require("./tipe_kamar.controller");
const kamarModel = require("../models/index").kamar;
const tipeKamarModel = require("../models/index").tipe_kamar;
const Op = require("sequelize").Op;

exports.getAllKamar = async (request, response) => {
  let kamars = await kamarModel.findAll();
  return response.json({
    success: true,
    data: kamars,
    message: "All rooms have been loaded",
  });
};

exports.findKamar = async (request, response) => {
  let keyword = request.body.keyword;
  let kamars = await kamarModel.findAll({
    where: {
      [Op.or]: [
        { tipeKamarId: { [Op.substring]: keyword } }, //keyword = sesuai dengan yg diketikkan di postman
        { nomor_kamar: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: kamars,
    message: "All rooms have been loaded",
  });
};

exports.addKamar = async (request, response) => {
  let newKamar = {
    nomor_kamar: request.body.nomor_kamar,
    tipeKamarId: request.body.tipeKamarId,
  };
  let tipe_kamar = await tipeKamarModel.findOne({
    where: {
      id: newKamar.tipeKamarId,
    },
  });
  console.log(tipe_kamar.id);
  let tes = newKamar.tipeKamarId == tipe_kamar.id;
  console.log(tes);
  if (tes) {
    kamarModel
      .create(newKamar)
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: `New room has been inserted`,
        });
      })
      .catch((error) => {
        return response.json({
          success: false,
          message: error.message,
        });
      });
  } else {
    return response.json({
      success: false,
      message: "Room types doesn't exist",
    });
  }
};

exports.updateKamar = async (request, response) => {
  let dataKamar = {
    nomor_kamar: request.body.nomor_kamar,
    tipeKamarId: request.body.tipeKamarId,
  };
  let idKamar = request.params.id; /**id = sama dengan yang didatabase */
  kamarModel
    .update(dataKamar, { where: { id: idKamar } }) //id = sama dengan yang di postman, route
    .then((result) => {
      return response.json({
        success: true,
        message: `Data room has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.deleteKamar = (request, response) => {
  let id = request.params.id;
  kamarModel
    .destroy({ where: { id: id } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data room has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};