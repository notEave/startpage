// jshint esversion:6

class Letter {
    constructor( character, posX, posY ) {
        this.character = character;
        this.positionX = posX;
        this.positionY = posY;
        this.velocityY = RandRange(Dimension()[1], Dimension()[1] * 2);
        this.velocityX = RandRange(-500, 500);
        this.r = RandRange(140, 255);
        this.g = RandRange(140, 255);
        this.b = RandRange(140, 255);
        this.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' +
        this.b + ',' + 0.7 + ')';
    }
    Draw() {
        this.velocityY += -20;
        this.positionY = this.positionY - this.velocityY / 100;
        this.positionX = this.positionX - this.velocityX / 100;
        ByClass( 'canv', 0 ).getContext( '2d' ).fillText( this.character, this.positionX, this.positionY );
    }
}

function $( dom ) {
    return document.getElementById( dom );
}

function ByClass( className, index ) {
    return document.getElementsByClassName( className )[ index ];
}

function Dimension() {
    return [ window.innerWidth, window.innerHeight ];
}

function RandRange(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Clear() {
    if ( $( 'search' ).value == 'search' ) {
        $( 'search' ).value = '';
    }
    $( 'search' ).style.color = 'rgba(148, 191, 243, 1.0)';
}

function Blur() {
    if ( $( 'search' ).value === '' ) {
        $( 'search' ).value = 'search';
    }
    $( 'search' ).style.color = 'rgba(148, 191, 243, 0.6)';
}


function KbEvent( event ) {
    if(event.key == 'Tab'){
        event.preventDefault();
        $('search').focus();
    }
    if ( document.activeElement.id == 'search' ) {
        if ( event.code == 'Enter' ) {
            window.location = 'https://duckduckgo.com/?q=' + $( 'search' ).value;
        }
        if (allowedChars.includes(event.key.toLowerCase())){
            characterArr.push( new Letter( event.key, Dimension()[0] / 2, Dimension()[ 1 ] + 50 ) );
        } else if(specialChars.includes(event.key)){
            characterArr.push( new Letter( event.key, Dimension()[0] / 2, Dimension()[ 1 ] + 50 ) );
        }
        if ( characterArr.length > 100 ){
        characterArr.shift();
        }
    }
}

//
//   ####    ##   #    # #    #   ##    ####
//  #    #  #  #  ##   # #    #  #  #  #
//  #      #    # # #  # #    # #    #  ####
//  #      ###### #  # # #    # ######      #
//  #    # #    # #   ##  #  #  #    # #    #
//   ####  #    # #    #   ##   #    #  ####
//


let characterArr = [];
let allowedChars = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];
let specialChars = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '!',
    '"',
    '@',
    '#',
    '$',
    '\%',
    '&',
    '/',
    '{',
    '(',
    '[',
    ')',
    ']',
    '=',
    '}',
    '+',
    '?',
    '\\',
    '\'',
    '*',
    ',',
    ';',
    '.',
    ':',
    '-',
    '_',
    '<',
    '>',
    '|',
];

function Start() {
    document.addEventListener( 'keydown', KbEvent, false );
    ScaleCanvas();
}

function Resize() {
    ScaleCanvas();
}

function ScaleCanvas() {
    ByClass( 'canv', 0 ).width = Dimension()[ 0 ];
    ByClass( 'canv', 0 ).height = Dimension()[ 1 ];
    ByClass( 'canv', 0 ).getContext( '2d' ).font = '30px sans-serif';
    ByClass( 'canv', 0 ).getContext( '2d' ).fillStyle = '#DCDCCC';
}

function Frame() {
    ByClass( 'canv', 0 ).getContext( '2d' ).clearRect( 0, 0, Dimension()[ 0 ], Dimension()[ 1 ] );
    for ( let x = 0; x < characterArr.length; x++ ) {
        ByClass( 'canv', 0 ).getContext( '2d' ).fillStyle = characterArr[x].fillStyle;
        characterArr[ x ].Draw();
    }
    // ByClass('canv', 0).getContext('2d').fillText(':^)', 10, i - 50);
    // ByClass('canv', 0).getContext('2d').fillText(':v)', 10, i);
    requestAnimationFrame( Frame );
}

requestAnimationFrame( Frame );
