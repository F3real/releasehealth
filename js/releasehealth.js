/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var BIG_SCREEN = "bigscreen";
var SMALL_SCREEN = "smallscreen";

var versions;


$(document).ready(function () {
  $.getJSON('js/bzconfig.json', function(data) {
    main(data);
  });
});

function main(bzconfig) {
  versions = bzconfig.versions;
  var display = getDisplay();

  displayTitle();

  if (display !== BIG_SCREEN) {
    displayForkOnGitHub();
  }



  // to do
  //window.setInterval(getBugCounts, bzconfig.refreshMinutes * 60 * 1000, version);
}

function getDisplay() {
  var display = $.url().param('display');
  if (display && (display === BIG_SCREEN)) {
    return BIG_SCREEN;
  }
  return SMALL_SCREEN;
}

function displayTitle() {
  var channel = "release";

  $("#title").append(versions[channel].title);
  $("#title-img").attr("src",versions[channel].img);
  $("#header-bg").attr("class", "header-bg header-bg-" + channel);
}



function displayForkOnGitHub(){
  $("#body").append("<span id=\"forkongithub\"><a href=\"https://github.com/mozilla/ReleaseHealth\">Fork me on GitHub</a></span>");
}
