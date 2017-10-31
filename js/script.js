//Ao clicar no hamburguer abre o Menu NAV
$('.navicon').on('click', function(e) {
    e.preventDefault();
    abreFechaMenu();
});
//Para fechar o Menu NAV ao clicar em algum link do menu
$('.toggle a').on('click', function(){
    abreFechaMenu();
});
//Abrir e fechar o Menu NAV
function abreFechaMenu(){
    $('.navicon').toggleClass('navicon--active');
    $('.toggle').toggleClass('toggle--active');
};
//Para que as sections ocupem toda a tela visível
$('section').css('min-height', $(window).height() + 'px');
// Animação para navegação vertical
$('a[href^="#"]').on('click', function(event) {
    var target = $( $(this).attr('href') );
    if(target.length) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});
//Botão do Formulário (Inspirado modelo Codepen https://codepen.io/auginator/pen/oElzF)
var white = 'rgb(255,255,255)';
var seafoam = 'rgb(30,205,151)';  
$buttonShapes = $('rect.btn-shape');
$buttonColorShape = $('rect.btn-shape.btn-color');
$buttonText = $('text.textNode');
$buttonCheck = $('text.checkNode');
var buttonProps = {
    buttonWidth : $buttonShapes.attr('width'),
    buttonX : $buttonShapes.attr('x'),
    buttonY : $buttonShapes.attr('y'),
    textScale : 1,
    textX : $buttonText.attr('x'),
    textY : $buttonText.attr('y')
};
function onUpdateHandler(){
    $buttonShapes.attr('width', buttonProps.buttonWidth);
    $buttonShapes.attr('x', buttonProps.buttonX);
    $buttonShapes.attr('y', buttonProps.buttonY);
    $buttonText.attr('transform', "scale(" + buttonProps.textScale + ")");
    $buttonText.attr('x', buttonProps.textX);
    $buttonText.attr('y', buttonProps.textY);
}
var hover_tl = new TimelineMax({
    tweens:[
        TweenMax.to( $buttonText, .15, { fill:white } ),
        TweenMax.to( $buttonShapes, .25, { fill: seafoam })
    ]
});
hover_tl.stop();
var tl = new TimelineMax({onComplete:bind_mouseenter});
tl.append( new TimelineMax({
    align:"start",
    tweens:[
        TweenMax.to( $buttonText, .15, { fillOpacity:0 } ),
        TweenMax.to( buttonProps, .25, { buttonX: (130-37)/2, buttonWidth:37, onUpdate:onUpdateHandler } ),
        TweenMax.to( $buttonShapes, .25, { fill: white })
    ], 
    onComplete:function(){ 
        $buttonColorShape.css({
            'strokeDasharray':250,
            'strokeDashoffset':250
        });
    }
}) );
tl.append(TweenMax.to($buttonColorShape, 1.2, {
    strokeDashoffset:0, 
    ease:Quad.easeIn,
    onComplete:function(){     
        $buttonColorShape.css({
            'strokeDasharray':305,
            'strokeDashoffset':0
        });
    }
}));
tl.append(new TimelineMax({
    align:"start",
    tweens:[
        TweenMax.to($buttonShapes, .3, {fill:seafoam}),
        TweenMax.to( $buttonCheck, .15, { fillOpacity:1 } ),
        TweenMax.to( buttonProps, .25, { buttonX: 3, buttonWidth:130, onUpdate:onUpdateHandler } )
    ]
}));
tl.stop();
$('.colins-submit').on('click', function(e) {
    var nome = $('form #nome').val();
    var email = $('form #email').val();
    var emailFiltro =/^.+@.+\..{2,}$/;
    var ilegalCaracter = /[\(\)\<\>\,\;\:\\\/\"\[\]]/;
    //Validação dos dados do formulário antes de fazer a animação e enviar os dados   
    if(!nome || !email ) {
        alert('Preencha os campos obrigatórios');
        return false;
    }else if(!(emailFiltro.test(email))||email.match(ilegalCaracter)){
        alert('Por favor, informe um email válido.');
        return false;
    } else{
        $(e.currentTarget).addClass('is-active');
        tl.restart();
        $('.colins-submit').off('mouseenter');
        $('.colins-submit').off('mouseleave');
    }
});
bind_mouseenter();
function bind_mouseenter() {
    $('.colins-submit').on('mouseenter', function(e) {
        $('.colins-submit').off('mouseenter');
        bind_mouseleave();
    });
}
function bind_mouseleave() {  
    $('.colins-submit').on('mouseleave', function(e) {
        hover_tl.reverse();
        $('.colins-submit').off('mouseleave');
        bind_mouseenter();      
    });
}
