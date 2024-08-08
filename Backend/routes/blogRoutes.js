const express=require('express');
const router = express.Router();
const {createBlog, createBlogSchedule, getGlogs, getScheduleBlog, editBlogSchedule, deleteBlogSchedule,getGlogById} = require('../controller/blogController')


const multer=require('multer');

const storage=multer.memoryStorage({
    destination: function(req, file, cb){
        cb(null, "src\\images");
    },
    filename:function(req, file, cb){
        let uniquiSuffix= Date.now()+"."+file.mimetype.split("/")[1]
        cb(null, uniquiSuffix);
    }
})

const upload = multer({storage:storage});
const schedule="schedule"
router.post('/schedule', upload.single("image"), createBlog);
router.post('/', createBlogSchedule);

router.put('/:id', editBlogSchedule);

router.delete('/schedule', deleteBlogSchedule);


router.get('/get', getGlogs);
router.get('/:id', getGlogById);
router.get('/', getScheduleBlog);

module.exports=router;