const AbstractManager = require("./AbstractManager");

class TransactionManager extends AbstractManager {
  constructor() {
    super({ table: "transactions" });
  }

  insert(transaction) {
    return this.database.query(
      `insert into ${this.table} (title, description, bank_date, transaction_date, value, file_id, category_id) values (?, ?, ?, ?, ? ,? ,?)`,
      [
        transaction.title,
        transaction.description,
        transaction.bank_date,
        transaction.transaction_date,
        transaction.value,
        transaction.file_id,
        transaction.category_id,
      ]
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
