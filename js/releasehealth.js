/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
var versions;
var repo_name;

$(document).ready(function () {
  $.getJSON('js/bzconfig.json', function(data) {
    main(data);
  });
});

function main(bzconfig) {
  versions = bzconfig.versions;

  displayTitle();

  repo_name = getRepoName();

  //TODO figure a way to generate and load graph instead of loading it from file
  $.getJSON('js/graph.json', display_json_results).error(function(){
     $("#content").append("<div> <p>Error: Failed to fetch JSON data.<p></div>");
  });

}

function displayTitle() {
  var channel = "release";

  $("#title").append(versions[channel].title);
  $("#title-img").attr("src",versions[channel].img);
  $("#header-bg").attr("class", "header-bg header-bg-" + channel);
}

function getRepoName() {
  var repo_name = $.url().param('repo_name');
  if (repo_name){
    return repo_name;
  }
  return "mozilla-central";
}


function display_json_results(graph){
  var list_sufix = "lst";
  $("#content").prepend("<h1>"+repo_name+"</h1>");
  for(var key in graph){
    $("#platforms").append("<div id="+key+"><section><h3>"+key+"</h3><ul id="+key+list_sufix+"></ul></section></div>");

    for(platform in graph[key]){

      if(repo_name_count(key, platform, repo_name)=== 0){
        $("#"+key+list_sufix).append("<p>"+platform.strike()+"</p>");
      }
      else{
        $("#"+key+list_sufix).append("<p class="+key+">"+platform+"</p>");
      }
    }
  }

  $("#platforms").on('click', 'p', function(){

    var platform =$(this).text();
    var key = $(this).attr('class');

    $("#builders").html("");
    if( key == null){
      $("#builders").append("<h3> No unimgrated builders corresponding to "+repo_name+" repo name</h3>");
      console.log("add")
    }
    else {
      for(builder in graph[key][platform]){
        if(builder.indexOf(name) !== -1){
          $("#builders").append("<p>"+builder+"</p>");
        }
      }
    }



  });

  //helper funcion to show wich platforms have no builders responding to search
  function repo_name_count(key, platform, name){
    var count = 0;
    for(builder in graph[key][platform]){
      if(builder.indexOf(name) !== -1){
        count +=1;
      }
    }
    return count;
  }

}
