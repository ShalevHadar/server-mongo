const { getAllItems } = require("../costs/cost-helper");
const { UserModel } = require("./model");

const createUser = async (data) => {
  const user = new UserModel({
    personal_id: data.personal_id,
    first_name: data.first_name,
    last_name: data.last_name,
    birthday: data.birthday,
    marital_status: data.marital_status,
  });
  
  await user.save();
}

const getUser = async (id) => {
  const user = await UserModel.findOne({personal_id: id});
  const items = await getAllItems(id);
  if (!user) {
    throw new Error('cant fetch')
  }
  return {user, items};
}


module.exports = {
  createUser,
  getUser
  };
