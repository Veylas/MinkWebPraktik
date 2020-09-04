const bcrypt = require('bcrypt');
//const { Connection } = require('tedious');

class Router {
   constructor(app, conn) 
   {
   this.login(app, conn);
   this.logout(app, conn);
   this.isLoggedIn(app, conn);
   }

   login(app, conn){
         app.post('/login', (req, res)=>{
             let username = req.body.username;
             let password = req.body.password;
             console.log(username)
 
             if(username.length > 12 || password.length > 12){
                 res.json({
                     success:false,
                     msg: 'An error occured, please try again'
                 })
                 return;
             }
             let cols = [username];
             conn.connect('SELECT * from Persons Where surName = ? LIMIT 1', cols, (err, data, fields) => {

                if(err){
                    res.json({
                        success: false,
                        msg: 'An error occured, please try again'
                    })
                    return;
                }
                if (data && data.length ===1){
                    bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {
                    if (verified){

                        req.session.userID = data[0].id;
                        res.json({
                          success: true,
                          username: data[0].username
                        })
                        return;
                    }
                    else {
                        res.json({
                            success: false,
                            msg:'invalid password'
                        })
                    } 
                  });
             } else {
                 res.json({
                     success:false,
                     msg: 'User not found'
                 })
             }
        });

             //console.log(username)
    });
}

   logout(app, conn){
      app.post('/logout', (req, res)=> {
          if (req.session.userID){
              req.session.destroy();
              res.json({
                  success: true
              })
              return true;
             } else{
          res.json({
              success: false
          })
          return false;
      }
   });
   }

   isLoggedIn(app, conn){
       app.post('logout', (req, res) =>{
          if (req.session.userID){
              let cols = [req.session.userID];
              conn.query('Select * from Persons where id = ? limit 1', cols, (err, data, fields) => {
                  if (data && data.length ===1){
                      res.json({
                              success: true,
                              username: data[0].username
                          })
                          return true;
                  } else {
                      res.json({
                          success: false
                      })
                  }
              });

          }
          else {
              res.json({
                  success: false
              })
          }
       });

   }
}



module.exports = Router;
   