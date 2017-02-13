"use strict";
var router_1 = require("@angular/router");
var add_component_1 = require("./book/add.component");
var edit_component_1 = require("./book/edit.component");
var appRoutes = [
    {
        path: 'manage/:id',
        component: add_component_1.AddComponent
    },
    {
        path: 'edit',
        component: edit_component_1.EditComponent
    },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map