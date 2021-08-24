const {getMenuItems,getAllOrders,getMenuItem, getOrderDetails} = require('../db/rundb/owner_queries.js');
const {getUserStatus} = require('../db/rundb/login_queries.js');

//user this user for owner


module.exports = function(router) {

  router.get('/dashboards', (req, res) => {
    const sessionId = req.session.userid;
    console.log(sessionId)
    getUserStatus(sessionId)
      .then((result) =>{
        console.log(result)
        if (result) {
          res
          .status(200)
          .render("customer_menu", templateVars)
        } else {
          res
          .status(403)
          .send("❌ Permission Denied! You don't have permissions to view this page");
        }
      })
  });

  router.get('/menu/:item', (req, res) => {
    const itemID = req.params.item;
    getMenuItem(itemID)
      .then(data => {
        res
          .status(200)
          .json(data)
      })
      .catch(error => {
         res
            .status(500)
            .send("Catch :", error.message)
      });
  });

  router.get('/order/:item', (req, res) => {
    const orderID = req.params.item;
    getOrderDetails(orderID)
    .then(data => {
      res
        .status(200)
        .json(data)
    })
    .catch(error => {
      res
        .status(500)
        .send("Catch :", error.message)
    })
  });

  return router;
}
