import webpack from "webpack";

//  webpack configured to bundle js files
export default function compileJs(cb) {
  webpack(require("../webpack.config"), function (err, stats) {
    if (err) {
      console.log(err.toString());
    }
    console.log(stats.toString());
    cb();
  });
}
