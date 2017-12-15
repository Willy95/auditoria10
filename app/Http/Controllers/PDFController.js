'use strict'

const Database   = use('Database')
const Helpers    = use('Helpers')
const viewsPath  = Helpers.viewsPath()
const pdfView    = Helpers.viewsPath()

class PDFController {

  * make (req, res){

    const data  = req.all();
    var pdf     = require('html-pdf');
    var html    = data.html;
    // var fsy     = require('file-system');
    // var html    = fsy.readFileSync(pdfView + "/pdf.njk", 'utf8');
    // var options = { format: 'Letter' };

    const timestamp = new Date();
    var name        = Math.floor((Math.random() * 999999999999999999) + 1) + timestamp.getTime() + '.pdf';

    pdf.create(html).toFile(Helpers.publicPath('/reportes/' + name), function(err, resp) {
      if (err) {
        return res.send({
          status : 500,
          message: "El reporte no pudo ser creado",
          data   : err
        })
      }
      else {
        return res.send({
          status : 200,
          message: "El reporte se creó exitosamente",
          data   : {
            dir : resp,
            name: name
          }
        })
      }
    });

  }
}

module.exports = PDFController
