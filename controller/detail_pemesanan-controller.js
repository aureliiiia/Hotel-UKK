const detailPemesananModel = require(`../models/index`).detail_pemesanan
const Op = require(`sequelize`).Op

/** load library 'path' and 'filestream' */
const path = require(`path`)
const fs = require(`fs`)

exports.getAllDetailPemesanan = async (request, response) => {
    let detail_pemesanans = await detailPemesananModel.findAll() /** call findAll() to get all data */
    return response.json({
        success: true,
        data: detail_pemesanans,
        message: `All detail pemesanan have been loaded`
    })
}

exports.findDetailPemesanan = async (request, response) => {
    let tgl_akses = request.body.tgl_akses
    let harga = request.body.harga

    let detail_pemesanans = await detailPemesananModel.findAll({
        where: {
            [Op.or]: [
                { tgl_akses: { [Op.substring]: tgl_akses } },
                { harga: { [Op.substring]: harga } },
            ]
        }
    })
    return response.json({
        success: true,
        data: detail_pemesanans,
        message: `All detail pemesanan have been loaded`
    })

}

exports.addDetailPemesanan = (request, response) => {
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
        let newdetailPemesanan = {
            tgl_akses: request.body.tgl_akses,
            harga: request.body.harga
        };

        console.log(newdetailPemesanan);
        detailPemesananModel
            .create(newdetailPemesanan)
            .then((result) => {
                return response.json({
                    success: true,
                    data: result,
                    message: `New detail pemesanan has been inserted`,
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

exports.updateDetailPemesanan = (request, response) => {

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
        let dataDetailPemesanan = {
            tgl_akses: request.body.tgl_akses,
            harga: request.body.harga
        }

        let idDetailPemesanan = request.params.id

        /** execute update data based on defined id member */
        detailPemesananModel.update(dataDetailPemesanan, { where: { id: idDetailPemesanan } })
            .then(result => {
                /** if update's process success */
                return response.json({
                    success: true,
                    message: `Data detail pemesanan has been updated`
                })
            })
            .catch(error => {
                /** if update's process fail */
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    });
}

/** create function for delete data */
exports.deleteDetailPemesanan = (request, response) => {
    /** define id member that will be update */
    let idDetailPemesanan = request.params.id

    /** execute delete data based on defined id member */
    detailPemesananModel.destroy({ where: { id: idDetailPemesanan } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data detail pemesasanan has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}