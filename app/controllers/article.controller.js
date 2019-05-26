/**
 * Created by gehao on 2019/3/29.
 */
const Article = require('../models/article.model.js');


exports.create = (req, res) => {
    const article = new Article({
        title: req.body.title,
        createTime: req.body.createTime,
        editor: req.body.editor,
        content: req.body.content,
        type: req.body.type,
        tags: req.body.tags,
        media: req.body.media,
        count: req.body.count
    });

    // Save a Enterprise in the MongoDB
    article.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


exports.findAll = (req, res) => {
    Article.find()
        .then(articles => {
            res.send(articles);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAllByType = (req, res) => {
    console.log(req.params.type)
    Article.find({'type':req.params.type})
        .then(articles => {
            res.send(articles);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


exports.findOne = (req, res) => {
    Article.findById(req.params._id)
        .then(article => {
            if(!article) {
                return res.status(404).send({
                    message: "Article not found with id " + req.params._id
                });
            }
            res.send(article);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Article not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Article with id " + req.params._id
        });
    });
};

// UPDATE a Enterprise
exports.update = (req, res) => {
    Article.findByIdAndUpdate(req.params._id, {
        title: req.body.title,
        createTime: req.body.createTime,
        editor: req.body.editor,
        content: req.body.content,
        type: req.body.type,
        tags: req.body.tags,
        media: req.body.media,
        count: req.body.count
    }, {new: true})
        .then(article => {
            if(!article) {
                return res.status(404).send({
                    message: "Article not found with id " + req.params._id
                });
            }
            res.send(article);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Article not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating Article with id " + req.params._id
        });
    });
};

// DELETE a Enterprise
exports.delete = (req, res) => {
    Article.findByIdAndRemove(req.params._id)
        .then(article => {
            if(!article) {
                return res.status(404).send({
                    message: "Article not found with id " + req.params._id
                });
            }
            res.send({message: "Article deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Article not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Could not delete Article with id " + req.params._id
        });
    });
};