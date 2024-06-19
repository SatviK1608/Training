const express = require("express");
const app = express();
const { Sequelize, DataTypes } = require("sequelize");

app.use(express.json());

const sequelize = new Sequelize(
  "postgres://postgres:123@localhost:5432/postgres"
);

const User = sequelize.define(
  "fbuser",
  {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const Post = sequelize.define(
  "post",
  {
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

// a user can have multiple posts
User.hasMany(Post);

// a post belongs to one user
Post.belongsTo(User);



// sequelize.sync({alter:true}).then(()=>{
//     User.bulkCreate([
//         {
//             username:'WittCode',
//             password:'subscribe'
//         },
//         {
//             username:'Mike1234',
//             password:'dude78'
//         },
//         {
//             username:'FredGuy7',
//             password:'pizzaIsGood'
//         }
//     ]);

//     Post.bulkCreate([
//         {
//             message:"This was an amazing post"
//         },
//         {
//             message:"This was a great content"
//         },
//         {
//             message:"This was an amazing video"
//         },
//         {
//             message:"This was a nice"
//         },
//         {
//             message:"This was F9"
//         }
//     ])
// }).catch((err)=>{
//     console.error('Error syncing PostgreSQL database:', err);
// })



let user, posts;




//To add multiple values in fk using addPosts

// sequelize.sync({alter:true}).then(()=>{
//     return User.findOne({where:{username:'WittCode'}})
// }).then((data)=>{
//     user=data;
//     return Post.findAll();
// }).then((data)=>{
//     posts=data;
//     user.addPosts(posts);  //WittCode becomes owner of all posts
// }).catch((err)=>{
//     console.error('Error syncing PostgreSQL database:', err);
// })




//countPosts to count no of posts of a user using countPosts

// sequelize.sync({alter:true}).then(()=>{
//     return User.findOne({where:{username:'WittCode'}})
// }).then((data)=>{
//     user=data;
//     return user.countPosts();
// }).then((data)=>{
//     console.log(data)
// }).catch((err)=>{
//     console.error('Error syncing PostgreSQL database:', err);
// })




//to remove post from a user(setting fk to null) using removePost or removePosts

// sequelize.sync({alter:true}).then(()=>{
//     return User.findOne({where:{username:'WittCode'}})
// }).then((data)=>{
//     user=data;
//     return Post.findOne(); //returns the first post it finds
// }).then((data)=>{
//     posts=data;
//     user.removePost(posts);
// }).catch((err)=>{
//     console.error('Error syncing PostgreSQL database:', err);
// })

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000/`);
});
