// routes.index.js

(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

module.exports = function(app)
{
  app.get('/:player1/:player2', function(req, res){
    var player1 = req.params.player1;
    var player2 = req.params.player2;
    let runPy = new Promise(function(success, nosuccess){
      const spawn = require("child_process").spawn
      const pythonProcess = spawn('python', ["./Omok/pj4/app.py", player1, player2]);

      pythonProcess.stdout.on('data', function(data) {
        success(data);
      });

      pythonProcess.stderr.on('data', (data) => {
        nosuccess(data);
      });
    });

    runPy.then(function(fromRunpy){
      console.log(fromRunpy.toString());
      res.end(fromRunpy);
    });
  });
};
