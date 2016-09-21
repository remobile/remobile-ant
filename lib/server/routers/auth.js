import getDefaultFavicon from 'helpers/default-favicon';
import getMarkup from 'helpers/get-markup';
import passport from 'passport';
import routeHandler from 'helpers/route-handler';
import routes from 'routers/auth';
import {Router} from 'express';

import UserModel from '../models/user';

const authRouter = new Router();

function injectScript (req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        res.locals.header.push({
            tag: 'link',
            props: {
                rel: 'stylesheet',
                type: 'text/css',
                href: '/assets/auth.css'
            }
        });
        res.locals.header.push({
            tag: 'link',
            props: {
                rel: 'stylesheet',
                type: 'text/css',
                href: '/assets/common.js.css'
            }
        });
    }
    res.locals.header.push(getDefaultFavicon(res));
    res.locals.footer.push({
        tag: 'script',
        props: {
            src: `${res.baseScriptsURL}/assets/auth.js`
        }
    });
    next();
}

authRouter.get('/admin/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin');
    } else {
        routeHandler(routes, req, res, next);
    }
});

authRouter.get('/admin/register', (req, res, next) => {
    routeHandler(routes, req, res, next);
});

// Logout
authRouter.get('/admin/logout', (req, res) => {
    req.logout();
    res.redirect('/admin/login');
});

// Register
authRouter.get('/admin/register', injectScript, async (req, res, next) => {
    res.status(200).send(getMarkup(req.store, res));
});

// Login
authRouter.get('/admin/login', injectScript, (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin');
    } else {
        res.status(200).send(getMarkup(req.store, res));
    }
});

authRouter.post('/admin/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            res.status(500).send({
                error: 500,
                message: err.message
            });
        } else if (!user) {
            res.status(403).send({
                error: 403,
                message: 'Invalid username and password combination'
            });
        } else {
            req.logIn(user, (error) => {
                if (error) {
                    res.status(500).send({
                        error: 500,
                        message: error.message
                    });
                } else {
                    res.status(200).end();
                }
            });
        }
    })(req, res, next);
});

export default authRouter;
