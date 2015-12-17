"use strict";
import ko from "knockout";

const Status = {
  Stop: 0,
  During: 1,
  Pause: 2
};

function _format(milliseconds) {
  const min = __format((milliseconds / 1000) / 60, 2);
  const sec = __format((milliseconds / 1000) % 60, 2);
  const ms = __format(milliseconds, 3);
  //return `${min}:${sec}.${ms}`;
  return `${min}:${sec}`;
}

function __format(num, length) {
  return (`00${Math.floor(num)}`).slice(-1 * length);
}

export class Timer {
  constructor() {
    this.startTime = ko.observable(0);
    this.endTime = ko.observable(0);
    this.total = 0;
    this.status = ko.observable(Status.Stop);

    // interval timer
    this.timer = null;

    // computed properties
    this.time = ko.computed(() => {
      let ms = this.endTime() - this.startTime() + this.total;
      ms = ms < 0 ? 0 : ms;
      return _format(ms);
    });
    this.isStoped = ko.computed(() => {
      return this.status() == Status.Stop;
    });
    this.isDuring = ko.computed(() => {
      return this.status() == Status.During;
    });
    this.isPause = ko.computed(() => {
      return this.status() == Status.Pause;
    });
  }

  start() {
    this.status(Status.During);
    if (this.startTime() == 0) {
      this.startTime(Date.now());
    }

    this.timer = setInterval(() => {
      this.endTime(Date.now());
    }, 500);
  }

  pause() {
    this.status(Status.Pause);

    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }

    this.endTime(Date.now());
    this.total += this.endTime() - this.startTime();
    this.startTime(0);
    this.endTime(0);
  }

  clear() {
    this.status(Status.Stop);

    this.total = 0;
    this.endTime(0);
    this.startTime(0);
  }
}

export const timerView = `
<!-- ko if: isStoped() -->
<div class="col-xs-12">
  <button class="btn btn-primary btn-lg btn-block"
    data-bind="click: start">
    <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
    <span data-bind="text: time"></span>
  </button>
</div>
<!-- /ko -->
<!-- ko if: isDuring() -->
<div class="col-xs-12">
  <button class="btn btn-success btn-lg btn-block"
    data-bind="click: pause">
    <span class="glyphicon glyphicon-pause" aria-hidden="true"></span>
    <span data-bind="text: time"></span>
  </button>
</div>
<!-- /ko -->
<!-- ko if: isPause() -->
<div class="col-xs-11">
  <button class="btn btn-warning btn-lg btn-block"
    data-bind="click: start">
    <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
    <span data-bind="text: time"></span>
  </button>
</div>
<div class="col-xs-1">
  <button class="btn btn-danger btn-lg btn-block"
    data-bind="click: clear">
    <span class="glyphicon glyphicon-remove-sign"></span>
  </button>
</div>
<!-- /ko -->
`;
