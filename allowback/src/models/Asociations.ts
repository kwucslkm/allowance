import Member from './Member';
import Allowance from './Allowance';

Member.hasMany(Allowance, { foreignKey: 'memberId', as: 'allowances' });
Allowance.belongsTo(Member, { foreignKey: 'memberId', as: 'member' });