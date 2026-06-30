$(document).ready(function () {
    let conceptScore = 0;
    let fullGameScore = 0;

    // Operational View Mode Switch State Machine
    $("#nav-concept").on("click", function () {
        $("#nav-concept").addClass("active text-white").removeClass("text-white-50");
        $("#nav-full").removeClass("active text-white").addClass("text-white-50");
        $("#mode-badge").text("Active Engine: Concept Mode").attr("class", "badge bg-success font-monospace px-3 py-2 text-dark fw-bold");
        
        // Show button frame, hide drag arena
        $("#game-board-full").hide();
        $("#game-board-concept").show();
        
        swapTelemetryDisplay(conceptScore, "Concept");
    });

    $("#nav-full").on("click", function () {
        $("#nav-full").addClass("active text-white").removeClass("text-white-50");
        $("#nav-concept").removeClass("active text-white").addClass("text-white-50");
        $("#mode-badge").text("Active Engine: Full Game Mode").attr("class", "badge bg-warning font-monospace px-3 py-2 text-dark fw-bold");
        
        // Hide button frame, show drag arena
        $("#game-board-concept").hide();
        $("#game-board-full").show();
        
        swapTelemetryDisplay(fullGameScore, "Senior Auditor");
    });

    function swapTelemetryDisplay(score, rankSuffix) {
        $("#current-score").text(score);
        $("#player-live-rank").text(score + " pts (" + rankSuffix + ")");
    }

    // Concept Mode Click Engine Logic
    $(document).on("click", "#btn-process-file", function () {
        conceptScore += 50;
        swapTelemetryDisplay(conceptScore, "Concept");
    });

    // Full Game Drag & Drop Engine Logic
    $("#draggable-ledger").draggable({ 
        revert: "invalid", 
        containment: "document" 
    });

    $("#audit-dropzone").droppable({
        accept: "#draggable-ledger",
        drop: function(event, ui) {
            ui.draggable.animate({ top: 0, left: 0 }, 300);
            
            fullGameScore += 100;
            swapTelemetryDisplay(fullGameScore, "Senior Auditor");
            
            // Visual green pulse feedback
            $("#audit-dropzone").addClass("bg-success text-white").removeClass("bg-dark text-secondary");
            setTimeout(() => {
                $("#audit-dropzone").addClass("bg-dark text-secondary").removeClass("bg-success text-white");
            }, 400);
        }
    });
});
