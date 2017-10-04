// style library
require("bootstrap/dist/css/bootstrap.css");

// jQuery and Bootstrap
var $ = require("jquery");
require("bootstrap/dist/js/bootstrap.js");

// require()メソッドを使ってsub.jsファイルを読み込む。
var sub = require("./sub.js");

// sub.jsに定義されたJavaScriptを実行する。
sub.hello();
