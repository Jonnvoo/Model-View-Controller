const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
});


Comment.belongsto(Blog,{
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
});

Comment.belongsto(User,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});



Blog.belongsto(User,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

module.exports = {User , Blog, Comment};