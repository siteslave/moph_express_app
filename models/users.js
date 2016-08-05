
module.exports = {

  checkLogin: function (db, username, password) {
    return db('test_users')
      .where({
        username: username,
        password: password
      })
      .count('* as total');
  }

};