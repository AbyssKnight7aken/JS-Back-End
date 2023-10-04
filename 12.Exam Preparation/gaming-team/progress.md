# Notes

1. [done] Initialize project and structure.
2. [done] Setup dev enviropment.
3. [done] Install and setup express.
    * [done] add static middleware.
    * [done] add body parser.
    * [done] add routes.
4. [done] Add static resources.
5. [done] Add view folder with ready html templates.
6. [done] Add expess-handlebars view engine. 
    * [done] install express.
    * [done] add to express.
    * [done] config extension.
    * [done] config views folder (only for src).
    * [done] add main layout.
    * [done] add partials folder.
    * [done] fix static paths
    * [done] fix navigation to home
    * [done] render home page
7. [done] Add controller folder with home controller.
8. [done] Add database.
    * [done] install mongooe.
    * [done] connect database
9. [done] Authentication.
    * [done] add user controller.
    * [done] add controller to routes.
    * [done] fix header navigation to login, register and logout.
    * [done] render login page
    * [done] render register page.
10. [done] Add user model.
    * [done] add unique index to username.
    * [done] vlidate repeat password.
11. [done] Modify login and register forms.
12. [done] Add login and register actions.
13. [done] Add user manager.
    * [done] require in user controller.
    * [done] add register method.
    * [done] validate if user is already exists.
14. [done] Hash password.
    * [done] install bcrypt
    * [done] hash password.
15. [done] Login.
    * [done] find user by username.
    * [done] validate password with hash.
16. [done] Generate JWT.
    * [done] install jswonwebtoken.
    * [done] promisify jsonwebtoken (optional).
    * [done] create secret.
    * [done] generate token in manager.login.
17. [done] Return token in cookie.
    * [done] install cookie parcer.
    * [done] config cookie parser.
    * [done] set cookie witt token
18. [done] Logout.
19. [done] Authentication middleware
    * [done] create base middleware.
    * [done] use middleware.
    * [done] implement auth middleware.
    * [done] attach decoded token to the request.
    * [done] handle invalid token.
20. [done] Authorization middleware.
21. [done] Dynamic navigation.
    * [done] add conditional renderering in  main layout.
    * [done] add to res.locals.
22. [done] Error handling.
    * [done] add 404 page.
    * [done] redirect missing routes to 404.
    * [done] add global error handler (optional).
    * [] use global error handler after routes(optional);
    * [done] add error message extractor.
23. [done] Show error notifications.
    * [done] add error container to main layout.
    * [done] show error cntainer conditionally.
    * [done] pass error to render.
    * [done] add local error handler.
24. [done] Automatically login after register.

## Next time
1. Globar error handler.
2. Debugger.