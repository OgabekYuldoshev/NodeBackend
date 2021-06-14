'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      parent_id: {
        type: Sequelize.BIGINT
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      metaTitle: {
        type: Sequelize.STRING
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.TEXT("tiny")
      },
      published: {
        type: Sequelize.INTEGER
      },
      publishedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts');
  }
};