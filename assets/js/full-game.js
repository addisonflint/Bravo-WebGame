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

                // Increment score by 100 points per successful W-2 filing
                fullGameScore += 100;
                
                // Track progress bar percentage based on maximum win threshold (2000 pts)
                let progressPercent = (fullGameScore / 2000) * 100;
                $("#audit-progress").css("width", progressPercent + "%");

                // Evaluate accounting firm rank progression milestones
                let oldRank = currentRank;
                if (fullGameScore >= 2000) {
                    currentRank = "Partner";
                } else if (fullGameScore >= 1500) {
                    currentRank = "Senior Manager";
                } else if (fullGameScore >= 1000) {
                    currentRank = "Associate";
                } else if (fullGameScore >= 500) {
                    currentRank = "Intern"; // Progressed past starting baseline tier
                } else {
                    currentRank = "Intern";
                }

                // Alert the player if they earned a firm promotion!
                if (currentRank !== oldRank) {
                    alert("✨ FIRM PROMOTION! You have climbed the ranks to: " + currentRank);
                }

                // Update UI Telemetry Scoreboard Display Panels
                $("#current-score").text(fullGameScore);
                $("#player-live-rank").text(fullGameScore + " pts (" + currentRank + ")");

                // Visual green pulse feedback on successful filing drop
                $("#audit-dropzone").addClass("bg-success text-white").removeClass("bg-dark text-secondary");
                setTimeout(() => {
                    $("#audit-dropzone").addClass("bg-dark text-secondary").removeClass("bg-success text-white");
                }, 400);

                // Ultimate Partner Win Condition Check
                if (fullGameScore >= 2000) {
                    triggerGameEnd(
                        "Equity Partner Status Achieved! 🏆", 
                        "Final Score: " + fullGameScore + " Points", 
                        "Incredible career path! You survived tax season layouts, climbed the billing tiers, and made Equity Partner at the firm safely."
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
