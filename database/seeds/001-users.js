
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        { username : "User1", password: "password1" },
        { username : "User2", password: "password2" },
        { username : "User3", password: "password3" },
        { username : "User4", password: "password4" },
        { username : "User5", password: "password5" },
      ]);
    });
};
