import * as express from 'express';
import db from '../../db';
import { isAuthor } from './permissions';

const router = express.Router();

router.get('/:id?', async (req, res, next) => {
    try {
        let id = Number(req.params.id);
        if(id) {
            let blog = await db.Blogs.one(id);
            res.send(blog);
        } else {
            let blogs = await db.Blogs.all();
            res.send(blogs);
        }
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/', isAuthor, async (req, res, next) => {
    try {
        let {title, content, authorid, tags} = req.body;
        let response = await db.Blogs.post(title, content, authorid, tags);
        res.send(response);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.put('/:id', isAuthor, async (req, res, next) => {
    try {
        let {title, content, tags} = req.body;
        let id = Number(req.params.id);
        db.Blogs.put(title, content, tags, id);
        res.json({message: 'Blog updated successfully!'});
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.delete('/:id', isAuthor, async (req, res) => {
    try {
        let id = Number(req.params.id);
        db.Blogs.deleter(id);
        res.json({message: 'Blog deleted successfully!'})
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;