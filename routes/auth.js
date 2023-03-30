/*
 * auth routes
 * host + /api/auth
 */
const { Router } = require('express');
const {check} = require('express-validator');
const router = Router();

const {create_user,login,revalidar_token} = require('../controllers/auth');
const { validate_fields } = require('../public/middlewares/validate-fields');
const { validate_jwt } = require('../public/middlewares/validate-jwt');

router.post(
            '/create_user',
            [
                check('name','name is a must').not().isEmpty(),
                check('email','email is a must').isEmail(),
                check('password','pass must have min 6 letters').isLength({min:6}),
                validate_fields
            ],
            create_user
        );

router.post(
            '/login',
            [
                check('email','email is a must').isEmail(),
                check('password','password must have min 6 letters').isLength({min:6}),
                validate_fields
            ],
            login
        );
router.get('/revalidar_token',validate_jwt,revalidar_token);

module.exports = router;