var Reflux = require('reflux');
var ActionsConfig = Reflux.createActions([
	"hasSearch",
	"hasControlAccess",
	"hasFeatured",
]);

module.exports = ActionsConfig;
