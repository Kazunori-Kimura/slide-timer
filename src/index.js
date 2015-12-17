"use strict";
import ko from "knockout";
import {Timer, timerView} from "./Timer";

ko.components.register("timer",
{
  viewModel: Timer,
  template: timerView
});

ko.applyBindings();
