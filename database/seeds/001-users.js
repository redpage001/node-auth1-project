
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username : "User1", password: "password1" },
        { username : "User2", password: "password2" },
        { username : "User3", password: "password3" },
        { username : "User4", password: "password4" },
        { username : "User5", password: "password5" },
      ]);
    });
};
