const tipeKamarModel = require(`../models/index`).tipe_kamar;

const Op = require(`sequelize`).Op;

/** load library 'path' and 'filestream' */
const path = require(`path`);
const fs = require(`fs`);

const upload = require(`./upload-photo`).single(`foto`);

exports.getAlltipeKamar = async (request, response) => {
  let tipe_kamars =
    await tipeKamarModel.findAll(); /** call findAll() to get all data */
  return response.json({
    success: true,
    data: tipe_kamars,
    message: `All tipe kamar have been loaded`,
  });
};

exports.findtipeKamar = async (request, response) => {
  let nama_tipe_kamar = request.body.nama_tipe_kamar;
  let harga = request.body.harga;

  let tipe_kamars = await tipeKamarModel.findAll({
    where: {
      [Op.or]: [
        { nama_tipe_kamar: { [Op.substring]: nama_tipe_kamar } },
        { harga: { [Op.substring]: harga } },
      ],
    },
  });
  return response.json({
    success: true,
    data: tipe_kamars,
    message: `All tipe kamar have been loaded`,
  });
};

exports.addTipeKamar = (request, response) => {
  /** run function upload */
  upload(request, response, async (error) => {
    /** check if there are errorwhen upload */
    if (error) {
      console.log("err");
      return response.json({ message: error });
    }
    /** check if file is empty */
    if (!request.file) {
      return response.json({ message: `Nothing file to Upload` });
    }
    /** prepare data from request */
    let newTipeKamar = {
      nama_tipe_kamar: request.body.nama_tipe_kamar,
      harga: request.body.harga,
      deskripsi: request.body.deskripsi,
      foto: request.file.filename,
    };

    console.log(`nama_tipe_kamar: ` + newTipeKamar.nama_tipe_kamar);

    // console.log(newTipeKamar);
    tipeKamarModel
      .create(newTipeKamar)
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: `New tipe kamar has been inserted`,
        });
      })
      .catch((error) => {
        return response.json({
          success: false,
          message: error.message,
        });
      });
  });
};

exports.updateTipeKamar = (request, response) => {
  upload(request, response, async (error) => {
    /** check if there are errorwhen upload */
    if (error) {
      console.log("err");
      return response.json({ message: error });
    }
    /** check if file is empty */
    if (!request.file) {
      return response.json({ message: `Nothing file to Upload` });
    }

    /** prepare data that has been changed */
    let dataTipeKamar = {
      nama_tipe_kamar: request.body.nama_tipe_kamar,
      harga: request.body.harga,
      deskripsi: request.body.deskripsi,
      foto: request.file.foto,
    };

    /** define id member that will be update */
    let idTipeKamar = request.params.id;

    /** execute update data based on defined id member */
    tipeKamarModel
      .update(dataTipeKamar, { where: { id: idTipeKamar } })
      .then((result) => {
        /** if update's process success */
        return response.json({
          success: true,
          message: `Data tipe kamar has been updated`,
        });
      })
      .catch((error) => {
        /** if update's process fail */
        return response.json({
          success: false,
          message: error.message,
        });
      });
  });
};

/** create function for delete data */
exports.deleteTipeKamar = (request, response) => {
  /** define id member that will be update */
  let idTipeKamar = request.params.id;

  /** execute delete data based on defined id member */
  tipeKamarModel
    .destroy({ where: { id: idTipeKamar } })
    .then((result) => {
      /** if update's process success */
      return response.json({
        success: true,
        message: `Data tipe kamar has been updated`,
      });
    })
    .catch((error) => {
      /** if update's process fail */
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
