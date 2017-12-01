$(document).ready(function() {

  var myTableTemplate = document.querySelector('#myTemplate').innerHTML;
  var combineTemp = Handlebars.compile(myTableTemplate);
  var outPut = document.querySelector('.outPut')

  function showPlumbers() {
    $.ajax({
      type: "GET",
      url: "/api/plumbers",
      success: function(plumbers) {
        console.log(plumbers);
        document.querySelector('.outPut').innerHTML = combineTemp({
          data: plumbers
        })
      },
      error: function(err) {
        console.log(err);
      }
    });
  };
  showPlumbers();


  function checkboxValues() {
    var allVals = [];
    $('.shift:checked').each(function() {
      allVals.push($(this).val());
    });
    return allVals; // process the array as you wish in the function so it returns what you need serverside
    //console.log(allVals);
  }

  $('.sumbitBtn').on('click', function() {
    var plumberInfo = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      cell_no: document.getElementById('cell_no').value,
      day: document.querySelector('.day:checked').value,
      shift: checkboxValues()
    }

    console.log(plumberInfo);

    $.ajax({
      type: "POST",
      url: "/api/plumbers",
      data: plumberInfo,
      success: function(plumberAdded) {
        alert("plumber successfully registered")
      },
      error: function(err) {
        console.log(err);
      }
    });
    document.getElementById('name').value = ""
    document.getElementById('email').value = ""
    document.getElementById('cell_no').value = ""
  })



})
