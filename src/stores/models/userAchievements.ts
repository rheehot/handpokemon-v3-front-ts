import { types } from 'mobx-state-tree';
import Achievement from './achievement';

const UserAchievement = types.model('UserAchievement', {
  id: types.identifierNumber,
  userId: types.number,
  achievementId: types.number,
  activated: types.number,
  disabled: types.number,
  createdAt: types.string,
  updatedAt: types.string,
  achievement: Achievement,
});

export default UserAchievement;
