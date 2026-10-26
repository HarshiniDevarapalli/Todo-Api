
const TodoRepository = require("../domain/repositories/TodoRepository");
const Todo = require("../domain/entities/Todo");

const toEntity = (doc) => {
  if (!doc) return null;

  return new Todo({
    id: doc._id.toString(),
    title: doc.title,
    description: doc.description,
    completed: doc.completed,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  });
};

class MongoTodoRepository extends TodoRepository {
  constructor(todoModel) {
    super();
    this.todoModel = todoModel;
  }

  async create(todoData) {
    const doc = await this.todoModel.create(todoData);
    return toEntity(doc);
  }

  async findAll() {
    const docs = await this.todoModel.find();
    return docs.map(toEntity);
  }

  async findById(id) {
    const doc = await this.todoModel.findById(id);
    return toEntity(doc);
  }

  async update(id, updates) {
    const doc = await this.todoModel.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    return toEntity(doc);
  }

  async remove(id) {
    const doc = await this.todoModel.findByIdAndDelete(id);
    return toEntity(doc);
  }
}

module.exports = MongoTodoRepository;
