// Add/remove "completed" class on click
$("ul").on("click", "li", function () {
  $(this).toggleClass("completed");
});

// Delete Entry
$("ul").on("click", "span", function (event) {
  $(this)
    .parent()
    .fadeOut(500, function () {
      $(this).remove();
    });

  event.stopPropagation();
});

//Add input to list
$("input[type='text']").keypress(function (e) {
  if (e.which === 13) {
    let todoText = $(this).val();
    $(this).val("");
    $("ul").append(
      "<li><span><i class='fas fa-trash'></i></span> " + todoText + "</li>"
    );
  }
});

$("#plus-icon").click(function () {
  $("input[type='text']").fadeToggle();
});
