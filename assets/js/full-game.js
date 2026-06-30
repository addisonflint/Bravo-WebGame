$(document).ready(function () {
    let currentLevel = 1;
    let fullGameScore = 0;

    // Initialize the jQuery UI Draggable element for the W-2 Form
    $("#draggable-ledger").draggable({
        containment: "document",
        revert: "invalid"
    });

    // Initialize the jQuery UI Droppable element for the IRS Processing Box
    $("#audit-dropzone").droppable({
        accept: "#draggable-ledger",
        drop: function (event, ui) {
            // Only fire if the Full Game screen is active
            if ($("#game-board-full").is(":visible")) {
                
                // Return item back smoothly to baseline location for replayability
                ui.draggable.animate({ top: 0, left: 0 }, 300);

                // Increment score per successful W-2 filing
                fullGameScore += 100;
                
                // Track progress bar percentage based on score thresholds
                let progressPercent = (fullGameScore / 300) * 100;
                $("#audit-progress").css("width", progressPercent + "%");

                // Update UI Telemetry Scoreboard Display Panels
                $("#current-score").text(fullGameScore);
                $("#player-live-rank").text(fullGameScore + " pts (Level " + currentLevel + " Auditor)");

                // Visual green pulse feedback on successful filing drop
                $("#audit-dropzone").addClass("bg-success text-white").removeClass("bg-dark text-secondary");
                setTimeout(() => {
                    $("#audit-dropzone").addClass("bg-dark text-secondary").removeClass("bg-success text-white");
                }, 400);

                // Game Level Advancement and Win Condition State Machine Logic
                if (fullGameScore === 100 && currentLevel === 1) {
                    currentLevel = 2;
                    alert("✨ Level 1 Complete! Advancing to Level 2: Tax Season Crunch.");
                } else if (fullGameScore === 200 && currentLevel === 2) {
                    currentLevel = 3;
                    alert("🚀 Level 2 Complete! Advancing to Level 3: Final Corporate Sign-off.");
                } else if (fullGameScore >= 300) {
                    triggerGameEnd("Audit Escaped! 🏆", "Victory! Final Score: " + fullGameScore + " Points", "You successfully processed and filed all W-2 forms safely through the IRS parameters.");
                }
            }
        }
    });

    // Handle Game End Modal Injections
    function triggerGameEnd(title, scoreDisplay, metadata) {
        $("#modal-title-text").text(title);
        $("#modal-score-display").text(scoreDisplay);
        $("#modal-metadata").text(metadata);
        
        let m = new bootstrap.Modal(document.getElementById('endGameModal'));
        m.show();
    }
});
