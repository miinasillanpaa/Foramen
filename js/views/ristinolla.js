var Ristinolla = Backbone.View.extend({
  
  CONST_COMPUTER_AI_NUMBER_OF_BEST_MOVES_TO_CONSIDER: 5,
  
  CONST_PLAYER_MARK_HUMAN: "X",
  CONST_PLAYER_MARK_COMPUTER: "O",
  
  CONST_EMPTY: 0,
  CONST_HUMAN: 1,
  CONST_COMPUTER: 2,
  CONST_BORDER: 3,
  
  CONST_DX: [0, -1, -1, -1],
  CONST_DY: [-1, -1, 0, 1],
  
  
  el: $( "#content" ),
  template: "#ristinollaTemplate",
  
  
  computerAI: 0,
  computerAIWeights: null,
  
  numberOfGamesBeforeResults: 0,
  numberOfGamesPlayed: 0,
  statisticsPerGame: null,
  
  grid: null,
  
  weights: null,
  
  movesUsedHuman: 0,
  movesUsedComputer: 0,
  
  winningLineGridCells: null,
  
  
  initialize: function() {
    
    this.computerAI = 1;
    this.computerAIWeights = [];
    
    this.numberOfGamesBeforeResults = 1;
    this.numberOfGamesPlayed = 0;
    this.statisticsPerGame = [];
    
    this.grid = null;
    
    this.weights = [0, 0, 0, 0];
    
    this.movesUsedHuman = 0;
    this.movesUsedComputer = 0;
    
    this.winningLineGridCells = [];
    
  },
  
  render: function() {
    
    $( "#header" ).empty().hide();
    
    if( Settings.get( "difficulty" ) == "easy" ) {
      this.computerAI = 0.2;
    } else if( Settings.get( "difficulty" ) == "medium" ) {
      this.computerAI = 0.6;
    } else if( Settings.get( "difficulty" ) == "hard" ) {
      this.computerAI = 0.9;
    }
    
    this.computerAIWeights = this.getComputerAIWeights();
    
    this.numberOfGamesBeforeResults = Settings.get( "fiarNumberOfGamesBeforeResults" );
    
    var numberOfGridRows = Settings.get( "fiarNumberOfGridRows" );
    var numberOfGridCols = Settings.get( "fiarNumberOfGridCols" );
    
    this.grid = this.costructGrid( numberOfGridRows, numberOfGridCols );
    
    var template = _.template( $( this.template ).html(), this.grid );
    this.$el.html( template );
    
    $( window ).resize( { game: this }, function( event ) {
      event.data.game.adjustUICellSize();
    } );
    
    this.adjustUICellSize();
    
    this.startGame();
    
    return this;
    
  },
  
  adjustUICellSize: function() {
    
    var gridHorizontalPaddings = parseInt( this.$el.find( ".fiar-grid" ).css( "padding-left" ) ) + parseInt( this.$el.find( ".fiar-grid" ).css( "padding-right" ) );
    var gridVerticalPaddings = parseInt( this.$el.find( ".fiar-grid" ).css( "padding-top" ) ) + parseInt( this.$el.find( ".fiar-grid" ).css( "padding-bottom" ) );
    
    var widthInUse = this.$el.width() - gridHorizontalPaddings;
    var heightInUse = this.$el.height() - gridVerticalPaddings;
    
    var uiCellSize = 0;
    
    var uiCellSizeCalculatedByWidth = Math.floor( widthInUse / this.grid.numberOfCols ) - 2;
    var uiCellSizeCalculatedByHeight = Math.floor( heightInUse / this.grid.numberOfRows ) - 2;
    
    if( uiCellSizeCalculatedByWidth <= uiCellSizeCalculatedByHeight ) {
      uiCellSize = uiCellSizeCalculatedByWidth;
    } else {
      uiCellSize = uiCellSizeCalculatedByHeight;
    }
    
    if( uiCellSize > 0 ) {
      
      var cssProperties = {
        "width": uiCellSize + "px",
        "height": uiCellSize + "px",
        "line-height": uiCellSize + "px",
        "font-size": uiCellSize + "px"
      };
      
      this.$el.find( ".fiar-grid-cell" ).css( cssProperties );
      
    }
    
  },
  
  events: {
    "click .quit" : "quitGame",
    "click .reset" : "resetGame",
    "click .finish" : "showGameResults",
    "click .fiar-grid-cell-selectable" : "humanSelectCell"
  },
  
  quitGame: function() {
    
    this.undelegateEvents();
    
    var gameId = this.model.get( "gameId" );
    router.navigate( "game/" + gameId, { trigger : true } );
    
  },
  
  resetGame: function() {
    
    $( ".finish" ).addClass( "hidden" );
    $( ".reset" ).addClass( "hidden" );
    
    for( var i = 0; i < this.grid.numberOfRows; i++ ) {
      
      for( var j = 0; j < this.grid.numberOfCols; j++ ) {
        
        var gridCell = this.getGridCellWithRowAndCol( i, j );
        var uiCell = this.getUICellWithGridCell( gridCell );
        
        gridCell.value = this.CONST_EMPTY;
        
        uiCell.removeClass( "fiar-grid-cell-winning" );
        
        uiCell.text( "" );
        
        uiCell.addClass( "fiar-grid-cell-selectable" );
        
      }
      
    }
    
    this.weights = [0, 0, 0, 0];
    
    this.movesUsedHuman = 0;
    this.movesUsedComputer = 0;
    
    this.winningLineGridCells = [];
    
    this.startGame();
    
  },
  
  showGameResults: function() {
    
    this.undelegateEvents();
    
    var date = getDateTime();
    var pvm = date.pvm;
    var klo = date.klo;
    
    var startTime = Settings.get( "startTime" );
    var endTime = Settings.get( "endTime" );
    var time = endTime - startTime;
    
    var timeSpent = msToStr( time );
    
    var wins = 0;
    var losses = 0;
    var ties = 0;
    
    var movesUsedTotal = 0;
    
    var bestGameStatistics = null;
    
    for( var i = 0; i < this.statisticsPerGame.length; i++ ) {
      
      var gameStatistics = this.statisticsPerGame[i];
      
      if( gameStatistics.win ) {
        wins += 1;
      }
      
      if( gameStatistics.loss ) {
        losses += 1;
      }
      
      if( gameStatistics.tie ) {
        ties += 1;
      }
      
      movesUsedTotal += gameStatistics.movesUsedHuman;
      
      if( bestGameStatistics == null ||
          ( bestGameStatistics.loss && ( gameStatistics.tie || gameStatistics.win ) ) ||
          ( bestGameStatistics.loss && gameStatistics.loss && bestGameStatistics.movesUsedHuman < gameStatistics.movesUsedHuman ) ||
          ( bestGameStatistics.tie && gameStatistics.tie && bestGameStatistics.movesUsedHuman < gameStatistics.movesUsedHuman ) ||
          ( bestGameStatistics.win && gameStatistics.win && bestGameStatistics.movesUsedHuman > gameStatistics.movesUsedHuman ) ) {
        bestGameStatistics = gameStatistics;
      }
      
    }
    
    var movesUsedAverage = Math.round( movesUsedTotal / this.statisticsPerGame.length );
    
    var bestGameScreen = bestGameStatistics.screen;
    
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
          "name" : "Siirtoja per peli:",
          "value" : movesUsedAverage
        },
        {
          "name" : "Voittoja:",
          "value" : wins
        },
        {
          "name" : "Häviöitä:",
          "value" : losses
        },
        {
          "name" : "Tasapelejä:",
          "value" : ties
        },
        {
          "name" : "",
          "value" : "<button class=\"btn btn-primary btn-block btn-bolder screen\">Näytä parhaan pelin kuvaruutu</button>"
        }
      ],
      "hiddenData": {
        "gameScreen" : bestGameScreen
      }
    };
    
    var gameId = this.model.get( "gameId" );
    var view = new ResultsView( { model: this.model, results: results } );
    
    router.navigate( "game/" + gameId + "/results", true );
    
    view.render();
    
  },
  
  humanSelectCell: function( event ) {
    
    var uiCell = $( event.target );
    var gridCell = this.getGridCellWithUICell( uiCell );
    
    this.setCell( gridCell, uiCell, this.CONST_HUMAN );
    
    if( this.checkWinner( gridCell ) ) {
      this.showGameOverOnUI();
    } else {
      this.computerMakeAMove();
    }
    
  },
  
  computerMakeAMove: function() {
    
    var moves = [];
    
    if( this.movesUsedHuman == 0 && this.movesUsedComputer == 0 ) {
      
      var move = {};
      move.weight = 1;
      move.gridCell = this.getGridCellWithRowAndCol( this.grid.numberOfRows / 2, this.grid.numberOfCols / 2 );
      
      moves.push( move );
      
    } else {
      
			for( var i = 0; i < this.grid.numberOfRows; i++ ) {
				
        for( var j = 0; j < this.grid.numberOfCols; j++ ) {
					
          var gridCell = this.getGridCellWithRowAndCol( i, j );
          
          if( gridCell != null ) {
            
            if( gridCell.value == this.CONST_EMPTY ) {
              
              var weight = this.getCellWeight( gridCell );
              
              var move = {};
              move.weight = weight;
              move.gridCell = gridCell;
              
              moves.push( move );
              
            }
            
          }
					
				}
        
			}
      
    }
    
    moves.sort( function( a, b ) {
      return ( b.weight - a.weight );
    } );
    
    var selectedMoveIndex = this.getComputerAIWeightedRandomMoveSelectionIndex( moves.length - 1 );
    
    var gridCell = moves[selectedMoveIndex].gridCell;
    var uiCell = this.getUICellWithGridCell( gridCell );
    
    this.setCell( gridCell, uiCell, this.CONST_COMPUTER );
    
    if( this.checkWinner( gridCell ) ) {
      this.showGameOverOnUI();
    }
    
  },
  
  getComputerAIWeights: function() {
    
    var weights = [];
    
    var sumOfWeightedIndices = 0;
    
    for( var i = 1; i < this.CONST_COMPUTER_AI_NUMBER_OF_BEST_MOVES_TO_CONSIDER; i++ ) {
      sumOfWeightedIndices += ( this.CONST_COMPUTER_AI_NUMBER_OF_BEST_MOVES_TO_CONSIDER - i );
    }
    
    var weightForFirstItem = this.computerAI;
    var weightForRest = 1 - weightForFirstItem;
    var weightForRestBlockSize = weightForRest / sumOfWeightedIndices;
    var weightForRestRising = ( weightForFirstItem < 0.5 );
    
    weights.push( weightForFirstItem );
    
    for( var i = 1; i < this.CONST_COMPUTER_AI_NUMBER_OF_BEST_MOVES_TO_CONSIDER; i++ ) {
      
      if( weightForRestRising ) {
        weights.push( i * weightForRestBlockSize );
      } else {
        weights.push( ( this.CONST_COMPUTER_AI_NUMBER_OF_BEST_MOVES_TO_CONSIDER - i ) * weightForRestBlockSize );
      }
      
    }
    
    return weights;
    
  },
  
  getComputerAIWeightedRandomMoveSelectionIndex: function( lastPossibleIndex ) {
    
    var selectedIndex = -1;
    
    var random = Math.random();
    
    var cumulativeWeight = 0;
    
    for( var i = 0; selectedIndex == -1 && i < lastPossibleIndex && i < this.computerAIWeights.length; i++ ) {
      
      cumulativeWeight += this.computerAIWeights[i];
      
      if( random < cumulativeWeight ) {
        selectedIndex = i;
      }
      
    }
    
    if( selectedIndex == -1 ) {
      selectedIndex = lastPossibleIndex;
    }
    
    return selectedIndex;
    
  },
  
  startGame: function() {
    
    var startTime = new Date().getTime();
    
    if( this.numberOfGamesPlayed == 0 ) {
      Settings.set( { startTime : startTime } );
    }
    
    var gameStatistics = {};
    gameStatistics.startTime = startTime;
    
    this.statisticsPerGame.push( gameStatistics );
    
  },
  
  setCell: function( gridCell, uiCell, player ) {
    
    if( gridCell != null && uiCell != null ) {
      
      gridCell.value = player;
      
      this.markCellSetToUI( uiCell, player );
      
    }
    
    if( player == this.CONST_HUMAN ) {
      this.movesUsedHuman += 1;
    } else if( player == this.CONST_COMPUTER ) {
      this.movesUsedComputer += 1;
    }
    
  },
  
  getCellWeight: function( gridCell ) {
    
		for( var direction = 0; direction < 4; direction++ ) {
			
      var line = this.getLine( gridCell, direction );
      
      var humanWeight = this.getLineWeight( line, this.CONST_HUMAN );
			var computerWeight = this.getLineWeight( line, this.CONST_COMPUTER ) + 2;
			
      this.weights[direction] = Math.max( humanWeight, computerWeight ) - 2;
      
		}
    
    this.weights.sort( function( a, b ) {
      return ( a - b );
    } );
    
		return this.weights[3] * 64 + this.weights[2] * 16 + this.weights[1] * 4 + this.weights[0];
    
  },
  
  getLine: function( gridCell, direction ) {
    
		var line = null;
    
    if( gridCell != null ) {
      
      line = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      
      var i = gridCell.row;
      var j = gridCell.col;
      
      for( var k = 4; k >= 0; k-- ) {
        
        i += this.CONST_DY[direction];
        j += this.CONST_DX[direction];
        
        if( i >= 0 && j >= 0 && i < this.grid.numberOfRows && j < this.grid.numberOfCols ) {
          line[k] = this.getGridCellWithRowAndCol( i, j ).value;
        } else {
          line[k] = this.CONST_BORDER;
        }
        
      }
      
      i = gridCell.row;
      j = gridCell.col;
      
      for( var k = 5; k <= 9; k++ ) {
        
        i -= this.CONST_DY[direction];
        j -= this.CONST_DX[direction];
        
        if( i >= 0 && j >= 0 && i < this.grid.numberOfRows && j < this.grid.numberOfCols ) {
          line[k] = this.getGridCellWithRowAndCol( i, j ).value;
        } else {
          line[k] = this.CONST_BORDER;
        }
        
      }
      
    }
    
		return line;
    
  },
  
  getLineWeight: function( line, player ) {
    
    var weight = 0;
    
    if( line != null ) {
      
      var best = 0;
      var first = 0;
      var last = 0;
      var gaps = 0;
      var near = false;
      
      for( var i = 1; i < 6; i++ ) {
        
        first = 0;
        last = 0;
        gaps = 0;
        near = false;
        
        var s = i;
        
        while( gaps < 4 && s < i + 4 ) {
          
          if( line[s] == this.CONST_EMPTY ) {
            
            gaps += 1;
            
          } else if( line[s] == player ) {
            
            last = s;
            
            if( first == 0 ) {
              first = s;
            }
            
            near |= ( s == 4 || s == 5 );
            
          } else {
            
            gaps = 4;
            
          }
          
          s++;
          
        }
        
        var dg = 4 - gaps;
        var eval = dg * dg;
        
        if( near ) {
          eval += 4;
        }
        
        if( last - first < dg ) {
          eval += 4;
        }
        
        if( line[i - 1] != this.CONST_HUMAN &&
            line[i + 4] != this.CONST_HUMAN &&
            line[i - 1] != this.CONST_BORDER &&
            line[i + 4] != this.CONST_BORDER ) {
          eval += 1;
        }
        
        if( eval > best ) {
          best = eval;
        }
        
      }
      
      weight = best;
      
    }
    
    return weight;
    
  },
  
  checkWinner: function( gridCell ) {
    
    var gameOver = false;
    
    var win = false;
    var loss = false;
    var tie = false;
    
    if( gridCell != null ) {
      
      var tempWinningLineGridCells = [];
      
      var lastPlayed = gridCell.value;
      var direction = 0;
      var k = 0;
      
      do {
        
        tempWinningLineGridCells = [];
        tempWinningLineGridCells.push( gridCell );
        
        var line = this.getLine( gridCell, direction );
        
        var winningCellRow = gridCell.row;
        var winningCellCol = gridCell.col;
        
        k = 1;
        
        for( var p = 4; p >= 0; p-- ) {
          
          if( line[p] == lastPlayed ) {
            
            winningCellRow += this.CONST_DY[direction];
            winningCellCol += this.CONST_DX[direction];
            
            tempWinningLineGridCells.push( this.getGridCellWithRowAndCol( winningCellRow, winningCellCol ) );
            
            k++;
            
          } else {
            
            break;
            
          }
          
        }
        
        winningCellRow = gridCell.row;
        winningCellCol = gridCell.col;
        
        for( var p = 5; p <= 9; p++ ) {
          
          if( line[p] == lastPlayed ) {
            
            winningCellRow -= this.CONST_DY[direction];
            winningCellCol -= this.CONST_DX[direction];
            
            tempWinningLineGridCells.push( this.getGridCellWithRowAndCol( winningCellRow, winningCellCol ) );
            
            k++;
            
          } else {
            
            break;
            
          }
          
        }
        
        direction += 1;
        
      } while( direction < 4 && k < 5 );

      if( k >= 5 ) {
        
        var winner = lastPlayed;
        
        this.winningLineGridCells = tempWinningLineGridCells;
        
        if( winner == this.CONST_HUMAN ) {
          win = true;
        } else if( winner == this.CONST_COMPUTER ) {
          loss = true;
        }
        
        gameOver = true;
        
      }
      
      if( !gameOver && !this.gridHasEmptyCells() ) {
        
        tie = true;
        
        gameOver = true;
        
      }
      
    }
    
    if( gameOver ) {
      
      this.numberOfGamesPlayed += 1;
      
      var endTime = new Date().getTime();
      
      var gameStatistics = this.statisticsPerGame[this.numberOfGamesPlayed - 1];
      gameStatistics.endTime = endTime;
      gameStatistics.movesUsedHuman = this.movesUsedHuman;
      gameStatistics.movesUsedComputer = this.movesUsedComputer;
      gameStatistics.win = win;
      gameStatistics.loss = loss;
      gameStatistics.tie = tie;
      
      if( this.numberOfGamesPlayed >= this.numberOfGamesBeforeResults ) {
        Settings.set( { endTime : endTime } );
      }
      
    }
    
    return gameOver;
    
  },
  
  markCellSetToUI: function( uiCell, player ) {
    
    var cellMark = "";
    
    if( player == this.CONST_HUMAN ) {
      cellMark = this.CONST_PLAYER_MARK_HUMAN;
    } else if( player == this.CONST_COMPUTER ) {
      cellMark = this.CONST_PLAYER_MARK_COMPUTER;
    }
    
    uiCell.text( cellMark );
    uiCell.removeClass( "fiar-grid-cell-selectable" );
    
  },
  
  showGameOverOnUI: function() {
    
    $( ".fiar-grid-cell" ).removeClass( "fiar-grid-cell-selectable" );
    
    for( var i = 0; i < this.winningLineGridCells.length; i++ ) {
      
      var gridCell = this.winningLineGridCells[i];
      var uiCell = this.getUICellWithGridCell( gridCell );
      
      uiCell.addClass( "fiar-grid-cell-winning" );
      
    }
    
    var screenJQO = $( "#content" ).clone();
    screenJQO.find( ".quit .reset .finish" ).remove();
    
    var screenHTML = screenJQO.html();
    
    var gameStatistics = this.statisticsPerGame[this.numberOfGamesPlayed - 1];
    gameStatistics.screen = screenHTML;
    
    if( this.numberOfGamesPlayed >= this.numberOfGamesBeforeResults ) {
      $( ".finish" ).removeClass( "hidden" );
    } else {
      $( ".reset" ).removeClass( "hidden" );
    }
    
  },
  
  costructGrid: function( numberOfRows, numberOfCols ) {
    
    var grid = {};
    
    if( ( numberOfRows != null && numberOfRows > 0 ) && ( numberOfCols != null && numberOfCols > 0 ) ) {
      
      grid.numberOfRows = numberOfRows;
      grid.numberOfCols = numberOfCols;
      
      var rows = [];
      
      for( var i = 0; i < numberOfRows; i++ ) {
        
        var row = {};
        
        var cells = [];
        
        for( var j = 0; j < numberOfCols; j++ ) {
          
          var cell = {};
          
          cell.row = i;
          cell.col = j;
          
          cell.value = this.CONST_EMPTY;
          
          cells.push( cell );
          
        }
        
        row.cells = cells;
        
        rows.push( row );
        
      }
      
      grid.rows = rows;
      
    }
    
    return grid;
    
  },
  
  gridHasEmptyCells: function() {
    
    var hasEmptyCells = false;
    
    for( var i = 0; !hasEmptyCells && i < this.grid.numberOfRows; i++ ) {
      
      for( var j = 0; !hasEmptyCells && j < this.grid.numberOfCols; j++ ) {
        
        var gridCell = this.getGridCellWithRowAndCol( i, j );
        
        if( gridCell != null ) {
          
          if( gridCell.value == this.CONST_EMPTY ) {
            hasEmptyCells = true;
          }
          
        }
        
      }
      
    }
    
    return hasEmptyCells;
    
  },
  
  getGridCellWithRowAndCol: function( row, col ) {
    
    var gridCell = null;
    
    if( ( row != null && row >= 0 && row < this.grid.numberOfRows ) && ( col != null && col >= 0 && col < this.grid.numberOfCols ) ) {
      
      gridCell = this.grid.rows[row].cells[col];
      
    }
    
    return gridCell;
    
  },
  
  getGridCellWithUICell: function( uiCell ) {
    
    var gridCell = null;
    
    if( uiCell != null ) {
      
      var row = parseInt( uiCell.data( "row" ) );
      var col = parseInt( uiCell.data( "col" ) );
      
      gridCell = this.grid.rows[row].cells[col];
      
    }
    
    return gridCell;
    
  },
  
  getUICellWithGridCell: function( gridCell ) {
    
    var uiCell = null;
    
    if( gridCell != null ) {
      
      uiCell = $( "#fiarGridCell_" + gridCell.row + "_" + gridCell.col );
      
    }
    
    return uiCell;
    
  },
  
  log: function( message ) {
    
    if( window.console && window.console.log ) {
      window.console.log( message );
    }
    
  }
  
});