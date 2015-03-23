var Sudoku = Backbone.View.extend({

  CONST_SYMBOL_IMAGE_URL_PROTOTYPE: "./assets/pics/${imageCategory}/${imageName}.png",

  CONST_FILLING_METHOD_GUIDED: 0,
  CONST_FILLING_METHOD_RESTRICTED: 1,
  CONST_FILLING_METHOD_FREE: 2,


  el: $( "#content" ),
  template: "#sudokuTemplate",


  numberOfGivens: 0,
  fillingMethod: 0,
  eraserAvailable: false,
  hintsAvailable: false,
  checkAvailable: false,

  grid: null,
  symbols: null,

  numberOfHintsUsed: 0,

  selectedUICell: null,


  soundFXPlaying: false,


  initialize: function() {

    this.numberOfGivens = 0;
    this.fillingMethod = this.CONST_FILLING_METHOD_GUIDED;
    this.hintsAvailable = false;
    this.checkAvailable = false;

    this.grid = null;
    this.symbols = null;

    this.numberOfHintsUsed = 0;

    this.selectedUICell = null;

    this.soundFXPlaying = false;

  },

  render: function() {

    $( "#header" ).empty().hide();

    var numberOfGridRows = 6;
    var numberOfGridCols = 6;
    var numberOfGridRegionRows = 2;
    var numberOfGridRegionCols = 3;

    this.numberOfGivens = 18;
    this.fillingMethod = this.CONST_FILLING_METHOD_GUIDED;
    this.eraserAvailable = false;
    this.hintsAvailable = false;
    this.checkAvailable = false;

    if( Settings.get( "difficulty" ) == "easy" ) {

      this.numberOfGivens = 18;
      this.fillingMethod = this.CONST_FILLING_METHOD_GUIDED;

    } else if( Settings.get( "difficulty" ) == "medium" ) {

      this.numberOfGivens = 16;
      this.fillingMethod = this.CONST_FILLING_METHOD_RESTRICTED;

    } else if( Settings.get( "difficulty" ) == "hard" ) {

      this.numberOfGivens = 14;
      this.fillingMethod = this.CONST_FILLING_METHOD_FREE;
      this.eraserAvailable = true;
      this.checkAvailable = true;

    } else if( Settings.get( "difficulty" ) == "joker" ) {

      numberOfGridRows = 9;
      numberOfGridCols = 9;
      numberOfGridRegionRows = 3;
      numberOfGridRegionCols = 3;

      this.numberOfGivens = 36;
      this.fillingMethod = this.CONST_FILLING_METHOD_FREE;
      this.eraserAvailable = true;
      this.hintsAvailable = true;
      this.checkAvailable = true;

    }

    var symbolsType = "number";
    var symbolsImageCategory = null;

    if( Settings.get( "sudokuCategory" ) == "numerot" ) {
      symbolsType = "number";
      symbolsImageCategory = null;
    } else if( Settings.get( "sudokuCategory" ) == "hedelmät" ) {
      symbolsType = "image";
      symbolsImageCategory = "hedelmat";
    }

    this.grid = this.costructGrid( numberOfGridRows, numberOfGridCols, numberOfGridRegionRows, numberOfGridRegionCols );
    this.symbols = this.costructSymbols( numberOfGridRows, symbolsType, symbolsImageCategory );

    var data = {
      grid: this.grid,
      symbols: this.symbols,
      eraserAvailable: this.eraserAvailable,
      hintsAvailable: this.hintsAvailable,
      checkAvailable: this.checkAvailable
    };

    var template = _.template( $( this.template ).html(), data );
    this.$el.html( template );

    $( window ).resize( { game: this }, function( event ) {
      event.data.game.adjustUISizes();
    } );

    this.adjustUISizes();

    this.startGame();

    return this;

  },

  adjustUISizes: function() {

    this.$el.css('height', '100%');

    var wrapperHorizontalPaddings = parseInt( this.$el.find( ".sudoku-wrapper" ).css( "padding-left" ) ) + parseInt( this.$el.find( ".sudoku-wrapper" ).css( "padding-right" ) );
    var wrapperVerticalPaddings = parseInt( this.$el.find( ".sudoku-wrapper" ).css( "padding-top" ) ) + parseInt( this.$el.find( ".sudoku-wrapper" ).css( "padding-bottom" ) );

    var widthInUse = this.$el.width() - wrapperHorizontalPaddings - 1;
    var heightInUse = this.$el.height() - wrapperVerticalPaddings - 1;

    if( this.hintsAvailable || this.checkAvailable ) {
      heightInUse -= ( parseInt( this.$el.find( ".sudoku-actions" ).css( "margin-top" ) ) + this.$el.find( ".sudoku-actions" ).height() );
    }

    var spaceSizeDivider = 20;

    var gridCellSize = 0;
    var toolbarCellSize = 0;

    var numberOfRowsInUI = this.grid.numberOfRows + ( ( this.grid.numberOfRows / this.grid.numberOfRegionRows ) + 1 ) / spaceSizeDivider;
    var numberOfColsInUI = this.grid.numberOfCols + ( ( this.grid.numberOfCols / this.grid.numberOfRegionCols ) + 3 ) / spaceSizeDivider + 1.5;

    var gridCellSizeCalculatedByWidth = Math.floor( widthInUse / numberOfColsInUI ) - 2;
    var gridCellSizeCalculatedByHeight = Math.floor( heightInUse / numberOfRowsInUI ) - 2;

    if( gridCellSizeCalculatedByWidth <= gridCellSizeCalculatedByHeight ) {
      gridCellSize = gridCellSizeCalculatedByWidth;
    } else {
      gridCellSize = gridCellSizeCalculatedByHeight;
    }

    toolbarCellSize = Math.floor( ( ( numberOfRowsInUI - 2 / spaceSizeDivider ) * ( gridCellSize + 2 ) ) / ( this.grid.possibleCellValues.length + ( this.eraserAvailable ? 1 : 0 ) ) ) - 2;

    if( gridCellSize > 2 ) {

      var gridContentCSSProperties = {
        "border-width": Math.floor( gridCellSize / spaceSizeDivider ) + "px"
      };

      var gridCellCSSProperties = {
        "width": gridCellSize + "px",
        "height": gridCellSize + "px",
        "line-height": gridCellSize + "px",
        "font-size": ( gridCellSize - 5 ) + "px"
      };

      var rowDividerCSSProperties = {
        "height": Math.floor( gridCellSize / spaceSizeDivider ) + "px"
      };

      var cellDividerCSSProperties = {
        "width": Math.floor( gridCellSize / spaceSizeDivider ) + "px",
        "height": ( gridCellSize + 2 ) + "px"
      };

      var toolbarCSSProperties = {
        "margin-top": 0 + "px",
        "margin-bottom": 0 + "px",
        "margin-left": ( gridCellSize / 2 ) + "px",
        "border-width": Math.floor( gridCellSize / spaceSizeDivider ) + "px"
      };

      var toolbarCellCSSProperties = {
        "width": toolbarCellSize + "px",
        "height": toolbarCellSize + "px",
        "line-height": toolbarCellSize + "px",
        "font-size": ( toolbarCellSize - 5 ) + "px"
      };

      this.$el.find( ".sudoku-grid-content" ).css( gridContentCSSProperties );
      this.$el.find( ".sudoku-grid-cell" ).css( gridCellCSSProperties );
      this.$el.find( ".sudoku-grid-row-divider" ).css( rowDividerCSSProperties );
      this.$el.find( ".sudoku-grid-cell-divider" ).css( cellDividerCSSProperties );

      this.$el.find( ".sudoku-toolbar" ).css( toolbarCSSProperties );
      this.$el.find( ".sudoku-toolbar-cell" ).css( toolbarCellCSSProperties );

      var gridContentAndToolbarContentHeightDifference = this.$el.find( ".sudoku-grid-content" ).height() - this.$el.find( ".sudoku-toolbar-content" ).height();

      if( gridContentAndToolbarContentHeightDifference != 0 ) {

        var toolbarCSSPropertiesFix = {
          "margin-top": ( gridContentAndToolbarContentHeightDifference / 2 ) + "px",
          "margin-bottom": ( gridContentAndToolbarContentHeightDifference / 2 ) + "px"
        };

        this.$el.find( ".sudoku-toolbar" ).css( toolbarCSSPropertiesFix );

      }

      if( this.checkAvailable ) {

        var conflictsOverlayContentCSSProperties = {
          "margin": Math.floor( gridCellSize / spaceSizeDivider ) + "px"
        };

        var conflictsOverlayRowCSSProperties = {
          "height": gridCellSize + "px"
        };

        var conflictsOverlayRowDividerCSSProperties = {
          "height": Math.floor( gridCellSize / spaceSizeDivider ) + "px"
        };

        var conflictsOverlayColCSSProperties = {
          "width": ( gridCellSize + 2 ) + "px"
        };

        var conflictsOverlayColDividerCSSProperties = {
          "width": Math.floor( gridCellSize / spaceSizeDivider ) + "px"
        };

        var conflictsOverlayRegionCSSProperties = {
          "width": ( this.grid.numberOfRegionCols * ( gridCellSize + 2 ) - 2 ) + "px",
          "height": ( this.grid.numberOfRegionRows * ( gridCellSize + 2 ) - 2 ) + "px"
        };

        var conflictsOverlayRegionHorizontalDividerCSSProperties = {
          "width": Math.floor( gridCellSize / spaceSizeDivider ) + "px",
          "height": ( this.grid.numberOfRegionRows * ( gridCellSize + 2 ) - 2 ) + "px"
        };

        var conflictsOverlayRegionVerticalDividerCSSProperties = {
          "height": Math.floor( gridCellSize / spaceSizeDivider ) + "px"
        };

        this.$el.find( ".sudoku-grid-conflicts-overlay-content" ).css( conflictsOverlayContentCSSProperties );

        this.$el.find( ".sudoku-grid-conflicts-overlay-row" ).css( conflictsOverlayRowCSSProperties );
        this.$el.find( ".sudoku-grid-conflicts-overlay-row-divider" ).css( conflictsOverlayRowDividerCSSProperties );

        this.$el.find( ".sudoku-grid-conflicts-overlay-col" ).css( conflictsOverlayColCSSProperties );
        this.$el.find( ".sudoku-grid-conflicts-overlay-col-divider" ).css( conflictsOverlayColDividerCSSProperties );

        this.$el.find( ".sudoku-grid-conflicts-overlay-region" ).css( conflictsOverlayRegionCSSProperties );
        this.$el.find( ".sudoku-grid-conflicts-overlay-region-horizontal-divider" ).css( conflictsOverlayRegionHorizontalDividerCSSProperties );
        this.$el.find( ".sudoku-grid-conflicts-overlay-region-vertical-divider" ).css( conflictsOverlayRegionVerticalDividerCSSProperties );

      }

      this.$el.find( ".sudoku-wrapper" ).removeClass( "hidden" );

    } else {

      this.$el.find( ".sudoku-wrapper" ).addClass( "hidden" );

    }

  },

  events: {
    "click .quit" : "quitGame",
    "click .finish" : "showGameResults",
    "click .sudoku-action-hint" : "showHint",
    "click .sudoku-action-check" : "showPuzzleCheckResults",
    "click .sudoku-action-continue" : "hidePuzzleCheckResults",
    "click .sudoku-grid-cell-selectable" : "humanSelectUICell",
    "click .sudoku-toolbar-cell-selectable" : "humanSelectToolbarUICell"
  },

  quitGame: function() {
        //var gameId = this.model.get('gameId');
        //window.saveInterruptedGame(gameId, Settings.get('gameInstanceId'));
        this.$el.css('height','auto');
        this.undelegateEvents();
        router.navigate("/", true);
  },

  resetGame: function() {

    $( ".finish" ).addClass( "hidden" );

    this.grid.empties = [];

    for( var i = 0; i < this.grid.numberOfRows * this.grid.numberOfCols; i++ ) {

      var gridCell = this.getGridCellWithIndex( i );

      gridCell.puzzleValue = 0;
      gridCell.value = 0;

      gridCell.given = false;
      gridCell.hint = false;
      gridCell.corrected = false;

      gridCell.conflicts = [];

      this.grid.empties.push( gridCell );

      this.updateCellOnUI( gridCell );

    }

    this.numberOfHintsUsed = 0;

    this.startGame();

  },

  showGameResults: function() {
    this.$el.css('height','auto');
    this.undelegateEvents();

    var date = getDateTime();
    var pvm = date.pvm;
    var klo = date.klo;

    var screenJQO = $( "#content" ).clone();

    screenJQO.find( ".quit, .finish, .sudoku-toolbar, .sudoku-actions" ).remove();

    var screenHTML = screenJQO.html();

    var startTime = Settings.get( "startTime" );
    var endTime = Settings.get( "endTime" );
    var time = endTime - startTime;

    var timeSpent = msToStr( time );



    var results = {
      "pvm" : pvm,
      "klo" : klo,
      "difficulty": Settings.get( "difficulty" ),
      "data" : [
        {
          "name" : "Käytetty aika:",
          "value" : timeSpent
        },
        {
          "name" : "Täyttö:",
          "value" : Settings.get("sudokuCategory").charAt(0).toUpperCase() + Settings.get("sudokuCategory").slice(1).toLowerCase()
        },
        {
          "name" : "",
          "value" : "<button class=\"btn btn-primary btn-block btn-bolder screen\">Näytä kuvaruutu</button>"
        }
      ],
      "hiddenData": {
        "gameScreen" : screenHTML
      }
    };

    if(Settings.get('difficulty') === 'joker' && this.numberOfHintsUsed){
      results.data.splice(2,0, { "name": "Käytetyt vihjeet:", "value": this.numberOfHintsUsed });
    }

    var gameId = this.model.get( "gameId" );
    var view = new ResultsView( { model: this.model, results: results } );

    router.navigate( "game/" + gameId + "/results", true );

    view.render();

  },

  humanSelectUICell: function( event ) {

    var target = $( event.target );

    var uiCell = null;

    if( target.hasClass( "sudoku-grid-cell" ) ) {
      uiCell = target;
    } else {
      uiCell = target.parents( ".sudoku-grid-cell" );
    }

    this.selectUICell( uiCell, true );

  },

  humanSelectToolbarUICell: function( event ) {

    if( this.selectedUICell != null ) {

      var target = $( event.target );

      var toolbarUICell = null;

      if( target.hasClass( "sudoku-toolbar-cell" ) ) {
        toolbarUICell = target;
      } else {
        toolbarUICell = target.parents( ".sudoku-toolbar-cell" );
      }

      if( toolbarUICell != null ) {

        var number = toolbarUICell.data( "number" );

        var gridCell = this.getGridCellWithUICell( this.selectedUICell );

        var changeOnlyIfCorrect = ( this.fillingMethod == this.CONST_FILLING_METHOD_GUIDED || this.fillingMethod == this.CONST_FILLING_METHOD_RESTRICTED );

        if( this.changeValue( gridCell, number, changeOnlyIfCorrect ) ) {

          if( this.fillingMethod == this.CONST_FILLING_METHOD_GUIDED ) {
            this.computerSelectUICell();
          }

        } else {

          if( !this.soundFXPlaying ) {

            var invalidMoveSoundFXPrototype = document.getElementById( "sudokuInvalidMoveSoundFX" );

            var invalidMoveSoundFX = new Audio( invalidMoveSoundFXPrototype.src );

            var game = this;

            invalidMoveSoundFX.addEventListener( "waiting", function() {
              game.soundFXPlaying = true;
            } );

            invalidMoveSoundFX.addEventListener( "abort", function() {
              game.soundFXPlaying = false;
            } );

            invalidMoveSoundFX.addEventListener( "error", function() {
              game.soundFXPlaying = false;
            } );

            invalidMoveSoundFX.addEventListener( "stalled", function() {
              game.soundFXPlaying = false;
            } );

            invalidMoveSoundFX.addEventListener( "ended", function() {
              game.soundFXPlaying = false;
            } );

            invalidMoveSoundFX.addEventListener( "paused", function() {
              game.soundFXPlaying = false;
            } );

            invalidMoveSoundFX.play();

          }

        }

      }

    }

  },

  computerSelectUICell: function() {

    if( this.grid.empties.length > 0 ) {

      var index = Math.max( 0, Math.ceil( Math.random() * this.grid.empties.length ) - 1 );

      var gridCell = this.grid.empties[index];

      var uiCell = this.getUICellWithGridCell( gridCell );

      this.selectUICell( uiCell, false );

    }

  },

  selectUICell: function( uiCell, unselectIfSelected ) {

    var same = false;

    if( this.selectedUICell != null ) {

      if( this.selectedUICell.attr( "id" ) == uiCell.attr( "id" ) ) {
        same = true;
      }

      this.selectedUICell.removeClass( "sudoku-grid-cell-selected" );

      this.selectedUICell = null;

    }

    if( uiCell != null && !( same && unselectIfSelected ) ) {

      uiCell.addClass( "sudoku-grid-cell-selected" );

      this.selectedUICell = uiCell;

    }

  },

  startGame: function() {

    if( this.generatePuzzle( 0 ) ) {

      if( this.eraserAvailable ) {
          // eraser text init
          var eraserElem = $('.sudoku-toolbar-cell').last();
          console.log(eraserElem)
          eraserElem.append('<span class="eraser-text">Pyyhi vastaus</span');


      }

      if( this.fillingMethod == this.CONST_FILLING_METHOD_RESTRICTED || this.fillingMethod == this.CONST_FILLING_METHOD_FREE ) {
        $( ".sudoku-grid-cell" ).addClass( "sudoku-grid-cell-selectable" );
      }

      $( ".sudoku-toolbar-cell" ).addClass( "sudoku-toolbar-cell-selectable" );

      for( var i = 0; i < this.numberOfGivens; i++ ) {
        this.showGiven();
      }

      if( this.hintsAvailable || this.checkAvailable ) {

        if( this.hintsAvailable ) {
          $( ".sudoku-action-hint" ).removeClass( "hidden" );
        }

        if( this.checkAvailable ) {
          $( ".sudoku-action-check" ).removeClass( "hidden" );
        }

        $( ".sudoku-wrapper" ).addClass( "sudoku-wrapper-actions-available" );

      }

      if( this.fillingMethod == this.CONST_FILLING_METHOD_GUIDED ) {
        this.computerSelectUICell();
      }

      var startTime = new Date().getTime();
      Settings.set( { startTime : startTime } );

    } else {

      this.log( "ERROR: Game generation failed!" );

    }

  },

  generatePuzzle: function( index ) {

    if( index >= this.grid.cells.length ) {
      return true;
    }

    var gridCell = this.grid.cells[index];

    var values = this.grid.possibleCellValues.slice( 0 );

    values.sort( function( a, b ) {
      return ( Math.random() < 0.5 ) ? -1 : 1;
    } );

    while( values.length > 0 ) {

      var value = values.pop();

      if( this.generatePuzzleConflicts( gridCell, value, this.grid.rows[gridCell.row] ) || this.generatePuzzleConflicts( gridCell, value, this.grid.cols[gridCell.col] ) || this.generatePuzzleConflicts( gridCell, value, this.grid.regions[gridCell.region] ) ) {
        continue;
      }

      gridCell.puzzleValue = value;

      if( this.generatePuzzle( index + 1 ) ) {
        return true;
      }

    }

    gridCell.puzzleValue = 0;

    return false;

  },

  generatePuzzleConflicts: function( gridCell, value, array ) {

    var conflicts = false;

    for( var i = 0; !conflicts && i < array.length; i++ ) {

      if( ( array[i] !== gridCell ) && ( array[i].puzzleValue == value ) ) {
        conflicts = true;
      }

    }

    return conflicts;

  },

  showGiven: function() {

    if( this.grid.empties.length > 0 ) {

      var index = Math.max( 0, Math.ceil( Math.random() * this.grid.empties.length ) - 1 );

      var gridCell = this.grid.empties[index];

      gridCell.given = true;

      this.changeValue( gridCell, gridCell.puzzleValue );

      this.unselectCellOnUIIfSelected( gridCell );

    }

  },

  showHint: function() {

    if( this.grid.empties.length > 0 ) {

      var index = Math.max( 0, Math.ceil( Math.random() * this.grid.empties.length ) - 1 );

      var gridCell = this.grid.empties[index];

      gridCell.hint = true;

      this.changeValue( gridCell, gridCell.puzzleValue );

      this.unselectCellOnUIIfSelected( gridCell );

      this.numberOfHintsUsed++;

    }

  },

  changeValue: function( gridCell, value, onlyIfCorrect ) {

    var valueChanged = false;

    if( !onlyIfCorrect || ( onlyIfCorrect && ( value == 0 || value == gridCell.puzzleValue ) ) ) {

      gridCell.value = value;

      var index = 0;

      while( gridCell.conflicts.length > 0 ) {

        var gridCellToCheck = gridCell.conflicts.pop();

        if( gridCellToCheck != null ) {

          while( ( index = $.inArray( gridCell, gridCellToCheck.conflicts ) ) >= 0 ) {
            gridCellToCheck.conflicts.splice( index, 1 );
          }

          this.updateCellOnUI( gridCellToCheck );

        }

      }

      index = $.inArray( gridCell, this.grid.empties );

      if( value > 0 ) {

        this.checkConflicts( gridCell, value, this.grid.rows[gridCell.row] );
        this.checkConflicts( gridCell, value, this.grid.cols[gridCell.col] );
        this.checkConflicts( gridCell, value, this.grid.regions[gridCell.region] );

        if( index >= 0 ) {
          this.grid.empties.splice( index, 1 );
        }

      } else {

        if( index < 0 ) {
          this.grid.empties.push( gridCell );
        }

      }

      this.updateCellOnUI( gridCell );

      if( !this.checkAvailable ) {

        if( this.checkSolved() ) {

          this.selectedUICell = null;

          this.showSolvedOnUI();

        }

      }

      valueChanged = true;

    }

    return valueChanged;

  },

  checkConflicts: function( gridCell, value, array ) {

    var conflicts = false;

    for( var i = 0; i < array.length; i++ ) {

      var gridCellToCheck = array[i];

      if( ( gridCellToCheck != gridCell ) && ( gridCellToCheck.value == value ) && ( $.inArray( gridCell, gridCellToCheck.conflicts ) < 0 ) ) {

        gridCellToCheck.conflicts.push( gridCell );

        gridCell.conflicts.push( gridCellToCheck );

        this.updateCellOnUI( gridCellToCheck );

        conflicts = true;

      }

    }

    return conflicts;

  },

  showPuzzleCheckResults: function() {

    var conflictingRowIndices = [];
    var conflictingColIndices = [];
    var conflictingRegionIndices = [];

    for( var i = 0; i < this.grid.cells.length; i++ ) {

      var gridCell = this.grid.cells[i];

      if( gridCell.value > 0 ) {

        if( this.showPuzzleCheckResultsCheckConflicts( gridCell, this.grid.rows[gridCell.row] ) && $.inArray( gridCell.row, conflictingRowIndices ) == -1 ) {
          conflictingRowIndices.push( gridCell.row );
        }

        if( this.showPuzzleCheckResultsCheckConflicts( gridCell, this.grid.cols[gridCell.col] ) && $.inArray( gridCell.col, conflictingColIndices ) == -1 ) {
          conflictingColIndices.push( gridCell.col );
        }

        if( this.showPuzzleCheckResultsCheckConflicts( gridCell, this.grid.regions[gridCell.region] ) && $.inArray( gridCell.region, conflictingRegionIndices ) == -1 ) {
          conflictingRegionIndices.push( gridCell.region );
        }

      }

      this.updateCellOnUI( gridCell, true );

    }

    var solved = false;

    if( conflictingRowIndices.length == 0 && conflictingColIndices.length == 0 && conflictingRegionIndices.length == 0 ) {

      solved = this.checkSolved();

    } else {

      for( var i = 0; i < conflictingRowIndices.length; i++ ) {
        $( "#sudokuGridConflictsOverlayRow_" + conflictingRowIndices[i] ).css( "visibility", "visible" );
      }

      for( var i = 0; i < conflictingColIndices.length; i++ ) {
        $( "#sudokuGridConflictsOverlayCol_" + conflictingColIndices[i] ).css( "visibility", "visible" );
      }

      for( var i = 0; i < conflictingRegionIndices.length; i++ ) {
        $( "#sudokuGridConflictsOverlayRegion_" + conflictingRegionIndices[i] ).css( "visibility", "visible" );
      }

      $( ".sudoku-grid-conflicts-overlay" ).removeClass( "hidden" );

    }

    if( solved ) {

      this.selectedUICell = null;

      this.showSolvedOnUI();

    } else {

      this.unselectSelectedCellOnUI();

      $( ".sudoku-toolbar-cell" ).removeClass( "sudoku-toolbar-cell-selectable" );

      $( ".sudoku-action-hint" ).addClass( "hidden" );
      $( ".sudoku-action-check" ).addClass( "hidden" );
      $( ".sudoku-action-continue" ).removeClass( "hidden" );

    }

  },

  showPuzzleCheckResultsCheckConflicts: function( gridCell, array ) {

    var conflicts = false;

    for( var i = 0; i < array.length; i++ ) {

      var gridCellToCheck = array[i];

      if( ( gridCellToCheck != gridCell ) && ( gridCellToCheck.value == gridCell.value ) ) {
        conflicts = true;
      }

    }

    return conflicts;

  },

  hidePuzzleCheckResults: function() {

    $( ".sudoku-action-continue" ).addClass( "hidden" );

    $( ".sudoku-grid-conflicts-overlay" ).addClass( "hidden" );

    $( ".sudoku-grid-conflicts-overlay-row" ).css( "visibility", "hidden" );
    $( ".sudoku-grid-conflicts-overlay-col" ).css( "visibility", "hidden" );
    $( ".sudoku-grid-conflicts-overlay-region" ).css( "visibility", "hidden" );

    for( var i = 0; i < this.grid.cells.length; i++ ) {

      var gridCell = this.grid.cells[i];

      this.updateCellOnUI( gridCell );

    }

    $( ".sudoku-toolbar-cell" ).addClass( "sudoku-toolbar-cell-selectable" );

    if( this.hintsAvailable ) {
      $( ".sudoku-action-hint" ).removeClass( "hidden" );
    }

    $( ".sudoku-action-check" ).removeClass( "hidden" );

  },

  checkSolved: function() {

    var solved = true;

    if( this.grid.empties.length > 0 ) {

      solved = false;

    } else {

      for( var i = 0; solved && i < this.grid.cells.length; i++ ) {

        if( this.grid.cells[i].conflicts.length > 0 ) {
          solved = false;
        }

      }

    }

    if( solved ) {

      var endTime = new Date().getTime();
      Settings.set( { endTime : endTime } );

    }

    return solved;

  },

  solve: function() {

    for( var i = 0; i < this.grid.cells.length; i++ ) {

      var gridCell = this.grid.cells[i];

      if( !gridCell.given && ( gridCell.value != gridCell.puzzleValue ) ) {

        gridCell.corrected = true;

        this.changeValue( gridCell, gridCell.puzzleValue );

      } else {

        this.updateCellOnUI( gridCell );

      }

    }

  },

  unselectSelectedCellOnUI: function() {

    if( this.selectedUICell != null ) {

      this.selectedUICell.removeClass( "sudoku-grid-cell-selected" );

      this.selectedUICell = null;

    }

  },

  unselectCellOnUIIfSelected: function( gridCell ) {

    var uiCell = this.getUICellWithGridCell( gridCell );

    if( this.selectedUICell != null ) {

      if( this.selectedUICell.attr( "id" ) == uiCell.attr( "id" ) ) {

        this.selectedUICell.removeClass( "sudoku-grid-cell-selected" );

        this.selectedUICell = null;

      }

    }

  },

  updateCellOnUI: function( gridCell, forceDisabledState ) {

    var uiCell = this.getUICellWithGridCell( gridCell );

    var classesToRemove = "sudoku-grid-cell-given sudoku-grid-cell-hint sudoku-grid-cell-corrected sudoku-grid-cell-conflict";

    if( forceDisabledState || ( this.fillingMethod == this.CONST_FILLING_METHOD_RESTRICTED || this.fillingMethod == this.CONST_FILLING_METHOD_FREE ) ) {
      classesToRemove += " sudoku-grid-cell-selectable";
    }

    uiCell.removeClass( classesToRemove );

    if( gridCell.given ) {

      uiCell.addClass( "sudoku-grid-cell-given" );

    } else if( gridCell.hint ) {

      uiCell.addClass( "sudoku-grid-cell-hint" );

    } else if( gridCell.corrected ) {

      uiCell.addClass( "sudoku-grid-cell-corrected" );

    } else {

      if( !this.checkAvailable && gridCell.conflicts.length > 0 ) {
        uiCell.addClass( "sudoku-grid-cell-conflict" );
      }

      if( !forceDisabledState && ( this.fillingMethod == this.CONST_FILLING_METHOD_RESTRICTED || this.fillingMethod == this.CONST_FILLING_METHOD_FREE ) ) {
        uiCell.addClass( "sudoku-grid-cell-selectable" );
      }

    }

    this.setCellContentToUI( uiCell, gridCell.value );

  },

  setCellContentToUI: function( uiCell, value ) {

    var uiCellContentHTML = "";

    if( value > 0 ) {

      if( this.symbols.type == "number" ) {

        uiCellContentHTML = value;

      } else if( this.symbols.type == "image" ) {

        var symbolImageURL = this.CONST_SYMBOL_IMAGE_URL_PROTOTYPE.replace( "${imageCategory}", this.symbols.imageCategory ).replace( "${imageName}", value );

        uiCellContentHTML = "<img src=\"" + symbolImageURL + "\" class=\"sudoku-grid-cell-image\" alt=\"\" />";

      }

    }

    uiCell.find( ".sudoku-grid-cell-content" ).html( uiCellContentHTML );

  },

  showSolvedOnUI: function() {

    $( ".sudoku-action-hint, .sudoku-action-check, .sudoku-action-continue" ).addClass( "hidden" );

    $( ".sudoku-wrapper" ).removeClass( "sudoku-wrapper-actions-available" );

    $( ".sudoku-toolbar-cell" ).removeClass( "sudoku-toolbar-cell-selectable" );

    var classesToRemove = "sudoku-grid-cell-selected";

    if( this.fillingMethod == this.CONST_FILLING_METHOD_RESTRICTED || this.fillingMethod == this.CONST_FILLING_METHOD_FREE ) {
      classesToRemove += " sudoku-grid-cell-selectable";
    }

    $( ".sudoku-grid-cell" ).removeClass( classesToRemove );

    $( ".finish" ).removeClass( "hidden" );

  },

  costructGrid: function( numberOfRows, numberOfCols, numberOfRegionRows, numberOfRegionCols ) {

    var grid = {};

    if( ( numberOfRows != null && numberOfRows > 0 ) && ( numberOfCols != null && numberOfCols > 0 ) &&
        ( numberOfRegionRows != null && numberOfRegionRows > 0 ) && ( numberOfRegionCols != null && numberOfRegionCols > 0 ) ) {

      if( numberOfRows % numberOfRegionRows == 0 && numberOfCols % numberOfRegionCols == 0 ) {

        var numberOfRegions = ( numberOfRows / numberOfRegionRows ) * ( numberOfCols / numberOfRegionCols );

        grid.numberOfRows = numberOfRows;
        grid.numberOfCols = numberOfCols;
        grid.numberOfRegionRows = numberOfRegionRows;
        grid.numberOfRegionCols = numberOfRegionCols;
        grid.numberOfRegions = numberOfRegions;

        var possibleCellValues = [];

        for( var i = 0; i < numberOfRows; i++ ) {
          possibleCellValues.push( i + 1 );
        }

        grid.possibleCellValues = possibleCellValues;

        var cells = [];

        var rows = [];
        var cols = [];
        var regions = [];

        var empties = [];

        for( var i = 0; i < numberOfRows; i++ ) {
          rows.push( [] );
        }

        for( var i = 0; i < numberOfCols; i++ ) {
          cols.push( [] );
        }

        for( var i = 0; i < numberOfRegions; i++ ) {
          regions.push( [] );
        }

        for( var i = 0; i < numberOfRows; i++ ) {

          for( var j = 0; j < numberOfCols; j++ ) {

            var index = i * numberOfCols + j;

            var rowIndex = i;
            var colIndex = j;
            var regionIndex = ( Math.floor( i / numberOfRegionRows ) * numberOfRegionRows + Math.floor( j / numberOfRegionCols ) );

            var cell = {};

            cell.index = index;

            cell.row = rowIndex;
            cell.col = colIndex;
            cell.region = regionIndex;

            cell.puzzleValue = 0;
            cell.value = 0;

            cell.given = false;
            cell.hint = false;
            cell.corrected = false;

            cell.conflicts = [];

            cells.push( cell );

            rows[rowIndex].push( cell );
            cols[colIndex].push( cell );
            regions[regionIndex].push( cell );

            empties.push( cell );

          }

        }

        grid.cells = cells;

        grid.rows = rows;
        grid.cols = cols;
        grid.regions = regions;

        grid.empties = empties;

      } else {

        this.log( "ERROR: Invalid block size!" );

      }

    }

    return grid;

  },

  costructSymbols: function( numberOfSymbols, type, imageCategory ) {

    var symbols = {};

    if( numberOfSymbols != null && numberOfSymbols > 0 && type != null ) {

      symbols.numberOfSymbols = numberOfSymbols;
      symbols.type = type;
      symbols.imageCategory = imageCategory;

      var gridSymbols = [];

      for( var i = 0; i < numberOfSymbols; i++ ) {

        var symbol = {};

        symbol.index = i;
        symbol.number = i + 1;

        gridSymbols.push( symbol );

      }

      symbols.gridSymbols = gridSymbols;

      if( this.eraserAvailable ) {
        var eraserSymbol = {};

        eraserSymbol.index = numberOfSymbols;
        eraserSymbol.number = 0;

        symbols.eraserSymbol = eraserSymbol;

      }

    }

    return symbols;

  },

  getGridCellWithIndex: function( index ) {

    var gridCell = null;

    if( ( index != null && index >= 0 && index < this.grid.numberOfRows * this.grid.numberOfCols ) ) {

      gridCell = this.grid.cells[index];

    }

    return gridCell;

  },

  getGridCellWithRowAndCol: function( row, col ) {

    var gridCell = null;

    if( ( row != null && row >= 0 && row < this.grid.numberOfRows ) && ( col != null && col >= 0 && col < this.grid.numberOfCols ) ) {

      var index = row * grid.numberOfCols + col;

      gridCell = this.grid.cells[index];

    }

    return gridCell;

  },

  getGridCellWithUICell: function( uiCell ) {

    var gridCell = null;

    if( uiCell != null ) {

      var index = parseInt( uiCell.data( "index" ) );

      gridCell = this.grid.cells[index];

    }

    return gridCell;

  },

  getUICellWithGridCell: function( gridCell ) {

    var uiCell = null;

    if( gridCell != null ) {

      uiCell = $( "#sudokuGridCell_" + gridCell.index );

    }

    return uiCell;

  },

  log: function( message ) {

    if( window.console && window.console.log ) {
      window.console.log( message );
    }

  }

});
