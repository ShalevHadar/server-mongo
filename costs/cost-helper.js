const { UserModel } = require("../users/model");
const { costModel } = require("./model");


// create item handler
const createItem = async (data) => {
  const item = new costModel({
    name: data.name,
    description: data.description,
    price: data.price,
    category: data.category,
    createdBy: data.personal_id
  });

  const user = await UserModel.updateOne(
    { personal_id: data.personal_id },
    {$push: { items: item._id }, $inc: {sum: item.price}}
  );

  await item.save();
  
};

const deleteItem = async (data) => {
  const item = await costModel.findOneAndDelete({
    _id: data.id,
  });
  
  const user = await UserModel.findOneAndUpdate(
    { personal_id: data.personal_id },
    { $pull: { items: data.id }, $inc: {sum: item.price*-1} }
  );
  const items = await getAllItems(data.personal_id);

  return {items, user, item};
  
};

const getAllItems = async (id) => {
  const items = await costModel.find({
    createdBy: id
  });
  return items;
}

const getItemsByDatesAndId = async (start, end, id) => {
  let newDateEnd;

  const current = new Date(end);
  newDateEnd = new Date(current.getTime() + 86400000);

  const newDateStart = new Date(start);
  const newStart = newDateStart.toISOString();
  const newEnd = newDateEnd.toISOString();

  const items = await costModel.find({
    $and: [ 
      {createdAt: {
      $gte: newStart,
      $lt: newEnd
    }}, 
    {createdBy: id}
  ]
  })
  
  return items;
};

module.exports = {
  createItem,
  deleteItem,
  getAllItems,
  getItemsByDatesAndId
};
