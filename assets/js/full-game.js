$(document).ready(function () {
    let currentLevel = 1;
    let accumulatedScore = 0;

    // Render the interactive advanced game simulator runtime workspace
    function buildFullGameUI() {
        $("#game-board-full").html(`
            <div class="text-center p-4">
                <h4 class="text-info fw-bold mb-1">Mode 2: Full Game Processing Simulator</h4>
                <p class="text-muted small">Process cascading tax ledger folders. Avoid errors to mitigate risk thresholds.</p>
                <div class="bg-dark border border-secondary rounded p-3 my-3 text-start">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-info">Level ${currentLevel} of 3</span>
                        <span class="text-muted small">Objective: File 3 folders without trigger warnings</span>
                    </div>
                    <div class="d-flex justify-content-center gap-2 py-3">
                        <button id="btn-process-file" class="btn btn-success"><i class="bi bi-file-earmark-plus me-1"></i>Process Folder (+50 Pts)</button>
                        <button id="btn-trigger-risk" class="btn btn-warning"><i class="bi bi-exclamation-triangle me-1"></i>Simulate Penalty</button>
                    </div>
                </div>
                <button id="btn-full-reset" class="btn btn-outline-danger btn-sm mt-2"><i class="bi bi-arrow-counterclockwise me-1"></i>Reset Pipeline</button>
            </div>
        `);
    }

    buildFullGameUI();

    // Process Ledger Folder Actions
    $(document).on("click", "#btn-process-file", function () {
        accumulatedScore += 50;
        $("#current-score").text(accumulatedScore);
        $("#player-live-rank").text(accumulatedScore + " pts");

        if (accumulatedScore >= 150 && currentLevel < 3) {
            currentLevel++;
            alert("✨ Level Complete! Advancing to Level " + currentLevel);
            buildFullGameUI();
        } else if (accumulatedScore >= 300) {
            triggerGameEnd("Audit Escaped! 🏆", "Victory! Final Score: " + accumulatedScore + " Points", "You successfully completed all processing parameters safely.");
        }
    });

    // Simulate Penalties
    $(document).on("click", "#btn-trigger-risk", function () {
        $("#audit-progress").css("width", "100%");
        triggerGameEnd("Audited! 🚨", "Defeat. Final Score: 0 Points", "Your workflow generated a fatal reconciliation exception error.");
    });

    // Reset Pipeline
    $(document).on("click", "#btn-full-reset", function () {
        currentLevel = 1;
        accumulatedScore = 0;
        $("#current-score").text("0");
        $("#player-live-rank").text("0 pts");
        $("#audit-progress").css("width", "0%");
        buildFullGameUI();
    });

    function triggerGameEnd(title, scoreDisplay, metadata) {
        $("#modal-title-text").text(title);
        $("#modal-score-display").text(scoreDisplay);
        $("#modal-metadata").text(metadata);
        let m = new bootstrap.Modal(document.getElementById('endGameModal'));
        m.show();
    }
});