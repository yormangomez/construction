const { Router } = require('express')
const { check } = require('express-validator')

const middleware  = require('../middlewares/validar_campos')

const uploadsCtrl = require('../controllers/uploads')

const router = Router();

router.post('/',[],  uploadsCtrl.fileUpload);


module.exports = router