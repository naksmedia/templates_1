// Кнопка поиска
window.onload = function () {
    // Обрез текста
    var size = 175,
    newsContent= $('.box__news__text'),
    newsText = newsContent.text();
    
if(newsText.length > size){
  newsContent.text(newsText.slice(0, size) + '...');
}



  // Бургер меню

  $(document).ready(function () {
    $('.animated-icon1,.animated-icon3,.animated-icon4').click(function () {
      $(this).toggleClass('open');
    });
  });

  // Works everywhere
  $(document).ready(function () {

    // Hide/show animation hamburger function
    $('.navbar-toggler').on('click', function () {

      // Take this line to first hamburger animations
      $('.animated-icon1').toggleClass('open');

      // Take this line to second hamburger animation
      $('.animated-icon3').toggleClass('open');

      // Take this line to third hamburger animation
      $('.animated-icon4').toggleClass('open');
    });

  });


  // Выбрать несколько элементов

  $('.sort').click(function () {
    var mylist = $('.items');
    var listitems = mylist.children('li').get();
    listitems.sort(function (a, b) {
      var compA = $(a).data('selected');
      var compB = $(b).data('selected');
      return (compA < compB) ? 1 : (compA > compB) ? 1 : 0;
    });
    $.each(listitems, function (idx, itm) { mylist.append(itm); });
  })

  $('li', '.items').click(function () {
    var checks = $('[type="checkbox"]', '.checks');
    var item = $(this);

    if (item.data('selected') == '0') {
      item.data('selected', '1');
      item.addClass('selected');
    } else {
      item.data('selected', '0');
      item.removeClass('selected');
    }

    checks.filter('[data-guid="' + item.data('guid') + '"]').prop('checked', item.data('selected') == '1');
  });

  $(document).on('change', '.file-input-field', function () {
    var $value = $(this).parent().next();
    $value.addClass("added").text($(this).val().replace(/C:\\fakepath\\/i, ''));
  });
  $("#phone").mask("+8 (9999) 999 - 99 - 99", { completed: function () { alert("Да, этой мой номер"); } });
  $("#phone2").mask("+8 (9999) 999 - 99 - 99", { completed: function () { alert("Да, этой мой номер"); } });

  //jQuery plugin
  (function ($) {

    $.fn.uploader = function (options) {
      var settings = $.extend({
        MessageAreaText: "Вы не выбрали файл.",
        // MessageAreaTextWithFiles: "Загруженные файлы:",
        DefaultErrorMessage: "Невозможно открыть этот файл.",
        BadTypeErrorMessage: "Не верный формат файла!",
        acceptedFileTypes: ['pdf', 'jpg', 'doc', 'docx']
      }, options);

      var uploadId = 1;
      //update the messaging 
      $('.file-uploader__message-area p').text(options.MessageAreaText || settings.MessageAreaText);

      //create and add the file list and the hidden input list
      var fileList = $('<ul class="file-list"></ul>');
      var hiddenInputs = $('<div class="hidden-inputs hidden"></div>');
      $('.file-uploader__message-area').after(fileList);
      $('.file-list').after(hiddenInputs);

      //when choosing a file, add the name to the list and copy the file input into the hidden inputs
      $('.file-chooser__input').on('change', function () {
        var file = $('.file-chooser__input').val();
        var fileName = (file.match(/([^\\\/]+)$/)[0]);

        //clear any error condition
        $('.file-chooser').removeClass('error');
        $('.error-message').remove();

        //validate the file
        var check = checkFile(fileName);
        if (check === "valid") {

          // move the 'real' one to hidden list 
          $('.hidden-inputs').append($('.file-chooser__input'));

          //insert a clone after the hiddens (copy the event handlers too)
          $('.file-chooser').append($('.file-chooser__input').clone({ withDataAndEvents: true }));

          //add the name and a remove button to the file-list
          $('.file-list').append('<li style="display: none;"><span class="file-list__name">' + fileName + '</span><button class="removal-button" data-uploadid="' + uploadId + '"></title></button></li>');
          $('.file-list').find("li:last").show(800);

          //removal button handler
          $('.removal-button').on('click', function (e) {
            e.preventDefault();

            //remove the corresponding hidden input
            $('.hidden-inputs input[data-uploadid="' + $(this).data('uploadid') + '"]').remove();

            //remove the name from file-list that corresponds to the button clicked
            $(this).parent().hide("puff").delay(10).queue(function () { $(this).remove(); });

            //if the list is now empty, change the text back 
            if ($('.file-list li').length === 0) {
              $('.file-uploader__message-area').text(options.MessageAreaText || settings.MessageAreaText);
            }
          });

          //so the event handler works on the new "real" one
          $('.hidden-inputs .file-chooser__input').removeClass('file-chooser__input').attr('data-uploadId', uploadId);

          //update the message area
          $('.file-uploader__message-area').text(options.MessageAreaTextWithFiles || settings.MessageAreaTextWithFiles);

          uploadId++;

        } else {
          //indicate that the file is not ok
          $('.file-chooser').addClass("error");
          var errorText = options.DefaultErrorMessage || settings.DefaultErrorMessage;

          if (check === "badFileName") {
            errorText = options.BadTypeErrorMessage || settings.BadTypeErrorMessage;
          }

          $('.file-chooser__input').after('<p class="error-message">' + errorText + '</p>');
        }
      });

      var checkFile = function (fileName) {
        var accepted = "invalid",
          acceptedFileTypes = this.acceptedFileTypes || settings.acceptedFileTypes,
          regex;

        for (var i = 0; i < acceptedFileTypes.length; i++) {
          regex = new RegExp("\\." + acceptedFileTypes[i] + "$", "i");

          if (regex.test(fileName)) {
            accepted = "valid";
            break;
          } else {
            accepted = "badFileName";
          }
        }

        return accepted;
      };
    };
  }(jQuery));

  //init 
  $(document).ready(function () {
    $('.fileUploader').uploader({
      MessageAreaText: "Прикрепить файлы"
    });
  });
  

};