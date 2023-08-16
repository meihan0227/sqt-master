/**
 * @namespace Score
 * @author A. Freddie Page
 * @version 2022.23
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};

/**
 * The score object contains information about the score of the game.
 * @memberof Score
 * @typedef {Object} Score
 * @property {number} score The score of the game
 * @property {number} lines_cleared The number of lines cleared
 * @property {boolean} is_tetris Whether the last line cleared was a tetris
 * 
 */

/**
 * Returns a game state for a new Tetris Game.
 * @function
 * @memberof Score
 * @returns {Score.Score} The new game.
 */
Score.new_score = function () {
    return {
        "score": 0,
        "lines_cleared": 0,
        "is_tetris":false,
    };
};

/**
 * Returns what level you are on.
 * You start at level 1, and advance a level every 10 lines cleared.
 * @function
 * @memberof Score
 * @param {Score.Score} score The game state.
 * @returns {number} Returns what level you are on.
 */
Score.level = function (score) {
    //return score.lines_cleared;
    if(score.lines_cleared<10){
        return 1;
    }else{
        return Math.floor((score.lines_cleared)/10+1);
    }
};

/**
 * When clearing lines, you get more points for multiple lines cleared at once.
 * Single line – 100 points per level
 * Double lines – 300 points per level
 * Triple lines – 500 points per level
 * Tetris – four lines – 800 points per level
 * Back-to-back Tetris – Scoring a tetris if the previous line clear was also a tetris – 1200 points per level.
 * @function
 * @memberof Score
 * @param {number} lines The number of cleared lines.
 * @param {Score.Score} score The game state.
 * @returns {Score.Score} Returns a new Score with additional lines cleared and the score updated.
 */
 Score.cleared_lines = function (lines,score) {
    if(lines>0){
        var coefficient=0;
        var is_tetris=false;
        switch (lines) {
            case (1):
                coefficient=100;
                break;
            case (2):
                coefficient=300;
                break;
            case (3):
                coefficient=500;
                break;
            case (4):
                coefficient=800;
                is_tetris=true;
                if(score.is_tetris){
                    coefficient=1200;
                }
                break;
            }
        const current_level=Score.level(score);
        score.score=score.score+current_level*coefficient;
        score.lines_cleared=score.lines_cleared+lines;
        score.is_tetris=is_tetris;
    }
    return score;

};

/**
 * Add a given number of points to a given score
 * @function
 * @memberof Score
 * @param {number} points The given number of points.
 * @param {Score.Score} score The game state
 */
 Score.add_points = function (points,score) {
    score.score=score.score+points;
};

export default Object.freeze(Score);
