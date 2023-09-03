var express = require('express');
var path = require('path');
let multer = require("multer");

const { db } = require('../utils/db');

var router = express.Router();

/**
 * 添加子码
 */
router.post('/addChildCode', function (req, res, next) {
  let { codeUrl } = req.body;
  let sql = `insert into childrencode (codeUrl,count) values ('${codeUrl}','0')`;
  // console.log(sql);
  db.query(sql,(err,result)=>{
    if(result.insertId){
      res.send(result.insertId+"")
    }else{
      res.send("添子码成功")
    }
  })
});
/**
 * 添加活码
 */
router.post('/addCode', function (req, res, next) {
  // console.log(req.body);
  let { codeTitle, codeDiscription, childrenIds, logoUrl, changeValue } = req.body;
  let sql = `
  insert into livecode (codeTitle,codeDescription,childrenIds,logoUrl,changeValue,count)
  values 
  ('${codeTitle}','${codeDiscription}','${childrenIds}','${logoUrl}','${changeValue}','0')`;
  db.query(sql,(err,result)=>{
    res.send("添加活码成功")
  })
});
/**
 * 删除活码
 */
router.post('/deleteLiveCode', function (req, res, next) {
  let { id } = req.body;
  let sql = `delete from livecode where id='${id}'`;
  db.query(sql,(err,result)=>{
    res.send("删除活码成功")
  })
});
/**
 * 获取活码列表
 */
router.get('/getCodeList', function (req, res, next) {
  let sql = `select * from livecode`;
  db.query(sql,(err,result)=>{
    res.send(result)
  })
});
/**
 * 获取子码列表
 */
router.get('/getChildCodeList', function (req, res, next) {
  let sql = `select * from childrencode`;
  db.query(sql,(err,result)=>{
    res.send(result)
  })
});

/**
 * 根据id获取单个活码
 */
router.post('/getCodeById', function (req, res, next) {
  let {id} = req.body;
  let sql = `select * from livecode where id=${id}`;
  // console.log(sql);
  db.query(sql,(err,result)=>{
    res.send(result)
  })
});
/**
 * 根据id获取单个子码
 */
router.post('/getChildCodeById', function (req, res, next) {
  let {id} = req.body;
  let sql = `select * from childrencode where id=${id}`;
  db.query(sql,(err,result)=>{
    res.send(result)
  })
});

/**
 * 根据id，count给活码计数
 */
router.post('/updateLiveCodeCount', function (req, res, next) {
  let {id,count} = req.body;
  let newCount = count+1
  let sql = `update livecode set count=${newCount} where id=${id}`;
  db.query(sql,(err,result)=>{
    res.send("修改成功")
  })
});
/**
 * 根据id，count给子码计数
 */
router.post('/updateChildCodeCount', function (req, res, next) {
  let {id,count} = req.body;
  let newCount = count+1
  let sql = `update childrencode set count=${newCount} where id=${id}`;
  db.query(sql,(err,result)=>{
    res.send("修改成功")
  })
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/')); // 指定文件上传目录
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // 指定文件名
  }
});

let upload = multer({
  storage: storage,
  // 设定限制，每次最多上传1个文件，文件大小不超过10MB
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
});
// uploadImg
router.post("/uploadImg", upload.single("file"), (req, res, next) => {
  res.send("uploads/" + req.file.filename)
})

module.exports = router;
