const { Router } = require('express')
const { check } = require('express-validator')

const middlewareRoles  = require('../middlewares/validar_roles')
const middlewareJWT  = require('../middlewares/validar_jwt')
const middleware  = require('../middlewares/validar_campos')
const roleCtrl = require('../controllers/role')


const router = Router();

router.post('/',[
   // middlewareJWT.validarJWT,
   // middlewareRoles.hasRole('ADMIN_ROLE'),
   // check('rol', 'El nombre es obligatorio').not().isEmpty(),
   // middleware.validarCampos,
], roleCtrl.createrRole)

module.exports = router