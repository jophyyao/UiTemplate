/**
 * Created by yaozj on 2016/7/6.
 */


/*****************************************
 * Main
 * @returns {{init: init}}
 * @constructor
 ***************************************/


var Main = function () {

  var active = function (options) {

    $("#MySiderbar a[class^='accordion']").attr('class', 'accordion-toggle');

    if (options['menu_name'].startsWith('pages')) {
      $("#pageid").attr('class', 'accordion-toggle menu-open');
    }

  }


  var screen_size = function(){
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;

    if (width < 1800){
      $(".form-group div[class='col-lg-4']").css("width", "41%");
      $(".form-group div[class='col-xs-4']").children("div[class='col-xs-2']").css('width', '19%');
      $(".form-group div[class='col-lg-2']").css("margin-left", "-7.5%");
      $(".form-group div[class='col-lg-2']").css("width", "20%");
    }

    $(window).resize(function() {
      var width = document.body.clientWidth;
      var height = document.body.clientHeight;
      if (width < 1800){
        $(".form-group div[class='col-lg-4']").css("width", "41%");
        $(".form-group div[class='col-xs-4']").children("div[class='col-xs-2']").css('width', '19%');
        $(".form-group div[class='col-lg-2']").css("margin-left", "-7.5%");
        $(".form-group div[class='col-lg-2']").css("width", "20%");
      }else{
        //window.location.reload();
        $(".form-group div[class='col-lg-4']").css("width", "38%");
        $(".form-group div[class='col-xs-4']").children("div[class='col-xs-2']").css('width', '14%');
        $(".form-group div[class='col-lg-2']").css("margin-left", "-14%");
        $(".form-group div[class='col-lg-2']").css("width", "16.666666666666664%");
      }
    })

  }


  var button_select = function(){
    $(document).on("click", ".form-group button", function(){
      $(this).parent().parent().children("div").children("button").removeClass("active")
      $(this).addClass("active");
    })
  }

  var configuration = function(){
    var res = {
      'api_domain' : '',
      'api_host' : '',
      'api_database' : '',
      'api_measurement' : '',
      'ispping_api' : ''
    };

    // Highcharts.setOptions({
    //   global: {
    //     useUTC: false
    //   }
    // })

    return res;

  }

  var css_init = function(){
     $("body").css("overflow", "");
     $("body").css("height", "");
  }


  return {
    init: function (options) {
      localStorage.clear();

      active(options);
      screen_size();
      button_select();
      css_init();

      return configuration()

    }
  }

}


/*************************************
 * adminpanel
 * @returns {{init: init}}
 * @constructor
 *************************************/

var AdminPanel = function () {

  var drag = function (options) {
    $('' + options['panel_id']).adminpanel({
      grid: '.admin-grid',
      draggable: true,
      mobile: false,
      callback: function () {
        bootbox.confirm('<h3>A Custom Callback!</h3>', function () {
        });
      },
      onFinish: function () {
        $('.admin-panels').addClass('animated fadeIn').removeClass('fade-onload');

        // Init the rest of the plugins now that the panels
        // have had a chance to be moved and organized.
        // It's less taxing to organize empty panels
        // demoHighCharts.init();
        runVectorMaps();

        // We also refresh any "in-view" waypoints to ensure
        // the correct position is being calculated after the
        // Admin Panels plugin moved everything
        Waypoint.refreshAll();

      },
      onSave: function () {
        $(window).trigger('resize');
      }
    });

    // Widget VectorMap
    function runVectorMaps() {

      // Jvector Map Plugin
      var runJvectorMap = function () {
        // Data set
        var mapData = [900, 700, 350, 500];
        // Init Jvector Map
        $('#WidgetMap').vectorMap({
          map: 'cn_mill',
          //regionsSelectable: true,
          backgroundColor: 'transparent',
          series: {
            markers: [{
              attribute: 'r',
              scale: [3, 7],
              values: mapData
            }]
          },
          regionStyle: {
            initial: {
              fill: '#E5E5E5'
            },
            hover: {
              "fill-opacity": 0.3
            }
          },
          markers: [{
            latLng: [37.78, -122.41],
            name: 'San Francisco,CA'
          }, {
            latLng: [36.73, -103.98],
            name: 'Texas,TX'
          }, {
            latLng: [38.62, -90.19],
            name: 'St. Louis,MO'
          }, {
            latLng: [40.67, -73.94],
            name: 'New York City,NY'
          }],
          markerStyle: {
            initial: {
              fill: '#a288d5',
              stroke: '#b49ae0',
              "fill-opacity": 1,
              "stroke-width": 10,
              "stroke-opacity": 0.3,
              r: 3
            },
            hover: {
              stroke: 'black',
              "stroke-width": 2
            },
            selected: {
              fill: 'blue'
            },
            selectedHover: {}
          },
        });
        // Manual code to alter the Vector map plugin to
        // allow for individual coloring of countries
        var states = ['	CN-13', 'CN-37', 'CN-44',
          'CN-63', '	CN-32'
        ];
        var colors = [bgWarningLr, bgPrimaryLr, bgInfoLr, bgAlertLr, bgDanger];
        var colors2 = [bgWarning, bgPrimary, bgInfo, bgAlert];
        $.each(states, function (i, e) {
          $("#WidgetMap path[data-code=" + e + "]").css({
            fill: colors[i]
          });
        });
        $('#WidgetMap').find('.jvectormap-marker')
          .each(function (i, e) {
            $(e).css({
              fill: colors2[i],
              stroke: colors2[i]
            });
          });
      }

      if ($('#WidgetMap').length) {
        runJvectorMap();
      }
    }

  }

  return {
    init: function (options) {
      if (options.hasOwnProperty('drag') && options['drag'] == true) {
        drag(options);
      }

    }
  }
}


/*****************************
 * daterange
 * @returns {{init: init}}
 * @constructor
 ****************************/


var DateRange = function () {

  var demo = function () {

    // daterange plugin options
    var rangeOptions = {
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
        'Last 7 Days': [moment().subtract('days', 6), moment()],
        'Last 30 Days': [moment().subtract('days', 29), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
      },
      startDate: moment().subtract('days', 29),
      endDate: moment()
    }

    // Init daterange plugin
    $('#daterangepicker1').daterangepicker();

    // Init daterange plugin
    $('#daterangepicker2').daterangepicker(
      rangeOptions,
      function (start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      }
    );

    // Init daterange plugin
    $('#inline-daterange').daterangepicker(
      rangeOptions,
      function (start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      }
    );

    // Init datetimepicker - fields
    $('#datetimepicker1').datetimepicker();
    $('#datetimepicker2').datetimepicker();


  }

  return {
    init: function (options) {
      demo();
    }
  }
}




function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var time = month + '-' + date;
  return time;
}

function timeConverter_ymd(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var time = year + '-' + month + '-' + date;
  return time;
}

function timeConverter_ymdHM(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  if (hour < 10){
    hour = '0' + hour;
  }
  if (min < 10){
    min = '0' + min;
  }

  //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min;
  return time;
}


function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}


