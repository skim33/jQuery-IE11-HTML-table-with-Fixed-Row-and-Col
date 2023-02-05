$(document).ready(function(){
  const $container = $("#container");
  const $table = $("#stickyT");
  const $thead = $("#stickyT thead tr th");
  const $theadToFreeze = $("#stickyT thead tr:eq(0) th:nth-child(-n + 5), #stickyT thead tr:eq(1) th:first-child");
  const $tfoot = $("#stickyT tfoot tr td");
  const $tfootToFreeze = $("#stickyT tfoot tr td:nth-child(-n + 5)");
  const $tbodyToFreeze = $("#stickyT tbody tr td:nth-child(-n + 5)");

  let sH = 0;
  let sW = 0;
  let sFh = -($container.height() + 28);
  let didScroll = false;

  translate($tfoot, 0, sFh);

  $container.scroll(function () {
    if ($table.length > 0) {
      sH = this.scrollTop;
      sW = this.scrollLeft;
      didScroll = true;
    }
  });

  setInterval(function() {
    if (didScroll) {
      didScroll = false;

      if (sH >= 0) {
        translate($thead, 0, sH);
        translate($tfoot, 0, sFh + sH);
      } else {
        translate($thead, 0, 0);
        translate($tfoot, 0, sFh);
      }

      if (sW >= 0) {
        translate($tbodyToFreeze, sW, 0);
        translate($theadToFreeze, sW, sH);
        translate($tfootToFreeze, sW, sFh + sH);
      } else {
        translate($tbodyToFreeze, 0, 0);
      }
    }
  }, 250);

  function translate(element, x, y) {
    const translation = "translate(" + x + "px," + y + "px)"

    element.css({
      "transform": translation,
      "-ms-transform": translation,
      "-webkit-transform": translation,
      "-o-transform": translation,
      "-moz-transform": translation,
    });
  }
});