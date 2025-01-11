// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.addColumn('allowances', 'category', {
//       type: Sequelize.STRING,
//       allowNull: false,
//       defaultValue: 'Uncategorized', // 기본값 추가
//     });
//     await queryInterface.sequelize.query(`
//       UPDATE allowances SET category = 'Uncategorized' WHERE category IS NULL;
//     `);
//     await queryInterface.addColumn('allowances', 'store', {
//       type: Sequelize.STRING,
//       allowNull: false,
//       defaultValue: 'Unknown Store', // 기본값 추가
//     });
//     await queryInterface.sequelize.query(`
//       UPDATE allowances SET store = 'Unknown Store' WHERE store IS NULL;
//     `);
//     await queryInterface.addColumn('allowances', 'member_id', {
//       type: Sequelize.INTEGER.UNSIGNED,
//       allowNull: false,
//       references: {
//         model: 'members', // 외래 키 테이블
//         key: 'id',        // 외래 키 컬럼
//       },
//       onUpdate: 'CASCADE',
//       onDelete: 'CASCADE',
//     });
//   },

//   down: async (queryInterface) => {
//     await queryInterface.removeColumn('allowances', 'member_id'); // 외래 키를 가장 마지막에 삭제
//     await queryInterface.removeColumn('allowances', 'category');
//     await queryInterface.removeColumn('allowances', 'store');
    
//   },
// };
