const AbstractManager = require("./AbstractManager");

class FileManager extends AbstractManager {
  constructor() {
    super({ table: "files" });
  }

  insert(file) {
    return this.database.query(
      `insert into ${this.table} ( original_name, filename_server, account_nb, created_date, start_period, end_period, size) values (?)`,
      [
        file.original_name,
        file.filename_server,
        file.account_nb,
        file.created_date,
        file.start_period,
        file.end_period,
        file.size,
      ]
    );
  }

  update(file) {
    return this.database.query(
      `update ${this.table} set original_name = ? set filename_server = ? set account_nb = ? set created_date = ? set start_period = ? set end_period = ? set size = ? where id = ?`,
      [
        file.original_name,
        file.filename_server,
        file.account_nb,
        file.created_date,
        file.start_period,
        file.end_period,
        file.size,
        file.id,
      ]
    );
  }
}

module.exports = FileManager;
