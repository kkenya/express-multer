"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var upload = multer_1.default({ dest: 'uploads/' });
var app = express_1.default();
var port = 3000;
app.get('/', function (_req, res) {
    res.send('Hello World!');
});
app.post('/profile', upload.single('avatar'), function (req, res) {
    console.log(req);
    res.status(204);
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
});
app.post('/photos/upload', upload.array('photos', 12), function (req, res) {
    console.log(req);
    res.status(204);
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
});
var cpUpload = upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 8 },
]);
app.post('/cool-profile', cpUpload, function (req, res) {
    console.log(req);
    res.status(204);
    // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
    //
    // e.g.
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body will contain the text fields, if there were any
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
//# sourceMappingURL=app.js.map