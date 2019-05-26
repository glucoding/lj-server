/**
 * Created by gehao on 2019/3/29.
 */
const mongoose = require('mongoose');
Schema = mongoose.Schema;

const ArticleSchema = mongoose.Schema({
    title: String,
    createTime: String,
    editor: String,
    content: String,
    type: String,
    tags: String,
    count: String,
    media: []
});

module.exports = mongoose.model('Article', ArticleSchema);