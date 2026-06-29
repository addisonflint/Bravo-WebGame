$(document).ready(function () {
    
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
        $("#nav-concept").addClass("active");
        $("#nav-full").removeClass("active");
        $("#game-board-full").hide();
        $("#game-board-concept").css("display", "flex");
        resetTelemetryState();
    });

    $("#nav-full").on("click", function () {
        $("#nav-full").addClass("active");
        $("#nav-concept").removeClass("active");
        $("#game-board-concept").hide();
        $("#game-board-full").show();
        resetTelemetryState();
    });

    function resetTelemetryState() {
        $("#current-score").text("0");
        $("#player-live-rank").text("0 pts");
        $("#audit-progress").css("width", "0%");
    }
});

// Console Cheat Code Handler (MAC Check Requirement)
window.cheatMode = function() {
    alert("🚨 SYSTEM AUDIT WARNING: CHEAT MODE OVERRIDE INITIATED!");
    $("#current-score").text("99999");
    $("#player-live-rank").text("99999 pts");
    $("#audit-progress").css("width", "0%").removeClass("bg-danger").addClass("bg-success");
};