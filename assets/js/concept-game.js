$(document).ready(function () {
    // Enable simple containment constraint drag mechanics
    $("#w2-document").draggable({
        containment: "#game-board-concept",
        revert: "invalid"
    });

    // Operational Dropzone Container Definition
    $("#file-cabinet-target").droppable({
        accept: "#w2-document",
        drop: function (event, ui) {
            if ($("#game-board-concept").is(":visible")) {
                ui.draggable.css({ top: "0px", left: "0px", position: "relative" }).appendTo($(this));

                // State Telemetry Upgrades
                $("#current-score").text("100");
                $("#player-live-rank").text("100 pts");
                $("#audit-progress").css("width", "25%");

                // Modal Display Config
                $("#modal-title-text").text("Concept Verified! ✅");
                $("#modal-score-display").text("Final Score: 100 Points");
                $("#modal-metadata").text("Concept Mode complete. The single data structure asset was successfully filed.");

                let m = new bootstrap.Modal(document.getElementById('endGameModal'));
                m.show();
            }
        }
    });
});