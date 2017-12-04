$(document).ready(function() {
  function showPlumbers() {
    var plumberTemplate = document.querySelector('#myTemplate').innerHTML;
    var combineTemp = Handlebars.compile(plumberTemplate);
    var outPut = document.querySelector('.template')

    $.ajax({
      type: "GET",
      url: "/api/plumbers",
      success: function(plumbers) {
        console.log(plumbers);
        outPut.innerHTML = combineTemp({
          data: plumbers
        })
      },
      error: function(err) {
        console.log(err);
      }
    });
  };
  $('.plumberSearched').keyup(function() {
    var plumberSearched = document.querySelector(".plumberSearched").value;
    if (plumberSearched.length > 0) {
      $.ajax({
        type: "GET",
        url: "/api/plumber/search",

        success: function(selectedPlumber) {

          document.querySelector('.outPut').innerHTML = combineTemp({
            data: selectedPlumber
          })
        }
      })
    } else {
      showPlumbers();
    }
  });

  function checkboxValues() {
    var allVals = [];
    $('.shift:checked').each(function() {
      allVals.push($(this).val());
    });
    return allVals;
    //shift.push(allVals)
  }

  //console.log(shift);
  //checkboxValues();

  $('.sumbitBtn').on('click', function() {
    var slots = checkboxValues();
    //console.log(slots);

    var plumberInfo = {
      'name': document.getElementById('name').value,
      'email': document.getElementById('email').value,
      'cell_no': document.getElementById('cell_no').value,
      'day': document.querySelector('.day:checked').value,
      'shift': slots
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
  // $('.submitAbook').on('click', function(e) {
  //   alert("i got it")
  //   var id = e.target.value;
  //   var employee = {
  //     'employername': document.getElementById('emplyerName').value,
  //     'employeremail': document.getElementById('emplyerEmail').value,
  //     'jobDescription': document.getElementById('jobDescription').value,
  //   }
  //   $.ajax({
  //     type: "POST",
  //     url: "/api/plumber/book/" + id,
  //     data: employee,
  //     success: function(emplyerAdded) {
  //       alert("plumber successfully booked")
  //     },
  //     error: function(err) {
  //       console.log(err);
  //     }
  //   });
  //   document.getElementById('emplyerName').value = ""
  //   document.getElementById('emplyerEmail').value = ""
  //   document.getElementById('jobDescription').value = ""
  // })
  showPlumbers();
})
