$(document).ready(function () {
    // Enable simple containment constraint drag mechanics
    $("#draggable-ledger").draggable({
        containment: "document",
        revert: "invalid"
    });

    // Operational Dropzone Container Definition
    $("#audit-dropzone").droppable({
        accept: "#draggable-ledger",
        drop: function (event, ui) {
            // Only fire if the Full Game screen is active
            if ($("#game-board-full").is(":visible")) {
                
                // Return item back smoothly to baseline location for replayability
                ui.draggable.animate({ top: 0, left: 0 }, 300);

                // State Telemetry Upgrades
                $("#current-score").text("100");
                $("#player-live-rank").text("100 pts");
                $("#audit-progress").css("width", "100%");

                // Optional Alert / UI confirmation loop
                alert("W-2 Successfully Filed with the IRS! Final Score: 100 Points ✅");
            }
        }
    });
});
