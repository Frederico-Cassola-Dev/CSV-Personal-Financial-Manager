const AbstractManager = require("./AbstractManager");

class TransactionManager extends AbstractManager {
  constructor() {
    super({ table: "transactions" });
  }

  async insert(finalArray) {
    await this.database.query(
      `insert into ${this.table} (bank_date, value, title, description, transaction_date, undefined, file_id, category_id) values ?`,
      [finalArray]
    );
  }

  update(transaction) {
    return this.database.query(
      `update ${this.table} set title = ?, set description = ?, set bank_date = ?, set transaction_date = ?, set value = ?, set file_id = ?, set category_id = ?, where id = ?`,
      [
        transaction.title,
        transaction.description,
        transaction.bank_date,
        transaction.transaction_date,
        transaction.value,
        transaction.file_id,
        transaction.category_id,
        transaction.id,
      ]
    );
  }
}

module.exports = TransactionManager;
