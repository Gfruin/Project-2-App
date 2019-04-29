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
}) //end of index route
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
}) //end of new route
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
                    console.log(savedUser, "saved a user");
                    res.redirect('/posts')

                })
            })
            //may need to alter route "post" to "posts"
        }
    })
}) //end of create route

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
}) //end of show route

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

}) //end of destroy route
//edit route
router.get('/:id/edit', async (req, res, next) => {
    // try {
    //     const allUsers = await User.find({})
    //     const findOneUser = await User.findById(req.session.userDBId).populate(req.session.userDBId)
    //     const foundPostUser = await User.exec(res.render('posts/edit.ejs', {
    //                     posts: foundPostUser.posts[0],
    //                     users: allUsers,
    //                     postUser: foundPostUser
    // }))
    // } catch(err) {
    //     next(err)
    // }

 //end of edit route    User.find({}, (err, allUsers) => {
      
    User.find({}, (err, allUsers) => {
        User.findById(req.session.userDBId)
            .populate({
                path: 'posts',
                match: {
                    _id: req.params.id // get post that matches the post Id user is trying to edit
                }
            })
            .exec((err, foundPostUser) => {
                console.log("\n here is foundPostUser in show route");
                console.log(foundPostUser);
            
                if (err) {
                    res.send(err)
                } else {
                    res.render('posts/edit.ejs', { //may need to alter route "post" to "posts"
                        post: foundPostUser.posts[0],
                        users: allUsers,
                        postUser: foundPostUser
                    })
                }
            
            })
        })
    })




    // User.find({}, (err, allUsers) => {
    //     User.findOne({
    //             'post': req.params.id
    //         })
    //         .populate({
    //             path: 'post',
    //             match: {
    //                 _id: req.params.id
    //             }
    //         })
    //         .exec((err, foundPostUser) => {
    //             console.log(foundPostUser, "<----foundPostUser");
    //             if (err) {
    //                 res.send(err)
    //             } else {
    //                 res.render('posts/edit.ejs', { //may need to alter route "post" to "posts"
    //                     posts: foundPostUser.posts[0],
    //                     users: allUsers,
    //                     postUser: foundPostUser
    //                 })
    //             }
    //         })
    // })

// //update route
//if the user is changed
//1. then the post goes into a different user's array
//2.  and is removed from the original user's array of articles
// need to find a post and update that post
//then need to find the user and see who changed the post
//need to remove the post from the user 
 //need to redirect
// router.put('/:id', (req,res, next) => {
//     Post.findByIdAndUpdate(req.session.userDBId, {new: true}, (err, updatedPost) => {
//         User.findById(req.session.userDBId , (err, foundUser) => {
//             // if(foundUser.userDBId.toString() !== req.body.userDBId) {
//                 foundUser.save((err, savedFoundUser) => {
//                     User.findById(req.session.userDBId, (err, newUser) => {
//                         req.session.userDBId.posts.push(updatedPost);
//                         userDBId.save((err, savedNewUser) => {
//                             res.redirect('/posts' + req.session.userDBId)
//                         })
                   
//                     })
//                 })
//             // } else {
//             //     res.redirect('/posts/' + req.session.userDBId)
//             // }
//         })
//     })
// }) //end of update route



router.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.session.userDBId, req.body, {new: true}, (err, updatedPost) => {
    console.log(updatedPost, "<-----Here is the updatedPost");
        User.findById(req.session.userDBId , (err, foundUser) => {
            console.log(foundUser, "<-----This muthafucka");
            if(foundUser._id.toString() !== req.session.userDBId) {
                foundUser.posts.remove(req.session.userDBId);
                foundUser.save((err, savedFoundUser) => {
                    console.log(savedFoundUser, "<-----saved this muthafucka");
                    User.findById(req.session.userDBId, (err, newUser) => {
                        console.log(newUser, "<------muthafucka");
                        newUser.posts.push(updatedPost);
                        newUser.save((err, savedNewUser) => {
                            console.log(savedNewUser, "<----muthafucka jones");
                            res.redirect('/posts/')
                        })
                   
                    })
                })
            } else {
                res.redirect('/posts/' + req.params.id)
            }
        })
    })
}) //end of update route




//export module

module.exports = router;