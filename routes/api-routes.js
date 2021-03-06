var db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res){
    db.Diningroom.findAll({
    }).then(function(dbtables){
      db.Menu.findAll({        
      }).then(function(dbmenu){
        let allTables = []
        dbtables.forEach(element => {
          let newData = element.dataValues
          allTables.push(newData)
        });
        var appe = [];
        var entr = [];
        var dese = [];
        dbmenu.forEach(element => {
          let temp = element.dataValues;
          if (temp.category === "Appetizer"){
            appe.push(temp)
          }else if(temp.category === "Entre"){
            entr.push(temp)
          }else{
            dese.push(temp)
          }
        });
        var newobject = {
          tables: { table: allTables,
                    Appetizers: appe,
                    Entres: entr,
                    Deserts: dese
                  }
        }

        return res.render("index", newobject)
      })
    })
  })


  //3/8 new get that I was trying to retrieve the tablehistory
  app.get("/api/order/:id", function(req, res){
    console.log("find the table info")
    db.TableHistory.findOne({
      where: {
        DiningroomId : req.params.id
      }
    }).then(function(tableHistory){
        res.json(tableHistory);
    });
  });


  app.post("/tables", function(req, res) {
    db.Diningroom.create(req.body).then(function(dbDiningroom) {
        res.json(dbDiningroom);
    });
  });

  app.post("/menu",function(req,res){
    db.Menu.create(req.body).then(function(dbmenu){
      res.json(dbmenu)
    })

  });
  
  app.delete("/menu/delete/:id", function(req, res) {
    console.log("start delete")
    db.Menu.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMenu) {
      res.json(dbMenu);
    });
  });

  app.get("/api/menu",function(req,res){
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Menu.findAll({}).then(function(dbMenu) {
      res.json(dbMenu);
    });
  });

  app.post("/check-in", function(req, res) {
    db.TableHistory.create(req.body);
  });//changed the name from "tableId" to "customerId" too many tables being thrown or flipped


  //this is used to change the availbility of the table when you click on appetizer or clear
  app.put("/availability", function(req, res) { 
    db.Diningroom.update(req.body, {
        where: {
          id: req.body.id
        }
    }).then(function(dbDiningroom) {
    });
  });

  //first time updating 2 things at once with 1 update, I am pretty sure it will work since all the updates are in one curly brackets.
  app.put("/clear", function(req,res){
    db.TableHistory.update({ 
      table_color: req.body.table_color, 
      end_at: req.body.end_at
      },
      {
        where: {
          customerId: req.body.customerId
        }
      }).then(function(){
      })
  })
};

