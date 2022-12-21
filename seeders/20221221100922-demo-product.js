'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Products', [
      {
        nama: 'Blow Edna Flats Shoes Sepatu',
        uom: 'sepasang',
        harga: 73990,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Kipas Angin A58 Usb',
        uom: 'gram',
        harga: 20000,
        stock: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Nutella B',
        uom: 'gram',
        harga: 50000,
        stock: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return await queryInterface.bulkDelete('Products', null, {});
  }
};
