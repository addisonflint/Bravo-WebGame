$(document).ready(function () {
    let accumulatedScore = 0;
    
    // Telemetry Environment Injections
    $("#browser-info").text(navigator.userAgent.match(/(Chrome|Safari|Firefox|Edge)/)?.[0] || "Web Browser");
    setInterval(() => {
        let d = new Date();
        $("#time-info").text(d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }, 1000);

    // Operational View Mode Switch State Machine
    $("#nav-concept").on("click", function () {
        $("#nav-concept").addClass("active");
        $("#nav-full").removeClass("active");
        $("#mode-badge").text("Active Engine: Concept Mode").attr("class", "badge bg-success font-monospace px-3 py-2 text-dark fw-bold");
        
        // Hide full game drag-and-drop, show basic concept button
        $("#game-board-full").hide();
        $("#game-board-concept").show();
        resetTelemetryState();
    });

    $("#nav-full").on("click", function () {
        $("#nav-full").addClass("active");
        $("#nav-concept").removeClass("active");
        $("#mode-badge").text("Active Engine: Full Game Mode").attr("class", "badge bg-warning font-monospace px-3 py-2 text-dark fw-bold");
        
        // Hide basic concept button, show full game drag-and-drop board
        $("#game-board-concept").hide();
        $("#game-board-full").show();
        resetTelemetryState();
    });

    function resetTelemetryState() {
        accumulatedScore = 0;
        $("#current-score").text("0");
        $("#player-live-rank").text("0 pts");
    }

    // Interactive Game Mechanics (Drag, Drop, and Button Click)
    $("#draggable-ledger").draggable({ 
        revert: "invalid", 
        containment: "document" 
    });

    $("#audit-dropzone").droppable({
        accept: "#draggable-ledger",
        drop: function(event, ui) {
            ui.draggable.animate({ top: 0, left: 0 }, 300);
            updateGameScore(50);
        }
    });

    $(document).on("click", "#btn-process-file", function () {
        updateGameScore(50);
    });

    function updateGameScore(amount) {
        accumulatedScore += amount;
        $("#current-score").text(accumulatedScore);
        $("#player-live-rank").text(accumulatedScore + " pts");
    }
});

// Console Cheat Code Handler
window.cheatMode = function() {
    alert("🚨 SYSTEM AUDIT WARNING: CHEAT MODE OVERRIDE INITIATED!");
    $("#current-score").text("99999");
    $("#player-live-rank").text("99999 pts");
};
