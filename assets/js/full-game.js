$(document).ready(function () {
    let fullGameScore = 0;
    let currentRank = "Intern";

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
                
                // Track progress bar percentage based on maximum win threshold (400 pts)
                let progressPercent = (fullGameScore / 400) * 100;
                $("#audit-progress").css("width", progressPercent + "%");

                // Evaluate corporate rank progression milestones
                let oldRank = currentRank;
                if (fullGameScore >= 400) {
                    currentRank = "CFO";
                } else if (fullGameScore >= 300) {
                    currentRank = "Controller";
                } else if (fullGameScore >= 200) {
                    currentRank = "Senior Auditor";
                } else {
                    currentRank = "Intern";
                }

                // Alert the player if they earned a promotion!
                if (currentRank !== oldRank) {
                    alert("✨ PROMOTION BREAKTHROUGH! You have been promoted to: " + currentRank);
                }

                // Update UI Telemetry Scoreboard Display Panels
                $("#current-score").text(fullGameScore);
                $("#player-live-rank").text(fullGameScore + " pts (" + currentRank + ")");

                // Visual green pulse feedback on successful filing drop
                $("#audit-dropzone").addClass("bg-success text-white").removeClass("bg-dark text-secondary");
                setTimeout(() => {
                    $("#audit-dropzone").addClass("bg-dark text-secondary").removeClass("bg-success text-white");
                }, 400);

                // Ultimate Win Condition Check
                if (fullGameScore >= 400) {
                    triggerGameEnd(
                        "CFO Executive Status Achieved! 🏆", 
                        "Final Score: " + fullGameScore + " Points", 
                        "Incredible work! You worked your way from a humble Intern all the way to the Chief Financial Officer layout parameters safely."
                    );
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
