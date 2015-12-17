"use strict";
import PDFController from "pdf.js-controller";

const _$ = (id) => {
  return document.getElementById(id);
};

function getCornerColor(context) {
    var canvasColor = context.getImageData(0, 0, 1, 1);
    var pixels = canvasColor.data;
    var r = pixels[0];
    var g = pixels[1];
    var b = pixels[2];
    return "rgb(" + r + ',' + g + ',' + b + ")";
}

function initializedEvent(controller) {
  _$('js-prev').addEventListener('click', controller.prevPage.bind(controller));
  _$('js-next').addEventListener('click', controller.nextPage.bind(controller));

  window.addEventListener("resize", function(event) {
    controller.fitItSize();
  });
  document.onkeydown = function(event) {
    var kc = event.keyCode;
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
      return;
    }
    if (kc === 37 || kc === 40 || kc === 75 || kc === 65) {
      // left, down, K, A
      event.preventDefault();
      controller.prevPage();
    } else if (kc === 38 || kc === 39 || kc === 74 || kc === 83) {
      // up, right, J, S
      event.preventDefault();
      controller.nextPage();
    }
  };
}

export default class SlideController {
  /*
    params = {
      container: {string}, default "pdf-container"
      pdfDistDir: {string}, default "./pdfjs-dist/",
      pdfUrl: {string}
    }
  */
  constructor(params) {
    this.options = Object.assign({
      container: "pdf-container",
      pdfDistDir: "./pdfjs-dist/"
    }, params);

    this.container = _$(this.options.container);
    this.controller = new PDFController({
      container: this.container,
      pdfDistDir: this.options.pdfDistDir
    });

    this.container.addEventListener(PDFController.Events.before_pdf_rendering, (event) => {
      var context = this.controller.canvasContext;
      var cornerColor = getCornerColor(context);
      this.container.style.backgroundColor = cornerColor;
      document.body.style.backgroundColor = cornerColor;
      this.controller.domMapObject.canvas.style.visibility = "hidden";
    });
    this.container.addEventListener(PDFController.Events.after_pdf_rendering, (event) => {
      var context = this.controller.canvasContext;
      var cornerColor = getCornerColor(context);
      this.container.style.backgroundColor = cornerColor;
      document.body.style.backgroundColor = cornerColor;
      this.controller.domMapObject.canvas.style.visibility = "visible";
    });

    this.controller
      .loadDocument(this.options.pdfUrl)
      .then(() => {
        initializedEvent(this.controller);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

}
