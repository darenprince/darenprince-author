(function () {
  function boot() {
    const button = document.getElementById("prepare");
    const input = document.getElementById("audio");
    const status = document.getElementById("intakeStatus");
    if (!button || !input || !status) return;

    document.addEventListener("click", async function (event) {
      if (event.target !== button) return;
      event.preventDefault();
      event.stopImmediatePropagation();

      const file = input.files && input.files[0];
      if (!file) {
        status.textContent = "Select an audio recording first.";
        return;
      }

      status.textContent = "Analyzing audio…";
      button.disabled = true;
      button.textContent = "Analyzing…";

      try {
        const isWav = /audio\/wav|\.wav$/i.test(file.type || file.name);
        if (!isWav) {
          throw new Error("The live runtime currently accepts WAV audio. MP3/M4A browser decoding will be added in the next runtime pass.");
        }

        const response = await fetch("/api/voxvector/analyze", {
          method: "POST",
          headers: { "Content-Type": "audio/wav" },
          body: await file.arrayBuffer()
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Analysis failed");

        window.voxvectorLastResult = data;
        const $ = (id) => document.getElementById(id);
        const observations = data.observations || [];
        const groups = data.evidence || [];

        if ($("probability")) $("probability").textContent = "—";
        if ($("probbar")) $("probbar").style.width = "0%";
        if ($("probnote")) $("probnote").textContent = "No calibrated Deception Probability is available for this runtime build.";
        if ($("quality")) $("quality").textContent = (data.eligibility && data.eligibility.status) || "Unknown";
        if ($("count")) $("count").textContent = observations.length;
        if ($("obs")) $("obs").textContent = observations.length;
        if ($("groups")) $("groups").textContent = Array.isArray(groups) ? groups.length : "—";
        if ($("prov")) $("prov").textContent = data.provenance ? "100%" : "Review";
        if ($("audioStatus")) $("audioStatus").textContent = (data.eligibility && data.eligibility.status) || "Analyzed";
        status.textContent = "Analysis complete. Observations returned from the VoxVector runtime.";
      } catch (error) {
        status.textContent = "Analysis could not be completed: " + error.message;
      } finally {
        button.disabled = false;
        button.textContent = "Prepare analysis";
      }
    }, true);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
