import model from './index';

export interface IUserModel {
  id: string;
  username: string;
  gender: number;
}

const userModel: IUserModel = {
  id: '',
  username: '',
  gender: 0,
};

export default model(userModel);
