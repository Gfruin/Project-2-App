// require express, router, and models
const express = require('express');
const router = express.Router();
const Post = require('../models/post'); //may need to change the variable name and multiples
const User = require('../models/user');
//index route
router.get('/', (req, res) => {
    console.log('<-------------Hit the index route');
    //need to display the posts that have been created
    Post.find({}, (err, foundPosts) => {
        if (err) {
            console.log(err);
        } else {
            res.render('posts/index.ejs', {
                posts: foundPosts
            })

        }
    })
})
//new route
router.get('/new', (req, res, next) => {
    User.find({}, (err, allUsers) => {
        if (err) {
            next(err);
        } else {
            res.render('posts/new.ejs') //may need to alter route "post" to "posts"
            users: allUsers
        }
    })
})
//create route
router.post('/', (req, res) => {
    console.log('this is the post create route');
    Post.create(req.body, (err, createdPost) => {
        if (err) {
            console.log(err);
        } else {
            console.log(req.body)
            /// find the correct user and push into their array
            console.log(req.session);
            User.findById(req.session.userDBId, (err, foundUser) => {
                console.log(foundUser, 'here is the user ');
                foundUser.posts.push(createdPost);
                foundUser.save((err, savedUser) => {
                    console.log(savedUser, "ohohofgdsajfdj");
                    res.redirect('/posts')

                })
            })
            //may need to alter route "post" to "posts"
        }
    })
})
// show route

router.get('/:id', (req, res, next) => {
    Post
        .findById(req.params.id)
        // .populate('comments')
        .exec((err, foundPost) => {
            if (err) next(err);
            else {
                console.log("----------");
                console.log(foundPost);
                res.render('posts/show.ejs', { // render show template -- we render templates
                    post: foundPost // this contains the ID
                })
            }
        })
})

// destroy route
router.delete('/:id', async (req, res, next) => {
    try{
        const foundUser = await User.findById(req.session.userDBId).populate('posts')
        const deletedPost = await Post.findByIdAndRemove(req.params.id)
        const removeUserPost = await foundUser.posts.remove(req.params.id);
        const updatedUser = await foundUser.save()
                    console.log(updatedUser);


        res.redirect('/posts');
    } catch(e) {
        next(e)
    }

    // User.findById((req.session.userDBId).populate('posts'), (err, foundUser) => {
    //         if (err) {
    //             next(err)
    //         } else {
    //             console.log(foundUser, "<-------this is our User before deletion");
    //             })
    //         }
    //     })
    // })
})
//edit route
router.get('/:id/edit', (req, res) => {
    //this route will allow the user to select all users when they are editing the user
    //need to use User.find
    //then the route will find the post and corresponding user
    //User.findOne?
    //use .populate to find all articles
    //use match to populate only articles that match the certain user id
    User.find({}, (err, allUsers) => {
        User.findOne({
                'post': req.params.id
            })
            .populate({
                path: 'post',
                match: {
                    _id: req.params.id
                }
            })
            .exec((err, foundPostUser) => {
                console.log(foundPostUser, "<----foundPostUser");
                if (err) {
                    res.send(err)
                } else {
                    res.render('posts/edit.ejs', { //may need to alter route "post" to "posts"
                        posts: foundPostUser.posts[0],
                        users: allUsers,
                        postUser: foundPostUser
                    })
                }
            })
    })
})
// //update route
//if the user is changed
//1. then the post goes into a different user's array
//2.  and is removed from the original user's array of articles
// need to find a post and update that post
//then need to find the user and see who changed the post
//need to remove the post from the user 
 //need to redirect
router.put('/:id', (req,res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPost) => {
        User.findOne({'post': req.params.id}, (err, foundUser) => {
            if(foundUser._id.toString() !== req.body.userId) {
                foundUser.save((err, savedFoundUser) => {
                    User.findById(req.body.userId, (err, newUser) => {
                        newUser.post.push(updatedPost);
                        newUser.save((err, savedNewUser) => {
                            res.redirect('/posts' + req.params.id)
                        })
                   
                    })
                })
            } else {
                res.redirect('/posts/' + req.params.id)
            }
        })
    })
})

//export module

module.exports = router;