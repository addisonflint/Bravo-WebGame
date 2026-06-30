$(document).ready(function () {
    let accumulatedScore = 0;
    
    // Telemetry Environment Injections
    $("#browser-info").text(navigator.userAgent.match(/(Chrome|Safari|Firefox|Edge)/)?.[0] || "Web Browser");
    setInterval(() => {
        let d = new Date();
        $("#time-info").text(d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }, 1000);

    // Identity Flow Core Logic
    function initializeSession(name) {
        sessionStorage.setItem("activeAuditor", name);
        $("#userGreeting").html('<i class="bi bi-shield-check text-success me-2"></i>Auditor Logged: <span class="text-light">' + name + '</span>');
        $("#auth-panel").slideUp();
        
        // Populate leaderboard with user session data
        $("#leaderboard-list").prepend('<li class="list-group-item bg-transparent text-info border-secondary px-0 py-1 small d-flex justify-content-between"><span>⭐ ' + name + ' (You)</span><span id="player-live-rank" class="text-warning fw-bold">0 pts</span></li>');
    }

    $("#btn-login").on("click", function () {
        let name = $("#username-input").val().trim();
        if (name) initializeSession(name);
    });

    $("#btn-guest").on("click", function () {
        let randomGuests = ["Guest_TaxPro", "Guest_IRS_Agent", "Guest_LedgerWiz", "Guest_AuditEvasion"];
        let randomName = randomGuests[Math.floor(Math.random() * randomGuests.length)] + "_" + Math.floor(1000 + Math.random() * 9000);
        initializeSession(randomName);
    });

    // Operational View Mode Switch State Machine
    $("#nav-concept").on("click", function () {
        $("#nav-concept").addClass("active border-bottom border-2 border-success rounded-0 text-white").removeClass("text-white-50");
        $("#nav-full").removeClass("active border-bottom border-2 border-success rounded-0 text-white").addClass("text-white-50");
        $("#mode-badge").text("Active Engine: Concept Mode").attr("class", "badge bg-success font-monospace px-3 py-2 text-dark fw-bold");
        resetTelemetryState();
    });

    $("#nav-full").on("click", function () {
        $("#nav-full").addClass("active border-bottom border-2 border-success rounded-0 text-white").removeClass("text-white-50");
        $("#nav-concept").removeClass("active border-bottom border-2 border-success rounded-0 text-white").addClass("text-white-50");
        $("#mode-badge").text("Active Engine: Full Game Mode").attr("class", "badge bg-warning font-monospace px-3 py-2 text-dark fw-bold");
        resetTelemetryState();
    });

    function resetTelemetryState() {
        accumulatedScore = 0;
        $("#current-score").text("0");
        $("#player-live-rank").text("0 pts");
        $("#audit-progress").css("width", "0%");
    }

    // Interactive Game Mechanics (Drag, Drop, and Button Click)
    $("#draggable-ledger").draggable({ 
        revert: "invalid", 
        containment: "document" 
    });

    $("#audit-dropzone").droppable({
        accept: "#draggable-ledger",
        drop: function(event, ui) {
            // Smoothly snap back the ledger item for replayability
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

// Console Cheat Code Handler (MAC Check Requirement)
window.cheatMode = function() {
    alert("🚨 SYSTEM AUDIT WARNING: CHEAT MODE OVERRIDE INITIATED!");
    $("#current-score").text("99999");
    $("#player-live-rank").text("99999 pts");
    $("#audit-progress").css("width", "100%").removeClass("bg-danger").addClass("bg-success");
};
