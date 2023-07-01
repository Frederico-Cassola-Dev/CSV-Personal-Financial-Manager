const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, photo, email, hash) values (?,?,?,?,?)`,
      [user.firstname, user.lastname, user.photo, user.email, user.hash]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set firstname = ? set lastname = ? set photo = ? set email = ? set hash = ? where id = ?`,
      [
        user.firstname,
        user.lastname,
        user.photo,
        user.email,
        user.hash,
        user.id,
      ]
    );
  }
}

module.exports = UserManager;
