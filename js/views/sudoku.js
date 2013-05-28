var Sudoku = Backbone.View.extend({
  
  CONST_SYMBOL_IMAGE_URL_PROTOTYPE: "./pics/${imageCategory}/${imageName}.png",
  
  CONST_FILLING_METHOD_GUIDED: 0,
  CONST_FILLING_METHOD_RESTRICTED: 1,
  CONST_FILLING_METHOD_FREE: 2,
  
  
  el: $( "#content" ),
  template: "#sudokuTemplate",
  
  
  numberOfGivens: 0,
  fillingMethod: 0,
  hintsAvailable: false,
  
  grid: null,
  symbols: null,
  
  numberOfHintsUsed: 0,
  
  selectedUICell: null,
  
  
  initialize: function() {
    
    this.numberOfGivens = 0;
    this.fillingMethod = this.CONST_FILLING_METHOD_GUIDED;
    this.hintsAvailable = false;
    
    this.grid = null;
    this.symbols = null;
    
    this.numberOfHintsUsed = 0;
    
    this.selectedUICell = null;
    
  },
  
  render: function() {
    
    $( "#header" ).empty().hide();
    
    var numberOfGridRows = 6;
    var numberOfGridCols = 6;
    var numberOfGridBlockRows = 2;
    var numberOfGridBlockCols = 3;
    
    this.numberOfGivens = 16;
    this.fillingMethod = this.CONST_FILLING_METHOD_GUIDED;
    this.hintsAvailable = false;
    
    if( Settings.get( "difficulty" ) == "easy" ) {
      
      this.fillingMethod = this.CONST_FILLING_METHOD_GUIDED;
      
    } else if( Settings.get( "difficulty" ) == "medium" ) {
      
      this.fillingMethod = this.CONST_FILLING_METHOD_RESTRICTED;
      
    } else if( Settings.get( "difficulty" ) == "hard" ) {
      
      this.fillingMethod = this.CONST_FILLING_METHOD_FREE;
      
    } else if( Settings.get( "difficulty" ) == "joker" ) {
      
      numberOfGridRows = 9;
      numberOfGridCols = 9;
      numberOfGridBlockRows = 3;
      numberOfGridBlockCols = 3;
      
      this.numberOfGivens = 36;
      this.fillingMethod = this.CONST_FILLING_METHOD_FREE;
      this.hintsAvailable = true;
      
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
    
    this.grid = this.costructGrid( numberOfGridRows, numberOfGridCols, numberOfGridBlockRows, numberOfGridBlockCols );
    this.symbols = this.costructSymbols( numberOfGridRows, symbolsType, symbolsImageCategory );
    
    var data = {
      grid: this.grid,
      symbols: this.symbols
    };
    
    var template = _.template( $( this.template ).html(), data );
    this.$el.html( template );
    
    $( window ).resize( { game: this }, function( event ) {
      event.data.game.adjustUICellSize();
    } );
    
    this.adjustUICellSize();
    
    this.startGame();
    
    return this;
    
  },
  
  adjustUICellSize: function() {
    
    var wrapperHorizontalPaddings = parseInt( this.$el.find( ".sudoku-wrapper" ).css( "padding-left" ) ) + parseInt( this.$el.find( ".sudoku-wrapper" ).css( "padding-right" ) );
    var wrapperVerticalPaddings = parseInt( this.$el.find( ".sudoku-wrapper" ).css( "padding-top" ) ) + parseInt( this.$el.find( ".sudoku-wrapper" ).css( "padding-bottom" ) );
    
    var widthInUse = this.$el.width() - wrapperHorizontalPaddings;
    var heightInUse = this.$el.height() - wrapperVerticalPaddings;
    
    if( this.hintsAvailable ) {
      heightInUse -= ( parseInt( this.$el.find( ".sudoku-actions" ).css( "margin-top" ) ) + this.$el.find( ".sudoku-actions" ).height() );
    }
    
    var uiCellSize = 0;
    
    var numberOfRowsInUI = this.grid.numberOfRows + ( ( this.grid.numberOfRows / this.grid.numberOfBlockRows ) - 1 ) / 2;
    var numberOfColsInUI = this.grid.numberOfCols + ( ( this.grid.numberOfCols / this.grid.numberOfBlockCols ) - 1 ) / 2 + 2;
    
    var uiCellSizeCalculatedByWidth = Math.floor( widthInUse / numberOfColsInUI ) - 2;
    var uiCellSizeCalculatedByHeight = Math.floor( heightInUse / numberOfRowsInUI ) - 2;
    
    if( uiCellSizeCalculatedByWidth <= uiCellSizeCalculatedByHeight ) {
      uiCellSize = uiCellSizeCalculatedByWidth;
    } else {
      uiCellSize = uiCellSizeCalculatedByHeight;
    }
    
    if( uiCellSize > 0 ) {
      
      var cellCSSProperties = {
        "width": uiCellSize + "px",
        "height": uiCellSize + "px",
        "line-height": uiCellSize + "px",
        "font-size": ( uiCellSize - 5 ) + "px"
      };
      
      var rowDividerCSSProperties = {
        "height": ( ( uiCellSize / 2 ) + 1 ) + "px"
      };
      
      var cellDividerCSSProperties = {
        "width": ( ( uiCellSize / 2 ) + 1 ) + "px",
        "height": uiCellSize + "px"
      };
      
      var toolbarCSSProperties = {
        "margin-left": uiCellSize + "px"
      };
      
      this.$el.find( ".sudoku-grid-cell" ).css( cellCSSProperties );
      this.$el.find( ".sudoku-toolbar-cell" ).css( cellCSSProperties );
      
      this.$el.find( ".sudoku-grid-row-divider" ).css( rowDividerCSSProperties );
      this.$el.find( ".sudoku-grid-cell-divider" ).css( cellDividerCSSProperties );
      
      this.$el.find( ".sudoku-toolbar" ).css( toolbarCSSProperties );
      
    }
    
  },
  
  events: {
    "click .quit" : "quitGame",
    "click .finish" : "showGameResults",
    "click .sudoku-action-hint" : "showHint",
    "click .sudoku-grid-cell-selectable" : "humanSelectUICell",
    "click .sudoku-toolbar-cell-selectable" : "humanSelectToolbarUICell"
  },
  
  quitGame: function() {
    
    this.undelegateEvents();
    
    var gameId = this.model.get( "gameId" );
    router.navigate( "game/" + gameId, { trigger : true } );
    
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
          "name" : "",
          "value" : "<button class=\"btn btn-primary btn-block btn-bolder screen\">Näytä kuvaruutu</button>"
        }
      ],
      "hiddenData": {
        "gameScreen" : screenHTML
      }
    };
    
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
          
          document.getElementById( "sudokuInvalidMoveSoundFX" ).play();
          
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
      
      if( this.fillingMethod == this.CONST_FILLING_METHOD_RESTRICTED || this.fillingMethod == this.CONST_FILLING_METHOD_FREE ) {
        $( ".sudoku-grid-cell" ).addClass( "sudoku-grid-cell-selectable" );
      }
      
      $( ".sudoku-toolbar-cell" ).addClass( "sudoku-toolbar-cell-selectable" );
      
      for( var i = 0; i < this.numberOfGivens; i++ ) {
        this.showGiven();
      }
      
      if( this.hintsAvailable ) {
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
      
    }
    
  },
  
  showHint: function() {
    
    if( this.grid.empties.length > 0 ) {
      
      var index = Math.max( 0, Math.ceil( Math.random() * this.grid.empties.length ) - 1 );
      
      var gridCell = this.grid.empties[index];
      
      gridCell.hint = true;
      
      this.changeValue( gridCell, gridCell.puzzleValue );
      
      this.numberOfHintsUsed++;
      
    } else {
      
      this.solve();
      
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
      
      if( this.checkSolved() ) {
        
        this.selectedUICell = null;
        
        this.showSolvedOnUI();
        
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
  
  updateCellOnUI: function( gridCell ) {
    
    var uiCell = this.getUICellWithGridCell( gridCell );
    
    var classesToRemove = "sudoku-grid-cell-given sudoku-grid-cell-hint sudoku-grid-cell-corrected sudoku-grid-cell-conflict";
    
    if( this.fillingMethod == this.CONST_FILLING_METHOD_RESTRICTED || this.fillingMethod == this.CONST_FILLING_METHOD_FREE ) {
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
      
      if( gridCell.conflicts.length > 0 ) {
        uiCell.addClass( "sudoku-grid-cell-conflict" );
      }
      
      if( this.fillingMethod == this.CONST_FILLING_METHOD_RESTRICTED || this.fillingMethod == this.CONST_FILLING_METHOD_FREE ) {
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
    
    $( ".sudoku-wrapper" ).removeClass( "sudoku-wrapper-actions-available" );
    
    $( ".sudoku-toolbar-cell" ).removeClass( "sudoku-toolbar-cell-selectable" );
    
    var classesToRemove = "sudoku-grid-cell-selected";
    
    if( this.fillingMethod == this.CONST_FILLING_METHOD_RESTRICTED || this.fillingMethod == this.CONST_FILLING_METHOD_FREE ) {
      classesToRemove += " sudoku-grid-cell-selectable";
    }
    
    $( ".sudoku-grid-cell" ).removeClass( classesToRemove );
    
    $( ".finish" ).removeClass( "hidden" );
    
  },
  
  costructGrid: function( numberOfRows, numberOfCols, numberOfBlockRows, numberOfBlockCols ) {
    
    var grid = {};
    
    if( ( numberOfRows != null && numberOfRows > 0 ) && ( numberOfCols != null && numberOfCols > 0 ) &&
        ( numberOfBlockRows != null && numberOfBlockRows > 0 ) && ( numberOfBlockCols != null && numberOfBlockCols > 0 ) ) {
      
      if( numberOfRows % numberOfBlockRows == 0 && numberOfCols % numberOfBlockCols == 0 ) {
        
        grid.numberOfRows = numberOfRows;
        grid.numberOfCols = numberOfCols;
        grid.numberOfBlockRows = numberOfBlockRows;
        grid.numberOfBlockCols = numberOfBlockCols;
        
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
        
        var numberOfRegions = ( numberOfRows / numberOfBlockRows ) * ( numberOfCols / numberOfBlockCols );
        
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
            var regionIndex = ( Math.floor( i / numberOfBlockRows ) * numberOfBlockRows + Math.floor( j / numberOfBlockCols ) );
            
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
      
      var eraserSymbol = {};
      
      eraserSymbol.index = numberOfSymbols;
      eraserSymbol.number = 0;
      
      symbols.gridSymbols = gridSymbols;
      symbols.eraserSymbol = eraserSymbol;
      
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