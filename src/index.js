"use strict";
import ko from "knockout";
import {Timer, timerView} from "./Timer";
import SlideController from "./PdfSlide"

// タイマーの表示
ko.components.register("timer",
{
  viewModel: Timer,
  template: timerView
});

ko.applyBindings();

// スライドの表示
const slide = new SlideController({ pdfUrl: "slide/2015-12-19.pdf" });
