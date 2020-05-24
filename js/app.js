/**
 * Yii countriesSelector module.
 *
 * This JavaScript module provides the ajax-powered locations for taximaxim site.
 *
 * @author Ivan Shorikov <shorikov_ia@technology45.ru>
 * @since 2.0
 */

yii.app = (function ($) {
    var pub = {
        isActive: true,
        init: function () {
            var $form = $('#contact-form');
            var $formModal = $('#contact-form-modal');
            $form.on('beforeSubmit', function (e) {
                return pub.submitForm($form)
            });
            $formModal.on('beforeSubmit', function (e) {
                return pub.submitForm($formModal)
            });

            $(document).on('click', ".block-2-button", function (e) {
                e.preventDefault();

                var bt = e.currentTarget;
                var buttonTarget = bt.dataset.target;

                pub.selectComplexParameter(buttonTarget);
            });

            $('.modal-button').on('click', function () {
                $('#modal-form').modal('show');
            });

            $('.modal-button-close').on('click', function () {
                $('#modal-form').modal('hide');
            });

            $('.block-1-arrow, .block-1-header-link > span').on('click', function (e) {
                e.preventDefault();
                var targetId = $(this).find($( "a" )).attr('href');

                $('html, body').stop().animate(
                    {scrollTop: $(targetId).offset().top}, // move window so target element is at top of window
                    400, // speed in milliseconds
                    'swing' // easing
                ); // end animate
            });
        },

        submitForm: function (form) {
            var $title = $('.contact-form-header');
            var $input = $('.contact-form-input');
            var $button = $('.contact-form-button');

            $.ajax({
                type: "POST",
                url: form.attr('action'),
                data: form.serialize(),
                beforeSend: function () {
                    $input.hide();
                    $button.hide();

                    $title.text('Ожидание ответа...');
                },
                success: function (data) {
                    if (data.type==='html') {
                        $title.html(data.message);
                    }
                    else {
                        $title.text(data.message);
                    }
                    if (data.title) {
                        $title.text(data.title);
                    }
                },
                error: function () {
                    $title.text('error');
                }
            });
            return false;
        },

        selectComplexParameter: function (id) {
            var animationDelay = 250;
            var blockHeight = $('.block-2').height();

            $('.block-2-button').removeClass('active');
            $('.block-2-button[data-target=' + id + ']').addClass('active');
            $('.block-2').height(blockHeight);
            $.when($('.block-2-data-block-list .row').fadeOut()).then(function() {
                /*$('.block-2-data-block-list .row').removeClass('active');
                $('#' + id + '.row').addClass('active');*/
                $('#' + id + '.row').fadeIn();
                $('.block-2').height('auto');
            });
        },

}
    return pub;
})(jQuery);