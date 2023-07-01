const AbstractManager = require("./AbstractManager");

class TypeManager extends AbstractManager {
  constructor() {
    super({ table: "types" });
  }

  insert(type) {
    return this.database.query(
      `insert into ${this.table} (title, description) values (?, ?)`,
      [type.title, type.description]
    );
  }

  update(type) {
    return this.database.query(
      `update ${this.table} set title = ?, set description = ? where id = ?`,
      [type.title, type.description, type.id]
    );
  }
}

module.exports = TypeManager;
