class Todo {
  constructor({
    id = null,
    title,
    description = "",
    completed = false,
    createdAt = null,
    updatedAt = null,
  }) {
    if (typeof title !== "string" || title.trim() === "") {
      throw new Error("Title is required");
    }

    this.id = id;
    this.title = title.trim();
    this.description = description.trim();
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Todo; 