const {
  DynamoDBClient,
} = require("@aws-sdk/client-dynamodb");

const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const { randomUUID } = require("crypto");

const TodoRepository = require("../domain/repositories/TodoRepository");
const Todo = require("../domain/entities/Todo");

class DynamoTodoRepository extends TodoRepository {
  constructor({
    tableName = process.env.DYNAMODB_TABLE_NAME,
    client,
  } = {}) {
    super();

    if (!tableName) {
      throw new Error("DYNAMODB_TABLE_NAME is required");
    }

    this.tableName = tableName;

    // Allow a client to be injected for testing.
    this.client =
      client ||
      DynamoDBDocumentClient.from(
        new DynamoDBClient({
          region: process.env.AWS_REGION || "ap-south-1",
        })
      );
  }

  toEntity(item) {
    if (!item) return null;

    return new Todo({
      id: item.id,
      title: item.title,
      description: item.description ?? "",
      completed: item.completed ?? false,
      createdAt: item.createdAt ?? null,
      updatedAt: item.updatedAt ?? null,
    });
  }

  async create(todoData) {
    const now = new Date().toISOString();

    const item = {
      id: randomUUID(),
      title: todoData.title,
      description: todoData.description ?? "",
      completed: todoData.completed ?? false,
      createdAt: now,
      updatedAt: now,
    };

    await this.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: item,
        ConditionExpression: "attribute_not_exists(#id)",
        ExpressionAttributeNames: {
          "#id": "id",
        },
      })
    );

    return this.toEntity(item);
  }

  async findAll() {
    const items = [];
    let lastEvaluatedKey;

    // Scan can return paginated results, so retrieve every page.
    do {
      const response = await this.client.send(
        new ScanCommand({
          TableName: this.tableName,
          ExclusiveStartKey: lastEvaluatedKey,
        })
      );

      items.push(...(response.Items ?? []));
      lastEvaluatedKey = response.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return items.map((item) => this.toEntity(item));
  }

  async findById(id) {
    const response = await this.client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id },
      })
    );

    return this.toEntity(response.Item);
  }

  async update(id, updates) {
    const allowedFields = ["title", "description", "completed"];

    // Never allow callers to overwrite IDs or timestamps directly.
    const fields = Object.keys(updates).filter((field) =>
      allowedFields.includes(field)
    );

    if (fields.length === 0) {
      return this.findById(id);
    }

    const expressionNames = {
      "#id": "id",
      "#updatedAt": "updatedAt",
    };
    const expressionValues = {
      ":updatedAt": new Date().toISOString(),
    };

    const assignments = fields.map((field, index) => {
      const nameKey = `#field${index}`;
      const valueKey = `:value${index}`;

      expressionNames[nameKey] = field;
      expressionValues[valueKey] = updates[field];

      return `${nameKey} = ${valueKey}`;
    });

    assignments.push("#updatedAt = :updatedAt");

    try {
      const response = await this.client.send(
        new UpdateCommand({
          TableName: this.tableName,
          Key: { id },
          UpdateExpression: `SET ${assignments.join(", ")}`,
          ConditionExpression: "attribute_exists(#id)",
          ExpressionAttributeNames: expressionNames,
          ExpressionAttributeValues: expressionValues,
          ReturnValues: "ALL_NEW",
        })
      );

      return this.toEntity(response.Attributes);
    } catch (error) {
      if (error.name === "ConditionalCheckFailedException") {
        return null;
      }

      throw error;
    }
  }

  async remove(id) {
    const response = await this.client.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
        ConditionExpression: "attribute_exists(#id)",
        ExpressionAttributeNames: {
          "#id": "id",
        },
        ReturnValues: "ALL_OLD",
      })
    );

    return this.toEntity(response.Attributes);
  }
}

module.exports = DynamoTodoRepository;